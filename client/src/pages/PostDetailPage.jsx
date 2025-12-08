import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, MessageSquare, Share2 } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  position: relative;
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
  padding: 0;
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: none;
  border: 1px solid #ff4d4d;
  color: #ff4d4d;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    background-color: #ff4d4d;
    color: white;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const PostHeader = styled.div`
  margin-bottom: 20px;
`;

const CategoryBadge = styled.span`
  background-color: #f0f0f0;
  color: #666;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: inline-block;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  line-height: 1.4;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
  gap: 8px;
`;

const PostBody = styled.div`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
  min-height: 200px;
`;

const StatsBar = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 30px;
  color: #888;
  font-size: 0.9rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CommentsSection = styled.div`
  margin-top: 30px;
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
`;

const CommentsHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const CommentItem = styled.div`
  background-color: #f9f9f9;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
`;

const CommentContent = styled.div`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;
`;

const CommentDate = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
  text-align: right;
`;

const BottomBar = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${props => props.$liked ? '#fff0e6' : 'white'};
  border: 1px solid ${props => props.$liked ? '#ff6b00' : '#ddd'};
  color: ${props => props.$liked ? '#ff6b00' : '#666'};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #fff0e6;
    border-color: #ff6b00;
    color: #ff6b00;
  }
`;

const CommentInputWrapper = styled.div`
  flex: 1;
  margin-left: 15px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 5px 15px;
`;

const CommentInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 0.9rem;
  color: #333;
  padding: 5px 0;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff6b00;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 0.85rem;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e65c00;
  }
`;

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const fetchPost = async () => {
    try {
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;
      const emailQuery = userData ? `?email=${userData.email}` : '';

      const res = await fetch(`http://localhost:3000/posts/${id}${emailQuery}`);
      if (res.ok) {
        setPost(await res.json());
      }
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${id}/comments`);
      if (res.ok) {
        setComments(await res.json());
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/posts/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      if (res.ok) {
        fetchPost();
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!commentInput.trim()) return;

    try {
      const res = await fetch(`${API_URL}/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentInput, email: user.email }),
      });
      if (res.ok) {
        setCommentInput('');
        fetchComments();
      }
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      if (res.ok) {
        navigate('/community');
      } else {
        alert('삭제 실패');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (!post) return <Container>Loading...</Container>;

  const isAuthor = user && post.author && user.email === post.author.email;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={24} color="#333" />
        </BackButton>
        <HeaderTitle>게시글</HeaderTitle>
        {isAuthor && (
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        )}
      </Header>

      <Content>
        <PostHeader>
          <CategoryBadge>자유게시판</CategoryBadge>
          <Title>{post.title}</Title>
          <AuthorInfo>
            <span>{post.author?.nickname || '익명'}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </AuthorInfo>
        </PostHeader>

        <PostBody>
          {post.content}
        </PostBody>

        <StatsBar>
          <StatItem>
            <Heart size={18} /> {post.likes}
          </StatItem>
          <StatItem>
            <MessageSquare size={18} /> {comments.length}
          </StatItem>
          <StatItem>
            <Share2 size={18} />
          </StatItem>
        </StatsBar>

        <CommentsSection>
          <CommentsHeader>댓글 {comments.length}</CommentsHeader>
          {comments.map(comment => (
            <CommentItem key={comment.id}>
              <CommentAuthor>{comment.author?.nickname || '익명'}</CommentAuthor>
              <CommentContent>{comment.content}</CommentContent>
              <CommentDate>{new Date(comment.createdAt).toLocaleDateString()}</CommentDate>
            </CommentItem>
          ))}
        </CommentsSection>
      </Content>

      <BottomBar>
        <LikeButton onClick={handleLike} $liked={post.isLiked}>
          <Heart size={18} fill={post.isLiked ? "#ff6b00" : "none"} />
          좋아요 {post.likes}
        </LikeButton>
        <CommentInputWrapper>
          <CommentInput
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
        </CommentInputWrapper>
      </BottomBar>
    </Container>
  );
};

export default PostDetailPage;
