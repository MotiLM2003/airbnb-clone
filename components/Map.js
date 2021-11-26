import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
const Map = ({ searchResults }) => {
  const coords = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coords);
  console.log(center);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 9,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  console.log(selectedLocation);
  return (
    <ReactMapGL
      mapStyle='mapbox://styles/motielmakies/ckwfpe7lp0i5c15t5w4j8668m'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }}
    >
      {searchResults.map((result, index) => {
        // console.log(result.long, ' ,', index);
        return (
          <div key={result.long}>
            <Marker longitude={result.long} latitude={result.lat}>
              <p
                onClick={() => setSelectedLocation(result)}
                className='cursor-pointer text-2xl animate-bounce '
              >
                📍
              </p>
            </Marker>
            {selectedLocation &&
              selectedLocation.long === result.long &&
              selectedLocation.lat === result.lat && (
                <Popup
                  onClose={() => setSelectedLocation(null)}
                  latitude={result.lat}
                  longitude={result.long}
                >
                  {result.title}
                </Popup>
              )}
          </div>
        );
      })}
    </ReactMapGL>
  );
};

export default Map;
