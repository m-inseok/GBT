import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronRight, Plus, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import TutorList from '../components/TutorList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  padding-bottom: 60px; // Navbar height
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SearchBarContainer = styled.div`
  padding: 0 20px 15px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  padding: 0 15px 0 40px;
  font-size: 0.9rem;
  outline: none;
  
  &::placeholder {
    color: #aaa;
  }
`;

const TabContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 20px;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.div`
  padding: 10px 0;
  font-size: 0.95rem;
  color: ${props => props.$active ? '#ff6b00' : '#888'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  border-bottom: 2px solid ${props => props.$active ? '#ff6b00' : 'transparent'};
  white-space: nowrap;
  cursor: pointer;
`;

const SubTabContainer = styled.div`
  display: flex;
  padding: 15px 20px;
  gap: 15px;
  background-color: #f9f9f9;
`;

const SubTab = styled.span`
  font-size: 0.9rem;
  color: ${props => props.$active ? '#333' : '#888'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const MoreLink = styled.span`
  font-size: 0.85rem;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
`;

const Badge = styled.div`
  background-color: ${props => props.$color || '#ffebd9'};
  color: ${props => props.$textColor || '#ff6b00'};
  font-size: 0.7rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  min-width: 50px;
  text-align: center;
`;

const PostTitle = styled.div`
  font-size: 0.95rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const PopularPostCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 15px;
  cursor: pointer;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.$liked ? '#ff6b00' : '#999'};
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
  margin-left: auto;

  &:hover {
    background-color: #fff0e6;
  }
`;

const FloatingButton = styled.button`
  position: absolute;
  bottom: 80px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ff6b00;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
  cursor: pointer;
  z-index: 100;
  
  &:active {
    transform: scale(0.95);
  }
`;

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [activeSubTab, setActiveSubTab] = useState('전체');
  const [popularPosts, setPopularPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      const emailQuery = userData ? `&email=${userData.email}` : '';

      const popularRes = await fetch(`${API_URL}/posts?sort=popular${emailQuery}`);
      const latestRes = await fetch(`${API_URL}/posts?sort=latest${emailQuery}`);

      if (popularRes.ok) setPopularPosts(await popularRes.json());
      if (latestRes.ok) setLatestPosts(await latestRes.json());
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      if (res.ok) {
        fetchPosts(); // Refresh lists
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const navigate = useNavigate();

  const renderContent = () => {
    const showPopular = activeSubTab === '전체' || activeSubTab === '인기';
    const showLatest = activeSubTab === '전체' || activeSubTab === '최신';

    if (activeTab === '튜터찾기') {
      return (
        <Content>
          <TutorList />
        </Content>
      );
    }

    return (
      <Content>
        {showPopular && (
          <Section>
            <SectionHeader>
              <SectionTitle>인기 게시판</SectionTitle>
              <MoreLink>더보기 <ChevronRight size={14} /></MoreLink>
            </SectionHeader>
            <PostList>
              {popularPosts.map((post, index) => (
                <PopularPostCard key={post.id} onClick={() => navigate(`/community/post/${post.id}`)}>
                  <Badge>TOP {index + 1}</Badge>
                  <PostTitle style={{ fontWeight: 'bold', fontSize: '1rem' }}>{post.title}</PostTitle>
                  <LikeButton onClick={(e) => handleLike(e, post.id)} $liked={post.isLiked}>
                    <Heart size={16} fill={post.isLiked ? "#ff6b00" : "none"} />
                    {post.likes}
                  </LikeButton>
                </PopularPostCard>
              ))}
            </PostList>
          </Section>
        )}

        {showLatest && (
          <Section>
            <SectionHeader>
              <SectionTitle>최신 게시판</SectionTitle>
              <MoreLink>더보기 <ChevronRight size={14} /></MoreLink>
            </SectionHeader>
            <PostList>
              {latestPosts.map(post => (
                <PostItem key={post.id} onClick={() => navigate(`/community/post/${post.id}`)}>
                  <Badge $color="#ffe0e0" $textColor="#ff4d4f">NEW</Badge>
                  <PostTitle>{post.title}</PostTitle>
                  <LikeButton onClick={(e) => handleLike(e, post.id)} $liked={post.isLiked}>
                    <Heart size={16} fill={post.isLiked ? "#ff6b00" : "none"} />
                    {post.likes}
                  </LikeButton>
                </PostItem>
              ))}
            </PostList>
          </Section>
        )}
      </Content>
    );
  };

  return (
    <Container>
      <Header>
        <SearchInputContainer>
          <Search size={18} color="#aaa" />
          <SearchInput placeholder="원하는 글이나 사람을 찾아보세요" />
        </SearchInputContainer>
        <Bell size={24} color="#333" />
      </Header>

      <TabContainer>
        {['전체', '작성자', '지역', '튜터찾기', '친구찾기', '정보공유'].map(tab => (
          <Tab key={tab} $active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabContainer>

      <SubTabContainer style={{ display: activeTab === '튜터찾기' ? 'none' : 'flex' }}>
        <SubTab $active={activeSubTab === '전체'} onClick={() => setActiveSubTab('전체')}>전체</SubTab>
        <SubTab $active={activeSubTab === '인기'} onClick={() => setActiveSubTab('인기')}>인기</SubTab>
        <SubTab $active={activeSubTab === '최신'} onClick={() => setActiveSubTab('최신')}>최신</SubTab>
      </SubTabContainer>

      {renderContent()}

      <Navbar />
      <FloatingButton onClick={() => window.location.href = '/community/create'}>
        <Plus size={24} color="white" />
      </FloatingButton>
    </Container>
  );
};

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
  background-color: #f5f6f8;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-right: 10px;
`;

export default CommunityPage;
