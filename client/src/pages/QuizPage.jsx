import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react';

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
  padding: 30px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin-bottom: 30px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #ff6b00;
  width: ${props => props.$percent}%;
  transition: width 0.3s ease;
`;

const Question = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  line-height: 1.4;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 18px;
  margin-bottom: 15px;
  border: 2px solid ${props => props.$selected ? (props.$correct ? '#20c997' : '#ff6b6b') : '#eee'};
  background-color: ${props => props.$selected ? (props.$correct ? '#e6fcf5' : '#fff5f5') : 'white'};
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => !props.$disabled && '#ff6b00'};
  }
`;

const ResultMessage = styled.div`
  margin-top: auto;
  padding: 20px;
  background-color: ${props => props.$correct ? '#e6fcf5' : '#fff5f5'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.$correct ? '#0ca678' : '#fa5252'};
  font-weight: bold;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
`;

const QuizPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // Mock Question
    const question = {
        id: 1,
        text: "다음 문장의 빈칸에 알맞은 조사를 고르세요.\n\n'저는 학생___ 아닙니다.'",
        options: [
            { id: 1, text: "이" },
            { id: 2, text: "가" },
            { id: 3, text: "은" },
            { id: 4, text: "을" }
        ],
        answerId: 1
    };

    const handleOptionClick = (optionId) => {
        if (selectedOption !== null) return; // Prevent re-selection

        setSelectedOption(optionId);
        setIsCorrect(optionId === question.answerId);
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} color="#333" />
                </BackButton>
                <Title>퀴즈 풀기</Title>
            </Header>
            <Content>
                <ProgressBar>
                    <ProgressFill $percent={20} />
                </ProgressBar>

                <Question>{question.text}</Question>

                {question.options.map(option => (
                    <OptionButton
                        key={option.id}
                        onClick={() => handleOptionClick(option.id)}
                        $selected={selectedOption === option.id}
                        $correct={option.id === question.answerId}
                        $disabled={selectedOption !== null}
                    >
                        {option.text}
                        {selectedOption === option.id && (
                            option.id === question.answerId
                                ? <CheckCircle size={20} color="#20c997" />
                                : <XCircle size={20} color="#ff6b6b" />
                        )}
                    </OptionButton>
                ))}

                {selectedOption !== null && (
                    <>
                        <ResultMessage $correct={isCorrect}>
                            {isCorrect ? '정답입니다!' : '오답입니다. 다시 생각해보세요.'}
                        </ResultMessage>
                        <NextButton onClick={() => alert('다음 문제로 이동 (구현 예정)')}>
                            다음 문제
                        </NextButton>
                    </>
                )}
            </Content>
        </Container>
    );
};

export default QuizPage;
