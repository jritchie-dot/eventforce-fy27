/* Keep Leaflet available when WebGL or the globe library is unavailable. */
function createEventGlobe({ events, map, getOwnerColor, openEvent }) {
  const mapElement = document.getElementById('map');
  const card = mapElement.parentElement;
  const toolbar = document.createElement('div');
  toolbar.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px';
  const host = document.createElement('div');
  host.style.cssText = 'height:400px;overflow:hidden;border-radius:6px;background:#0a0914';
  host.setAttribute('role', 'group');
  host.setAttribute('aria-label', '3D globe of event locations. Event details are also available in the event table.');
  const button = (text, action) => {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'gq-btn';
    element.textContent = text;
    element.style.minHeight = '32px';
    element.onclick = action;
    toolbar.appendChild(element);
    return element;
  };
  let globe;
  let showing = true;
  let rotating = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;
  const syncRotation = () => {
    globe.controls().autoRotate = rotating && showing && visible && !document.hidden;
    pause.textContent = rotating ? 'Pause rotation' : 'Resume rotation';
  };
  const pause = button('Pause rotation', () => { rotating = !rotating; syncRotation(); });
  const toggle = button('Show 2D map', () => {
    showing = !showing;
    host.hidden = !showing;
    mapElement.style.display = showing ? 'none' : '';
    pause.hidden = !showing;
    toggle.textContent = showing ? 'Show 2D map' : 'Show 3D globe';
    syncRotation();
    if (showing) resize();
    else map.invalidateSize();
  });
  const resize = () => globe.width(host.clientWidth).height(400);
  try {
    if (typeof Globe !== 'function') return null;
    card.insertBefore(toolbar, mapElement);
    card.insertBefore(host, mapElement);
    globe = Globe({ rendererConfig: { preserveDrawingBuffer: true } })(host)
      .backgroundColor('#0a0914')
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe@2.44.0/example/img/earth-blue-marble.jpg')
      .showAtmosphere(true)
      .atmosphereColor('#1b96ff')
      .atmosphereAltitude(0.16)
      .htmlLat('lat').htmlLng('lng').htmlAltitude(0.02)
      .htmlElement(event => {
        const pin = document.createElement('button');
        pin.type = 'button';
        pin.className = 'map-avatar-pin' + (event.attendees === null ? ' upcoming' : '');
        pin.style.background = getOwnerColor(event.owner === '—' ? '__unassigned__' : event.owner);
        pin.style.opacity = event.attendees === null ? '0.7' : '1';
        pin.textContent = event.owner && event.owner !== '—'
          ? event.owner.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase() : '?';
        pin.title = `${event.name} - ${event.city}`;
        pin.setAttribute('aria-label', `View ${event.name}, ${event.city}`);
        pin.onclick = () => openEvent(event.name);
        pin.onfocus = () => { globe.controls().autoRotate = false; };
        pin.onblur = syncRotation;
        return pin;
      })
      .htmlElementsData(events);
    globe.pointOfView({ lat: 20, lng: 10, altitude: 2.2 });
    globe.controls().autoRotateSpeed = 0.45;
    globe.controls().enableZoom = false;
    button('Zoom in', () => globe.pointOfView({ altitude: Math.max(0.5, globe.pointOfView().altitude * 0.8) }));
    button('Zoom out', () => globe.pointOfView({ altitude: Math.min(5, globe.pointOfView().altitude * 1.25) }));
    button('Rotate left', () => globe.pointOfView({ lng: globe.pointOfView().lng - 25 }));
    button('Rotate right', () => globe.pointOfView({ lng: globe.pointOfView().lng + 25 }));
    mapElement.style.display = 'none';
    new ResizeObserver(resize).observe(host);
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncRotation();
      if (visible && !document.hidden) globe.resumeAnimation();
      else globe.pauseAnimation();
    }).observe(host);
    document.addEventListener('visibilitychange', () => {
      syncRotation();
      if (!document.hidden && visible) globe.resumeAnimation();
      else globe.pauseAnimation();
    });
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
      rotating = !event.matches;
      syncRotation();
    });
    resize();
    syncRotation();
    return { filter: names => globe.htmlElementsData(events.filter(event => names.has(event.name))) };
  } catch (error) {
    if (globe) globe.pauseAnimation();
    host.remove();
    toolbar.remove();
    mapElement.style.display = '';
    map.invalidateSize();
    console.warn('3D globe unavailable; using the 2D map.', error);
    return null;
  }
}
