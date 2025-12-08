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

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: ${props => props.$checked ? '#4CAF50' : '#333'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  font-size: 0.85rem;
  color: ${props => props.$success ? '#4CAF50' : '#ff4444'};
  margin-top: 5px;
  margin-left: 5px;
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailCheck, setEmailCheck] = useState({ checked: false, available: false, message: '' });
  const [nicknameCheck, setNicknameCheck] = useState({ checked: false, available: false, message: '' });

  const handleCheckEmail = async () => {
    if (!email) return;
    try {
      const res = await fetch(`${API_URL}/auth/check-email?email=${email}`);
      const data = await res.json();
      if (data.available) {
        setEmailCheck({ checked: true, available: true, message: '사용 가능한 이메일입니다.' });
      } else {
        setEmailCheck({ checked: true, available: false, message: '이미 사용 중인 이메일입니다.' });
      }
    } catch (err) {
      console.error(err);
      setEmailCheck({ checked: true, available: false, message: '오류가 발생했습니다.' });
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname) return;
    try {
      const res = await fetch(`${API_URL}/auth/check-nickname?nickname=${nickname}`);
      const data = await res.json();
      if (data.available) {
        setNicknameCheck({ checked: true, available: true, message: '사용 가능한 닉네임입니다.' });
      } else {
        setNicknameCheck({ checked: true, available: false, message: '이미 사용 중인 닉네임입니다.' });
      }
    } catch (err) {
      console.error(err);
      setNicknameCheck({ checked: true, available: false, message: '오류가 발생했습니다.' });
    }
  };

  const handleSignup = async () => {
    if (!emailCheck.available || !nicknameCheck.available) {
      alert('중복 확인을 완료해주세요.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nickname, password }),
      });
      const data = await res.json();
      if (data.success) {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>

      <InputGroup>
        <InputWrapper>
          <Input
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameCheck({ checked: false, available: false, message: '' });
            }}
          />
          <CheckButton
            onClick={handleCheckNickname}
            disabled={!nickname}
            $checked={nicknameCheck.available}
          >
            중복확인
          </CheckButton>
        </InputWrapper>
        {nicknameCheck.message && (
          <Message $success={nicknameCheck.available}>{nicknameCheck.message}</Message>
        )}
      </InputGroup>

      <InputGroup>
        <InputWrapper>
          <Input
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailCheck({ checked: false, available: false, message: '' });
            }}
          />
          <CheckButton
            onClick={handleCheckEmail}
            disabled={!email}
            $checked={emailCheck.available}
          >
            중복확인
          </CheckButton>
        </InputWrapper>
        {emailCheck.message && (
          <Message $success={emailCheck.available}>{emailCheck.message}</Message>
        )}
      </InputGroup>

      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSignup}>가입하기</Button>

      <LinkText>
        이미 계정이 있으신가요?
        <span onClick={() => navigate('/login')}>로그인</span>
      </LinkText>
    </Container>
  );
};

export default SignupPage;
