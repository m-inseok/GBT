import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ChevronLeft } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  padding-bottom: 60px;
`;

const Header = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.div`
  cursor: pointer;
  margin-right: 15px;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  flex: 1;
`;

const Form = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 0.95rem;
  outline: none;
  
  &:focus {
    border-color: #ff6b00;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  font-size: 0.95rem;
  outline: none;
  resize: none;
  
  &:focus {
    border-color: #ff6b00;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
`;

const ProfileSettingsPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      setLocation(userData.location || '');
      setIntroduction(userData.introduction || '');
      setNickname(userData.nickname || '');
      setLatitude(userData.latitude || null);
      setLongitude(userData.longitude || null);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocation(`위도: ${position.coords.latitude.toFixed(4)}, 경도: ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('위치 정보를 가져올 수 없습니다.');
        }
      );
    } else {
      alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          location,
          introduction,
          nickname,
          latitude,
          longitude
        }),
      });

      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...user, ...data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('프로필이 저장되었습니다.');
        navigate('/mypage');
      } else {
        alert(data.message || '저장 실패');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={24} color="#333" />
        </BackButton>
        <Title>프로필 설정</Title>
      </Header>

      <Form>
        <FormGroup>
          <Label>닉네임</Label>
          <Input
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>거주지</Label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              placeholder="예: 서울시 강남구"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              onClick={handleSetCurrentLocation}
              style={{
                padding: '0 15px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
                fontSize: '0.8rem',
                whiteSpace: 'nowrap'
              }}
            >
              현위치 설정
            </button>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>자기소개</Label>
          <TextArea
            placeholder="자신을 자유롭게 소개해 주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </FormGroup>

        <SaveButton onClick={handleSave}>저장하기</SaveButton>
      </Form>

      <Navbar />
    </Container>
  );
};

export default ProfileSettingsPage;
