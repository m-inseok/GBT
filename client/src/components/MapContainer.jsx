import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const MapContainer = () => {
    const mapElement = useRef(null);
    const [myLocation, setMyLocation] = useState(null);

    useEffect(() => {
        // Get User Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMyLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    // Fallback to default location (Daejeon City Hall)
                    setMyLocation({ lat: 36.3504119, lng: 127.3845475 });
                }
            );
        } else {
            // Fallback if geolocation is not supported
            setMyLocation({ lat: 36.3504119, lng: 127.3845475 });
        }
    }, []);

    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver || !myLocation) return;

        // Initialize Map
        const location = new naver.maps.LatLng(myLocation.lat, myLocation.lng);
        const mapOptions = {
            center: location,
            zoom: 15,
            zoomControl: false,
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);

        // My Location Marker
        new naver.maps.Marker({
            position: location,
            map: map,
            icon: {
                content: `
                    <div style="
                        width: 20px; 
                        height: 20px; 
                        background-color: #ff6b00; 
                        border: 3px solid white; 
                        border-radius: 50%; 
                        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                    "></div>
                `,
                anchor: new naver.maps.Point(10, 10),
            },
        });
    }, [myLocation]);

    return (
        <MapWrapper ref={mapElement} />
    );
};

export default MapContainer;
