# Reporte: Experiencia Civic Tree en Mobile vs Web

**Fecha:** 24 de mayo de 2026  
**Proyecto:** PARA App (semble.so + Civic Trees offline)  
**Autor:** Equipo de desarrollo  

---

## 1. Resumen Ejecutivo

La funcionalidad de **Civic Tree** (tanto Personal como Comunitario) se implementa con **código 100% compartido** entre iOS, Android y web. No existen variantes de archivos por plataforma (`.native.tsx`, `.web.tsx`, `.ios.tsx`, etc.). Esto garantiza paridad funcional pero introduce **gaps de experiencia de usuario (UX)** en mobile que no existen en web.

La integración con **Semble.so** (exportación de colecciones) y la funcionalidad **offline** recién implementada operan de manera idéntica en ambas plataformas.

---

## 2. Arquitectura: Código Compartido

| Componente/Screen | iOS | Android | Web | Notas |
|---|---|---|---|---|
| `CivicTreeScreen` | ✅ | ✅ | ✅ | Mismo archivo |
| `CollectionDetailScreen` | ✅ | ✅ | ✅ | Mismo archivo |
| `SpatialDeliberationScreen` | ✅ | ✅ | ✅ | Mismo archivo |
| `AddTreeItemDialog` | ✅ | ✅ | ✅ | Mismo archivo |
| `GraphCanvas` | ✅ | ✅ | ✅ | SVG compartido |
| `collections.ts` (queries) | ✅ | ✅ | ✅ | Offline recién agregado |

**Conclusión:** No hay deuda técnica de bifurcación, pero tampoco hay optimizaciones nativas.

---

## 3. Navegación: Mobile vs Web

### Mobile (iOS/Android)
- **Ruta de acceso:** Tab "Data" → "My Base" → Civic Tree.
- **Stack:** Anidado dentro de `DataTab`. El usuario debe hacer 3 taps para llegar.
- **Drawer:** El menú lateral tiene un ítem "Civic Tree" que apunta al **árbol comunitario** (`DeliberationGraph`), no al personal. Esto puede generar confusión.
- **Deep links:** Soportados pero requieren construir estado de `DataTab` manualmente (`Navigation.tsx`).

### Web
- **Ruta de acceso:** URL directa `/civic-tree` o `/mapa-civico`.
- **Stack:** Navegación plana (`FlatNavigator`).
- **Drawer:** Acceso directo desde el menú lateral.
- **Deep links:** Funcionan nativamente vía React Router.

**⚠️ Problema identificado:** En mobile no hay acceso directo al árbol personal. El usuario debe recordar que está bajo "Data → My Base".

---

## 4. Interacciones del Grafo (GraphCanvas)

| Característica | iOS/Android | Web | Impacto UX |
|---|---|---|---|
| **Pan (arrastrar)** | ✅ PanResponder | ✅ PanResponder | Paridad |
| **Zoom con botones** | ✅ | ✅ | Paridad |
| **Doble-tap zoom** | ✅ | ✅ | Paridad |
| **Reset zoom** | ✅ Botón | ✅ Botón + tecla `0` | Web tiene atajo |
| **Zoom con rueda del mouse** | ❌ N/A | ✅ `wheel` event | Solo web |
| **Zoom con pinza (pinch)** | ❌ **No implementado** | ✅ Touch events | **Gap crítico en mobile** |
| **Zoom con teclado** | ❌ N/A | ✅ Teclas `+` / `-` | Solo web |

**🔴 Hallazgo crítico:** El **pinch-to-zoom** (gesto de pinza con dos dedos) — el patrón de interacción más natural en mobile para grafos — **no está implementado en iOS/Android**. En web sí existe vía `useGraphGestures.ts`. Los usuarios de mobile solo pueden hacer zoom con botones pequeños o doble-tap, lo cual es una experiencia inferior.

---

## 5. Offline: Lectura vs Escritura

### Estado tras la implementación reciente (24/05/2026)

| Capacidad | Mobile (MMKV) | Web (IndexedDB) | Estado |
|---|---|---|---|
| **Leer colecciones offline** | ✅ Persiste entre sesiones | ✅ Persiste entre sesiones | **Funcional** |
| **Ver items offline** | ✅ Cache de React Query | ✅ Cache de React Query | **Funcional** |
| **Crear colección offline** | ❌ Falla y hace rollback | ❌ Falla y hace rollback | **No funcional** |
| **Editar colección offline** | ❌ Falla y hace rollback | ❌ Falla y hace rollback | **No funcional** |
| **Agregar/eliminar items offline** | ❌ Falla y hace rollback | ❌ Falla y hace rollback | **No funcional** |

**Detalle técnico:**
- Las **lecturas** usan `PersistQueryClientProvider` con `gcTime: Infinity`. Mobile usa MMKV (sincrónico, ~10ms), web usa IndexedDB via `idb-keyval` (asincrónico).
- Las **mutaciones** tienen *optimistic updates* (la UI cambia inmediatamente) pero **no tienen cola de reintentos**. Si el usuario mata la app antes de recuperar conectividad, los cambios se pierden.

