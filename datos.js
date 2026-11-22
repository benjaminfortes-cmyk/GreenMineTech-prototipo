const ESTADOS = {
  borrador: { t: 'Borrador', c: 'gris' },
  revision: { t: 'En revisión', c: 'ambar' },
  publicado: { t: 'Convocatoria abierta', c: 'verde' },
  evaluacion: { t: 'En evaluación', c: 'azul' },
  pilotaje: { t: 'En pilotaje', c: 'morado' },
  cerrado: { t: 'Cerrado', c: 'oscuro' },
};
const ORDEN_ESTADOS = ['borrador', 'revision', 'publicado', 'evaluacion', 'pilotaje', 'cerrado'];

const USUARIOS = {
  productor: { nombre: 'Luis Araya', org: 'Minera San Lorenzo', detalle: 'Pequeña minería · Diego de Almagro, Atacama', ini: 'LA' },
  proveedor: { nombre: 'Daniela Rojas', org: 'AquaMin SpA', detalle: 'Proveedor tecnológico · Antofagasta', ini: 'DR' },
  operador: { nombre: 'Carla Pizarro', org: 'CIPTEMIN', detalle: 'Operadora de la plataforma', ini: 'CP' },
};

const DATOS_BASE = {
  desafios: [
    { id: 'GMT-0042', titulo: 'Reducir el consumo de agua en la planta de lixiviación', org: 'Minera San Lorenzo', autor: 'productor', region: 'Atacama', comuna: 'Diego de Almagro', mineral: 'Cobre', categoria: 'Agua', estado: 'evaluacion', fecha: '2027-03-04', impacto: 'Aumenta costos', urgencia: 'Alta', canal: 'Web',
      descripcion: 'La planta usa agua de camión aljibe y el costo subió 40 % en un año. Buscamos recircular agua de proceso y controlar la humedad de las pilas.',
      historial: [['2027-03-04', 'Luis Araya', 'Creó el desafío'], ['2027-03-06', 'Carla Pizarro', 'Revisó y formalizó el desafío'], ['2027-03-07', 'Plataforma', 'Publicó la convocatoria y avisó a 9 proveedores'], ['2027-03-21', 'Carla Pizarro', 'Inició la evaluación de 3 soluciones']] },
    { id: 'GMT-0039', titulo: 'Monitoreo de estabilidad de taludes en faenas pequeñas', org: 'Sociedad Minera El Tofo', autor: 'otro', region: 'Coquimbo', comuna: 'La Higuera', mineral: 'Hierro', categoria: 'Seguridad', estado: 'publicado', fecha: '2027-02-22', impacto: 'Riesgo de seguridad', urgencia: 'Alta', canal: 'WhatsApp',
      descripcion: 'Necesitamos alertas tempranas de bajo costo para detectar movimientos en taludes de un rajo pequeño.',
      historial: [['2027-02-22', 'Agente WhatsApp', 'Creó el borrador desde una conversación'], ['2027-02-24', 'Carla Pizarro', 'Revisó y publicó la convocatoria']] },
    { id: 'GMT-0035', titulo: 'Energía solar para faenas sin conexión a la red', org: 'Minera Los Pozos', autor: 'otro', region: 'Atacama', comuna: 'Tierra Amarilla', mineral: 'Oro', categoria: 'Energía', estado: 'pilotaje', fecha: '2027-01-15', impacto: 'Aumenta costos', urgencia: 'Media', canal: 'Web',
      descripcion: 'Reemplazar parte del consumo de generadores diésel por energía solar con almacenamiento.',
      historial: [['2027-01-15', 'Minera Los Pozos', 'Creó el desafío'], ['2027-02-10', 'Carla Pizarro', 'Seleccionó a SolMin Chile'], ['2027-02-20', 'Carla Pizarro', 'Inició el pilotaje P-007']] },
    { id: 'GMT-0031', titulo: 'Control de polvo en caminos internos', org: 'Minera Santa Rosa', autor: 'otro', region: 'Coquimbo', comuna: 'Andacollo', mineral: 'Oro', categoria: 'Polvo y emisiones', estado: 'cerrado', fecha: '2026-12-02', impacto: 'Riesgo de seguridad', urgencia: 'Media', canal: 'WhatsApp',
      descripcion: 'Reducir el polvo en suspensión en caminos internos sin aumentar el consumo de agua.',
      historial: [['2026-12-02', 'Agente WhatsApp', 'Creó el borrador'], ['2027-03-01', 'Carla Pizarro', 'Cerró el piloto: tecnología adoptada']] },
    { id: 'GMT-0040', titulo: 'Chancadora que se tapa con mineral húmedo', org: 'Minera San Lorenzo', autor: 'productor', region: 'Atacama', comuna: 'Diego de Almagro', mineral: 'Cobre', categoria: 'Chancado y molienda', estado: 'revision', fecha: '2027-03-18', impacto: 'Pierde horas de turno', urgencia: 'Alta', canal: 'WhatsApp',
      descripcion: 'En invierno el mineral llega húmedo y la chancadora primaria se tapa; se pierde cerca de medio turno por día.',
      historial: [['2027-03-18', 'Agente WhatsApp', 'Creó el borrador desde un audio de Luis Araya'], ['2027-03-18', 'Luis Araya', 'Confirmó el desafío por WhatsApp']] },
  ],
  soluciones: [
    { id: 'S-101', nombre: 'Recirculación de agua de proceso', proveedor: 'AquaMin SpA', propio: true, categoria: 'Agua', trl: 7, region: 'Antofagasta', desc: 'Sistema modular de filtrado y recirculación para plantas de lixiviación pequeñas.', req: 'Espacio de 20 m², energía trifásica' },
    { id: 'S-102', nombre: 'Sensores de humedad en pilas', proveedor: 'Sensa Labs', categoria: 'Agua', trl: 6, region: 'Santiago', desc: 'Red inalámbrica de sensores que mide humedad y optimiza el riego de pilas.', req: 'Cobertura celular o gateway LoRa' },
    { id: 'S-103', nombre: 'Riego por goteo de baja presión', proveedor: 'RiegoMin', categoria: 'Agua', trl: 8, region: 'Copiapó', desc: 'Riego por goteo para pilas que reduce evaporación.', req: 'Bomba existente' },
    { id: 'S-104', nombre: 'Prismas y radar de bajo costo para taludes', proveedor: 'GeoAlerta', categoria: 'Seguridad', trl: 6, region: 'La Serena', desc: 'Monitoreo continuo con alertas por WhatsApp y SMS.', req: 'Línea de vista al talud' },
    { id: 'S-105', nombre: 'Planta solar con baterías para faena', proveedor: 'SolMin Chile', categoria: 'Energía', trl: 8, region: 'Calama', desc: 'Sistema fotovoltaico modular con almacenamiento para faenas aisladas.', req: 'Terreno plano de 200 m²' },
    { id: 'S-106', nombre: 'Supresor de polvo biodegradable', proveedor: 'EcoVía', categoria: 'Polvo y emisiones', trl: 9, region: 'Antofagasta', desc: 'Aditivo que estabiliza caminos y reduce riego.', req: 'Camión aljibe' },
    { id: 'S-107', nombre: 'Precribado con secado solar del mineral', proveedor: 'AquaMin SpA', propio: true, categoria: 'Chancado y molienda', trl: 5, region: 'Antofagasta', desc: 'Canchas de secado y precribado para bajar la humedad antes del chancado.', req: 'Cancha de acopio' },
  ],
  evaluaciones: {
    'GMT-0042': [
      { sol: 'S-101', ia: 92, costo: 'Medio', plazo: '6 semanas', nota: 'Probado en dos plantas similares', estado: 'Recomendada' },
      { sol: 'S-102', ia: 84, costo: 'Bajo', plazo: '4 semanas', nota: 'Requiere cobertura; complementa a S-101', estado: 'En evaluación' },
      { sol: 'S-103', ia: 71, costo: 'Bajo', plazo: '3 semanas', nota: 'Ahorro menor, instalación simple', estado: 'En evaluación' },
    ],
  },
  pilotajes: [
    { id: 'P-007', desafio: 'GMT-0035', solucion: 'S-105', inicio: '2027-02-20', fin: '2027-05-20', avance: 72,
      kpis: [['Reducción de consumo diésel', '30 %', '24 %'], ['Horas de operación sin corte', '95 %', '97 %'], ['Costo de energía por tonelada', '−20 %', '−17 %']],
      hitos: [['Instalación de paneles', 'hecho'], ['Conexión a tablero de faena', 'hecho'], ['Primer mes de operación', 'hecho'], ['Medición intermedia', 'hecho'], ['Segundo mes de operación', 'curso'], ['Informe de resultados', 'pendiente']],
      incidencias: [['2027-03-09', 'Polvo sobre paneles reduce generación 8 %', 'Resuelta: limpieza semanal']] },
  ],
  avisos: [
    ['2027-03-21', 'Tu desafío GMT-0042 pasó a evaluación: 3 soluciones en estudio.'],
    ['2027-03-18', 'Recibimos tu desafío GMT-0040 por WhatsApp. CIPTEMIN lo está revisando.'],
  ],
  registro_agente: [],
};
