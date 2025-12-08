import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Share2, MoreHorizontal, MapPin, Clock, Globe, Phone, Copy, ChevronRight, Bookmark } from 'lucide-react';

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

    // Mock Data (In a real app, fetch based on ID)
    const hospital = {
        name: '의료법인 영훈의료재단 대전선병원',
        rating: 5.0,
        reviewCount: 145,
        status: '영업중',
        closingTime: '22:00',
        distance: '1.1km',
        address: '대전 중구 목중로 29 선병원',
        tags: ['외국인 친화적', '영어 가능', '민생회복소비쿠폰'],
        image: 'https://placehold.co/400x250',
        phone: '042-123-4567',
        website: 'www.abcd.kr'
    };

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
                <MainImage src={hospital.image} />
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
                            {hospital.rating}
                            <ReviewCount>({hospital.reviewCount})</ReviewCount>
                        </Rating>
                    </div>
                    <StatusRow>
                        <Status>{hospital.status}</Status> · {hospital.closingTime}에 영업 종료
                    </StatusRow>
                    <AddressRow>
                        {hospital.distance} · {hospital.address.split(' ')[0] + ' ' + hospital.address.split(' ')[1]}
                    </AddressRow>
                    <TagRow>
                        {hospital.tags.map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                        ))}
                        <Tag>...</Tag>
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
                                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>영업중 · 오전 11:00 영업시작</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                        <div>목 09:00 - 18:30</div>
                                        <div style={{ paddingLeft: '10px' }}>12:30 - 14:00 휴게시간</div>
                                        <div>금 09:00 - 18:30</div>
                                        <div style={{ paddingLeft: '10px' }}>12:30 - 14:00 휴게시간</div>
                                        {/* More hours... */}
                                    </div>
                                </InfoContent>
                                <ChevronRight size={16} color="#ccc" />
                            </InfoItem>
                        </Section>

                        <Section>
                            <InfoItem>
                                <InfoLabel><MapPin size={18} /></InfoLabel>
                                <InfoContent>{hospital.address}</InfoContent>
                                <CopyButton><Copy size={16} /></CopyButton>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel><Globe size={18} /></InfoLabel>
                                <InfoContent>{hospital.website}</InfoContent>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel><Phone size={18} /></InfoLabel>
                                <InfoContent>{hospital.phone}</InfoContent>
                                <CopyButton><Copy size={16} /></CopyButton>
                            </InfoItem>
                        </Section>

                        <ReviewSection>
                            <ReviewHeader>
                                <ReviewTitle>리뷰 ({hospital.reviewCount})</ReviewTitle>
                            </ReviewHeader>
                            <ReviewNotice>
                                <Star size={20} fill="#ff6b00" style={{ flexShrink: 0 }} />
                                현재 병원 시설은 전체적으로 깔끔하고 안내 직원부터 의료진까지 모두 친절해서 처음 방문하시는 분들이라면 좋은 병원입니다.
                            </ReviewNotice>

                            <ReviewItem>
                                <ReviewUser>
                                    <UserImage src="https://placehold.co/40" />
                                    <UserInfo>
                                        <UserName>김규남 <Star size={12} fill="#ff6b00" style={{ marginLeft: '4px' }} /> 5.0</UserName>
                                        <UserMeta>1번째 방문 · 25.11.07</UserMeta>
                                    </UserInfo>
                                    <MoreHorizontal size={16} color="#ccc" />
                                </ReviewUser>
                                <ReviewText>
                                    목뒤가 너무 아파서 방문했어요. 데스크 원장님 치료실선생님들 짱짱짱 친절해요. 초음파도 생긴거같은데 담번엔 초음파도 받아봐야겠어요...
                                </ReviewText>
                            </ReviewItem>

                            <ReviewItem>
                                <ReviewUser>
                                    <UserImage src="https://placehold.co/40" />
                                    <UserInfo>
                                        <UserName>오도릴리 <Star size={12} fill="#ff6b00" style={{ marginLeft: '4px' }} /> 5.0</UserName>
                                        <UserMeta>1번째 방문 · 25.11.06</UserMeta>
                                    </UserInfo>
                                    <MoreHorizontal size={16} color="#ccc" />
                                </ReviewUser>
                                <ReviewText>
                                    처방도 과하게 하지 않으시고 꼭 필요한 치료만 권해주셔서 믿음이 갔고요. 병원 내부도 카페처럼 깨끗하고 아늑해서...
                                </ReviewText>
                            </ReviewItem>

                            <MoreReviews>리뷰 더보기</MoreReviews>
                        </ReviewSection>
                    </>
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
        </Container>
    );
};

export default HospitalDetailPage;
