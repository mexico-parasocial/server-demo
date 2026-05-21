export const es = {
	heroPrimaryAction: {
		label: `Prueba la app`,
		href: '/try-app'
	},
	heroSecondaryAction: {
		label: `Lee la documentación`,
		href: '/docs'
	},
	landingHeroMetrics: [
		{ value: '-3 a +3', label: `rango de votación de políticas` },
		{ value: '#POLICY||', label: `flairs políticos estructurados` }
	],
	landingSignals: [
		{
			value: '-3 a +3',
			label: `rango de votación de políticas`,
			copy: `Las políticas pueden votarse en un rango completo de desacuerdo a apoyo, con votación cuadrática para la intensidad.`
		},
		{
			value: '#POLICY||-2',
			label: `flairs de política + asunto`,
			copy: `La expresión política se estructura a través de etiquetas dedicadas #POLICY|| y #MATTER|, incluyendo intensidad de voto, en lugar de desaparecer en publicaciones genéricas.`
		},
		{
			value: '2da capa',
			label: `capa cívica entre redes`,
			copy: `PARA está diseñada como una red social política de segunda capa que puede coexistir con plataformas existentes mientras se construye sobre infraestructura FOSS estilo Bluesky.`
		}
	],
	landingPillars: [
		{
			title: `La democracia insuficiente es un problema de fricción`,
			copy: `PARA parte de una idea simple: la democracia falla cuando hacerse escuchar es demasiado lento, opaco o socialmente riesgoso.`
		},
		{
			title: `La identidad política debería ser más plural que los paquetes partidarios`,
			copy: `Las personas deberían poder ubicarse, discrepar selectivamente y votar políticas sin comprar un paquete partidario completo.`
		},
		{
			title: `Agentes, anonimato e infraestructura cívica van juntos`,
			copy: `Agentes, búsqueda y herramientas de anonimato pertenecen al mismo stack cívico, con la inversión principal en datos e infraestructura de confianza.`
		}
	],
	landingFeatures: [
		{
			eyebrow: `Problema`,
			title: `De la opinión al impacto político`,
			problem: `Hace que las posiciones políticas sean visibles, comparables y más fáciles de actuar.`,
			copy: `PARA parte de una premisa simple: la democracia se queda delgada cuando la opinión pública es difícil de expresar claramente y difícil de convertir en consecuencia cívica.`,
			points: [
				`Construida alrededor de un futuro democrático más plural para México, no un feed político más bonito`,
				`Diseñada para reducir la fricción entre pensamiento, expresión y consecuencia política`
			],
			href: '/thesis',
			cta: `Lee la tesis`
		},
		{
			eyebrow: `Segunda capa`,
			title: `Una segunda capa sobre redes existentes`,
			problem: `Reduce el costo de participación sin pedirles a los usuarios que abandonen su audiencia.`,
			copy: `PARA puede vincular identidades, publicar entre redes y llevar contexto político dondequiera que ya esté ocurriendo discusión pública.`,
			points: [
				`La publicación entre redes preserva el alcance mientras agrega contexto cívico`,
				`Las etiquetas políticas compartidas hacen que las publicaciones sean legibles como discurso político en lugar de contenido genérico`
			],
			href: '/thesis',
			cta: `Lee el modelo de segunda capa`
		},
		{
			eyebrow: `Flairs + votación`,
			title: `Las políticas y asuntos tienen su propio formato`,
			problem: `Convierte la publicación genérica en input político estructurado.`,
			copy: `PARA introduce #POLICY|| y #MATTER| para que los usuarios puedan separar el diseño de políticas de la atención a asuntos, y luego votar con dirección e intensidad.`,
			points: [
				`#POLICY||-2 captura tanto el tema como el grado de apoyo o desacuerdo`,
				`La votación de políticas se convierte en un dataset político vivo en lugar de un ritual de un día`
			],
			href: '/thesis',
			cta: `Lee el modelo de votación`
		},
		{
			eyebrow: `RAQ + comunidades`,
			title: `El RAQ convierte la ideología en contexto estructurado`,
			problem: `Ayuda a las personas a ubicarse políticamente en lugar de publicar ante una multitud indiferenciada.`,
			copy: `El RAQ ayuda a los usuarios a cuestionarse, ubicarse políticamente y generar datos estructurados con los que las comunidades pueden organizarse.`,
			points: [
				`El antagonismo intergrupal se convierte en datos visibles para educación, comparación y comportamiento de agentes`,
				`Las comunidades pueden apoyar debate, memes, coordinación y conflicto sin perder el valor de los datos`
			],
			href: '/thesis',
			cta: `Lee el modelo RAQ`
		},
		{
			eyebrow: `IA + búsqueda`,
			title: `Agentes y búsqueda son utilidades centrales`,
			problem: `Hace que la red sea útil para lectura, comparación, moderación y herramientas externas.`,
			copy: `PARA está pensada para potenciar más que un feed. Búsqueda, clustering, clasificación y generación convierten datos cívicos en utilidades de producto usables.`,
			points: [
				`La API puede clasificar contenido político, destacar sesgos y generar texto`,
				`Agentes colectivos e individuales pueden apoyar educación, entretenimiento y escritura asistida`
			],
			href: '/thesis',
			cta: `Lee el modelo de agentes`
		},
		{
			eyebrow: `Confianza + infra`,
			title: `La confianza necesita infraestructura real`,
			problem: `Balancea la participación protegida con la confianza pública.`,
			copy: `PARA combina anonimato donde la libertad de pensamiento necesita protección con validación donde la participación cívica necesita anclaje.`,
			points: [
				`Las tendencias geográficas y herramientas de opinión pueden empujar a los partidos hacia mayor coherencia`,
				`La inversión diferenciada principal es tecnología de anonimato con valor público-sectorial más amplio`
			],
			href: '/thesis',
			cta: `Lee el modelo de confianza`
		}
	],
	landingHeroActions: [
		{
			eyebrow: `Acerca de`,
			title: `Lee la tesis política`,
			copy: `Entiende el problema democrático, la idea de segunda capa y por qué existe PARA.`,
			href: '/thesis'
		},
		{
			eyebrow: `Prueba la app`,
			title: `Encuentra la app o ejecútala localmente`,
			copy: `Usa Android para acceso normal, o GitHub cuando quieras configuración local.`,
			href: '/try-app'
		},
		{
			eyebrow: `Schemas`,
			title: `Explora la referencia de schemas`,
			copy: `Abre la referencia com.para.* cuando quieras ver la capa de contratos.`,
			href: '/docs/schemas'
		}
	],
	footerCopy: `Explora la tesis, superficies de producto, modelo de confianza, acceso a la app y referencia de schemas desde cualquier punto de entrada.`,
	footerRepoLabels: {
		website: `Sitio Web`,
		app: `App`,
		backend: `Backend`
	}
};
