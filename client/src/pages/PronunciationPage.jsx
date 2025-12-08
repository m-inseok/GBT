import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mic, RefreshCw, Volume2 } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const Header = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 15px;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  flex: 1;
`;

const Content = styled.div`
  padding: 30px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TargetCard = styled.div`
  width: 100%;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 20px;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
`;

const TargetText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
`;

const TargetSub = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin: 0;
`;

const AudioButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: 1px solid #eee;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(255, 107, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 107, 0, 0); }
`;

const MicButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.$recording ? '#ff6b00' : '#f5f6f8'};
  color: ${props => props.$recording ? 'white' : '#333'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 30px;
  transition: all 0.3s;
  animation: ${props => props.$recording ? pulse : 'none'} 2s infinite;

  &:hover {
    background-color: ${props => props.$recording ? '#e65c00' : '#eee'};
  }
`;

const StatusText = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 40px;
`;

const ResultSection = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  animation: fadeIn 0.5s ease;
`;

const Score = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b00;
  margin-bottom: 10px;
`;

const Feedback = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 500;
`;

const UserText = styled.p`
  font-size: 0.9rem;
  color: #666;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
`;

const PronunciationPage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [status, setStatus] = useState('마이크 버튼을 눌러 말해보세요');

  const targetText = "안녕하세요, 만나서 반갑습니다.";

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'ko-KR';

      speechRecognition.onstart = () => {
        setIsRecording(true);
        setStatus('듣고 있어요...');
      };

      speechRecognition.onend = () => {
        setIsRecording(false);
        setStatus('분석 중입니다...');
      };

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        analyzePronunciation(transcript);
      };

      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        setStatus('오류가 발생했습니다. 다시 시도해주세요.');
      };

      setRecognition(speechRecognition);
    } else {
      setStatus('이 브라우저는 음성 인식을 지원하지 않습니다.');
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
    } else {
      setResult(null);
      recognition.start();
    }
  };

  const analyzePronunciation = async (userText) => {
    try {
      const res = await fetch(`${API_URL}/pronunciation/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userText, targetText }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
        setStatus('분석 완료!');
      } else {
        setStatus('서버 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('Error analyzing pronunciation:', err);
      setStatus('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={24} color="#333" />
        </BackButton>
        <Title>발음 교정</Title>
      </Header>
      <Content>
        <TargetCard>
          <AudioButton onClick={() => {
            const utterance = new SpeechSynthesisUtterance(targetText);
            utterance.lang = 'ko-KR';
            window.speechSynthesis.speak(utterance);
          }}>
            <Volume2 size={18} />
          </AudioButton>
          <TargetText>{targetText}</TargetText>
          <TargetSub>Hello, nice to meet you.</TargetSub>
        </TargetCard>

        <MicButton
          onClick={toggleRecording}
          $recording={isRecording}
          disabled={!recognition}
        >
          <Mic size={32} />
        </MicButton>

        <StatusText>{status}</StatusText>

        {result && (
          <ResultSection>
            <Score>{result.score}점</Score>
            <Feedback>{result.feedback}</Feedback>
            <UserText>인식된 발음: "{result.userText}"</UserText>
            <button
              onClick={() => setResult(null)}
              style={{
                marginTop: '15px',
                background: 'none',
                border: 'none',
                color: '#ff6b00',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                width: '100%'
              }}
            >
              <RefreshCw size={16} /> 다시 시도하기
            </button>
          </ResultSection>
        )}
      </Content>
    </Container>
  );
};

export default PronunciationPage;
