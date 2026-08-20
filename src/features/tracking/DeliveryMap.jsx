import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const storeIcon = L.divIcon({
  html: '<div style="font-size:22px; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));">🏠</div>',
  className: '',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
});

const homeIcon = L.divIcon({
  html: '<div style="font-size:22px; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));">📍</div>',
  className: '',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
});

function riderIconWithRotation(angle) {
  return L.divIcon({
    html: `<div style="font-size:26px; transform: rotate(${angle}deg); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">🛵</div>`,
    className: '',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

const SELLER_LOCATION = [12.9915, 77.5540];
const CUSTOMER_LOCATION = [12.9865, 77.5610];

// Slight bend in the route so it doesn't look like a straight ruler line
const ROUTE = [
  SELLER_LOCATION,
  [12.9898, 77.5565],
  [12.9880, 77.5588],
  CUSTOMER_LOCATION,
];

function totalRouteLength(points) {
  let len = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [lat1, lng1] = points[i];
    const [lat2, lng2] = points[i + 1];
    len += Math.hypot(lat2 - lat1, lng2 - lng1);
  }
  return len;
}

function pointAtProgress(points, t) {
  const total = totalRouteLength(points);
  let target = total * t;
  for (let i = 0; i < points.length - 1; i++) {
    const [lat1, lng1] = points[i];
    const [lat2, lng2] = points[i + 1];
    const segLen = Math.hypot(lat2 - lat1, lng2 - lng1);
    if (target <= segLen || i === points.length - 2) {
      const ratio = segLen === 0 ? 0 : target / segLen;
      const lat = lat1 + (lat2 - lat1) * ratio;
      const lng = lng1 + (lng2 - lng1) * ratio;
      const angle = (Math.atan2(lng2 - lng1, lat2 - lat1) * 180) / Math.PI;
      return { position: [lat, lng], angle };
    }
    target -= segLen;
  }
  return { position: points[points.length - 1], angle: 0 };
}

function RecenterOnRider({ position, follow }) {
  const map = useMap();
  useEffect(() => {
    if (follow) map.panTo(position, { animate: true, duration: 0.5 });
  }, [position, follow, map]);
  return null;
}

function DeliveryMap({ isActive, isDelivered }) {
  const [progress, setProgress] = useState(isDelivered ? 1 : 0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const DURATION_MS = 9000; // how long the "on the way" animation takes

  useEffect(() => {
    if (!isActive || isDelivered) {
      if (isDelivered) setProgress(1);
      return;
    }
    startRef.current = performance.now();
    function tick(now) {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / DURATION_MS, 1);
      setProgress(t);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, isDelivered]);

  const { position: riderPosition, angle } = pointAtProgress(ROUTE, progress);
  const midpoint = [
    (SELLER_LOCATION[0] + CUSTOMER_LOCATION[0]) / 2,
    (SELLER_LOCATION[1] + CUSTOMER_LOCATION[1]) / 2,
  ];

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm relative">
      <MapContainer
        center={midpoint}
        zoom={14.5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Polyline positions={ROUTE} pathOptions={{ color: '#8B1E3F', weight: 4, opacity: 0.85 }} />
        <Marker position={SELLER_LOCATION} icon={storeIcon} />
        <Marker position={CUSTOMER_LOCATION} icon={homeIcon} />
        {(isActive || isDelivered) && (
          <>
            <Marker position={riderPosition} icon={riderIconWithRotation(angle)} />
            <RecenterOnRider position={riderPosition} follow={isActive && !isDelivered} />
          </>
        )}
      </MapContainer>

      {isActive && !isDelivered && (
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#8B1E3F] shadow flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live tracking
        </div>
      )}
    </div>
  );
}

export default DeliveryMap;