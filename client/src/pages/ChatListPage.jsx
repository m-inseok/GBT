import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  padding-bottom: 60px; // Navbar height
`;

const Header = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f9f9f9;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  background-color: #eee;
`;

const ChatInfo = styled.div`
  flex: 1;
`;

const NameRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;

const Time = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const LastMessage = styled.div`
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const UnreadBadge = styled.span`
  background-color: #ff6b00;
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 10px;
`;

const ChatListPage = () => {
    const navigate = useNavigate();

    // Mock Data
    const chatRooms = [
        {
            id: 1,
            name: 'Aloha Morgan',
            avatar: 'https://placehold.co/50x50',
            lastMessage: '네, 다음 수업 시간에 뵙겠습니다!',
            time: '오후 2:30',
            unread: 2,
        },
        {
            id: 2,
            name: 'Minji Lee',
            avatar: 'https://placehold.co/50x50',
            lastMessage: '숙제 제출했습니다. 확인 부탁드려요.',
            time: '오전 11:15',
            unread: 0,
        },
        {
            id: 3,
            name: 'David Kim',
            avatar: 'https://placehold.co/50x50',
            lastMessage: '비즈니스 한국어 관련 질문이 있습니다.',
            time: '어제',
            unread: 1,
        },
        {
            id: 4,
            name: '스터디 그룹 A',
            avatar: 'https://placehold.co/50x50',
            lastMessage: '오늘 모임 장소 어디인가요?',
            time: '어제',
            unread: 5,
        },
    ];

    return (
        <Container>
            <Header>
                <Title>채팅</Title>
            </Header>
            <ChatList>
                {chatRooms.map((room) => (
                    <ChatItem key={room.id} onClick={() => navigate(`/chat/${room.id}`)}>
                        <Avatar src={room.avatar} alt={room.name} />
                        <ChatInfo>
                            <NameRow>
                                <Name>{room.name}</Name>
                                <Time>{room.time}</Time>
                            </NameRow>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <LastMessage>{room.lastMessage}</LastMessage>
                                {room.unread > 0 && <UnreadBadge>{room.unread}</UnreadBadge>}
                            </div>
                        </ChatInfo>
                    </ChatItem>
                ))}
            </ChatList>
            <Navbar />
        </Container>
    );
};

export default ChatListPage;
