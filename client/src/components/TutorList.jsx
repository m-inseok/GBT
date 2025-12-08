import React from 'react';
import styled from 'styled-components';
import { MoreHorizontal } from 'lucide-react';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const SortOption = styled.span`
  font-size: 0.9rem;
  color: #888;
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TutorCard = styled.div`
  display: flex;
  gap: 15px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 130px;
  border-radius: 12px;
  object-fit: cover;
  background-color: #eee;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Name = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px 0;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin: 0 0 10px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  background-color: #f5f6f8;
  color: #555;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
`;

const MoreButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #f5f6f8;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 12px;
  color: #666;
  font-size: 0.95rem;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TutorList = () => {
    const tutors = [
        {
            id: 1,
            name: '강주연',
            image: 'https://placehold.co/100x130',
            description: '안녕하세요! 한국에서 한국어 교육을 전공한 강주연 입니다. 문법보다 실제로 말하고 듣는 회화에 집중해서 수업해요. 틀려도 괜찮아요!',
            tags: ['한국어교육 전공 (국립대)', '한국어교원 2급', '발음 교정 & 실전 회화 전문']
        },
        {
            id: 2,
            name: '최화연',
            image: 'https://placehold.co/100x130',
            description: '안녕하세요, 최화연 입니다. 한국에서 태어나고 자랐고 지금은 외국인 유학생들에게 한국어를 가르치고 있어요. 단어만 알려주시면 문장으로 만들어드려요.',
            tags: ['한국어교육학 박사', '한국어 교원 1급', 'TOPIK II 6급']
        },
        {
            id: 3,
            name: '조상혁',
            image: 'https://placehold.co/100x130',
            description: '한국어를 일본어로 쉽게 설명해드릴게요. 특히 **발음(발음)**과 문장 자연스럽게 만드는 방법을 도와드립니다. 편하게 메세지 주세요.',
            tags: ['JLPT N1', '한국어교원 2급', '한일 통번역 기초 과정 이수증', '한국대학교 국어국문학과']
        }
    ];

    return (
        <Container>
            <Header>
                <Title>현재 주변에 튜터들이 있어요!</Title>
                <SortOption>거리순 ▾</SortOption>
            </Header>
            <List>
                {tutors.map(tutor => (
                    <TutorCard key={tutor.id}>
                        <ProfileImage src={tutor.image} alt={tutor.name} />
                        <Info>
                            <Name>{tutor.name}</Name>
                            <Description>{tutor.description}</Description>
                            <Tags>
                                {tutor.tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </Tags>
                            <MoreButton>
                                <MoreHorizontal size={14} />
                            </MoreButton>
                        </Info>
                    </TutorCard>
                ))}
            </List>
            <LoadMoreButton>더보기</LoadMoreButton>
        </Container>
    );
};

export default TutorList;
