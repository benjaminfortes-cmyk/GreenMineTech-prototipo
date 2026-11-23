const ESTADOS = {
  borrador: { t: 'Borrador', c: 'gris' },
  revision: { t: 'En revisión', c: 'ambar' },
  publicado: { t: 'Convocatoria abierta', c: 'verde' },
  evaluacion: { t: 'En evaluación', c: 'azul' },
  pilotaje: { t: 'En pilotaje', c: 'morado' },
  cerrado: { t: 'Cerrado', c: 'oscuro' },
};
const ORDEN_ESTADOS = ['borrador', 'revision', 'publicado', 'evaluacion', 'pilotaje', 'cerrado'];

const LINEAS = [
  ['Eficiencia hídrica', 'Agua cara o escasa, pérdidas y recirculación'],
  ['Eficiencia energética', 'Menos consumo eléctrico en equipos y procesos'],
  ['Descarbonización', 'Menos diésel y emisiones, energía limpia'],
  ['Economía circular', 'Relaves, residuos y materiales que se reutilizan'],
  ['Gestión ambiental', 'Polvo, ruido, residuos y cuidado del entorno'],
  ['Seguridad y productividad', 'Riesgos, detenciones y equipos que fallan'],
];

const USUARIOS = {
  productor: { nombre: 'Luis Araya', org: 'Minera San Lorenzo', detalle: 'Pequeña minería · Diego de Almagro, Atacama', ini: 'LA' },
  proveedor: { nombre: 'Daniela Rojas', org: 'AquaMin SpA', detalle: 'Proveedor tecnológico · Antofagasta', ini: 'DR' },
  operador: { nombre: 'Carla Pizarro', org: 'CIPTEMIN', detalle: 'Operadora de la plataforma', ini: 'CP' },
};