**Conclusión:** La experiencia offline es de **solo-lectura con feedback visual inmediato**. No es "offline-first" real.

---

## 6. Shell y Drawer: Diferencias Nativas

### Mobile
- Drawer con **swipe gesture** (`react-native-drawer-layout`).
- Física diferenciada por OS:
  - iOS: tipo `slide`, swipe desde cualquier parte de la pantalla.
  - Android: tipo `front`, swipe desde el borde + botón físico de back.
- Bottom bar con 5 tabs.

### Web
- Drawer con overlay CSS (`TouchableWithoutFeedback`), **sin swipe gesture**.
- `RemoveScrollBar` para bloquear scroll del body cuando drawer está abierto.
- Bottom bar idéntica pero implementada con DOM nativo.

**Impacto en Civic Tree:** El acceso vía drawer en mobile es más rápido (swipe desde borde) que en web (click en hamburguesa). Pero el drawer en mobile lleva al **árbol comunitario**, no al personal.

---

## 7. Layout Responsivo

`SpatialDeliberationScreen` (árbol comunitario) usa breakpoints:
- **Desktop (`gtMobile`):** Panel dividido — lista a la izquierda, detalle a la derecha.
- **Mobile:** Scroll horizontal de tarjetas + **modal de pantalla completa** para revisar contribuciones.

`CivicTreeScreen` y `CollectionDetailScreen` **no tienen breakpoints**. Se renderizan idénticos en mobile y desktop, con ancho máximo de 680px centrado.

**⚠️ Observación:** En pantallas pequeñas (iPhone SE, Android compactos), los botones de acción en `CollectionDetailScreen` pueden quedar apretados porque la toolbar usa `flexWrap: 'wrap'`.

---

## 8. Rendimiento

- El motor de simulación del grafo (`useForceSimulation.ts`) corre en **JavaScript puro** vía `requestAnimationFrame` en ambas plataformas.
- Optimización existente: actualiza estado de React solo 1 de cada 4 frames (`RENDER_INTERVAL = 4`).
- No se detectaron diferencias de rendimiento significativas entre mobile y web en el código.

---

## 9. Integración con Semble.so

La exportación a Semble.so opera igual en mobile y web:
1. Crea records ATProto (`network.cosmik.collection`, `.card`, `.collectionLink`, `.connection`) vía `agent.com.atproto.repo.createRecord`.
2. Requiere conectividad obligatoria.
3. Al completar, abre URL `https://semble.so/profile/{handle}/collections/{rkey}`.

**⚠️ Consideración mobile:** El flujo de exportación abre Safari/Chrome externo. No hay WebView integrado. El usuario debe volver manualmente a PARA.

---

## 10. Recomendaciones por Prioridad

### 🔴 Alta prioridad
1. **Implementar pinch-to-zoom en mobile** para `GraphCanvas` y `DeliberationGraph`. Es el gesto estándar esperado por usuarios de iOS/Android.
2. **Agregar acceso directo al Civic Tree personal** en el drawer o bottom bar de mobile. Actualmente está enterrado bajo "Data → My Base".
3. **Clarificar labeling en drawer:** El ítem "Civic Tree" del drawer abre el árbol **comunitario**, no el personal. Considerar renombrar a "Community Tree" / "Árbol Comunitario".

### 🟡 Media prioridad
4. **Cola de mutaciones offline:** Implementar un queue con retry cuando vuelva la conectividad, para que los usuarios de mobile (donde la conectividad es más intermitente) no pierdan cambios.
5. **Breakpoints para CivicTreeScreen:** En desktop podría aprovecharse el espacio extra (sidebar de colecciones, panel de detalle). En mobile está bien como está.

### 🟢 Baja prioridad
6. **Atajo de teclado en web:** Ya existe. No es necesario en mobile.
7. **WebView para Semble.so post-export:** Abrir la colección exportada dentro de un WebView nativo en lugar de saltar al navegador del sistema.

---

## 11. Conclusión

La experiencia de Civic Tree es **funcionalmente equivalente** entre mobile y web gracias al código compartido, pero **no está optimizada para mobile**. Los gaps más importantes son:

1. **Falta de pinch-to-zoom** en el grafo (patrón de interacción móvil fundamental).
2. **Navegación enterrada** para llegar al árbol personal.
3. **Offline de solo-lectura** — en mobile, donde la conectividad es más flaky, esto es más doloroso que en web.

La reciente implementación de **optimistic mutations** mejora la sensación de velocidad en ambas plataformas, pero no resuelve la persistencia de escrituras offline.

**Veredicto:** La base técnica es sólida (código compartido, sin deuda de bifurcación), pero se requieren **mejoras de UX específicas para mobile** antes de que la experiencia sea comparable a la versión web.
