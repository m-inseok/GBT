import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, Mic, MessageCircle } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const Header = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 15px;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  flex: 1;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CategoryCard = styled.div`
  background-color: ${props => props.$bgColor || '#f9f9f9'};
  border-radius: 16px;
  padding: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  &:active {
    transform: scale(0.98);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const TextWrapper = styled.div`
  flex: 1;
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #333;
`;

const CategoryDesc = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0;
`;

const QuizCategoryPage = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 'grammar',
            title: '한국어 문법',
            desc: '조사, 어미 등 기초 문법 퀴즈',
            icon: <BookOpen size={24} color="#ff6b00" />,
            bgColor: '#fff0e6'
        },
        {
            id: 'pronunciation',
            title: '발음',
            desc: '정확한 발음을 위한 듣기 평가',
            icon: <Mic size={24} color="#4dabf7" />,
            bgColor: '#e7f5ff'
        },
        {
            id: 'sentence',
            title: '문장',
            desc: '자연스러운 문장 만들기 연습',
            icon: <MessageCircle size={24} color="#69db7c" />,
            bgColor: '#ebfbee'
        }
    ];

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} color="#333" />
                </BackButton>
                <Title>퀴즈 카테고리</Title>
            </Header>
            <Content>
                {categories.map(cat => (
                    <CategoryCard
                        key={cat.id}
                        $bgColor={cat.bgColor}
                        onClick={() => navigate(`/quiz/${cat.id}`)}
                    >
                        <IconWrapper>{cat.icon}</IconWrapper>
                        <TextWrapper>
                            <CategoryTitle>{cat.title}</CategoryTitle>
                            <CategoryDesc>{cat.desc}</CategoryDesc>
                        </TextWrapper>
                        <ChevronLeft size={20} color="#999" style={{ transform: 'rotate(180deg)' }} />
                    </CategoryCard>
                ))}
            </Content>
        </Container>
    );
};

export default QuizCategoryPage;
