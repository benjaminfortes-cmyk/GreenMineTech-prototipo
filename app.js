(function () {
  'use strict';
  
  const CLAVE = 'gmt-prototipo-v1';
  let D;
  try { D = JSON.parse(localStorage.getItem(CLAVE)) || null; } catch (e) { D = null; }
  if (!D) D = JSON.parse(JSON.stringify(DATOS_BASE));
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(D)); } catch (e) {} }
  let rol = null;
  try { rol = sessionStorage.getItem('gmt-rol'); } catch (e) { rol = null; }
  function ponerRol(r) { rol = r; try { sessionStorage.setItem('gmt-rol', r || ''); } catch (e) {} }

  const $ = (s, el) => (el || document).querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const est = (e) => `<span class="est ${ESTADOS[e].c}">${ESTADOS[e].t}</span>`;
  const sol = (id) => D.soluciones.find((s) => s.id === id);
  const des = (id) => D.desafios.find((d) => d.id === id);
  const hoy = () => new Date().toISOString().slice(0, 10);
  const fmt = (f) => { const [a, m, d] = f.split('-'); return `${d}-${m}-${a}`; };
  function toast(t) {
    const el = document.createElement('div'); el.className = 'toast'; el.textContent = t;
    document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
  }
  function nuevoId() {
    const n = Math.max(...D.desafios.map((d) => +d.id.slice(4))) + 1;
    return 'GMT-' + String(n).padStart(4, '0');
  }

  const ICO = {
    casa: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    lista: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    mas: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
    piloto: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    wsp: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/></svg>',
    lupa: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    caja: '<svg viewBox="0 0 24 24"><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>',
    red: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4"/></svg>',
    graf: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/></svg>',
    gente: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M16 15c3 0 5 2 5 4"/></svg>',
  };
  const WSP_SVG = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 13.9c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg>';
  
  const app = $('#app');
  function acc() {
    return `<div class="acc" role="group" aria-label="Accesibilidad"><button data-acc="-">A−</button><button data-acc="+">A+</button><button data-acc="c" aria-pressed="${document.body.classList.contains('contraste')}">Contraste</button></div>`;
  }
  function cabPublica() {
    return `<header class="cab-pub"><div class="in"><a href="#/"><img src="img/greenminetech-logo.png" alt="GreenMineTech"></a>
      <nav><a href="#/">Inicio</a><a href="#/soluciones">Soluciones</a><a href="#/desafios">Desafíos abiertos</a><a href="#/whatsapp">Agente WhatsApp</a></nav>
      ${acc()}<a class="btn b-linea b-chico" href="#/ingresar">Ingresar</a></div></header>`;
  }
  function pie() {
    return `<footer class="pie"><div class="in"><img src="img/greenminetech-logo-blanco.png" alt="GreenMineTech"><span>Operado por CIPTEMIN · Apoyado por CORFO</span><span>Prototipo de SETROF para la licitación. Datos de ejemplo.</span></div></footer>`;
  }
  const MENUS = {
    productor: [['#/p', 'casa', 'Mi inicio'], ['#/p/desafios', 'lista', 'Mis desafíos'], ['#/p/nuevo', 'mas', 'Nuevo desafío'], ['#/pilotaje/P-007', 'piloto', 'Pilotajes'], ['#/soluciones', 'lupa', 'Soluciones'], ['#/whatsapp', 'wsp', 'Agente WhatsApp']],
    proveedor: [['#/v', 'casa', 'Mi inicio'], ['#/desafios', 'lista', 'Convocatorias'], ['#/v/soluciones', 'caja', 'Mis soluciones'], ['#/soluciones', 'lupa', 'Catálogo']],
    operador: [['#/o', 'casa', 'Bandeja'], ['#/o/desafios', 'lista', 'Desafíos'], ['#/o/match/GMT-0042', 'red', 'Matchmaking'], ['#/pilotaje/P-007', 'piloto', 'Pilotajes'], ['#/o/indicadores', 'graf', 'Indicadores'], ['#/o/contenidos', 'doc', 'Contenidos'], ['#/o/usuarios', 'gente', 'Usuarios'], ['#/whatsapp', 'wsp', 'Agente WhatsApp']],
  };
  function marcoApp(ruta, html) {
    const u = USUARIOS[rol];
    const menu = MENUS[rol].map(([h, i, t]) => `<a href="${h}" class="${ruta.startsWith(h) && (h !== '#/p' && h !== '#/v' && h !== '#/o' || ruta === h) ? 'act' : ''}">${ICO[i]}${t}</a>`).join('');
    return `<div class="app"><aside class="lat"><div class="logo"><img src="img/greenminetech-logo-blanco.png" alt="GreenMineTech"></div>
      <div class="sep">${rol === 'operador' ? 'Operación CIPTEMIN' : rol === 'proveedor' ? 'Proveedor' : 'Productor'}</div>${menu}
      <div class="yo"><span class="av">${u.ini}</span><div><b>${u.nombre}</b>${u.org}<br><a href="#/salir">Cambiar de perfil</a></div></div></aside>
      <main class="main">${html}</main></div>`;
  }
  function vista(ruta, html, conApp) {
    app.innerHTML = conApp && rol ? marcoApp(ruta, html) : cabPublica() + (conApp ? `<div class="pub-main">${html}</div>` : html) + pie();
    window.scrollTo(0, 0);
  }
  
  function tarjetaDesafio(d) {
    const n = ORDEN_ESTADOS.indexOf(d.estado) + 1;
    const seg = Array.from({ length: 6 }, (_, k) => `<i class="${k < n ? 'on' : ''}"></i>`).join('');
    const origen = d.canal === 'WhatsApp' ? `<span class="orig"><span class="wsp-mini">${WSP_SVG}</span>Llegó por WhatsApp</span>` : '<span class="orig">Publicado en la web</span>';
    return `<a class="card desafio-f2 ${ESTADOS[d.estado].c}" href="#/desafio/${d.id}"><b class="est-g">${ESTADOS[d.estado].t}</b><div class="seg" title="Paso ${n} de 6">${seg}</div>
      <h3>${esc(d.titulo)}</h3><span class="meta">${d.id} · ${d.comuna}, ${d.region} · ${d.mineral}</span><div class="pie-f2">${origen}</div></a>`;
  }
  function mapaSvg() {
    const M = MAPA_CHILE, w = M.ancho;
    return `<svg viewBox="-10 0 ${w + 150} ${M.alto}" class="mapa-cl" role="img" aria-label="Mapa de Chile con las regiones piloto de Atacama y Coquimbo">
      <path d="${M.pais}" fill="#E9F0E3" stroke="#4D7F3A" stroke-width="1.2" stroke-linejoin="round"/><path d="${M.atacama}" fill="#86C43F" stroke="#4D7F3A"/><path d="${M.coquimbo}" fill="#4D7F3A" stroke="#173A1F"/>
      <line x1="${M.x_copiapo}" y1="${M.y_atacama}" x2="${w + 26}" y2="${M.y_atacama}" stroke="#173A1F"/><circle cx="${M.x_copiapo}" cy="${M.y_atacama}" r="4.5" fill="#173A1F"/>
      <text x="${w + 32}" y="${M.y_atacama - 2}" font-size="17" font-weight="700" fill="#173A1F" font-family="Montserrat,sans-serif">Atacama</text><text x="${w + 32}" y="${M.y_atacama + 17}" font-size="13" fill="#56615B">Región piloto</text>
      <line x1="${M.x_laserena}" y1="${M.y_coquimbo}" x2="${w + 26}" y2="${M.y_coquimbo}" stroke="#173A1F"/><circle cx="${M.x_laserena}" cy="${M.y_coquimbo}" r="4.5" fill="#173A1F"/>
      <text x="${w + 32}" y="${M.y_coquimbo - 2}" font-size="17" font-weight="700" fill="#173A1F" font-family="Montserrat,sans-serif">Coquimbo</text><text x="${w + 32}" y="${M.y_coquimbo + 17}" font-size="13" fill="#56615B">Región piloto</text></svg>`;
  }
  function inicio() {
    const abiertos = ['publicado', 'evaluacion', 'pilotaje'].map((e) => D.desafios.find((d) => d.estado === e)).filter(Boolean);
    vista('#/', `
      <section class="hero"><div class="in"><div class="hero-txt">
        <h1>Tecnología <span class="marcado">probada<svg viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12 C 50 4, 120 3, 197 9" fill="none" stroke="#86C43F" stroke-width="7" stroke-linecap="round"/></svg></span> para la pequeña y mediana minería</h1>
        <p>Te conectamos con proveedores tecnológicos para probar soluciones en tu faena, con el acompañamiento de CIPTEMIN.</p>
        <div class="ctas"><a class="btn b-verde b-grande" href="#/ingresar">Publicar un desafío</a><a class="btn b-linea b-grande" href="#/ingresar">Registrar una solución</a></div>
        <a class="btn b-wsp b-grande" href="#/whatsapp"><span class="ico-w">${WSP_SVG}</span>Cuéntanos o consulta tu desafío por WhatsApp</a>
      </div><div class="hero-mapa">${mapaSvg()}</div></div>
      <div class="pasos-p1"><div><span class="n1">1</span><b>Cuenta tu desafío</b><span>en la web o por WhatsApp</span></div><span class="flecha">→</span><div><span class="n1">2</span><b>Recibe soluciones</b><span>evaluadas por su madurez</span></div><span class="flecha">→</span><div><span class="n1">3</span><b>Pilotea en faena</b><span>con objetivos y KPIs</span></div><span class="flecha">→</span><div><span class="n1">4</span><b>Decide con datos</b><span>y adopta la tecnología</span></div></div>
      </section>
      <section class="sec"><h2>Problemas reales que buscan solución</h2>
        <div class="grid3">${abiertos.map(tarjetaDesafio).join('')}</div>
        <p style="margin-top:16px"><a href="#/desafios">Ver todos los desafíos →</a></p></section>`);
  }
  function listaPublica() {
    const lista = D.desafios.filter((d) => d.estado !== 'borrador' && d.estado !== 'revision').sort((x, y) => ORDEN_ESTADOS.indexOf(x.estado) - ORDEN_ESTADOS.indexOf(y.estado));
    const html = `<div class="top"><div><h1>Desafíos</h1><p>Convocatorias abiertas y desafíos en curso de la pequeña y mediana minería.</p></div></div>
      <div class="grid3">${lista.map(tarjetaDesafio).join('')}</div>`;
    if (rol) vista('#/desafios', html, true); else vista('#/desafios', `<section class="sec">${html}</section>`);
  }
  function catalogo() {
    const cats = [...new Set(D.soluciones.map((s) => s.categoria))];
    const html = `<div class="top"><div><h1>Catálogo de soluciones</h1><p>Tecnologías registradas por proveedores, con su nivel de madurez (TRL).</p></div></div>
      <div class="filtros"><input id="f-txt" placeholder="Buscar por palabra (ej.: agua, energía)"><select id="f-cat"><option value="">Todas las categorías</option>${cats.map((c) => `<option>${c}</option>`).join('')}</select>
      <select id="f-trl"><option value="0">Cualquier TRL</option><option value="6">TRL 6 o más</option><option value="8">TRL 8 o más</option></select></div>
      <div class="card"><table class="tabla"><thead><tr><th>Solución</th><th>Proveedor</th><th>Categoría</th><th>TRL</th><th>Región</th></tr></thead><tbody id="t-sol"></tbody></table></div>`;
    if (rol) vista('#/soluciones', html, true); else vista('#/soluciones', `<section class="sec">${html}</section>`);
    const pintar = () => {
      const q = $('#f-txt').value.toLowerCase(), c = $('#f-cat').value, t = +$('#f-trl').value;
      $('#t-sol').innerHTML = D.soluciones.filter((s) => (!c || s.categoria === c) && s.trl >= t && (!q || (s.nombre + s.desc + s.categoria).toLowerCase().includes(q)))
        .map((s) => `<tr><td><b>${esc(s.nombre)}</b><br><small style="color:var(--gris)">${esc(s.desc)}</small></td><td>${s.proveedor}</td><td>${s.categoria}</td><td><span class="trl">TRL ${s.trl}</span></td><td>${s.region}</td></tr>`).join('') || '<tr><td colspan="5">Sin resultados.</td></tr>';
    };
    ['#f-txt', '#f-cat', '#f-trl'].forEach((s) => $(s).addEventListener('input', pintar)); pintar();
  }
  function ingresar() {
    vista('#/ingresar', `<section class="ingreso"><h1>Ingresa a GreenMineTech</h1><p style="color:var(--gris)">Prototipo: elige un perfil para recorrer la plataforma como lo haría cada actor.</p>
      <div class="perfiles">
        <button class="perfil" data-rol="productor"><span class="av" style="background:#2F6FB3">LA</span><b>Productor minero</b><span>Luis Araya · Minera San Lorenzo. Publica desafíos y sigue sus pilotos.</span></button>
        <button class="perfil" data-rol="proveedor"><span class="av" style="background:#B07A1E">DR</span><b>Proveedor tecnológico</b><span>Daniela Rojas · AquaMin SpA. Registra soluciones y postula a convocatorias.</span></button>
        <button class="perfil" data-rol="operador"><span class="av" style="background:#4D7F3A">CP</span><b>Operador CIPTEMIN</b><span>Carla Pizarro. Revisa desafíos, hace el matchmaking y sigue los indicadores.</span></button>
      </div>
      <p style="margin-top:22px;color:var(--gris)">¿Eres productor y prefieres no usar la web? <a href="#/whatsapp">Habla con el agente por WhatsApp</a>.</p></section>`);
    app.querySelectorAll('[data-rol]').forEach((b) => b.addEventListener('click', () => { ponerRol(b.dataset.rol); location.hash = { productor: '#/p', proveedor: '#/v', operador: '#/o' }[b.dataset.rol]; }));
  }
  
  function panelProductor() {
    const mios = D.desafios.filter((d) => d.autor === 'productor');
    vista('#/p', `<div class="top"><div><h1>Hola, ${USUARIOS.productor.nombre.split(' ')[0]}</h1><p>${USUARIOS.productor.org} · ${USUARIOS.productor.detalle}</p></div>
      <div style="display:flex;gap:10px"><a class="btn b-wsp" href="#/whatsapp">${ICO.wsp.replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="2"')}Hablar con el agente</a><a class="btn b-verde" href="#/p/nuevo">Nuevo desafío</a></div></div>
      <div class="kpis"><div class="card kpi"><b>${mios.length}</b><span>desafíos publicados por ti</span></div><div class="card kpi"><b>${mios.filter((d) => d.estado === 'evaluacion').length}</b><span>en evaluación</span></div>
      <div class="card kpi"><b>3</b><span>soluciones en estudio</span></div><div class="card kpi"><b>${mios.filter((d) => d.canal === 'WhatsApp').length}</b><span>creados por WhatsApp</span></div></div>
      <div class="dos"><div class="card card-p"><div class="fila-sb" style="margin-bottom:6px"><h3>Mis desafíos</h3><a href="#/p/desafios">Ver todos</a></div>
        <table class="tabla"><thead><tr><th>Desafío</th><th>Estado</th><th>Canal</th></tr></thead><tbody>${mios.map((d) => `<tr><td><a href="#/desafio/${d.id}">${esc(d.titulo)}</a><br><small style="color:var(--gris)">${d.id} · ${fmt(d.fecha)}</small></td><td>${est(d.estado)}</td><td><span class="canal">${d.canal}</span></td></tr>`).join('')}</tbody></table></div>
      <div class="card card-p"><h3>Avisos</h3><ul class="lista">${D.avisos.map(([f, t]) => `<li><span class="fecha">${fmt(f)}</span><span>${esc(t)}</span></li>`).join('')}</ul>
        <p style="font-size:.84rem;color:var(--gris);margin-top:8px">También te llegan por WhatsApp.</p></div></div>`, true);
  }
  function misDesafios() {
    const mios = D.desafios.filter((d) => d.autor === 'productor');
    vista('#/p/desafios', `<div class="top"><div><h1>Mis desafíos</h1><p>Todo lo que publicaste, por la web o por WhatsApp.</p></div><a class="btn b-verde" href="#/p/nuevo">Nuevo desafío</a></div>
      <div class="grid3">${mios.map(tarjetaDesafio).join('')}</div>`, true);
  }
  function detalle(id) {
    const d = des(id); if (!d) return noEncontrado();
    const i = ORDEN_ESTADOS.indexOf(d.estado);
    const linea = ['Borrador', 'Revisión', 'Convocatoria', 'Evaluación', 'Pilotaje', 'Cierre'].map((t, k) => `<div class="${k < i ? 'ok' : k === i ? 'ahora' : ''}">${t}</div>`).join('');
    const evals = (D.evaluaciones[id] || []).map((e) => `<li><span class="trl">TRL ${sol(e.sol).trl}</span><div><b>${esc(sol(e.sol).nombre)}</b><br><small style="color:var(--gris)">${sol(e.sol).proveedor} · ${e.estado}</small></div></li>`).join('');
    const volver = rol === 'operador' ? '#/o/desafios' : rol === 'productor' ? '#/p/desafios' : '#/desafios';
    const html = `<div class="migas"><a href="${volver}">← Volver</a></div>
      <div class="top"><div><h1>${esc(d.titulo)}</h1><p>${d.id} · ${d.org} · ${d.comuna}, ${d.region}</p></div><div>${est(d.estado)}</div></div>
      <div class="card card-p" style="margin-bottom:18px"><div class="linea-est">${linea}</div></div>
      <div class="dos"><div style="display:flex;flex-direction:column;gap:18px">
        <div class="card card-p"><h3 style="margin-bottom:8px">Descripción del problema</h3><p>${esc(d.descripcion)}</p></div>
        <div class="card card-p"><h3 style="margin-bottom:6px">Historial</h3><ul class="lista hist">${d.historial.map(([f, q, t]) => `<li><span class="fecha">${fmt(f)}</span><span><span class="quien">${esc(q)}</span> · ${esc(t)}</span></li>`).join('')}</ul></div></div>
      <div style="display:flex;flex-direction:column;gap:18px"><div class="card card-p"><h3 style="margin-bottom:10px">Ficha</h3><dl class="dl"><dt>Mineral</dt><dd>${d.mineral}</dd><dt>Categoría</dt><dd>${d.categoria}</dd><dt>Impacto</dt><dd>${d.impacto}</dd><dt>Urgencia</dt><dd>${d.urgencia}</dd><dt>Ingresó por</dt><dd>${d.canal}</dd><dt>Fecha</dt><dd>${fmt(d.fecha)}</dd></dl></div>
        ${evals ? `<div class="card card-p"><h3>Soluciones en estudio</h3><ul class="lista">${evals}</ul>${rol === 'operador' ? `<a class="btn b-verde b-chico" href="#/o/match/${id}">Abrir matchmaking</a>` : ''}</div>` : ''}
        ${rol === 'operador' && d.estado === 'revision' ? `<div class="card card-p"><h3 style="margin-bottom:8px">Revisión</h3><p style="font-size:.88rem;color:var(--gris);margin-bottom:12px">Revisa el desafío y publícalo para abrir la convocatoria a proveedores.</p><div style="display:flex;gap:8px"><button class="btn b-verde b-chico" id="publicar">Formalizar y publicar</button><button class="btn b-gris b-chico" id="pedir">Pedir más información</button></div></div>` : ''}
      </div></div>`;
    if (rol) vista('#/desafio', html, true); else vista('#/desafio', `<section class="sec">${html}</section>`);
    const pub = $('#publicar');
    if (pub) {
      pub.addEventListener('click', () => { d.estado = 'publicado'; d.historial.push([hoy(), USUARIOS.operador.nombre, 'Formalizó y publicó la convocatoria']); D.avisos.unshift([hoy(), `Tu desafío ${d.id} fue publicado: ya está abierta la convocatoria.`]); guardar(); toast('Desafío publicado y proveedores notificados'); detalle(id); });
      $('#pedir').addEventListener('click', () => { d.historial.push([hoy(), USUARIOS.operador.nombre, 'Pidió más información al productor (aviso por WhatsApp)']); guardar(); toast('Se avisó al productor por WhatsApp'); detalle(id); });
    }
  }

  let W = {};
  function nuevoDesafio() {
    W = { paso: 1, titulo: '', descripcion: '', comuna: '', mineral: '', categoria: '', impacto: '', urgencia: '' };
    pintarWizard();
  }
  function opc(campo, valores) {
    return `<div class="opciones">${valores.map(([v, s]) => `<button type="button" class="opcion ${W[campo] === v ? 'sel' : ''}" data-c="${campo}" data-v="${v}">${v}${s ? `<small>${s}</small>` : ''}</button>`).join('')}</div>`;
  }
  function pintarWizard() {
    const total = 5;
    const barras = Array.from({ length: total }, (_, k) => `<span class="${k < W.paso ? 'ok' : ''}"></span>`).join('');
    let c = '';
    if (W.paso === 1) c = `<h2>¿Qué problema tiene en su faena?</h2><p class="ayuda">Cuéntelo con sus palabras, como se lo explicaría a un colega. No necesita términos técnicos.</p>
      <div class="campo"><label for="w-t">Un título corto</label><input id="w-t" value="${esc(W.titulo)}" placeholder="Ej.: La chancadora se tapa con mineral húmedo"></div>
      <div class="campo"><label for="w-d">¿Qué pasa y desde cuándo?</label><textarea id="w-d" placeholder="Ej.: En invierno el mineral llega húmedo y la chancadora se tapa. Perdemos medio turno.">${esc(W.descripcion)}</textarea></div>`;
    if (W.paso === 2) c = `<h2>¿Dónde está su faena?</h2><p class="ayuda">Nos sirve para buscar proveedores que puedan llegar a su zona.</p>
      <div class="campo"><label for="w-c">Comuna</label><input id="w-c" value="${esc(W.comuna)}" placeholder="Ej.: Diego de Almagro"></div><div class="campo"><label>Mineral principal</label>${opc('mineral', [['Cobre'], ['Oro'], ['Hierro'], ['Otro']])}</div>`;
    if (W.paso === 3) c = `<h2>¿De qué tipo es el problema?</h2><p class="ayuda">Elija la opción más cercana. CIPTEMIN la puede ajustar después.</p>${opc('categoria', [['Agua'], ['Energía'], ['Chancado y molienda'], ['Seguridad'], ['Polvo y emisiones'], ['Otro']])}`;
    if (W.paso === 4) c = `<h2>¿Cuánto le afecta?</h2><p class="ayuda">Así CIPTEMIN puede priorizar.</p><div class="campo"><label>Impacto principal</label>${opc('impacto', [['Pierde horas de turno', 'La operación se detiene'], ['Aumenta costos', 'Gasta más de lo necesario'], ['Riesgo de seguridad', 'Puede haber accidentes'], ['Impacto ambiental', 'Agua, polvo, residuos']])}</div>
      <div class="campo"><label>Urgencia</label>${opc('urgencia', [['Alta', 'Necesito resolverlo este año'], ['Media', 'Puede esperar unos meses']])}</div>`;
    if (W.paso === 5) c = `<h2>Revise su desafío</h2><p class="ayuda">Si está todo bien, lo enviamos a revisión de CIPTEMIN. Le avisaremos por WhatsApp y correo.</p>
      <div class="resumen-d"><h3 class="mont" style="margin-bottom:6px">${esc(W.titulo || 'Sin título')}</h3><p style="margin-bottom:10px">${esc(W.descripcion || '—')}</p>
      <dl class="dl"><dt>Comuna</dt><dd>${esc(W.comuna || '—')} <a href="#" data-ir="2">Cambiar</a></dd><dt>Mineral</dt><dd>${W.mineral || '—'} <a href="#" data-ir="2">Cambiar</a></dd><dt>Tipo</dt><dd>${W.categoria || '—'} <a href="#" data-ir="3">Cambiar</a></dd><dt>Impacto</dt><dd>${W.impacto || '—'} <a href="#" data-ir="4">Cambiar</a></dd><dt>Urgencia</dt><dd>${W.urgencia || '—'} <a href="#" data-ir="4">Cambiar</a></dd></dl></div>`;
    vista('#/p/nuevo', `<div class="migas"><a href="#/p">← Mi inicio</a></div><div class="top"><div><h1>Nuevo desafío</h1><p>Paso ${W.paso} de ${total} · se guarda automáticamente</p></div><a class="btn b-wsp b-chico" href="#/whatsapp">Prefiero hacerlo por WhatsApp</a></div>
      <div class="card card-p wiz"><div class="pasos-w">${barras}</div>${c}
      <div class="wiz-pie"><button class="btn b-gris" id="w-atras" ${W.paso === 1 ? 'style="visibility:hidden"' : ''}>Atrás</button><button class="btn b-verde" id="w-sig">${W.paso === total ? 'Enviar a revisión' : 'Continuar'}</button></div></div>`, true);
    app.querySelectorAll('.opcion').forEach((b) => b.addEventListener('click', () => { leerWizard(); W[b.dataset.c] = b.dataset.v; pintarWizard(); }));
    app.querySelectorAll('[data-ir]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); W.paso = +a.dataset.ir; pintarWizard(); }));
    $('#w-atras').addEventListener('click', () => { leerWizard(); W.paso--; pintarWizard(); });
    $('#w-sig').addEventListener('click', () => {
      leerWizard();
      if (W.paso === 1 && !W.titulo.trim()) { toast('Escriba un título corto para su desafío'); return; }
      if (W.paso < total) { W.paso++; pintarWizard(); return; }
      const id = crearDesafio({ titulo: W.titulo, descripcion: W.descripcion, comuna: W.comuna || 'Sin indicar', mineral: W.mineral || 'Otro', categoria: W.categoria || 'Otro', impacto: W.impacto || 'Sin indicar', urgencia: W.urgencia || 'Media', canal: 'Web', quien: USUARIOS.productor.nombre });
      toast('Desafío enviado a revisión'); location.hash = '#/desafio/' + id;
    });
  }
  function leerWizard() {
    const v = (s) => { const el = $(s); return el ? el.value : null; };
    if (v('#w-t') !== null) W.titulo = v('#w-t');
    if (v('#w-d') !== null) W.descripcion = v('#w-d');
    if (v('#w-c') !== null) W.comuna = v('#w-c');
  }
  function crearDesafio(o) {
    const id = nuevoId();
    D.desafios.unshift({ id, titulo: o.titulo, org: USUARIOS.productor.org, autor: 'productor', region: 'Atacama', comuna: o.comuna, mineral: o.mineral, categoria: o.categoria, estado: 'revision', fecha: hoy(), impacto: o.impacto, urgencia: o.urgencia, canal: o.canal, descripcion: o.descripcion,
      historial: [[hoy(), o.quien, o.canal === 'WhatsApp' ? 'Creó el desafío conversando con el agente' : 'Creó el desafío en la web'], [hoy(), 'Plataforma', 'Envió el desafío a revisión de CIPTEMIN']] });
    D.avisos.unshift([hoy(), `Recibimos tu desafío ${id}. CIPTEMIN lo está revisando.`]);
    guardar(); return id;
  }
  
  function panelProveedor() {
    const mias = D.soluciones.filter((s) => s.propio);
    const abiertas = D.desafios.filter((d) => d.estado === 'publicado' || d.estado === 'evaluacion');
    vista('#/v', `<div class="top"><div><h1>Hola, ${USUARIOS.proveedor.nombre.split(' ')[0]}</h1><p>${USUARIOS.proveedor.org} · ${USUARIOS.proveedor.detalle}</p></div><a class="btn b-verde" href="#/v/soluciones">Registrar solución</a></div>
      <div class="kpis"><div class="card kpi"><b>${mias.length}</b><span>soluciones registradas</span></div><div class="card kpi"><b>${abiertas.length}</b><span>convocatorias abiertas</span></div><div class="card kpi"><b>1</b><span>solución recomendada</span></div><div class="card kpi"><b>0</b><span>pilotos en curso</span></div></div>
      <div class="card card-p"><h3 style="margin-bottom:6px">Convocatorias que calzan con tus soluciones</h3><table class="tabla"><thead><tr><th>Desafío</th><th>Región</th><th>Estado</th><th></th></tr></thead><tbody>
      ${abiertas.map((d) => `<tr><td><a href="#/desafio/${d.id}">${esc(d.titulo)}</a><br><small style="color:var(--gris)">${d.categoria} · ${d.mineral}</small></td><td>${d.region}</td><td>${est(d.estado)}</td><td><button class="btn b-linea b-chico" data-post="${d.id}">Postular</button></td></tr>`).join('')}</tbody></table></div>`, true);
    app.querySelectorAll('[data-post]').forEach((b) => b.addEventListener('click', () => modalPostular(b.dataset.post)));
  }
  function modalPostular(id) {
    const d = des(id);
    const m = document.createElement('div'); m.className = 'modal-f';
    m.innerHTML = `<div class="modal"><h2>Postular a ${d.id}</h2><p style="color:var(--gris);margin-bottom:14px">${esc(d.titulo)}</p>
      <div class="campo"><label>Solución</label><select id="m-sol">${D.soluciones.filter((s) => s.propio).map((s) => `<option value="${s.id}">${esc(s.nombre)} (TRL ${s.trl})</option>`).join('')}</select></div>
      <div class="campo"><label>¿Cómo resuelve el desafío?</label><textarea style="min-height:90px" placeholder="Explica brevemente tu propuesta"></textarea></div>
      <div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn b-gris" id="m-c">Cancelar</button><button class="btn b-verde" id="m-ok">Enviar postulación</button></div></div>`;
    document.body.appendChild(m);
    $('#m-c', m).addEventListener('click', () => m.remove());
    $('#m-ok', m).addEventListener('click', () => { d.historial.push([hoy(), USUARIOS.proveedor.org, 'Postuló una solución']); guardar(); m.remove(); toast('Postulación enviada a CIPTEMIN'); });
  }
  function misSoluciones() {
    const mias = D.soluciones.filter((s) => s.propio);
    vista('#/v/soluciones', `<div class="top"><div><h1>Mis soluciones</h1><p>Registra cada tecnología con su nivel de madurez (TRL) y sus requisitos.</p></div></div>
      <div class="dos"><div class="card"><table class="tabla"><thead><tr><th>Solución</th><th>Categoría</th><th>TRL</th></tr></thead><tbody id="t-mias">${mias.map((s) => `<tr><td><b>${esc(s.nombre)}</b><br><small style="color:var(--gris)">${esc(s.req)}</small></td><td>${s.categoria}</td><td><span class="trl">TRL ${s.trl}</span></td></tr>`).join('')}</tbody></table></div>
      <div class="card card-p"><h3 style="margin-bottom:12px">Registrar nueva solución</h3>
        <div class="campo"><label for="s-n">Nombre</label><input id="s-n" placeholder="Ej.: Monitoreo remoto de bombas"></div>
        <div class="campo"><label for="s-c">Categoría</label><select id="s-c"><option>Agua</option><option>Energía</option><option>Chancado y molienda</option><option>Seguridad</option><option>Polvo y emisiones</option></select></div>
        <div class="campo"><label for="s-t">Nivel de madurez (TRL)</label><select id="s-t">${[4, 5, 6, 7, 8, 9].map((n) => `<option value="${n}">TRL ${n}${n >= 7 ? ' · probada en entorno real' : n >= 5 ? ' · validada en entorno relevante' : ''}</option>`).join('')}</select></div>
        <div class="campo"><label for="s-r">Requisitos de implementación</label><input id="s-r" placeholder="Ej.: energía trifásica, cobertura celular"></div>
        <button class="btn b-verde" id="s-ok">Registrar</button></div></div>`, true);
    $('#s-ok').addEventListener('click', () => {
      const n = $('#s-n').value.trim(); if (!n) { toast('Escribe el nombre de la solución'); return; }
      D.soluciones.push({ id: 'S-' + (100 + D.soluciones.length + 1), nombre: n, proveedor: USUARIOS.proveedor.org, propio: true, categoria: $('#s-c').value, trl: +$('#s-t').value, region: 'Antofagasta', desc: 'Registrada en el prototipo.', req: $('#s-r').value || '—' });
      guardar(); toast('Solución registrada en el catálogo'); misSoluciones();
    });
  }
  
  function bandeja() {
    const rev = D.desafios.filter((d) => d.estado === 'revision');
    const t = D.desafios.length;
    vista('#/o', `<div class="top"><div><h1>Bandeja de operación</h1><p>Lo que necesita tu atención hoy.</p></div><a class="btn b-linea" href="#/o/indicadores">Ver indicadores</a></div>
      <div class="kpis"><div class="card kpi"><b>${rev.length}</b><span>desafíos por revisar</span></div><div class="card kpi"><b>${D.desafios.filter((d) => d.estado === 'evaluacion').length}</b><span>en matchmaking</span></div>
      <div class="card kpi"><b>${D.pilotajes.length}</b><span>pilotaje en curso</span></div><div class="card kpi"><b>${Math.round(100 * D.desafios.filter((d) => d.canal === 'WhatsApp').length / t)} %</b><span>de desafíos llegó por WhatsApp</span></div></div>
      <div class="dos"><div class="card card-p"><h3 style="margin-bottom:6px">Desafíos por revisar</h3>
        ${rev.length ? `<table class="tabla"><thead><tr><th>Desafío</th><th>Canal</th><th>Fecha</th><th></th></tr></thead><tbody>${rev.map((d) => `<tr><td><a href="#/desafio/${d.id}">${esc(d.titulo)}</a><br><small style="color:var(--gris)">${d.org} · ${d.comuna}</small></td><td><span class="canal">${d.canal}</span></td><td>${fmt(d.fecha)}</td><td><a class="btn b-verde b-chico" href="#/desafio/${d.id}">Revisar</a></td></tr>`).join('')}</tbody></table>` : '<p class="vacio">No hay desafíos pendientes de revisión.</p>'}</div>
      <div class="card card-p"><h3 style="margin-bottom:6px">Actividad del agente WhatsApp</h3>${D.registro_agente.length ? `<ul class="lista">${D.registro_agente.slice(0, 6).map(([f, t]) => `<li><span class="fecha">${f}</span><span>${esc(t)}</span></li>`).join('')}</ul>` : '<p class="vacio">Prueba el <a href="#/whatsapp">simulador del agente</a>: lo que haga aparecerá aquí.</p>'}</div></div>`, true);
  }
  function desafiosOperador() {
    vista('#/o/desafios', `<div class="top"><div><h1>Desafíos</h1><p>Todos los desafíos de la plataforma, con su estado y canal de ingreso.</p></div><button class="btn b-gris" id="csv">Exportar a Excel (CSV)</button></div>
      <div class="card"><table class="tabla"><thead><tr><th>ID</th><th>Desafío</th><th>Organización</th><th>Región</th><th>Canal</th><th>Estado</th></tr></thead><tbody>
      ${D.desafios.map((d) => `<tr><td>${d.id}</td><td><a href="#/desafio/${d.id}">${esc(d.titulo)}</a></td><td>${d.org}</td><td>${d.region}</td><td><span class="canal">${d.canal}</span></td><td>${est(d.estado)}</td></tr>`).join('')}</tbody></table></div>`, true);
    $('#csv').addEventListener('click', () => {
      const filas = [['ID', 'Desafío', 'Organización', 'Región', 'Mineral', 'Canal', 'Estado', 'Fecha']].concat(D.desafios.map((d) => [d.id, d.titulo, d.org, d.region, d.mineral, d.canal, ESTADOS[d.estado].t, d.fecha]));
      const csv = '﻿' + filas.map((f) => f.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(';')).join('\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = 'desafios_greenminetech.csv'; a.click();
    });
  }
  function matchmaking(id) {
    const d = des(id); const ev = D.evaluaciones[id] || [];
    vista('#/o/match', `<div class="migas"><a href="#/desafio/${id}">← ${id}</a></div><div class="top"><div><h1>Matchmaking asistido</h1><p>${esc(d.titulo)} · ${d.comuna}, ${d.region}</p></div>${est(d.estado)}</div>
      <div class="aviso-ia"><span style="font-size:1.2rem">✦</span><div><b>Sugerencia de la IA:</b> estas soluciones son las más parecidas al desafío según su descripción, categoría y región. <b>La decisión es del operador</b> (TDR 4.1.5).</div></div>
      <div class="comp">${ev.map((e) => { const s = sol(e.sol); return `<div class="card"><div class="cab-c"><div class="fila-sb"><span class="trl">TRL ${s.trl}</span><span class="est ${e.estado === 'Recomendada' ? 'verde' : e.estado === 'Seleccionada' ? 'morado' : 'azul'}">${e.estado}</span></div><h3 style="margin-top:8px">${esc(s.nombre)}</h3><small style="color:var(--gris)">${s.proveedor} · ${s.region}</small></div>
        <div class="cuerpo-c"><span class="ia-tag">✦ Similitud con el desafío: ${e.ia} %</span><div class="barra-ia"><i style="width:${e.ia}%"></i></div>
        <dl class="dl" style="margin-top:6px"><dt>Costo</dt><dd>${e.costo}</dd><dt>Plazo</dt><dd>${e.plazo}</dd><dt>Requisitos</dt><dd>${esc(s.req)}</dd></dl><p style="color:var(--gris)">${esc(e.nota)}</p></div>
        <div class="pie-c"><button class="btn b-verde b-chico" data-sel="${e.sol}">Seleccionar para piloto</button><button class="btn b-gris b-chico" data-desc="${e.sol}">Descartar</button></div></div>`; }).join('')}</div>`, true);
    app.querySelectorAll('[data-sel]').forEach((b) => b.addEventListener('click', () => { ev.forEach((e) => { e.estado = e.sol === b.dataset.sel ? 'Seleccionada' : 'Descartada'; }); d.historial.push([hoy(), USUARIOS.operador.nombre, `Seleccionó ${sol(b.dataset.sel).nombre} para el piloto`]); D.avisos.unshift([hoy(), `Se seleccionó una solución para tu desafío ${d.id}. Te contactaremos para el piloto.`]); guardar(); toast('Solución seleccionada. Se avisó al productor por WhatsApp.'); matchmaking(id); }));
    app.querySelectorAll('[data-desc]').forEach((b) => b.addEventListener('click', () => { ev.find((e) => e.sol === b.dataset.desc).estado = 'Descartada'; guardar(); matchmaking(id); }));
  }
  function pilotaje(id) {
    const p = D.pilotajes.find((x) => x.id === id); if (!p) return noEncontrado();
    const d = des(p.desafio), s = sol(p.solucion);
    vista('#/pilotaje', `<div class="top"><div><h1>Pilotaje ${p.id}</h1><p>${esc(d.titulo)} · ${s.nombre} (${s.proveedor})</p></div>${est('pilotaje')}</div>
      <div class="card card-p" style="margin-bottom:18px"><div class="fila-sb"><b>Avance del piloto</b><b>${p.avance} %</b></div><div class="progreso" style="margin-top:8px"><i style="width:${p.avance}%"></i></div><p style="font-size:.84rem;color:var(--gris);margin-top:8px">${fmt(p.inicio)} al ${fmt(p.fin)}</p></div>
      <div class="dos"><div class="card card-p"><h3 style="margin-bottom:6px">KPIs del piloto</h3><table class="tabla"><thead><tr><th>Indicador</th><th>Meta</th><th>Actual</th></tr></thead><tbody>${p.kpis.map(([k, m, a]) => `<tr><td>${k}</td><td>${m}</td><td><b>${a}</b></td></tr>`).join('')}</tbody></table>
        <h3 style="margin:18px 0 6px">Incidencias</h3><ul class="lista">${p.incidencias.map(([f, t, r]) => `<li><span class="fecha">${fmt(f)}</span><span>${esc(t)}<br><small style="color:var(--verde-o);font-weight:700">${esc(r)}</small></span></li>`).join('')}</ul></div>
      <div class="card card-p"><h3 style="margin-bottom:6px">Hitos</h3><ul class="lista hitos">${p.hitos.map(([t, e]) => `<li><span class="p ${e}">${e === 'hecho' ? '✓' : ''}</span>${t}</li>`).join('')}</ul></div></div>`, true);
  }
  function barras(datos, alto, color) {
    const max = Math.max(...datos.map((x) => x[1])), w = 560, h = alto, bw = (w - 40) / datos.length;
    return `<svg class="graf" viewBox="0 0 ${w} ${h + 30}">${datos.map(([e, v], i) => { const bh = Math.round((h - 20) * v / max); const x = 30 + i * bw; return `<rect x="${x + 6}" y="${h - bh}" width="${bw - 12}" height="${bh}" rx="4" fill="${color}"/><text x="${x + bw / 2}" y="${h - bh - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="#1C2420">${v}</text><text x="${x + bw / 2}" y="${h + 18}" text-anchor="middle" font-size="11.5" fill="#56615B">${e}</text>`; }).join('')}<line x1="30" x2="${w - 10}" y1="${h}" y2="${h}" stroke="#C9D3C4"/></svg>`;
  }
  function indicadores() {
    const porEstado = ORDEN_ESTADOS.slice(1).map((e) => [ESTADOS[e].t.replace('Convocatoria abierta', 'Convocatoria'), D.desafios.filter((d) => d.estado === e).length]);
    vista('#/o/indicadores', `<div class="top"><div><h1>Indicadores</h1><p>Uso, articulación y foco en pequeña miner&iacute;a. Datos de ejemplo del prototipo.</p></div><div style="display:flex;gap:8px"><button class="btn b-gris" onclick="window.print()">Exportar PDF</button></div></div>
      <div class="kpis"><div class="card kpi"><b>128</b><span>usuarios registrados</span></div><div class="card kpi"><b>54</b><span>pequeños productores</span></div><div class="card kpi"><b>99,8 %</b><span>disponibilidad del mes</span></div><div class="card kpi"><b>41 %</b><span>desafíos vía WhatsApp</span></div></div>
      <div class="dos"><div class="card card-p"><h3>Usuarios registrados por mes</h3>${barras([['Mar', 22], ['Abr', 41], ['May', 63], ['Jun', 82], ['Jul', 104], ['Ago', 128]], 190, '#4D7F3A')}</div>
      <div class="card card-p"><h3>Desafíos por estado</h3>${barras(porEstado, 190, '#86C43F')}</div></div>
      <div class="card card-p" style="margin-top:18px"><h3 style="margin-bottom:10px">Embudo de activación de pequeños productores</h3>
        ${[['Contactados', 180], ['Registrados', 54], ['Con desafío publicado', 19], ['En piloto', 4]].map(([t, v]) => `<div style="display:grid;grid-template-columns:200px 1fr 50px;gap:12px;align-items:center;margin-bottom:8px"><span>${t}</span><div class="progreso"><i style="width:${Math.round(v / 1.8)}%"></i></div><b>${v}</b></div>`).join('')}</div>`, true);
  }
  function contenidos() {
    vista('#/o/contenidos', `<div class="top"><div><h1>Contenidos</h1><p>Noticias, guías y convocatorias visibles en el sitio.</p></div><button class="btn b-verde" id="c-n">Nuevo contenido</button></div>
      <div class="card"><table class="tabla"><thead><tr><th>Título</th><th>Tipo</th><th>Estado</th><th></th></tr></thead><tbody>
      ${[['Cómo publicar un desafío en 5 minutos', 'Guía', 'Publicado'], ['Convocatoria: soluciones de agua para lixiviación', 'Convocatoria', 'Publicado'], ['Resultados del piloto de control de polvo en Andacollo', 'Noticia', 'Borrador'], ['¿Qué es el TRL? Explicado en simple', 'Guía', 'Publicado']].map(([t, ti, e]) => `<tr><td><b>${t}</b></td><td>${ti}</td><td><span class="est ${e === 'Publicado' ? 'verde' : 'gris'}">${e}</span></td><td><button class="btn b-gris b-chico">Editar</button> <button class="btn b-gris b-chico">${e === 'Publicado' ? 'Despublicar' : 'Publicar'}</button></td></tr>`).join('')}</tbody></table></div>`, true);
    $('#c-n').addEventListener('click', () => toast('En la plataforma real se abre el editor de contenidos'));
  }
  function usuarios() {
    vista('#/o/usuarios', `<div class="top"><div><h1>Usuarios y permisos</h1><p>Roles por tipo de actor y bitácora de accesos.</p></div><button class="btn b-verde">Invitar usuario</button></div>
      <div class="card"><table class="tabla"><thead><tr><th>Nombre</th><th>Organización</th><th>Rol</th><th>Último acceso</th><th>Estado</th></tr></thead><tbody>
      ${[['Luis Araya', 'Minera San Lorenzo', 'Demandante', 'Hoy, vía WhatsApp', 'Activo'], ['Daniela Rojas', 'AquaMin SpA', 'Proveedor', 'Ayer', 'Activo'], ['Carla Pizarro', 'CIPTEMIN', 'Articulador (administrador)', 'Hoy', 'Activo'], ['Pedro Castillo', 'Asociación Minera de Tierra Amarilla', 'Observador', 'Hace 5 días', 'Activo'], ['Jorge Ramos', 'GeoAlerta', 'Proveedor', 'Hace 40 días', 'Deshabilitado']].map(([n, o, r, a, e]) => `<tr><td><b>${n}</b></td><td>${o}</td><td>${r}</td><td>${a}</td><td><span class="est ${e === 'Activo' ? 'verde' : 'gris'}">${e}</span></td></tr>`).join('')}</tbody></table></div>`, true);
  }
  function noEncontrado() { vista('#/', '<section class="sec"><h2>No encontramos esa página</h2><a href="#/">Volver al inicio</a></section>'); }
  
  const AG = { modo: 'inicio', borrador: {}, ultimo: null, verificado: true, pendiente: null };
  const hora = () => new Date().toTimeString().slice(0, 5);
  const PRECIOS = {
    cobre: { n: 'Cobre', v: 'US$ 4,61', u: 'por libra', var: '+0,8 %', ref: 'Bolsa de Metales de Londres (LME)' },
    oro: { n: 'Oro', v: 'US$ 2.684', u: 'por onza troy', var: '−0,3 %', ref: 'LBMA' },
    plata: { n: 'Plata', v: 'US$ 31,20', u: 'por onza troy', var: '+0,5 %', ref: 'LBMA' },
    hierro: { n: 'Hierro (62 % Fe)', v: 'US$ 104', u: 'por tonelada', var: '−1,1 %', ref: 'índice de referencia del mineral de hierro' },
  };
  function registrar(t) { D.registro_agente.unshift([hora(), t]); guardar(); pintarAcciones(); }
  function entendio(intencion) {
    const el = $('#w-ent'); if (el) el.innerHTML = intencion && intencion !== '—' ? `El agente entendió: <b>${esc(intencion)}</b>` : '';
  }
  const VERIF = '<svg viewBox="0 0 24 24" class="verif"><path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9L3.2 15.8l.9-2.9-.9-2.9 2.5-1.7.9-2.9 3 .2z" fill="#25D366"/><path d="M8 12.3l2.6 2.6L16.2 9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const AUDIO_EJ = 'la chancadora se me tapa cuando el mineral viene húmedo, sobre todo en invierno, y pierdo como medio turno';
  const ESCENAS = {
    problema: { t: 'Contar un problema de la faena', s: 'Por audio, sin formularios', pasos: [
      ['Hola, buenas tardes', 'El productor escribe como le escribiría a cualquier persona. El agente responde al instante, a cualquier hora del día.'],
      ['__audio', 'Prefiere mandar un audio. El agente lo transcribe y entiende cuál es el problema.'],
      ['Diego de Almagro', 'El agente pregunta solo lo que falta para armar el desafío: dónde está la faena…'],
      ['Cobre', '…qué mineral trabaja…'],
      ['Pierdo horas de turno', '…y cuánto le afecta. Con eso arma el desafío y se lo muestra para que lo revise.'],
      ['Sí, enviar', 'Con la confirmación del productor, el desafío queda creado en la plataforma y llega a CIPTEMIN para su revisión. El productor no tuvo que entrar a ninguna página.']] },
    consulta: { t: 'Consultar cómo va su desafío', s: 'Con el número del desafío', pasos: [
      ['¿Cómo va el GMT-0042?', 'El productor escribe el número de su desafío. El agente lo busca en la plataforma y responde con el estado real y las soluciones en estudio.'],
      ['¿Qué significa TRL?', 'Si no entiende un término, pregunta. El agente lo explica en palabras simples.']] },
    cobre: { t: 'Preguntar el precio del cobre', s: 'Ayuda en el día a día', pasos: [
      ['¿A cuánto está el cobre hoy?', 'El agente también ayuda en el día a día del minero: entrega la cotización del día desde fuentes oficiales.'],
      ['Sí, explícame', 'Explica en simple cómo se calcula el pago al vender mineral.'],
      ['¿Dónde puedo vender mi mineral?', 'Orienta sobre dónde vender y, si hace falta, ofrece pasar con una persona.']] },
    registro: { t: 'Número nuevo: verificación', s: 'Una sola vez, en el mismo chat', pasos: [
      ['Hola, quiero saber cómo va el GMT-0042', 'Escribe alguien desde un número que la plataforma todavía no conoce. Antes de entregar cualquier dato, el agente verifica su identidad.'],
      ['12.345.678-5', 'Pide el RUT y lo busca en el registro de productores de GreenMineTech.'],
      ['482913', 'Envía un código al correo registrado del productor. Con el código correcto, el número queda verificado una sola vez y el agente responde la consulta. Un número anónimo nunca recibe información de los desafíos.']] },
    persona: { t: 'Pedir hablar con una persona', s: 'Y lo que el agente no responde', pasos: [
      ['Tengo dudas con el piloto, quiero hablar con una persona', 'Cuando el tema lo requiere, el agente traspasa la conversación a una operadora de CIPTEMIN con todo el contexto.'],
      ['¿Quién ganó el partido ayer?', 'Si le preguntan algo fuera de su ámbito, lo dice con amabilidad y vuelve a lo que sí puede ayudar.']] },
  };
  const PROBLEMAS = {
    agua: { t: 'Agua cara en la planta', pasos: [
      ['El agua del camión aljibe nos cuesta cada vez más y queremos una solución para recircular el agua de la planta', 'El productor describe un problema de agua. El agente reconoce el tema y explica qué tipo de tecnologías existen.'],
      ['Diego de Almagro', 'El agente pregunta solo lo que falta para armar el desafío.'],
      ['Cobre', 'Cada respuesta queda guardada en la ficha del desafío.'],
      ['Me sube los costos', 'Con esto arma el desafío completo y se lo muestra al productor para que lo revise.'],
      ['Sí, enviar', 'Con la confirmación, el desafío queda creado en la plataforma y llega a CIPTEMIN. El productor no entró a ninguna página.']] },
    polvo: { t: 'Polvo en los caminos', pasos: [
      ['Hay mucho polvo en los caminos de la faena y es un problema para la salud de los trabajadores', 'Un problema de polvo y salud. El agente lo entiende aunque esté escrito con palabras simples.'],
      ['Andacollo', 'El agente pregunta solo lo que falta para armar el desafío.'],
      ['Oro', 'Cada respuesta queda guardada en la ficha del desafío.'],
      ['Riesgo de seguridad', 'Con esto arma el desafío completo y se lo muestra al productor para que lo revise.'],
      ['Sí, enviar', 'Con la confirmación, el desafío queda creado en la plataforma y llega a CIPTEMIN. El productor no entró a ninguna página.']] },
    energia: { t: 'Gasto en diésel', pasos: [
      ['Gastamos demasiado en diésel para los generadores y queremos una solución con energía solar', 'Un problema de energía. El agente orienta sobre las alternativas que se pueden probar en faena.'],
      ['Tierra Amarilla', 'El agente pregunta solo lo que falta para armar el desafío.'],
      ['Oro', 'Cada respuesta queda guardada en la ficha del desafío.'],
      ['Me sube los costos', 'Con esto arma el desafío completo y se lo muestra al productor para que lo revise.'],
      ['Sí, enviar', 'Con la confirmación, el desafío queda creado en la plataforma y llega a CIPTEMIN. El productor no entró a ninguna página.']] },
    talud: { t: 'Talud que se mueve', pasos: [
      ['Tenemos un problema con un talud que se mueve y queremos saber a tiempo si hay riesgo de derrumbe', 'Un problema de seguridad. El agente lo toma como desafío para buscar monitoreo con tecnología.'],
      ['La Higuera', 'El agente pregunta solo lo que falta para armar el desafío.'],
      ['Hierro', 'Cada respuesta queda guardada en la ficha del desafío.'],
      ['Riesgo de seguridad', 'Con esto arma el desafío completo y se lo muestra al productor para que lo revise.'],
      ['Sí, enviar', 'Con la confirmación, el desafío queda creado en la plataforma y llega a CIPTEMIN. El productor no entró a ninguna página.']] },
    drones: { t: 'Inventario con drones', pasos: [
      ['Tengo un problema con el sistema de inventarios y quiero una solución de registro con drones, ¿es posible?', 'El productor pregunta si algo es posible. El agente responde con claridad y lo convierte en desafío.'],
      ['Diego de Almagro', 'El agente pregunta solo lo que falta para armar el desafío.'],
      ['Cobre', 'Cada respuesta queda guardada en la ficha del desafío.'],
      ['Me sube los costos', 'Con esto arma el desafío completo y se lo muestra al productor para que lo revise.'],
      ['Sí, enviar', 'Con la confirmación, el desafío queda creado en la plataforma y llega a CIPTEMIN. El productor no entró a ninguna página.']] },
  };
  Object.entries(PROBLEMAS).forEach(([k, v]) => { ESCENAS['p-' + k] = { t: v.t, s: '', pasos: v.pasos, extra: true }; });
  let turnoEscena = 0;
  let genChat = 0;
  function limpiarChat() {
    const c = $('#w-chat'); if (!c) return;
    genChat++; AG.ocupado = false;
    c.innerHTML = '<span class="w-fecha">Hoy</span><div class="w-cifrado">🔒 Cuenta de empresa de GreenMineTech, operada por CIPTEMIN. Los mensajes están protegidos.</div>';
    AG.modo = 'inicio'; AG.borrador = {}; AG.verificado = true; AG.pendiente = null; entendio('');
  }
  function explicar(n, total, texto) {
    const el = $('#w-exp'); if (!el) return;
    el.innerHTML = `${total ? `<span class="exp-paso">Paso ${n} de ${total}</span>` : ''}<p>${texto}</p>`;
  }
  function correrEscena(clave) {
    const e = ESCENAS[clave]; const mio = ++turnoEscena;
    app.querySelectorAll('[data-esc]').forEach((b) => b.classList.toggle('act', b.dataset.esc === clave));
    limpiarChat(); if (clave === 'registro') AG.verificado = false;
    explicar(0, e.pasos.length, 'Mira la conversación: avanza sola.');
    let k = 0;
    const siguiente = () => {
      if (mio !== turnoEscena) return;
      if (AG.ocupado) { setTimeout(siguiente, 300); return; }
      if (k >= e.pasos.length) { explicar(e.pasos.length, e.pasos.length, e.pasos[e.pasos.length - 1][1] + ' <span class="exp-fin">Puedes elegir otra situación cuando quieras.</span>'); return; }
      const [m, txt] = e.pasos[k++];
      explicar(k, e.pasos.length, txt);
      setTimeout(() => { if (mio !== turnoEscena) return; if (m === '__audio') recibir(AUDIO_EJ, true); else recibir(m); setTimeout(siguiente, 1600); }, 1100);
    };
    setTimeout(siguiente, 400);
  }

  const IC_AG = {
    desafio: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="M13 7l4 4"/>',
    estado: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    aviso: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    foto: '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 6l1.5-2h5L16 6"/>',
    hito: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    encuesta: '<path d="M9 5h11M9 12h11M9 19h11"/><path d="M4 5l1 1 2-2M4 12l1 1 2-2M4 19l1 1 2-2"/>',
    precio: '<path d="M3 17l5-5 4 4 8-8"/><path d="M15 8h5v5"/>',
    persona: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/>',
  };
  function introAgente() {
    const items = [
      ['desafio', 'Publicar su desafío', 'Cuenta el problema por texto o audio y el agente lo deja listo para revisión.'],
      ['estado', 'Consultar cómo va', 'Escribe el número de su desafío y recibe el estado y el siguiente paso.'],
      ['aviso', 'Recibir avisos', 'Le llega un mensaje cuando su desafío avanza o llegan soluciones.'],
      ['foto', 'Enviar fotos y documentos', 'Manda fotos, videos o archivos de su faena directo al chat.'],
      ['hito', 'Seguir su piloto', 'Confirma hitos, reporta incidencias y ve los resultados de la prueba.'],
      ['encuesta', 'Responder encuestas', 'Califica el servicio y los resultados en pocos toques.'],
      ['precio', 'Consultar precios y venta', 'Precio de metales del día y orientación para vender su mineral.'],
      ['persona', 'Hablar con una persona', 'Cuando lo necesita, el agente lo traspasa a CIPTEMIN con todo el contexto.'],
    ];
    vista('#/whatsapp', `<div class="intro-ag">
      <h1>Todo GreenMineTech, desde el WhatsApp del productor</h1>
      <p class="intro-lead">El productor minero ya usa WhatsApp todos los días. Por eso puede hacer casi todo su recorrido en GreenMineTech desde ahí: sin descargar nada, sin contraseñas y sin aprender una plataforma nueva. La plataforma se adapta a él, no al revés.</p>
      <div class="intro-dest"><b>El productor no necesita entrar a ninguna página.</b> Desde que se identifica, una sola vez y en el mismo chat, hasta conocer los resultados de su piloto, todo ocurre en WhatsApp.</div>
      <h2>Lo que el productor puede hacer por WhatsApp</h2>
      <div class="intro-grid">${items.map(([k, t, s]) => `<div class="intro-it"><svg viewBox="0 0 24 24">${IC_AG[k]}</svg><div><b>${t}</b><span>${s}</span></div></div>`).join('')}</div>
      <div class="intro-dos"><div><h2>Cómo funciona</h2><ol class="intro-pasos">
        <li><b>El productor escribe o manda un audio</b>, con sus palabras, a cualquier hora.</li>
        <li><b>El agente entiende y pregunta lo necesario.</b> Está entrenado por SETROF con el conocimiento de GreenMineTech y de la pequeña minería.</li>
        <li><b>Hace la gestión en la plataforma</b> y CIPTEMIN la ve al instante, con todo registrado.</li></ol></div>
      <div><h2>Con límites claros</h2><ul class="intro-lim">
        <li>Responde solo sobre el programa y temas de la minería.</li>
        <li>Nunca publica nada sin la confirmación del productor.</li>
        <li>Las decisiones, como evaluar y elegir soluciones, las toma CIPTEMIN.</li>
        <li>El productor verifica su identidad una sola vez, con su RUT y un código, en el mismo chat.</li></ul></div></div>
      <div class="intro-pie"><p>A continuación verás una demostración con conversaciones de ejemplo. Fuera de este prototipo, en las pruebas con CIPTEMIN, podrán escribirle libremente al agente.</p><button class="btn b-verde b-grande" id="intro-ok">Continuar a la demostración →</button></div>
    </div>`, true);
    $('#intro-ok').addEventListener('click', () => { try { sessionStorage.setItem('gmt-intro-ag', '1'); } catch (e) {} simulador(); });
  }
  function rutaAgente() {
    let visto = false;
    try { visto = sessionStorage.getItem('gmt-intro-ag') === '1'; } catch (e) { visto = false; }
    const q = new URLSearchParams(location.search);
    if (visto || q.get('demo')) return simulador();
    return introAgente();
  }

  function simulador() {
    vista('#/whatsapp', `<div class="top"><div><h1>Así conversa un productor con el agente</h1><p>El agente de GreenMineTech atiende por WhatsApp a toda hora. Elige una situación y mira la conversación completa.</p></div><button class="btn b-gris b-chico" id="ver-intro">Volver a la explicación</button></div>
      <div class="sim3">
        <div class="escenas"><b class="esc-tit">Elige una situación</b>
          ${Object.entries(ESCENAS).filter(([, e]) => !e.extra).map(([k, e], i) => `<button class="esc" data-esc="${k}"><span class="esc-n">${i + 1}</span><span><b>${e.t}</b><small>${e.s}</small></span></button>`).join('')}
          <b class="esc-tit" style="margin-top:10px">Más ejemplos de problemas</b>
          <div class="esc-chips">${Object.entries(ESCENAS).filter(([, e]) => e.extra).map(([k, e]) => `<button class="esc-chip" data-esc="${k}">${e.t}</button>`).join('')}</div>
          <p class="esc-nota">Estas conversaciones son ejemplos que avanzan solos. Fuera de este prototipo, en las pruebas con CIPTEMIN y con productores, cada persona podrá escribirle libremente al agente.</p></div>
        <div class="telefono"><div class="pantalla">
          <div class="w-barra"><span>9:41</span><span>5G ▮▮▮</span></div>
          <div class="w-cab"><svg class="w-atras" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="av"><img src="img/greenminetech-logo.png" alt=""></span><div class="w-nom"><b>GreenMineTech ${VERIF}</b><small id="w-estado">en línea</small></div></div>
          <div class="w-chat" id="w-chat"></div>
          <div class="w-input"><div class="w-caja w-guiada">Demostración guiada · elige una situación</div>
            <span class="w-mic"><svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1a7 7 0 0 0 6-6.9z"/></svg></span></div>
        </div></div>
        <div class="explica"><div class="exp-caja" id="w-exp"></div><p class="exp-ent" id="w-ent"></p>
          <div class="exp-reg"><b>Quedó registrado en la plataforma</b><ul class="acciones-ag" id="w-acc"></ul></div></div>
      </div>`, true);
    limpiarChat();
    explicar(0, 0, 'Elige una situación para ver una conversación completa entre un productor y el agente.');
    pintarAcciones();
    app.querySelectorAll('[data-esc]').forEach((b) => b.addEventListener('click', () => correrEscena(b.dataset.esc)));
    $('#ver-intro').addEventListener('click', () => { turnoEscena++; introAgente(); });
    saludar();
  }
  function pintarAcciones() {
    const ul = $('#w-acc'); if (!ul) return;
    ul.innerHTML = D.registro_agente.length ? D.registro_agente.slice(0, 4).map(([h, t]) => `<li><span class="ic">✓</span><span>${esc(t)}<small>${h}</small></span></li>`).join('') : '<li class="exp-vacio">Aún nada. Cuando el agente haga una gestión, aparecerá aquí.</li>';
  }
  const fmtW = (t) => t.replace(/\*([^*]+)\*/g, '<b>$1</b>').replace(/_([^_]+)_/g, '<i>$1</i>');
  function burbuja(html, quien, botones) {
    const c = $('#w-chat'); if (!c) return;
    const el = document.createElement('div'); el.className = 'w-m ' + quien;
    el.innerHTML = `<div class="w-txt">${quien === 'bot' ? fmtW(html) : html}<time>${hora()}${quien === 'yo' ? ' <span class="leido">✓✓</span>' : ''}</time></div>`;
    if (botones && botones.length) {
      const bx = document.createElement('div'); bx.className = 'w-botones';
      bx.innerHTML = botones.map((b) => `<span class="w-bt">${b}</span>`).join('');
      el.appendChild(bx);
    }
    c.appendChild(el); c.scrollTop = c.scrollHeight;
  }
  function responder(textos, botones) {
    const c = $('#w-chat'); if (!c) return;
    let i = 0; AG.ocupado = true; const g = genChat;
    const sig = () => {
      if (g !== genChat) return;
      if (i >= textos.length) { AG.ocupado = false; return; }
      const e = document.createElement('div'); e.className = 'w-escribe'; e.innerHTML = '<i></i><i></i><i></i>'; c.appendChild(e); c.scrollTop = c.scrollHeight;
      const est = $('#w-estado'); if (est) est.textContent = 'escribiendo…';
      setTimeout(() => {
        e.remove(); if (g !== genChat) return; if ($('#w-estado')) $('#w-estado').textContent = 'Cuenta de empresa';
        const ultimo = i === textos.length - 1;
        burbuja(textos[i], 'bot', ultimo ? botones : null); i++;
        setTimeout(sig, 380);
      }, 700 + Math.min(1500, textos[i].replace(/<[^>]+>/g, '').length * 11));
    };
    sig();
  }
  function saludar() {
    responder(['¡Hola, don Luis! 👋 Soy el agente de *GreenMineTech*, el programa de CIPTEMIN que conecta a la pequeña minería con tecnología probada.',
      'Estoy disponible a toda hora. Me puede escribir o mandar un audio, como le acomode. ¿En qué le ayudo hoy?'], ['Contar un problema', 'Consultar mi desafío', 'Precio de metales']);
  }
  const N = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function recibir(t, audio) {
    const ultimos = app.querySelectorAll('.w-botones'); const bx = ultimos[ultimos.length - 1];
    if (bx && !bx.classList.contains('usado')) { bx.classList.add('usado'); bx.querySelectorAll('.w-bt').forEach((x) => { if (N(x.textContent) === N(t)) x.classList.add('elegido'); }); }
    if (audio) {
      burbuja(`<div class="w-audio"><span class="av-mini">LA</span><span class="pl"></span><span class="on"></span><span class="dur">0:18</span></div><div class="w-transc"><b>Transcripción</b> ${esc(t)}</div>`, 'yo');
      registrar('Transcribió un audio del productor');
    } else burbuja(esc(t), 'yo');
    procesar(t, audio);
  }
  function procesar(t, audio) {
    const n = N(t);
    const id = (t.match(/GMT[-\s]?(\d{1,4})/i) || [])[1];

    if (AG.modo === 'rut') {
      if (!/^\d{1,2}\.?\d{3}\.?\d{3}-[\dk]$/i.test(t.trim())) { entendio('Verificación · RUT no válido'); return responder(['Ese RUT no parece válido. ¿Me lo escribe de nuevo, con guion y dígito verificador? Por ejemplo: 12.345.678-5']); }
      AG.modo = 'codigo'; entendio('Verificación de identidad · RUT');
      registrar('Encontró el RUT en el registro de productores y envió un código de verificación');
      return responder([`Gracias. Encontré a *${USUARIOS.productor.nombre}*, de ${USUARIOS.productor.org}.`, 'Le acabo de enviar un código de 6 dígitos a su correo registrado (l•••@minerasanlorenzo.cl). Escríbalo aquí para confirmar que es usted.']);
    }
    if (AG.modo === 'codigo') {
      if (!/^\d{6}$/.test(t.trim())) { entendio('Verificación · código no válido'); return responder(['El código tiene 6 números. ¿Me lo escribe de nuevo?']); }
      AG.modo = 'inicio'; AG.verificado = true; entendio('Verificación de identidad · código correcto');
      registrar('Verificó la identidad del productor y asoció su número de WhatsApp (una sola vez)');
      const pend = AG.pendiente; AG.pendiente = null;
      responder(['✅ Listo, don Luis. Su número quedó verificado. *No tendrá que repetir esto*: desde ahora lo reconozco cada vez que me escriba.']);
      if (pend) { const esperar = () => { if (AG.ocupado) { setTimeout(esperar, 300); return; } procesar(pend); }; setTimeout(esperar, 300); }
      return;
    }
    if (!AG.verificado && (id || /(como va|estado|en que va|avance|mi desafio|problema|desafio)/.test(n))) {
      AG.pendiente = t; AG.modo = 'rut'; entendio('Número no verificado · pedir identidad');
      registrar('Recibió un mensaje de un número no registrado: pidió verificar identidad antes de entregar datos');
      return responder(['¡Hola! 👋 Soy el agente de *GreenMineTech*.', 'Para proteger la información de cada productor, antes de compartir datos de un desafío necesito verificar su identidad. *Es solo esta vez.* ¿Me indica su RUT?']);
    }

    if (AG.modo === 'problema') return problema(t, audio);
    if (AG.modo === 'comuna') { AG.borrador.comuna = t; AG.modo = 'mineral'; entendio('Formular desafío · ubicación', [['Comuna', t]]); return responder([`Perfecto, ${esc(t)}. ¿Qué mineral trabaja principalmente?`], ['Cobre', 'Oro', 'Hierro']); }
    if (AG.modo === 'mineral') { AG.borrador.mineral = t; AG.modo = 'impacto'; entendio('Formular desafío · mineral', [['Mineral', t]]); return responder(['Gracias. ¿Cómo le afecta este problema en el día a día?'], ['Pierdo horas de turno', 'Me sube los costos', 'Riesgo de seguridad']); }
    if (AG.modo === 'impacto') {
      AG.borrador.impacto = t; AG.modo = 'confirmar'; const b = AG.borrador;
      entendio('Formular desafío · impacto', [['Impacto', t]]);
      registrar('Armó el borrador de un desafío a partir de la conversación');
      return responder(['Listo, armé su desafío. Revíselo, por favor:',
        `<div class="tarjeta-d"><b>${esc(b.titulo)}</b><span>${esc(b.descripcion)}</span><span>📍 ${esc(b.comuna)} · ⛏️ ${esc(b.mineral)} · ⚠️ ${esc(b.impacto)}</span></div>¿Lo envío a revisión de CIPTEMIN?`], ['Sí, enviar', 'Corregir algo']);
    }
    if (AG.modo === 'confirmar') {
      if (/^(si|ok|dale|enviar|envia|correcto|esta bien|perfecto|listo)/.test(n)) {
        const b = AG.borrador;
        const nid = crearDesafio({ titulo: b.titulo, descripcion: b.descripcion, comuna: b.comuna, mineral: b.mineral, categoria: categoriaDe(b.descripcion), impacto: b.impacto, urgencia: 'Alta', canal: 'WhatsApp', quien: 'Agente WhatsApp (por ' + USUARIOS.productor.nombre + ')' });
        AG.modo = 'inicio'; AG.ultimo = nid;
        entendio('Confirmar y enviar desafío', [['Desafío', nid]]);
        registrar(`Creó el desafío ${nid} y lo envió a revisión de CIPTEMIN`);
        registrar(`Activó avisos automáticos de avance para ${nid}`);
        return responder([`✅ ¡Enviado! Su desafío quedó registrado con el número *${nid}*.`, 'CIPTEMIN lo revisará en los próximos días hábiles. Yo le aviso por aquí cuando lo publiquen y cuando lleguen soluciones; no necesita entrar a ninguna página.', `Cuando quiera saber cómo va, escríbame *${nid}* y le cuento.`], ['Consultar mi desafío', 'Eso es todo, gracias']);
      }
      AG.modo = 'problema'; entendio('Corregir borrador', []);
      return responder(['Claro, sin problema. Cuénteme de nuevo el problema con los cambios y lo vuelvo a armar.']);
    }

    if (id || /(como va|estado|en que va|avance|consultar mi desafio|mi desafio)/.test(n)) {
      const buscado = id ? 'GMT-' + id.padStart(4, '0') : null;
      if (buscado) {
        const d = des(buscado);
        entendio('Consultar estado de un desafío', [['N.º de desafío', buscado]]);
        if (!d) return responder([`No encuentro el desafío *${buscado}*. ¿Me confirma el número? Está en el mensaje que le enviamos cuando lo registró.`]);
        registrar(`Consultó el estado de ${d.id}`);
        const sig = { revision: 'CIPTEMIN lo está revisando para publicarlo.', publicado: 'La convocatoria está abierta y los proveedores pueden postular.', evaluacion: 'CIPTEMIN está evaluando las soluciones recibidas según su madurez.', pilotaje: 'La solución se está probando en terreno.', cerrado: 'El piloto terminó y los resultados ya están disponibles.' }[d.estado] || '';
        const extra = d.estado === 'evaluacion' ? `\n\nSoluciones en estudio:\n${(D.evaluaciones[d.id] || []).map((e) => `• ${sol(e.sol).nombre} (TRL ${sol(e.sol).trl})`).join('\n')}` : '';
        return responder([`📋 *${d.id}* · ${esc(d.titulo)}\n\nEstado: *${ESTADOS[d.estado].t}*\n${sig}${extra}`, 'Le aviso por aquí apenas haya un cambio. ¿Necesita algo más?'], ['¿Qué significa TRL?', 'Hablar con una persona']);
      }
      const mios = D.desafios.filter((d) => d.autor === 'productor').slice(0, 3);
      entendio('Consultar estado de sus desafíos', [['Desafíos encontrados', String(mios.length)]]);
      registrar('Consultó el estado de los desafíos del productor');
      return responder(['Estos son sus desafíos:\n\n' + mios.map((d) => `• *${d.id}* ${esc(d.titulo)}\n   ${ESTADOS[d.estado].t}`).join('\n\n'), 'Si quiere el detalle de alguno, escríbame su número (por ejemplo, GMT-0042).']);
    }

    const pideSolucion = /\b(problema|problemas|solucion|soluciones|tecnologia|tecnologica|falla|fallas|se tapa|pierdo|perdemos|mejorar|automatizar|digitalizar)\b/.test(n) && !/\b(precio|cotiza|cotizacion)\b/.test(n);
    if (pideSolucion && n.length > 35) return problema(t, audio);

    const metal = ['cobre', 'oro', 'plata', 'hierro'].find((m) => new RegExp('\\b' + m + '\\b').test(n));
    if (/(precio|cotiza|a cuanto|cuanto esta|valor|vale|cuanto paga)/.test(n) && (metal || /metal/.test(n)) || (AG.modo === 'inicio' && /^precio de metales$/.test(n))) {
      entendio('Consultar precio de metales', [['Metal', metal ? PRECIOS[metal].n : 'Todos']]);
      registrar(`Consultó la cotización del ${metal ? PRECIOS[metal].n.toLowerCase() : 'cobre, oro, plata y hierro'}`);
      const lista = metal ? [metal] : ['cobre', 'oro', 'plata', 'hierro'];
      const txt = lista.map((m) => { const p = PRECIOS[m]; return `*${p.n}:* ${p.v} ${p.u} (${p.var} respecto de ayer)`; }).join('\n');
      return responder([`📈 Cotización de hoy:\n\n${txt}\n\n<span class="w-fuente">Referencia: ${metal ? PRECIOS[metal].ref : 'LME y LBMA'}, publicada por Cochilco. Valores de ejemplo en este prototipo.</span>`,
        metal === 'cobre' ? 'Ojo: lo que recibe al vender depende además de la ley de su mineral y de la tarifa del poder comprador. ¿Quiere que le explique cómo se calcula?' : '¿Le ayudo con algo más?'], metal === 'cobre' ? ['Sí, explícame', '¿Dónde puedo vender?'] : ['Precio del cobre', 'Contar un problema']);
    }
    if (/(explicame|como se calcula)/.test(n)) {
      entendio('Orientación comercial', []);
      return responder(['En simple: el comprador paga según el *contenido de cobre* de su mineral (la ley), el *precio del cobre* del período y descuenta los *costos de tratamiento*. Por eso dos camiones del mismo peso pueden pagarse distinto.', 'Si quiere, le paso con una persona de CIPTEMIN para revisar su caso.'], ['Hablar con una persona', 'Eso es todo, gracias']);
    }
    if (/\b(vender|vendo|venta|ventas|poder(es)? comprador(es)?|comprador(es)?|enami|tarifas?)\b/.test(n)) {
      entendio('Orientación comercial · venta de mineral', []);
      registrar('Entregó orientación sobre venta de mineral');
      return responder(['Los pequeños productores pueden vender su mineral a los *poderes compradores* y plantas de ENAMI, y también a compradores privados. El pago depende de la ley del mineral, el precio del metal y la tarifa vigente.', 'Le recomiendo confirmar requisitos y tarifas directamente con el poder comprador más cercano. ¿Quiere que le pase con una persona de CIPTEMIN para orientarlo?'], ['Hablar con una persona', 'Contar un problema']);
    }
    if (/\b(segur\w*|accidente\w*|sernageomin|riesgos?|permisos?|normativa\w*|fiscaliz\w*)\b/.test(n)) {
      entendio('Orientación en seguridad minera', []);
      registrar('Entregó orientación en seguridad y ofreció formular un desafío');
      return responder(['La seguridad es lo primero. 🦺 Para permisos, normativa y fiscalización, el organismo a cargo es *Sernageomin*.', 'Si tiene un riesgo concreto en su faena, como taludes, ventilación o polvo, lo podemos convertir en un desafío para buscar tecnología que lo resuelva. ¿Me cuenta qué está pasando?'], ['Contar un problema', 'Hablar con una persona']);
    }
    if (/\b(persona|humano|operador\w*|ejecutiv\w*|alguien|hablar con)\b/.test(n)) {
      entendio('Derivar a una persona', [['Operadora', 'Carla Pizarro (CIPTEMIN)']]);
      registrar('Derivó la conversación a una operadora de CIPTEMIN con todo el contexto');
      return responder(['Por supuesto. Le aviso ahora a *Carla Pizarro*, operadora de CIPTEMIN, y le paso todo lo que hemos conversado para que no tenga que repetirlo. 🙌', 'Ella le escribirá por este mismo chat en horario hábil.']);
    }
    if (/(problema|desafio|falla|se tapa|se me|necesito|ayuda con|mi faena|perdemos|pierdo|contar un problema)/.test(n)) {
      if (/(se tapa|pierdo|perdemos|agua|chancad|polvo|energia|talud|humed)/.test(n) && n.length > 40) { AG.modo = 'problema'; return problema(t, audio); }
      AG.modo = 'problema'; entendio('Formular un desafío nuevo', []);
      return responder(['Cuénteme qué está pasando en su faena, con sus palabras. Si prefiere, mándeme un audio 🎤.']);
    }
    if (/(que es greenmine|que es esto|como funciona|que hacen|para que sirve|ciptemin)/.test(n)) {
      entendio('Información del programa', []);
      return responder(['*GreenMineTech* es un programa de CIPTEMIN, apoyado por CORFO, que conecta los problemas de las faenas con empresas que tienen soluciones tecnológicas. 🤝', 'Funciona en pocos pasos: usted cuenta su problema, se abre una convocatoria, se evalúan las soluciones, CIPTEMIN le propone las mejores, se prueba una en su faena y usted decide si la adopta.'], ['Contar un problema', 'Consultar mi desafío']);
    }
    if (/trl/.test(n)) {
      entendio('Explicar concepto', [['Concepto', 'TRL']]);
      return responder(['El *TRL* es el nivel de madurez de una tecnología, del 1 al 9. 📈', 'Un TRL 9 ya funciona en faenas reales; un TRL 6 o 7 está probado, pero en etapa de prueba. CIPTEMIN revisa ese nivel antes de proponerle una solución, para que no corra riesgos innecesarios.']);
    }
    if (/^(hola|buenas|buenos|buen dia|alo|hey)/.test(n)) { entendio('Saludo', []); return saludar(); }
    if (/(gracias|eso es todo|chao|adios|hasta luego)/.test(n)) { entendio('Despedida', []); return responder(['¡Con gusto, don Luis! Aquí estaré cuando me necesite, a cualquier hora. Que le vaya bien en la faena. ⛏️']); }
    if (/\b(mal|no funciona|no sabemos|nos cuesta|cuesta|lento|inventari\w*|dron\w*|bodega|faena|planta|mina|camion\w*|maquin\w*|equipos?|correa|bomba|relave\w*)\b/.test(n) && n.length > 25) return problema(t, audio);
    entendio('Fuera del ámbito del agente', []);
    registrar('Mantuvo la conversación dentro de su ámbito');
    return responder(['Disculpe, en eso no le puedo ayudar: estoy para apoyarlo en su faena, sus desafíos, sus pilotos y temas de la minería, como precios de metales o venta de mineral. 🙂'], ['Contar un problema', 'Consultar mi desafío', 'Precio de metales']);
  }
  function problema(t, audio) {
    AG.borrador = { descripcion: t, titulo: resumirTitulo(t) };
    AG.modo = 'comuna';
    entendio('Formular desafío · problema', [['Problema', AG.borrador.titulo], ['Categoría sugerida', categoriaDe(t)]]);
    return responder([`${audio ? 'Escuché su audio. ' : ''}Le entendí: _${esc(t.length > 140 ? t.slice(0, 140) + '…' : t)}_`, comentarioProblema(t) + ' Para armar bien su desafío, ¿en qué comuna está su faena?'], ['Diego de Almagro', 'Tierra Amarilla', 'Andacollo']);
  }
  function comentarioProblema(t) {
    const n = N(t);
    if (n.includes('dron') && n.includes('inventari')) return 'Sí, es posible. Hay proveedores que usan drones para medir el volumen de los acopios y llevar el inventario de mineral con imágenes aéreas, sin medir a mano. Lo podemos publicar como desafío para que le propongan soluciones.';
    if (n.includes('dron')) return 'Sí, hay proveedores que trabajan con drones en minería, por ejemplo para medir acopios, revisar taludes o inspeccionar zonas de difícil acceso. Lo podemos publicar como desafío.';
    if (n.includes('inventari')) return 'Hay soluciones para llevar el inventario de mineral e insumos de forma digital y confiable. Lo podemos publicar como desafío.';
    if (n.includes('agua')) return 'Es un problema frecuente en la pequeña minería. Hay tecnologías para recircular y tratar el agua de proceso que se pueden probar en su planta.';
    if (n.includes('polvo')) return 'Entiendo, el polvo afecta la salud y la seguridad. Hay supresores, riego eficiente y sistemas de monitoreo que se pueden probar en sus caminos.';
    if (n.includes('diesel') || n.includes('energia') || n.includes('generador')) return 'Hay faenas que ya combinan energía solar con baterías para bajar el consumo de diésel. Es una buena idea para probar en su faena.';
    if (n.includes('talud') || n.includes('derrumbe')) return 'La seguridad es lo primero. Hay sistemas de monitoreo con sensores o radar que avisan a tiempo si el talud se mueve.';
    return 'Es un problema que tienen varias faenas y hay tecnologías que se pueden probar.';
  }
  function resumirTitulo(t) {
    const n = N(t);
    if (n.includes('chancad')) return 'Chancadora que se tapa con mineral húmedo';
    if (n.includes('agua')) return 'Reducir el consumo de agua en la faena';
    if (n.includes('polvo')) return 'Control de polvo en la faena';
    if (n.includes('energia') || n.includes('diesel') || n.includes('generador')) return 'Reducir el costo de energía en la faena';
    if (n.includes('talud') || n.includes('derrumbe')) return 'Monitoreo de estabilidad de taludes';
    if (n.includes('inventari') && n.includes('dron')) return 'Registro de inventario de mineral con drones';
    if (n.includes('inventari')) return 'Control digital del inventario de la faena';
    if (n.includes('dron')) return 'Uso de drones en la faena';
    let p = t.split(/[.,;?¿]/)[0].replace(/^(hola,?\s*)?(tengo|tenemos)\s+un\s+problema\s+(con|en)\s+/i, '').replace(/\s+y\s+(quiero|queremos|necesito).*/i, '');
    return p.charAt(0).toUpperCase() + p.slice(1, 70);
  }
  function categoriaDe(t) {
    const n = N(t);
    if (n.includes('talud') || n.includes('derrumbe')) return 'Seguridad';
    if (n.includes('chancad') || n.includes('molien')) return 'Chancado y molienda';
    if (n.includes('agua')) return 'Agua'; if (n.includes('polvo')) return 'Polvo y emisiones';
    if (n.includes('energia') || n.includes('diesel')) return 'Energía'; if (n.includes('talud')) return 'Seguridad';
    if (n.includes('dron') || n.includes('inventari') || n.includes('registro')) return 'Digitalización y datos';
    return 'Otro';
  }
  
  let fs = 17;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-acc]'); if (!b) return;
    if (b.dataset.acc === '+') fs = Math.min(23, fs + 2);
    if (b.dataset.acc === '-') fs = Math.max(15, fs - 2);
    document.documentElement.style.setProperty('--fs', fs + 'px');
    if (b.dataset.acc === 'c') { const on = document.body.classList.toggle('contraste'); b.setAttribute('aria-pressed', on); }
  });
  
  function ruta() {
    const h = location.hash || '#/';
    const p = h.slice(2).split('/');
    if (h === '#/salir') { ponerRol(null); location.hash = '#/ingresar'; return; }
    const exige = (r) => { if (rol !== r) { location.hash = '#/ingresar'; return false; } return true; };
    switch (p[0]) {
      case '': return inicio();
      case 'ingresar': return ingresar();
      case 'desafios': return listaPublica();
      case 'soluciones': return catalogo();
      case 'desafio': return detalle(p[1]);
      case 'pilotaje': return pilotaje(p[1]);
      case 'whatsapp': return rutaAgente();
      case 'p': if (!exige('productor')) return; return p[1] === 'nuevo' ? nuevoDesafio() : p[1] === 'desafios' ? misDesafios() : panelProductor();
      case 'v': if (!exige('proveedor')) return; return p[1] === 'soluciones' ? misSoluciones() : panelProveedor();
      case 'o': if (!exige('operador')) return;
        if (p[1] === 'desafios') return desafiosOperador();
        if (p[1] === 'match') return matchmaking(p[2] || 'GMT-0042');
        if (p[1] === 'indicadores') return indicadores();
        if (p[1] === 'contenidos') return contenidos();
        if (p[1] === 'usuarios') return usuarios();
        return bandeja();
      default: return noEncontrado();
    }
  }
  const Q = new URLSearchParams(location.search);
  if (Q.get('rol')) ponerRol(Q.get('rol'));
  if (Q.get('reiniciar')) { D = JSON.parse(JSON.stringify(DATOS_BASE)); guardar(); }
  window.addEventListener('hashchange', ruta);
  ruta();
  if (Q.get('demo') && location.hash === '#/whatsapp') {
    const clave = ESCENAS[Q.get('demo')] ? Q.get('demo') : ({ chat: 'problema' }[Q.get('demo')] || 'problema');
    setTimeout(() => { const b = document.querySelector('[data-esc="' + clave + '"]'); if (b) b.click(); }, 1500);
  }
})();
