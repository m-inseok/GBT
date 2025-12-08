import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { lectures } from '../data/lectures';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  position: relative;
`;

const Header = styled.div`
  position: relative;
  height: 280px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: white;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.3;
`;

const Instructor = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px; // For sticky button
`;

const InfoSection = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;
  font-size: 0.9rem;
`;

const InfoLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #333;
`;

const Section = styled.div`
  padding: 25px 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BulletItem = styled.li`
  position: relative;
  padding-left: 15px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #888;
  }
`;

const CurriculumList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurriculumItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
  color: #444;
  &:last-child {
    border-bottom: none;
  }
`;

const ExpandButton = styled.button`
  width: 100%;
  padding: 15px;
  background: none;
  border: none;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
`;

const StickyFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 20px;
  background-color: white;
  border-top: 1px solid #eee;
  display: flex;
  gap: 15px;
  z-index: 10;
`;

const BookmarkButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: #ffece5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ff6b00;
`;

const StartButton = styled.button`
  flex: 1;
  height: 50px;
  border-radius: 12px;
  background-color: #ff6b00;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e65c00;
  }
`;

const LectureDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        const foundLecture = lectures.find(l => l.id === parseInt(id));
        if (foundLecture) {
            setLecture(foundLecture);
        }
    }, [id]);

    if (!lecture) return <Container>Loading...</Container>;

    return (
        <Container>
            <Header $bgImage={lecture.image}>
                <HeaderContent>
                    <BackButton onClick={() => navigate(-1)}>
                        <ChevronLeft size={24} />
                    </BackButton>
                    <div>
                        <Title>{lecture.title}</Title>
                        <Instructor>{lecture.instructor}</Instructor>
                    </div>
                </HeaderContent>
            </Header>

            <Content>
                <InfoSection>
                    <InfoTitle>클래스 상세 정보</InfoTitle>
                    <InfoGrid>
                        <InfoLabel>등급</InfoLabel>
                        <InfoValue>{lecture.level}</InfoValue>
                        <InfoLabel>커리큘럼</InfoLabel>
                        <InfoValue>{lecture.duration}</InfoValue>
                        <InfoLabel>수강기한</InfoLabel>
                        <InfoValue>{lecture.access}</InfoValue>
                    </InfoGrid>
                </InfoSection>

                <Section>
                    <SectionTitle>저희 수업으로 이런걸 배워요</SectionTitle>
                    <BulletList>
                        {lecture.whatYouWillLearn.map((item, index) => (
                            <BulletItem key={index}>{item}</BulletItem>
                        ))}
                    </BulletList>
                </Section>

                <Section>
                    <SectionTitle>이런분들에게 추천드려요</SectionTitle>
                    <BulletList>
                        {lecture.recommendedFor.map((item, index) => (
                            <BulletItem key={index}>{item}</BulletItem>
                        ))}
                    </BulletList>
                </Section>

                <Section>
                    <SectionTitle>커리큘럼</SectionTitle>
                    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '15px', color: '#555' }}>
                            TOPIK 합격 과정 클래스
                        </div>
                        <CurriculumList>
                            {lecture.curriculum.slice(0, 5).map((item, index) => (
                                <CurriculumItem key={index}>{item}</CurriculumItem>
                            ))}
                        </CurriculumList>
                    </div>
                    {lecture.curriculum.length > 5 && (
                        <ExpandButton>
                            더보기 <ChevronDown size={16} />
                        </ExpandButton>
                    )}
                </Section>
            </Content>

            <StickyFooter>
                <BookmarkButton>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </BookmarkButton>
                <StartButton>수강시작</StartButton>
            </StickyFooter>
        </Container>
    );
};

export default LectureDetailPage;