const DATOS_BASE = {
  desafios: [
    { id: 'GMT-0042', titulo: 'Reducir el consumo de agua en la planta de lixiviación', org: 'Minera San Lorenzo', autor: 'productor', region: 'Atacama', comuna: 'Diego de Almagro', mineral: 'Cobre', categoria: 'Eficiencia hídrica', estado: 'evaluacion', fecha: '2027-03-04', impacto: 'Aumenta costos', urgencia: 'Alta', canal: 'Web',
      descripcion: 'La planta usa agua de camión aljibe y el costo subió 40 % en un año. Buscamos recircular agua de proceso y controlar la humedad de las pilas.',
      historial: [['2027-03-04', 'Luis Araya', 'Creó el desafío en la web'], ['2027-03-04', 'Plataforma', 'Envió el desafío a revisión de CIPTEMIN'], ['2027-03-06', 'Carla Pizarro', 'Revisó y formalizó el desafío'], ['2027-03-07', 'Plataforma', 'Publicó la convocatoria y avisó a 9 proveedores'], ['2027-03-12', 'AquaMin SpA', 'Postuló una solución'], ['2027-03-15', 'Sensa Labs', 'Postuló una solución'], ['2027-03-21', 'Carla Pizarro', 'Inició la evaluación de 3 soluciones']] },
    { id: 'GMT-0039', titulo: 'Monitoreo de estabilidad de taludes en faenas pequeñas', org: 'Sociedad Minera El Tofo', autor: 'otro', region: 'Coquimbo', comuna: 'La Higuera', mineral: 'Hierro', categoria: 'Seguridad y productividad', estado: 'publicado', fecha: '2027-02-22', impacto: 'Riesgo de seguridad', urgencia: 'Alta', canal: 'WhatsApp',
      descripcion: 'Necesitamos alertas tempranas de bajo costo para detectar movimientos en taludes de un rajo pequeño.',
      historial: [['2027-02-22', 'Agente WhatsApp', 'Creó el borrador desde una conversación'], ['2027-02-22', 'Sociedad Minera El Tofo', 'Confirmó el desafío por WhatsApp'], ['2027-02-24', 'Carla Pizarro', 'Revisó y formalizó el desafío'], ['2027-02-24', 'Plataforma', 'Publicó la convocatoria y avisó a 6 proveedores']] },
    { id: 'GMT-0035', titulo: 'Energía solar para faenas sin conexión a la red', org: 'Minera Los Pozos', autor: 'otro', region: 'Atacama', comuna: 'Tierra Amarilla', mineral: 'Oro', categoria: 'Descarbonización', estado: 'pilotaje', fecha: '2027-01-15', impacto: 'Aumenta costos', urgencia: 'Media', canal: 'Web',
      descripcion: 'Reemplazar parte del consumo de generadores diésel por energía solar con almacenamiento.',
      historial: [['2027-01-15', 'Minera Los Pozos', 'Creó el desafío en la web'], ['2027-01-17', 'Carla Pizarro', 'Revisó y formalizó el desafío'], ['2027-01-18', 'Plataforma', 'Publicó la convocatoria y avisó a 7 proveedores'], ['2027-02-03', 'Carla Pizarro', 'Inició la evaluación de 2 soluciones'], ['2027-02-10', 'Carla Pizarro', 'Seleccionó a SolMin Chile para el piloto'], ['2027-02-20', 'Carla Pizarro', 'Inició el pilotaje P-007 con 3 KPIs']] },
    { id: 'GMT-0031', titulo: 'Control de polvo en caminos internos', org: 'Minera Santa Rosa', autor: 'otro', region: 'Coquimbo', comuna: 'Andacollo', mineral: 'Oro', categoria: 'Gestión ambiental', estado: 'cerrado', fecha: '2026-12-02', impacto: 'Riesgo de seguridad', urgencia: 'Media', canal: 'WhatsApp',
      descripcion: 'Reducir el polvo en suspensión en caminos internos sin aumentar el consumo de agua.',
      historial: [['2026-12-02', 'Agente WhatsApp', 'Creó el borrador desde un audio'], ['2026-12-02', 'Minera Santa Rosa', 'Confirmó el desafío por WhatsApp'], ['2026-12-04', 'Carla Pizarro', 'Revisó y formalizó el desafío'], ['2026-12-05', 'Plataforma', 'Publicó la convocatoria y avisó a 5 proveedores'], ['2026-12-19', 'Carla Pizarro', 'Inició la evaluación de 2 soluciones'], ['2026-12-23', 'Carla Pizarro', 'Seleccionó a EcoVía para el piloto'], ['2027-01-06', 'Carla Pizarro', 'Inició el pilotaje P-005 con 2 KPIs'], ['2027-02-24', 'EcoVía', 'Entregó el informe de resultados'], ['2027-03-01', 'Carla Pizarro', 'Cerró el piloto: tecnología adoptada (−62 % de polvo, −35 % de agua de riego)']] },
    { id: 'GMT-0037', titulo: 'Recuperar cobre de relaves antiguos de la faena', org: 'Minera Los Algarrobos', autor: 'otro', region: 'Atacama', comuna: 'Copiapó', mineral: 'Cobre', categoria: 'Economía circular', estado: 'publicado', fecha: '2027-02-08', impacto: 'Impacto ambiental', urgencia: 'Media', canal: 'WhatsApp',
      descripcion: 'Tenemos relaves acumulados de hace años y queremos saber si se puede recuperar el cobre que todavía contienen y, de paso, reducir el pasivo ambiental.',
      historial: [['2027-02-08', 'Agente WhatsApp', 'Creó el borrador desde una conversación'], ['2027-02-08', 'Minera Los Algarrobos', 'Confirmó el desafío por WhatsApp'], ['2027-02-10', 'Carla Pizarro', 'Revisó y formalizó el desafío'], ['2027-02-11', 'Plataforma', 'Publicó la convocatoria y avisó a 4 proveedores']] },
    { id: 'GMT-0040', titulo: 'Correa transportadora que se detiene por sobrecarga', org: 'Minera San Lorenzo', autor: 'productor', region: 'Atacama', comuna: 'Diego de Almagro', mineral: 'Cobre', categoria: 'Seguridad y productividad', estado: 'revision', fecha: '2027-03-18', impacto: 'Pierde horas de turno', urgencia: 'Alta', canal: 'WhatsApp', audio: true,
      original: 'la correa que lleva el mineral a la chancadora se para varias veces al día porque se carga demasiado y perdemos como dos horas por turno',
      descripcion: 'La correa que lleva el mineral a la chancadora se para varias veces al día porque se carga demasiado y perdemos como dos horas por turno.',
      historial: [['2027-03-18', 'Agente WhatsApp', 'Creó el borrador desde un audio de Luis Araya'], ['2027-03-18', 'Luis Araya', 'Confirmó el desafío por WhatsApp'], ['2027-03-18', 'Plataforma', 'Envió el desafío a revisión de CIPTEMIN']] },
  ],
  soluciones: [
    { id: 'S-101', nombre: 'Recirculación de agua de proceso', proveedor: 'AquaMin SpA', propio: true, categoria: 'Eficiencia hídrica', trl: 7, region: 'Antofagasta', desc: 'Sistema modular de filtrado y recirculación para plantas de lixiviación pequeñas.', req: 'Espacio de 20 m², energía trifásica',
      detalle: 'Módulos de filtrado por etapas que recuperan el agua de proceso y la devuelven a la planta. Se instala en contenedor, sin obras civiles mayores, y se opera desde un panel simple.', casos: 'Probado en dos plantas de lixiviación de la Región de Antofagasta.' },
    { id: 'S-102', nombre: 'Sensores de humedad en pilas', proveedor: 'Sensa Labs', categoria: 'Eficiencia hídrica', trl: 6, region: 'Santiago', desc: 'Red inalámbrica de sensores que mide humedad y optimiza el riego de pilas.', req: 'Cobertura celular o gateway LoRa',
      detalle: 'Sensores enterrados en la pila que envían la humedad cada hora. Un tablero indica dónde regar y dónde no, para usar solo el agua necesaria.', casos: 'Validado en una pila de prueba en la Región Metropolitana.' },
    { id: 'S-103', nombre: 'Riego por goteo de baja presión', proveedor: 'RiegoMin', categoria: 'Eficiencia hídrica', trl: 8, region: 'Copiapó', desc: 'Riego por goteo para pilas que reduce evaporación.', req: 'Bomba existente',
      detalle: 'Reemplaza los aspersores por líneas de goteo que entregan la solución directo a la pila y reducen la evaporación.', casos: 'En uso en faenas de la Región de Atacama.' },
    { id: 'S-104', nombre: 'Prismas y radar de bajo costo para taludes', proveedor: 'GeoAlerta', categoria: 'Seguridad y productividad', trl: 6, region: 'La Serena', desc: 'Monitoreo continuo con alertas por WhatsApp y SMS.', req: 'Línea de vista al talud',
      detalle: 'Prismas reflectantes y un radar compacto miden el movimiento del talud. Si supera un umbral, avisa por WhatsApp y SMS al encargado de la faena.', casos: 'Piloto en un rajo pequeño de la Región de Coquimbo.' },
    { id: 'S-105', nombre: 'Planta solar con baterías para faena', proveedor: 'SolMin Chile', categoria: 'Descarbonización', trl: 8, region: 'Calama', desc: 'Sistema fotovoltaico modular con almacenamiento para faenas aisladas.', req: 'Terreno plano de 200 m²',
      detalle: 'Paneles solares y baterías en módulos transportables que se conectan al tablero de la faena y reducen las horas de uso de los generadores diésel.', casos: 'En piloto en Tierra Amarilla (P-007).' },
    { id: 'S-106', nombre: 'Supresor de polvo biodegradable', proveedor: 'EcoVía', categoria: 'Gestión ambiental', trl: 9, region: 'Antofagasta', desc: 'Aditivo que estabiliza caminos y reduce riego.', req: 'Camión aljibe',
      detalle: 'Aditivo que se aplica con el mismo camión aljibe y forma una capa que retiene el polvo por semanas, con menos riego.', casos: 'Comercializado. Adoptado por Minera Santa Rosa tras el piloto P-005.' },
    { id: 'S-107', nombre: 'Precribado con secado solar del mineral', proveedor: 'AquaMin SpA', propio: true, categoria: 'Seguridad y productividad', trl: 5, region: 'Antofagasta', desc: 'Canchas de secado y precribado para bajar la humedad antes del chancado.', req: 'Cancha de acopio',
      detalle: 'Canchas de secado y un harnero previo que separan los finos húmedos antes de que el mineral llegue a la chancadora.', casos: 'Prototipo validado en laboratorio; busca su primer piloto en faena.' },
    { id: 'S-108', nombre: 'Reprocesamiento de relaves a pequeña escala', proveedor: 'ReMina Lab', categoria: 'Economía circular', trl: 6, region: 'Copiapó', desc: 'Planta modular que recupera cobre de relaves antiguos.', req: 'Acceso a agua de proceso y energía trifásica',
      detalle: 'Planta compacta de flotación y lixiviación que procesa relaves antiguos para recuperar el cobre remanente y deja un relave más estable.', casos: 'Validada con muestras de relaves de la Región de Atacama.' },
    { id: 'S-109', nombre: 'Variadores de frecuencia para bombas y correas', proveedor: 'EnerMin', categoria: 'Eficiencia energética', trl: 9, region: 'Antofagasta', desc: 'Ajustan la velocidad de motores a la carga real y bajan el consumo eléctrico.', req: 'Tablero eléctrico accesible',
      detalle: 'Equipos que regulan la velocidad de bombas, correas y ventiladores según la carga real, con ahorros típicos de 15 a 30 % en esos motores.', casos: 'Comercializado y en uso en faenas de mediana minería.' },
  ],
  evaluaciones: {
    'GMT-0042': [
      { sol: 'S-101', ia: 92, costo: 'Medio', plazo: '6 semanas', nota: 'Probado en dos plantas similares', estado: 'Recomendada',
        razones: [['Línea', 'Eficiencia hídrica, igual que el desafío', 30, 30], ['Región', 'Antofagasta, región vecina', 17, 20], ['Madurez', 'TRL 7, probada en entorno real', 25, 25], ['Presupuesto', 'Costo medio, dentro del rango', 20, 25]] },
      { sol: 'S-102', ia: 84, costo: 'Bajo', plazo: '4 semanas', nota: 'Requiere cobertura; complementa a S-101', estado: 'En evaluación',
        razones: [['Línea', 'Eficiencia hídrica, igual que el desafío', 30, 30], ['Región', 'Santiago, lejos de la faena', 9, 20], ['Madurez', 'TRL 6, validada en entorno relevante', 20, 25], ['Presupuesto', 'Costo bajo', 25, 25]] },
      { sol: 'S-103', ia: 71, costo: 'Bajo', plazo: '3 semanas', nota: 'Ahorro menor, instalación simple', estado: 'En evaluación',
        razones: [['Línea', 'Eficiencia hídrica, resuelve solo una parte', 15, 30], ['Región', 'Copiapó, misma región', 20, 20], ['Madurez', 'TRL 8, disponible comercialmente', 25, 25], ['Presupuesto', 'Costo bajo', 11, 25]] },
    ],
  },
  pilotajes: [
    { id: 'P-007', desafio: 'GMT-0035', solucion: 'S-105', inicio: '2027-02-20', fin: '2027-05-20', avance: 72,
      kpis: [['Reducción de consumo diésel', '30 %', '24 %'], ['Horas de operación sin corte', '95 %', '97 %'], ['Costo de energía por tonelada', '−20 %', '−17 %']],
      serie: { kpi: 'Reducción de consumo diésel (%)', meta: 30, datos: [['Sem 1', 6], ['Sem 2', 11], ['Sem 3', 15], ['Sem 4', 18], ['Sem 5', 20], ['Sem 6', 22], ['Sem 7', 23], ['Sem 8', 24]] },
      ambiente: { base: 12000, meses: 2 },
      hitos: [['Instalación de paneles', 'hecho'], ['Conexión a tablero de faena', 'hecho'], ['Primer mes de operación', 'hecho'], ['Medición intermedia', 'hecho'], ['Segundo mes de operación', 'curso'], ['Informe de resultados', 'pendiente']],
      incidencias: [['2027-03-09', 'Polvo sobre paneles reduce generación 8 %', 'Resuelta: limpieza semanal']] },
  ],
  avisos: [
    ['2027-03-21', 'Tu desafío GMT-0042 pasó a evaluación: 3 soluciones en estudio.'],
    ['2027-03-18', 'Recibimos tu desafío GMT-0040 por WhatsApp. CIPTEMIN lo está revisando.'],
  ],
  avisos_prov: [
    ['2027-03-21', 'Tu solución Recirculación de agua de proceso está en evaluación para GMT-0042.'],
    ['2027-03-07', 'Nueva convocatoria que calza con tus soluciones: GMT-0042, agua en Atacama.'],
  ],
  contenidos: [
    { id: 'C-1', titulo: 'Taller en Copiapó: cómo publicar tu desafío en GreenMineTech', tipo: 'Evento', fecha: '2027-04-10', lugar: 'Copiapó', estado: 'Publicado', resumen: 'Taller presencial para productores de la Región de Atacama. Te ayudamos a publicar tu desafío, por la web o por WhatsApp.' },
    { id: 'C-2', titulo: 'Demo day de proveedores: tecnologías de eficiencia hídrica', tipo: 'Evento', fecha: '2027-04-24', lugar: 'La Serena', estado: 'Publicado', resumen: 'Proveedores presentan soluciones para recircular y ahorrar agua en plantas pequeñas.' },
    { id: 'C-3', titulo: 'Minera Santa Rosa adopta supresor de polvo tras su piloto', tipo: 'Noticia', fecha: '2027-03-05', estado: 'Publicado', resumen: 'El piloto P-005 redujo 62 % el polvo en caminos internos y 35 % el agua de riego. La faena decidió adoptar la tecnología.' },
    { id: 'C-4', titulo: 'Convocatoria abierta: eficiencia hídrica en plantas de lixiviación', tipo: 'Convocatoria', fecha: '2027-03-07', estado: 'Publicado', resumen: 'Buscamos soluciones para reducir el consumo de agua de camión aljibe en Diego de Almagro (GMT-0042).' },
    { id: 'C-5', titulo: 'Avance del piloto solar en Tierra Amarilla: 24 % menos diésel', tipo: 'Noticia', fecha: '2027-03-20', estado: 'Borrador', resumen: 'A dos meses de iniciado, el piloto P-007 ya redujo 24 % el consumo de diésel de los generadores.' },
    { id: 'C-6', titulo: '¿Qué es el TRL? Explicado en simple', tipo: 'Guía', fecha: '2027-02-15', estado: 'Publicado', resumen: 'El nivel de madurez de una tecnología, del 1 al 9, y por qué importa antes de probarla en tu faena.' },
  ],
  registro_agente: [],
};
