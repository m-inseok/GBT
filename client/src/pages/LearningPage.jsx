import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Bell, Menu, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { lectures } from '../data/lectures';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  padding-bottom: 60px; // Navbar height
  overflow: hidden; // Prevent body scroll
`;

const TopSection = styled.div`
  flex-shrink: 0;
  background-color: white;
  z-index: 5;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const Header = styled.div`
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const CarouselTrack = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.$offset}%);
  width: 100%;
`;

const CarouselItem = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
  flex-shrink: 0;
  background-color: #ddd; // Fallback color
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CarouselOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  z-index: 10;
`;

const CarouselTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 5px 0;
`;

const CarouselSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
`;

const CategorySection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 10px;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f5f6f8;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const CategoryLabel = styled.span`
  font-size: 0.8rem;
  color: #333;
  text-align: center;
`;

const Section = styled.div`
  padding: 20px 0;
`;

const SectionHeader = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const MoreLink = styled.span`
  font-size: 0.85rem;
  color: #888;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HorizontalScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 20px;
  gap: 15px;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LectureCard = styled.div`
  min-width: 160px;
  width: 160px;
  flex-shrink: 0;
  scroll-snap-align: start;
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
`;

const InstructorName = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const WideLectureCard = styled.div`
  min-width: 280px;
  width: 280px;
  flex-shrink: 0;
  scroll-snap-align: start;
`;

const WideLectureImage = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const LearningPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <TopSection>
        <Header>
          <Menu size={24} color="#333" />
          <div style={{ display: 'flex', gap: '15px' }}>
            <Search size={24} color="#333" />
            <Bell size={24} color="#333" />
          </div>
        </Header>

        <CarouselContainer>
          <CarouselTrack $offset={-currentSlide * 100}>
            <CarouselItem>
              <CarouselImage src="https://placehold.co/400x220" />
              <CarouselOverlay>
                <CarouselTitle>TOPIK 합격까지</CarouselTitle>
                <CarouselSubtitle>당신의 한국어 여정을 함께합니다</CarouselSubtitle>
              </CarouselOverlay>
            </CarouselItem>
            <CarouselItem>
              <CarouselImage src="https://placehold.co/400x220" />
              <CarouselOverlay>
                <CarouselTitle>한국어 회화 마스터</CarouselTitle>
                <CarouselSubtitle>원어민처럼 말하기 도전!</CarouselSubtitle>
              </CarouselOverlay>
            </CarouselItem>
            <CarouselItem>
              <CarouselImage src="https://placehold.co/400x220" />
              <CarouselOverlay>
                <CarouselTitle>비즈니스 한국어</CarouselTitle>
                <CarouselSubtitle>취업 성공을 위한 필수 코스</CarouselSubtitle>
              </CarouselOverlay>
            </CarouselItem>
          </CarouselTrack>
        </CarouselContainer>

        <CategorySection>
          <CategoryItem>
            <CategoryIcon>📚</CategoryIcon>
            <CategoryLabel>TOPIK<br />문법</CategoryLabel>
          </CategoryItem>
          <CategoryItem>
            <CategoryIcon>✏️</CategoryIcon>
            <CategoryLabel>TOPIK<br />어휘</CategoryLabel>
          </CategoryItem>
          <CategoryItem onClick={() => window.location.href = '/pronunciation'}>
            <CategoryIcon>🗣️</CategoryIcon>
            <CategoryLabel>생활<br />한국어</CategoryLabel>
          </CategoryItem>
          <CategoryItem>
            <CategoryIcon>💼</CategoryIcon>
            <CategoryLabel>비즈니스<br />회화</CategoryLabel>
          </CategoryItem>
          <CategoryItem onClick={() => window.location.href = '/quiz'}>
            <CategoryIcon>🧩</CategoryIcon>
            <CategoryLabel>퀴즈</CategoryLabel>
          </CategoryItem>
        </CategorySection>
      </TopSection>

      <ScrollableContent>

        <Section>
          <SectionHeader>
            <SectionTitle>이번주 인기 있는 강의에요!</SectionTitle>
            <MoreLink>더보기 <ChevronRight size={14} /></MoreLink>
          </SectionHeader>
          <HorizontalScrollContainer>
            {lectures.filter(l => [1, 2, 3].includes(l.id)).map(lecture => (
              <Link to={`/learning/${lecture.id}`} key={lecture.id} style={{ textDecoration: 'none' }}>
                <LectureCard>
                  <LectureImage src={lecture.image} />
                  <LectureTitle>{lecture.title}</LectureTitle>
                  <InstructorName>{lecture.instructor}</InstructorName>
                </LectureCard>
              </Link>
            ))}
          </HorizontalScrollContainer>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>수강생들이<br />직접 인정한 최고의 강의만 모았어요</SectionTitle>
            <MoreLink>더보기 <ChevronRight size={14} /></MoreLink>
          </SectionHeader>
          <HorizontalScrollContainer>
            {lectures.filter(l => [4, 5].includes(l.id)).map(lecture => (
              <Link to={`/learning/${lecture.id}`} key={lecture.id} style={{ textDecoration: 'none' }}>
                <LectureCard>
                  <LectureImage src={lecture.image} />
                  <LectureTitle>{lecture.title}</LectureTitle>
                  <InstructorName>{lecture.instructor}</InstructorName>
                </LectureCard>
              </Link>
            ))}
          </HorizontalScrollContainer>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>수강생이 가장 많은<br />베스트 강의 TOP 클래스</SectionTitle>
            <MoreLink>더보기 <ChevronRight size={14} /></MoreLink>
          </SectionHeader>
          <HorizontalScrollContainer>
            {lectures.filter(l => [6, 7].includes(l.id)).map(lecture => (
              <Link to={`/learning/${lecture.id}`} key={lecture.id} style={{ textDecoration: 'none' }}>
                <WideLectureCard>
                  <WideLectureImage src={lecture.image} />
                  <LectureTitle>{lecture.title}</LectureTitle>
                  <InstructorName>{lecture.instructor}</InstructorName>
                </WideLectureCard>
              </Link>
            ))}
          </HorizontalScrollContainer>
        </Section>

        <div style={{ height: '20px' }}></div>
      </ScrollableContent>

      <Navbar />
    </Container>
  );
};

export default LearningPage;
