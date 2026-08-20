import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons not showing in bundlers like Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom rider icon (emoji marker)
const riderIcon = L.divIcon({
  html: '<div style="font-size: 24px;">🛵</div>',
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const storeIcon = L.divIcon({
  html: '<div style="font-size: 22px;">🏠</div>',
  className: '',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
});

const homeIcon = L.divIcon({
  html: '<div style="font-size: 22px;">📍</div>',
  className: '',
  iconSize: [22, 22],
  iconAnchor: [11, 22],
});

// Mock coordinates around Bengaluru (Rajajinagar area)
const SELLER_LOCATION = [12.9915, 77.5540]; // seller/store
const CUSTOMER_LOCATION = [12.9865, 77.5610]; // delivery address

function DeliveryMap({ stageIndex }) {
  // Interpolate rider position along the route based on delivery stage (0-3)
  const progress = Math.min(stageIndex / 2, 1); // stages 0,1 = still at store-ish, 2 = out for delivery, 3 = arrived
  const riderLat = SELLER_LOCATION[0] + (CUSTOMER_LOCATION[0] - SELLER_LOCATION[0]) * progress;
  const riderLng = SELLER_LOCATION[1] + (CUSTOMER_LOCATION[1] - SELLER_LOCATION[1]) * progress;

  const midpoint = [
    (SELLER_LOCATION[0] + CUSTOMER_LOCATION[0]) / 2,
    (SELLER_LOCATION[1] + CUSTOMER_LOCATION[1]) / 2,
  ];

  return (
    <div className="w-full h-56 rounded-xl overflow-hidden shadow-sm">
      <MapContainer
        center={midpoint}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Polyline
          positions={[SELLER_LOCATION, CUSTOMER_LOCATION]}
          pathOptions={{ color: '#8B1E3F', weight: 3, dashArray: '6 6' }}
        />
        <Marker position={SELLER_LOCATION} icon={storeIcon}>
          <Popup>Seller location</Popup>
        </Marker>
        <Marker position={CUSTOMER_LOCATION} icon={homeIcon}>
          <Popup>Your delivery address</Popup>
        </Marker>
        {stageIndex >= 2 && stageIndex < 3 && (
          <Marker position={[riderLat, riderLng]} icon={riderIcon}>
            <Popup>Your delivery is on the way</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default DeliveryMap;