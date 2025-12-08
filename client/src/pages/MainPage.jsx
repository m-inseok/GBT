import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import MapContainer from '../components/MapContainer';
import BottomSheet from '../components/BottomSheet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const CategoryContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 0 20px;
  display: flex;
  gap: 10px;
  z-index: 10;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: ${props => props.$active ? '#ff6b00' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#e65c00' : '#f5f5f5'};
  }
`;

const MainPage = () => {
    const [places, setPlaces] = useState([]);
    const [category, setCategory] = useState('all');
    const [location, setLocation] = useState({ lat: 37.5973, lng: 127.0588 }); // Default HUFS Seoul Campus

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, []);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                let url = `${API_URL}/places/near?lat=${location.lat}&lng=${location.lng}`;
                if (category !== 'all') {
                    url += `&category=${category}`;
                }
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setPlaces(data);
                }
            } catch (err) {
                console.error('Failed to fetch places:', err);
            }
        };

        fetchPlaces();
    }, [location, category]);

    const categories = [
        { id: 'all', label: '전체' },
        { id: 'medical', label: '의료' },
        { id: 'financial', label: '금융' },
        { id: 'residential', label: '주거' },
    ];

    return (
        <Container>
            <SearchBar />
            <CategoryContainer>
                {categories.map(cat => (
                    <CategoryButton
                        key={cat.id}
                        $active={category === cat.id}
                        onClick={() => setCategory(cat.id)}
                    >
                        {cat.label}
                    </CategoryButton>
                ))}
            </CategoryContainer>
            <MapContainer places={places} center={location} />
            <BottomSheet hospitals={places} />
            <Navbar />
        </Container>
    );
};

export default MainPage;
