import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import styled from 'styled-components';
import { Globe, ChevronRight, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';

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
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const HeaderTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;

const GlobeIcon = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

const TabContainer = styled.div`
  display: flex;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  flex: 1;
  padding: 12px 0;
  text-align: center;
  background-color: ${props => props.$active ? 'white' : '#f5f6f8'};
  color: ${props => props.$active ? '#ff6b00' : '#888'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: ${props => props.$active ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'};
`;

const ProfileSection = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 15px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Flag = styled.span`
  font-size: 1rem;
`;

const UserEmail = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
`;

const UserAddress = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 2px;
`;

const ProfileButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #eee;
  background-color: white;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #555;
  cursor: pointer;
`;

const MenuSection = styled.div`
  padding: 0 20px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const MenuItem = styled.div`
  padding: 15px 0;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  margin: 0 20px 30px 20px;
  padding: 15px 0;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 12px;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
`;

// Learning Tab Styles
const LectureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
`;

const LectureCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const LectureImage = styled.img`
  width: 100%;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const LectureTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.6em; // Fixed height for 2 lines
`;

const LectureMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

const Instructor = styled.span`
  color: #888;
`;

const Progress = styled.span`
  color: #ff6b00;
  font-weight: bold;
`;

const QuizList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuizItem = styled.div`
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusBadge = styled.span`
  background-color: #ffebd9;
  color: #ff6b00;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

const QuizTitle = styled.div`
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 360px;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 20px 0;
  text-align: center;
  color: #333;
`;

const ModalInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 0.95rem;
  margin-bottom: 15px;
  outline: none;
  
  &:focus {
    border-color: #ff6b00;
  }
`;

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
  display: flex;
  align-items: center;
  margin-top: -7px; // Adjust for margin-bottom of input
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ModalButton = styled.button`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${props => props.$primary ? '#ff6b00' : '#f5f6f8'};
  color: ${props => props.$primary ? 'white' : '#555'};
`;

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('일반');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const userStr = localStorage.getItem('user');
  const [user, setUser] = useState(userStr ? JSON.parse(userStr) : { nickname: '게스트', email: '', isSubscribed: false });

  const handleSubscriptionToggle = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...user, isSubscribed: data.isSubscribed };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert(data.message);
      } else {
        alert(data.message || '구독 상태 변경 실패');
      }
    } catch (err) {
      console.error('Error toggling subscription:', err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const [address, setAddress] = useState('위치 확인 중...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(getAddressFromCoords(latitude, longitude));
        },
        (error) => {
          console.error('Error getting location:', error);
          setAddress('위치 정보 없음');
        }
      );
    } else {
      setAddress('위치 정보 없음');
    }
  }, []);

  const getAddressFromCoords = (lat, lng) => {
    // Mock Reverse Geocoding Logic

    // HUFS Seoul Campus (approx: 37.5973, 127.0588)
    const distHUFS = Math.sqrt(Math.pow(lat - 37.5973, 2) + Math.pow(lng - 127.0588, 2));
    if (distHUFS < 0.02) return '서울시 동대문구';

    // Yongin Cheoin-gu (approx: 37.2345, 127.2017)
    const distYongin = Math.sqrt(Math.pow(lat - 37.2345, 2) + Math.pow(lng - 127.2017, 2));
    if (distYongin < 0.05) return '용인시 처인구';

    // Cheongju Heungdeok-gu (approx: 36.6375, 127.4697)
    const distCheongju = Math.sqrt(Math.pow(lat - 36.6375, 2) + Math.pow(lng - 127.4697, 2));
    if (distCheongju < 0.05) return '청주시 흥덕구';

    return '00시 00구';
  };

  const handlePasswordReset = async () => {
    // ... (existing code)
  };

  return (
    <Container>
      {/* ... (existing header) */}
      <Header>
        <HeaderTitle>마이페이지</HeaderTitle>
        <GlobeIcon>
          <Globe size={24} color="#333" />
        </GlobeIcon>
      </Header>

      <TabContainer>
        <Tab $active={activeTab === '일반'} onClick={() => setActiveTab('일반')}>일반</Tab>
        <Tab $active={activeTab === '학습'} onClick={() => setActiveTab('학습')}>학습</Tab>
      </TabContainer>

      <ProfileSection>
        <ProfileImage src="https://placehold.co/60" alt="Profile" />
        <ProfileInfo>
          <Name>{user.nickname} <Flag>🇰🇷</Flag></Name>
          {activeTab === '일반' && (
            <>
              <UserEmail>{user.email}</UserEmail>
              <UserAddress>{address}</UserAddress>
            </>
          )}
        </ProfileInfo>
        <ProfileButton onClick={() => window.location.href = '/profile-settings'}>프로필 설정</ProfileButton>
      </ProfileSection>

      {activeTab === '일반' ? (
        <>
          <MenuSection>
            <SectionTitle>정보관리</SectionTitle>
            <MenuItem onClick={() => setIsPasswordModalOpen(true)}>비밀번호 재설정</MenuItem>
            <MenuItem onClick={() => setIsSubscriptionModalOpen(true)}>구독관리</MenuItem>
            <MenuItem>결제 수단 관리</MenuItem>
            <MenuItem>커뮤니티</MenuItem>
            <MenuItem>리뷰</MenuItem>
          </MenuSection>

          <MenuSection>
            <SectionTitle>고객센터</SectionTitle>
            <MenuItem>FAQ</MenuItem>
            <MenuItem>문의하기</MenuItem>
            <MenuItem>공지사항</MenuItem>
          </MenuSection>

          <LogoutButton onClick={() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            alert('로그아웃 되었습니다.');
            window.location.href = '/login'; // Redirect to login
          }}>로그아웃</LogoutButton>
        </>
      ) : (
        <>
          <MenuSection>
            <SectionTitle>강의목록</SectionTitle>
            <LectureGrid>
              <LectureCard>
                <LectureImage src="https://placehold.co/160x100" />
                <LectureTitle>HSK 4급 완전 정복! 빈출 문법과 단어 총정리</LectureTitle>
                <LectureMeta>
                  <Instructor>메이쌤</Instructor>
                  <Progress>42 %</Progress>
                </LectureMeta>
              </LectureCard>
              <LectureCard>
                <LectureImage src="https://placehold.co/160x100" />
                <LectureTitle>TOPIK 2급 합격 완성 코스 - 문법·쓰기·듣기까지</LectureTitle>
                <LectureMeta>
                  <Instructor>김나연</Instructor>
                  <Progress>62 %</Progress>
                </LectureMeta>
              </LectureCard>
              <LectureCard>
                <LectureImage src="https://placehold.co/160x100" />
                <LectureTitle>토익 700-&gt;900 단기 돌파 전략 - 빈출 문제 완전 분석</LectureTitle>
                <LectureMeta>
                  <Instructor>Aisha Morgan</Instructor>
                  <Progress>12 %</Progress>
                </LectureMeta>
              </LectureCard>
            </LectureGrid>
          </MenuSection>

          <MenuSection>
            <SectionTitle>퀴즈 현황</SectionTitle>
            <QuizList>
              <QuizItem>
                <StatusBadge>진행중</StatusBadge>
                <QuizTitle>24. 다음 중 'apple'을 한국어로 올바르게 ...</QuizTitle>
              </QuizItem>
              <QuizItem>
                <StatusBadge>진행중</StatusBadge>
                <QuizTitle>25. TOPIK 필수 문법 퀴즈 - 조사 '은/는' ...</QuizTitle>
              </QuizItem>
              <QuizItem>
                <StatusBadge>진행중</StatusBadge>
                <QuizTitle>26. 생활 속 표현 테스트 - 식당에서 자주 ...</QuizTitle>
              </QuizItem>
            </QuizList>
          </MenuSection>
        </>
      )}

      {isPasswordModalOpen && (
        <ModalOverlay onClick={() => {
          setIsPasswordModalOpen(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>비밀번호 재설정</ModalTitle>
            <PasswordInputWrapper>
              <ModalInput
                type={showPassword ? "text" : "password"}
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </EyeIcon>
            </PasswordInputWrapper>

            <PasswordInputWrapper>
              <ModalInput
                type={showPassword ? "text" : "password"}
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </EyeIcon>
            </PasswordInputWrapper>

            <PasswordInputWrapper>
              <ModalInput
                type={showPassword ? "text" : "password"}
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </EyeIcon>
            </PasswordInputWrapper>

            <ModalButtonContainer>
              <ModalButton onClick={() => {
                setIsPasswordModalOpen(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}>취소</ModalButton>
              <ModalButton $primary onClick={handlePasswordReset}>변경하기</ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {isSubscriptionModalOpen && (
        <ModalOverlay onClick={() => setIsSubscriptionModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>구독 관리</ModalTitle>
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.1rem' }}>
              현재 상태: <span style={{ color: user.isSubscribed ? '#ff6b00' : '#888', fontWeight: 'bold' }}>
                {user.isSubscribed ? '구독중' : '미구독'}
              </span>
            </div>
            <ModalButtonContainer>
              <ModalButton onClick={() => setIsSubscriptionModalOpen(false)}>닫기</ModalButton>
              <ModalButton $primary onClick={handleSubscriptionToggle}>
                {user.isSubscribed ? '구독 취소' : '구독하기'}
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      <Navbar />
    </Container>
  );
};

export default MyPage;
