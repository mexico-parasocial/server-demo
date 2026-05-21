import 'maplibre-gl/dist/maplibre-gl.css'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import {StyleSheet, View} from 'react-native'
import maplibregl from 'maplibre-gl'

import {type MapViewMode} from '#/lib/hooks/useMapProvider'

const DARK_MAP_BG = '#1a1a1a'
const LIGHT_MAP_BG = '#f5f4ef'

function isDark(themeName: string): boolean {
  return themeName === 'dark' || themeName === 'dim'
}

function getTileUrl(viewMode: MapViewMode, themeName: string): string {
  const dark = isDark(themeName)
  switch (viewMode) {
    case 'standard':
      return dark
        ? 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    case 'satellite':
    case 'hybrid':
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    case 'terrain':
      return 'https://tile.opentopomap.org/{z}/{x}/{y}.png'
  }
}

function getAttribution(viewMode: MapViewMode, themeName: string): string {
  const dark = isDark(themeName)
  switch (viewMode) {
    case 'standard':
      return dark
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    case 'satellite':
    case 'hybrid':
      return 'Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
    case 'terrain':
      return '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA), &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
}

function buildStyle(
  viewMode: MapViewMode,
  themeName: string,
): maplibregl.StyleSpecification {
  return {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [getTileUrl(viewMode, themeName)],
        tileSize: 256,
        attribution: getAttribution(viewMode, themeName),
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': isDark(themeName) ? DARK_MAP_BG : LIGHT_MAP_BG,
        },
      },
      {
        id: 'raster-layer',
        type: 'raster',
        source: 'raster-tiles',
        paint: {
          'raster-saturation':
            viewMode === 'standard' && !isDark(themeName) ? -0.12 : 0,
          'raster-contrast':
            viewMode === 'standard' && !isDark(themeName) ? 0.08 : 0,
        },
      },
    ],
  }
}

/**
 * Heatmap color ramp for civic activity density.
 * Low-intensity = transparent blue; high-intensity = warm yellow/red.
 */
function getHeatmapColor(
  themeName: string,
): maplibregl.ExpressionSpecification {
  const dark = isDark(themeName)
  return [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(0,0,0,0)',
    0.2,
    dark ? 'rgba(30,144,255,0.4)' : 'rgba(0,100,255,0.3)',
    0.4,
    dark ? 'rgba(0,191,255,0.5)' : 'rgba(0,150,255,0.4)',
    0.6,
    dark ? 'rgba(0,255,127,0.6)' : 'rgba(50,200,100,0.5)',
    0.8,
    dark ? 'rgba(255,215,0,0.7)' : 'rgba(255,180,0,0.6)',
    1,
    dark ? 'rgba(255,69,0,0.8)' : 'rgba(255,80,0,0.7)',
  ] as maplibregl.ExpressionSpecification
}

type MapRegion = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

type Coordinate = {
  latitude: number
  longitude: number
}

export type MapLibreWebRef = {
  animateToRegion: (region: MapRegion, duration?: number) => void
  animateCamera: (camera: {
    center?: Coordinate
    zoom?: number
    altitude?: number
  }) => void
  fitToCoordinates: (
    coordinates: Coordinate[],
    options?: {edgePadding?: unknown; animated?: boolean},
  ) => void
  getCamera: () => Promise<{zoom?: number; altitude?: number}>
}

type CivicPoint = {
  latitude: number
  longitude: number
  weight?: number
  uri?: string
  title?: string
}

type Props = {
  initialRegion: MapRegion
  viewMode: MapViewMode
  themeName?: string
  onRegionChangeComplete?: (region: MapRegion) => void
  onPress?: () => void
  polygons?: Array<{
    key: string
    coordinates: Coordinate[]
    fillColor?: string
    strokeColor?: string
    strokeWidth?: number
    onPress?: () => void
  }>
  civicPoints?: CivicPoint[]
}

function deltaToZoom(latDelta: number): number {
  return Math.max(1, Math.min(20, Math.log2(360 / latDelta)))
}

function zoomToDelta(zoom: number): number {
  return 360 / Math.pow(2, zoom)
}

