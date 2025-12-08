import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const Header = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 10;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #f5f6f8;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 0.95rem;
  line-height: 1.4;
  position: relative;
  align-self: ${props => props.$isMe ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.$isMe ? '#ff6b00' : 'white'};
  color: ${props => props.$isMe ? 'white' : '#333'};
  border-top-right-radius: ${props => props.$isMe ? '2px' : '15px'};
  border-top-left-radius: ${props => props.$isMe ? '15px' : '2px'};
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  color: #999;
  margin-top: 5px;
  align-self: ${props => props.$isMe ? 'flex-end' : 'flex-start'};
  margin: 0 5px;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isMe ? 'flex-end' : 'flex-start'};
`;

const InputArea = styled.div`
  padding: 15px 20px;
  background-color: white;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #ff6b00;
  }
`;

const SendButton = styled.button`
  background-color: #ff6b00;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:disabled {
    background-color: #ddd;
    cursor: default;
  }
`;

const ChatRoomPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    // Mock Data based on ID
    useEffect(() => {
        // In a real app, fetch messages for room `id`
        setMessages([
            { id: 1, text: '안녕하세요! 수업 관련 문의드립니다.', isMe: false, time: '오후 2:00' },
            { id: 2, text: '네, 안녕하세요! 어떤 점이 궁금하신가요?', isMe: true, time: '오후 2:05' },
            { id: 3, text: '다음 수업 일정 변경이 가능할까요?', isMe: false, time: '오후 2:10' },
            { id: 4, text: '네, 가능합니다. 언제로 변경 원하시나요?', isMe: true, time: '오후 2:12' },
            { id: 5, text: '이번 주 금요일 오후 4시 괜찮으신가요?', isMe: false, time: '오후 2:15' },
        ]);
    }, [id]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            isMe: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} color="#333" />
                </BackButton>
                <HeaderTitle>채팅방 {id}</HeaderTitle> {/* Replace with actual name */}
            </Header>

            <MessageList>
                {messages.map((msg) => (
                    <MessageGroup key={msg.id} $isMe={msg.isMe}>
                        <MessageBubble $isMe={msg.isMe}>
                            {msg.text}
                        </MessageBubble>
                        <MessageTime $isMe={msg.isMe}>{msg.time}</MessageTime>
                    </MessageGroup>
                ))}
                <div ref={messagesEndRef} />
            </MessageList>

            <InputArea>
                <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                />
                <SendButton onClick={handleSend} disabled={!inputText.trim()}>
                    <Send size={18} />
                </SendButton>
            </InputArea>
        </Container>
    );
};

export default ChatRoomPage;
