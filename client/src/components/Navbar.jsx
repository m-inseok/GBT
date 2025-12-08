import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, MessageSquare, User } from 'lucide-react';

const NavContainer = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 1000;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? '#ff6b00' : '#888'};
  font-size: 0.75rem;
  cursor: pointer;

  svg {
    margin-bottom: 4px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavContainer>
      <NavItem $active={currentPath === '/'} onClick={() => navigate('/')}>
        <Home size={24} />
        <span>홈</span>
      </NavItem>
      <NavItem $active={currentPath === '/learning'} onClick={() => navigate('/learning')}>
        <BookOpen size={24} />
        <span>학습</span>
      </NavItem>
      <NavItem $active={currentPath === '/community'} onClick={() => navigate('/community')}>
        <Users size={24} />
        <span>커뮤니티</span>
      </NavItem>
      <NavItem $active={currentPath.startsWith('/chat')} onClick={() => navigate('/chat')}>
        <MessageSquare size={24} />
        <span>채팅</span>
      </NavItem>
      <NavItem $active={currentPath === '/mypage'} onClick={() => navigate('/mypage')}>
        <User size={24} />
        <span>마이</span>
      </NavItem>
    </NavContainer>
  );
};

export default Navbar;
