import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ChevronLeft } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  padding-bottom: 60px;
`;

const Header = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.div`
  cursor: pointer;
  margin-right: 15px;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  flex: 1;
`;

const Form = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 0.95rem;
  outline: none;
  
  &:focus {
    border-color: #ff6b00;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  font-size: 0.95rem;
  outline: none;
  resize: none;
  
  &:focus {
    border-color: #ff6b00;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #ff6b00;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
`;

const PostCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          title,
          content
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('게시글이 작성되었습니다.');
        navigate('/community');
      } else {
        alert(data.message || '게시글 작성 실패');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={24} color="#333" />
        </BackButton>
        <Title>글쓰기</Title>
      </Header>

      <Form>
        <FormGroup>
          <Label>제목</Label>
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>

        <SubmitButton onClick={handleSubmit}>작성완료</SubmitButton>
      </Form>

      <Navbar />
    </Container>
  );
};

export default PostCreatePage;