export const MapLibreWeb = forwardRef<MapLibreWebRef, Props>(
  function MapLibreWeb(
    {
      initialRegion,
      viewMode,
      themeName = 'light',
      onRegionChangeComplete,
      onPress,
      polygons,
      civicPoints,
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<maplibregl.Map | null>(null)
    const polygonsRef = useRef<NonNullable<Props['polygons']>>([])
    const civicPointsRef = useRef<NonNullable<Props['civicPoints']>>([])

    // Keep latest refs for click handlers
    polygonsRef.current = polygons || []
    civicPointsRef.current = civicPoints || []

    // Initialize map
    useEffect(() => {
      if (!containerRef.current || mapRef.current) return

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: buildStyle(viewMode, themeName),
        center: [initialRegion.longitude, initialRegion.latitude],
        zoom: deltaToZoom(initialRegion.latitudeDelta),
        attributionControl: false,
      })

      map.addControl(
        new maplibregl.AttributionControl({compact: true}),
        'bottom-right',
      )

      map.on('moveend', () => {
        const center = map.getCenter()
        const zoom = map.getZoom()
        const delta = zoomToDelta(zoom)
        onRegionChangeComplete?.({
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: delta,
          longitudeDelta: delta * 1.5,
        })
      })

      map.on('click', e => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [
            'polygon-fill',
            'civic-cluster-circle',
            'civic-unclustered-point',
          ],
        })
        if (features.length > 0) {
          const layerId = features[0].layer?.id
          const key = features[0].properties?.key
          const clusterId = features[0].properties?.cluster_id

          if (layerId === 'polygon-fill' && key) {
            const poly = polygonsRef.current.find(p => p.key === key)
            poly?.onPress?.()
            return
          }

          if (
            layerId === 'civic-cluster-circle' &&
            clusterId != null &&
            map.getSource('civic-points')
          ) {
            const source = map.getSource(
              'civic-points',
            ) as maplibregl.GeoJSONSource
            source
              .getClusterExpansionZoom(clusterId)
              .then(zoom => {
                map.easeTo({
                  center: (features[0].geometry as GeoJSON.Point)
                    .coordinates as [number, number],
                  zoom: zoom + 1,
                  duration: 500,
                })
              })
              .catch(() => {
                // Ignore cluster expansion errors
              })
            return
          }

          if (layerId === 'civic-unclustered-point') {
            const uri = features[0].properties?.uri
            const title = features[0].properties?.title
            // TODO: navigate to civic detail or show popup
            console.log('[MapLibre] Civic point clicked:', {uri, title})
            return
          }
        }

        onPress?.()
      })

      map.on('mouseenter', 'civic-cluster-circle', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'civic-cluster-circle', () => {
        map.getCanvas().style.cursor = ''
      })
      map.on('mouseenter', 'civic-unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'civic-unclustered-point', () => {
        map.getCanvas().style.cursor = ''
      })
      map.on('mouseenter', 'polygon-fill', () => {
        map.getCanvas().style.cursor = 'pointer'
        if (map.getLayer('polygon-fill')) {
          map.setPaintProperty('polygon-fill', 'fill-opacity', 0.72)
        }
      })
      map.on('mouseleave', 'polygon-fill', () => {
        map.getCanvas().style.cursor = ''
        if (map.getLayer('polygon-fill')) {
          map.setPaintProperty('polygon-fill', 'fill-opacity', 0.56)
        }
      })

      mapRef.current = map

      const resizeObserver = new ResizeObserver(() => {
        map.resize()
      })
      resizeObserver.observe(containerRef.current)
      window.setTimeout(() => map.resize(), 0)

      return () => {
        resizeObserver.disconnect()
        map.remove()
        mapRef.current = null
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update style when viewMode or theme changes
    useEffect(() => {
      const map = mapRef.current
      if (!map) return

      map.setStyle(buildStyle(viewMode, themeName))

      map.once('styledata', () => {
        addPolygonsToMap(map, polygonsRef.current)
        addCivicPointsToMap(map, civicPointsRef.current, themeName)
      })
    }, [viewMode, themeName])

    // Update polygons when they change
    useEffect(() => {
      const map = mapRef.current
      if (!map) return

      const onLoad = () => addPolygonsToMap(map, polygons || [])

      if (map.isStyleLoaded()) {
        onLoad()
      } else {
        map.on('load', onLoad)
      }

      return () => {
        map.off('load', onLoad)
      }
    }, [polygons])

    // Update civic points (heatmap + clustering) when they change
    useEffect(() => {
      const map = mapRef.current
      if (!map) return

      const onLoad = () =>
        addCivicPointsToMap(map, civicPoints || [], themeName)

      if (map.isStyleLoaded()) {
        onLoad()
      } else {
        map.on('load', onLoad)
      }

      return () => {
        map.off('load', onLoad)
      }
    }, [civicPoints, themeName])

    const addPolygonsToMap = useCallback(
      (map: maplibregl.Map, polys: NonNullable<Props['polygons']>) => {
        // Clean up old source/layers
        if (map.getLayer('polygon-fill')) {
          map.removeLayer('polygon-fill')
        }
        if (map.getLayer('polygon-stroke')) {
          map.removeLayer('polygon-stroke')
        }
        if (map.getSource('state-polygons')) {
          map.removeSource('state-polygons')
        }

        if (polys.length === 0) return

        const features = polys.map(poly => {
          const coordinates = poly.coordinates.map(c => [
            c.longitude,
            c.latitude,
          ])
          if (coordinates.length > 0) {
            coordinates.push(coordinates[0]) // Close the ring
          }
          return {
            type: 'Feature' as const,
            properties: {
              key: poly.key,
              fillColor: poly.fillColor || 'rgba(0,100,255,0.2)',
              strokeColor: poly.strokeColor || 'rgba(0,100,255,0.8)',
              strokeWidth: poly.strokeWidth || 1,
            },
            geometry: {
              type: 'Polygon' as const,
              coordinates: [coordinates],
            },
          }
        })

        map.addSource('state-polygons', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features,
          },
        })

        map.addLayer({
          id: 'polygon-fill',
          type: 'fill',
          source: 'state-polygons',
          paint: {
            'fill-color': ['get', 'fillColor'],
            'fill-opacity': 0.56,
          },
        })

        map.addLayer({
          id: 'polygon-stroke',
          type: 'line',
          source: 'state-polygons',
          paint: {
            'line-color': ['get', 'strokeColor'],
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4,
              ['get', 'strokeWidth'],
              8,
              ['*', ['get', 'strokeWidth'], 1.5],
            ],
            'line-opacity': 0.88,
          },
        })
      },
      [],
    )

    const addCivicPointsToMap = useCallback(
      (
        map: maplibregl.Map,
        points: NonNullable<Props['civicPoints']>,
        currentTheme: string,
      ) => {
        // Clean up old source/layers
        const layers = [
          'civic-cluster-count',
          'civic-heatmap',
          'civic-cluster-circle',
          'civic-unclustered-point',
        ]
        for (const layerId of layers) {
          if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
          }
        }
        if (map.getSource('civic-points')) {
          map.removeSource('civic-points')
        }

        if (points.length === 0) return

        const features: GeoJSON.Feature<GeoJSON.Point>[] = points.map(p => ({
          type: 'Feature',
          properties: {
            weight: p.weight ?? 1,
            uri: p.uri,
            title: p.title,
          },
          geometry: {
            type: 'Point',
            coordinates: [p.longitude, p.latitude],
          },
        }))

        map.addSource('civic-points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features,
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
          clusterProperties: {
            // Sum of weights for heatmap intensity
            totalWeight: ['+', ['get', 'weight']],
          },
        })

        // 1. Heatmap layer — shows density of civic activity
        map.addLayer({
          id: 'civic-heatmap',
          type: 'heatmap',
          source: 'civic-points',
          maxzoom: 15,
          paint: {
            // Weight each point by its activity weight
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'weight'],
              0,
              0,
              10,
              1,
            ],
            // Intensity ramps up as zoom increases
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              9,
              3,
            ],
            // Color ramp based on theme
            'heatmap-color': getHeatmapColor(currentTheme),
            // Radius shrinks as we zoom in
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              40,
              9,
              60,
              15,
              15,
            ],
            // Fade out at high zoom so individual points/clusters show
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              0.9,
              15,
              0.4,
            ],
          },
        })

        // 2. Cluster circle layer
        map.addLayer({
          id: 'civic-cluster-circle',
          type: 'circle',
          source: 'civic-points',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': isDark(currentTheme)
              ? 'rgba(59,130,246,0.85)'
              : 'rgba(37,99,235,0.8)',
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              10,
              25,
              50,
              32,
              100,
              40,
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': isDark(currentTheme)
              ? 'rgba(147,197,253,0.9)'
              : 'rgba(219,234,254,0.9)',
          },
        })

        map.addLayer({
          id: 'civic-cluster-count',
          type: 'symbol',
          source: 'civic-points',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-allow-overlap': true,
          },
          paint: {
            'text-color': '#ffffff',
          },
        })

        // 3. Unclustered individual points
        map.addLayer({
          id: 'civic-unclustered-point',
          type: 'circle',
          source: 'civic-points',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-radius': 8,
            'circle-color': isDark(currentTheme)
              ? 'rgba(96,165,250,0.9)'
              : 'rgba(59,130,246,0.85)',
            'circle-stroke-width': 2,
            'circle-stroke-color': isDark(currentTheme)
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(255,255,255,0.9)',
          },
        })
      },
      [],
    )

    useImperativeHandle(ref, () => ({
      animateToRegion(region: MapRegion, duration = 500) {
        mapRef.current?.flyTo({
          center: [region.longitude, region.latitude],
          zoom: deltaToZoom(region.latitudeDelta),
          duration,
        })
      },
      animateCamera(camera) {
        const opts: maplibregl.FlyToOptions = {duration: 500}
        if (camera.center) {
          opts.center = [camera.center.longitude, camera.center.latitude]
        }
        if (camera.zoom != null) {
          opts.zoom = camera.zoom
        }
        mapRef.current?.flyTo(opts)
      },
      fitToCoordinates(coordinates, options) {
        if (coordinates.length === 0) return
        const bounds = new maplibregl.LngLatBounds()
        for (const c of coordinates) {
          bounds.extend([c.longitude, c.latitude])
        }
        mapRef.current?.fitBounds(bounds, {
          padding: 48,
          animate: options?.animated !== false,
          duration: 500,
        })
      },
      async getCamera() {
        const zoom = mapRef.current?.getZoom()
        return {zoom: zoom ?? undefined}
      },
    }))

    return (
      <View style={StyleSheet.absoluteFill}>
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: isDark(themeName) ? DARK_MAP_BG : LIGHT_MAP_BG,
          }}
        />
      </View>
    )
  },
)
