import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAP_BOX_TOKEN } from '../../utils/secretKey';
import useGetCoordinates from './useGetCoordinates';

const MapboxGeocoding = ({ address }) => {
    const [viewState, setViewState] = useState({
        longitude: 106.7009, // default: HCMC
        latitude: 10.7769,
        zoom: 100,
        pitch: 60,   // ✅ nghiêng bản đồ để nhìn 3D
        bearing: -17.6,
    });
    const [showPopup, setShowPopup] = useState(false);
    const [markerLocation, setMarkerLocation] = useState(null);
    const { isLoading, coordinates } = useGetCoordinates(address)

    useEffect(() => {
        if (isLoading || !coordinates) return;

        if (coordinates?.features.length > 0) {
            const [lng, lat] = coordinates.features[0].center;
            setMarkerLocation({ longitude: lng, latitude: lat });
            setViewState((prev) => ({
                ...prev,
                longitude: lng,
                latitude: lat,
                zoom: 16,
            }));
            setShowPopup(true);
        }

    }, [isLoading, coordinates]);

    return (
        <div className="p-4" style={{ height: '100vh', width: '100%' }}>
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                mapboxAccessToken={MAP_BOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v12" // streets hỗ trợ building 3D
            >
                {/* Navigation controls */}
                <NavigationControl position="top-right" />

                {/* Terrain DEM */}
                <Source
                    id="mapbox-dem"
                    type="raster-dem"
                    url="mapbox://mapbox.mapbox-terrain-dem-v1"
                    tileSize={512}
                    maxzoom={14}
                />

                {/* 3D buildings */}
                <Layer
                    id="3d-buildings"
                    source="composite"
                    source-layer="building"
                    filter={['==', 'extrude', 'true']}
                    type="fill-extrusion"
                    minzoom={15}
                    paint={{
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': ['get', 'height'],
                        'fill-extrusion-base': ['get', 'min_height'],
                        'fill-extrusion-opacity': 0.6,
                    }}
                />

                {/* Marker */}
                {markerLocation && (
                    <Marker
                        longitude={markerLocation.longitude}
                        latitude={markerLocation.latitude}
                        anchor="bottom"
                    >
                        <div
                            style={{
                                backgroundColor: '#ff5722',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                border: '2px solid white',
                                cursor: 'pointer',
                            }}
                            onClick={() => setShowPopup(true)}
                        />
                    </Marker>
                )}

                {/* Popup */}
                {showPopup && markerLocation && (
                    <Popup
                        longitude={markerLocation.longitude}
                        latitude={markerLocation.latitude}
                        anchor="top"
                        onClose={() => setShowPopup(false)}
                        closeButton={true}
                        closeOnClick={false}
                    >
                        <div style={{ padding: '10px' }}>
                            <h3>Thông tin vị trí</h3>
                            <p>Longitude: {markerLocation.longitude.toFixed(4)}</p>
                            <p>Latitude: {markerLocation.latitude.toFixed(4)}</p>
                            <p>Địa chỉ: {address}</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
};

export default MapboxGeocoding;
