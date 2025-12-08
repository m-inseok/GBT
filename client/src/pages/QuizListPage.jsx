import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, PlayCircle } from 'lucide-react';

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
  overflow-y: auto;
`;

const QuizItem = styled.div`
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 12px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const QuizInfo = styled.div`
  flex: 1;
`;

const QuizTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #333;
`;

const QuizMeta = styled.div`
  font-size: 0.8rem;
  color: #888;
  display: flex;
  gap: 10px;
`;

const StatusBadge = styled.span`
  color: ${props => props.$completed ? '#20c997' : '#ff6b00'};
  font-weight: bold;
`;

const QuizListPage = () => {
    const navigate = useNavigate();
    const { category } = useParams();

    const getCategoryName = (cat) => {
        switch (cat) {
            case 'grammar': return '한국어 문법';
            case 'pronunciation': return '발음';
            case 'sentence': return '문장';
            default: return '퀴즈';
        }
    };

    // Mock Data
    const quizzes = [
        { id: 1, title: '기초 조사 (은/는/이/가)', questions: 5, completed: false },
        { id: 2, title: '높임말과 반말 구분하기', questions: 5, completed: true },
        { id: 3, title: '시제 표현 (과거/현재/미래)', questions: 10, completed: false },
        { id: 4, title: '부정문 만들기 (안/못)', questions: 5, completed: false },
    ];

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} color="#333" />
                </BackButton>
                <Title>{getCategoryName(category)} 퀴즈</Title>
            </Header>
            <Content>
                {quizzes.map(quiz => (
                    <QuizItem key={quiz.id} onClick={() => navigate(`/quiz/${category}/${quiz.id}`)}>
                        <QuizInfo>
                            <QuizTitle>{quiz.title}</QuizTitle>
                            <QuizMeta>
                                <span>문제 {quiz.questions}개</span>
                                <StatusBadge $completed={quiz.completed}>
                                    {quiz.completed ? '완료됨' : '미완료'}
                                </StatusBadge>
                            </QuizMeta>
                        </QuizInfo>
                        <PlayCircle size={24} color="#ff6b00" />
                    </QuizItem>
                ))}
            </Content>
        </Container>
    );
};

export default QuizListPage;
