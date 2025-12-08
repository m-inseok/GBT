import React, { useState } from 'react';
import { API_URL } from '../config';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  padding: 40px 20px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 1rem;
  margin-bottom: 15px;
  outline: none;
  
  &:focus {
    border-color: #ff6b00;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    background-color: #e65a00;
  }
`;

const LinkText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  
  span {
    color: #ff6b00;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        return;
      }

      const data = await res.json();

      // Store Access Token
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert('로그인되었습니다.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인</Button>
      <LinkText>
        계정이 없으신가요?
        <span onClick={() => navigate('/signup')}>회원가입</span>
      </LinkText>
    </Container>
  );
};

export default LoginPage;
