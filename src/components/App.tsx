import * as React from "react";
import Map from "./Map";
import Marker from "./Marker";
import { Wrapper } from "@googlemaps/react-wrapper";

const App: React.FC = () => {
  const [pins, setPins] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (event: google.maps.MapMouseEvent) => {
    setPins([...pins, event.latLng!]);
  };

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom());
    setCenter(map.getCenter()!.toJSON());
  };

  const inputs = (
    <div className="formInputs">
      <label htmlFor="zoom">Przybliżenie</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Szerokość</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Długość</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{pins.length === 0 ? "Naciśnij na mapę aby dodać pinezkę" : "Pinezki"}</h3>
      {pins.map((latLng, index) => (
        <>
        <p className="pinId">ID: {index}</p>
        <pre key={index}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
        </>
      ))}
      <button onClick={() => setPins([])}>Wyczyść</button>
    </div>
  );

  return (
    <div className="app">
        {inputs}
      <Wrapper apiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
        >
          {pins.map((latLng, index) => (
            <Marker key={index} position={latLng} />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};

export default App