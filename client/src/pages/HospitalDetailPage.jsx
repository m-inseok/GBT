import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Share2, MoreHorizontal, MapPin, Clock, Globe, Phone, Copy, ChevronRight, Bookmark } from 'lucide-react';
import { API_URL } from '../config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  position: relative;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const BackButton = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;

const HeaderAction = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageSection = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  background-color: #f0f0f0;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageDots = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.$active ? 'white' : 'rgba(255,255,255,0.5)'};
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -20px;
  position: relative;
  z-index: 5;
  padding-bottom: 80px; // Space for bottom bar
`;

const TitleSection = styled.div`
  padding: 25px 20px 15px 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #ffebd9;
  border-radius: 50%;
  color: #ff6b00;
  font-size: 14px;
  margin-right: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  flex: 1;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #ff6b00;
  font-weight: bold;
  font-size: 0.9rem;
  
  svg {
    fill: #ff6b00;
    margin-right: 4px;
  }
`;

const ReviewCount = styled.span`
  color: #888;
  font-weight: normal;
  margin-left: 4px;
  font-size: 0.85rem;
`;

const StatusRow = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 6px;
`;

const Status = styled.span`
  color: #ff6b00;
  font-weight: bold;
`;

const AddressRow = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 12px;
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  background-color: #f5f6f8;
  color: #666;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 15px 0;
  font-size: 0.95rem;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  color: ${props => props.$active ? '#333' : '#888'};
  border-bottom: 2px solid ${props => props.$active ? '#333' : 'transparent'};
  cursor: pointer;
`;

const Section = styled.div`
  padding: 20px;
  border-bottom: 8px solid #f5f6f8;
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #333;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  width: 24px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  color: #888;
`;

const InfoContent = styled.div`
  flex: 1;
  line-height: 1.5;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
`;

const ReviewSection = styled.div`
  padding: 20px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ReviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;

const ReviewNotice = styled.div`
  background-color: #fff0e6;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #ff6b00;
  font-weight: 500;
  display: flex;
  gap: 10px;
`;

const ReviewItem = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const ReviewUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserMeta = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const ReviewText = styled.div`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
`;

const MoreReviews = styled.button`
  width: 100%;
  padding: 15px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
  margin-top: 10px;
`;

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 15px 20px;
  display: flex;
  gap: 15px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  z-index: 20;
`;

const ActionButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #eee;
  background-color: ${props => props.$primary ? '#ff6b00' : 'white'};
  color: ${props => props.$primary ? 'white' : '#555'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: ${props => props.$wide ? 1 : 'none'};
  font-size: ${props => props.$wide ? '1rem' : '0.8rem'};
  font-weight: ${props => props.$wide ? 'bold' : 'normal'};
`;

const HospitalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('홈');
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const [placeRes, reviewsRes, summaryRes] = await Promise.all([
          fetch(`${API_URL}/places/${id}`),
          fetch(`${API_URL}/places/${id}/reviews`),
          fetch(`${API_URL}/places/${id}/summary`)
        ]);

        if (placeRes.ok) {
          const data = await placeRes.json();
          setHospital(data);
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }

        if (summaryRes.ok) {
          const summaryData = await summaryRes.text(); // Summary returns plain text
          setSummary(summaryData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/places/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          content: reviewContent,
          rating: reviewRating
        }),
      });

      if (res.ok) {
        alert('리뷰가 등록되었습니다!');
        setIsReviewModalOpen(false);
        setReviewContent('');
        setReviewRating(5);

        // Refresh reviews and summary
        const reviewsRes = await fetch(`${API_URL}/places/${id}/reviews`);
        if (reviewsRes.ok) setReviews(await reviewsRes.json());

        // Optionally refresh summary (might take time/cost, so maybe not every time on production)
        const summaryRes = await fetch(`${API_URL}/places/${id}/summary`);
        if (summaryRes.ok) setSummary(await summaryRes.text());

      } else {
        alert('리뷰 등록 실패');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!hospital) return <div>Place not found</div>;

  // Default values if missing
  const phone = hospital.phone || '031-000-0000';
  const website = hospital.website || '-';
  const displayAddress = hospital.address || '';

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={24} color="#333" />
        </BackButton>
        <HeaderActions>
          <HeaderAction>
            <Share2 size={20} color="#333" />
          </HeaderAction>
          <HeaderAction>
            <MoreHorizontal size={20} color="#333" />
          </HeaderAction>
        </HeaderActions>
      </Header>

      <ImageSection>
        {hospital.image && <MainImage src={hospital.image} />}
        <ImageDots>
          <Dot $active />
          <Dot />
          <Dot />
        </ImageDots>
      </ImageSection>

      <ContentContainer>
        <TitleSection>
          <TitleRow>
            <CategoryBadge>🏥</CategoryBadge>
            <Title>{hospital.name}</Title>
          </TitleRow>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Rating>
              <Star size={16} fill="#ff6b00" />
              {hospital.rating?.toFixed(1) || '0.0'}
              <ReviewCount>({hospital.reviewCount || 0})</ReviewCount>
            </Rating>
          </div>
          <StatusRow>
            <Status>{hospital.status}</Status> · {hospital.closingTime}에 영업 종료
          </StatusRow>
          <AddressRow>
            {displayAddress}
          </AddressRow>
          <TagRow>
            {hospital.tags?.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagRow>
        </TitleSection>

        <TabContainer>
          <Tab $active={activeTab === '홈'} onClick={() => setActiveTab('홈')}>홈</Tab>
          <Tab $active={activeTab === '리뷰'} onClick={() => setActiveTab('리뷰')}>리뷰</Tab>
          <Tab $active={activeTab === '사진'} onClick={() => setActiveTab('사진')}>사진</Tab>
        </TabContainer>

        {activeTab === '홈' && (
          <>
            <Section>
              <InfoItem>
                <InfoLabel><Clock size={18} /></InfoLabel>
                <InfoContent>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{hospital.status} · {hospital.closingTime} 영업 종료</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    <div>운영시간 정보 없음</div>
                  </div>
                </InfoContent>
                <ChevronRight size={16} color="#ccc" />
              </InfoItem>
            </Section>

            <Section>
              <InfoItem>
                <InfoLabel><MapPin size={18} /></InfoLabel>
                <InfoContent>{displayAddress}</InfoContent>
                <CopyButton><Copy size={16} /></CopyButton>
              </InfoItem>
              <InfoItem>
                <InfoLabel><Globe size={18} /></InfoLabel>
                <InfoContent>{website}</InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoLabel><Phone size={18} /></InfoLabel>
                <InfoContent>{phone}</InfoContent>
                <CopyButton><Copy size={16} /></CopyButton>
              </InfoItem>
            </Section>

            <ReviewSection>
              <ReviewHeader>
                <ReviewTitle>리뷰 ({reviews.length})</ReviewTitle>
              </ReviewHeader>
              <ReviewNotice>
                <Star size={20} fill="#ff6b00" style={{ flexShrink: 0 }} />
                {summary || "리뷰 요약을 불러오는 중이거나 리뷰가 없습니다."}
              </ReviewNotice>

              <MoreReviews onClick={() => setActiveTab('리뷰')}>리뷰 전체보기</MoreReviews>
            </ReviewSection>
          </>
        )}

        {activeTab === '리뷰' && (
          <ReviewSection>
            <ReviewHeader>
              <ReviewTitle>리뷰 ({reviews.length})</ReviewTitle>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#ff6b00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                리뷰 작성
              </button>
            </ReviewHeader>

            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                아직 작성된 리뷰가 없습니다.
              </div>
            ) : (
              reviews.map((review) => (
                <ReviewItem key={review.id}>
                  <ReviewUser>
                    <UserImage src="https://placehold.co/40" />
                    <UserInfo>
                      <UserName>
                        {review.user?.nickname || '익명'}
                        <Star size={12} fill="#ff6b00" style={{ marginLeft: '4px' }} />
                        {review.rating.toFixed(1)}
                      </UserName>
                      <UserMeta>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </UserMeta>
                    </UserInfo>
                    <MoreHorizontal size={16} color="#ccc" />
                  </ReviewUser>
                  <ReviewText>
                    {review.content}
                  </ReviewText>
                </ReviewItem>
              ))
            )}
          </ReviewSection>
        )}
      </ContentContainer>

      <BottomBar>
        <ActionButton>
          <Bookmark size={24} />
        </ActionButton>
        <ActionButton>
          <Share2 size={24} />
        </ActionButton>
        <ActionButton $primary $wide>
          출발
        </ActionButton>
      </BottomBar>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 100
        }} onClick={() => setIsReviewModalOpen(false)}>
          <div style={{
            backgroundColor: 'white',
            width: '90%', maxWidth: '400px',
            padding: '20px', borderRadius: '16px'
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>리뷰 작성</h3>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '5px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={32}
                  fill={star <= reviewRating ? "#ff6b00" : "#ddd"}
                  color={star <= reviewRating ? "#ff6b00" : "#ddd"}
                  onClick={() => setReviewRating(star)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>

            <textarea
              style={{
                width: '100%', height: '100px',
                padding: '10px', borderRadius: '8px',
                border: '1px solid #ddd', resize: 'none',
                marginBottom: '20px', outline: 'none'
              }}
              placeholder="이 장소에 대한 솔직한 리뷰를 남겨주세요."
              value={reviewContent}
              onChange={e => setReviewContent(e.target.value)}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                style={{
                  flex: 1, height: '48px',
                  border: 'none', borderRadius: '8px',
                  backgroundColor: '#f0f0f0', color: '#555',
                  fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button
                onClick={handleReviewSubmit}
                style={{
                  flex: 1, height: '48px',
                  border: 'none', borderRadius: '8px',
                  backgroundColor: '#ff6b00', color: 'white',
                  fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default HospitalDetailPage;
