import React from 'react';
import styled from 'styled-components';
import { Star, MapPin, Phone, Bookmark, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  /* box-shadow: 0 2px 8px rgba(0,0,0,0.05); */
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${props => props.$active ? 'white' : 'rgba(255,255,255,0.5)'};
`;

const Content = styled.div`
  padding: 15px 0;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const CategoryIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffebd9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #ff6b00;
  font-size: 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  flex: 1;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  color: #ff6b00;
  
  svg {
    fill: #ff6b00;
    margin-right: 2px;
  }
`;

const ReviewCount = styled.span`
  color: #888;
  font-weight: normal;
  margin-left: 2px;
`;

const InfoText = styled.div`
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 4px;
`;

const Status = styled.span`
  color: #ff6b00;
  font-weight: bold;
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #f5f6f8;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  flex: 1;
  height: 36px;
  border: none;
  border-radius: 8px;
  background-color: #ffebd9;
  color: #ff6b00;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #ffe0c2;
  }
`;

const HospitalCard = ({ hospital }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/hospital/${hospital.id}`)}>
      <ImageContainer>
        <Image src={hospital.image} alt={hospital.name} />
        <Dots>
          <Dot $active />
          <Dot />
          <Dot />
        </Dots>
      </ImageContainer>
      <Content>
        <HeaderRow>
          <CategoryIcon>🏥</CategoryIcon>
          <Title>{hospital.name}</Title>
          <RatingContainer>
            <Star size={14} />
            {hospital.rating}
            <ReviewCount>({hospital.reviewCount})</ReviewCount>
          </RatingContainer>
        </HeaderRow>

        <InfoText>
          <Status>{hospital.status}</Status> · {hospital.closingTime}에 영업 종료
        </InfoText>
        <InfoText>
          {hospital.distance} · {hospital.address}
        </InfoText>

        <Tags>
          {hospital.tags?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
          <Tag>...</Tag>
        </Tags>

        <ActionButtons>
          <ActionButton onClick={(e) => { e.stopPropagation(); }}><MapPin size={16} /></ActionButton>
          <ActionButton onClick={(e) => { e.stopPropagation(); }}><Phone size={16} /></ActionButton>
          <ActionButton onClick={(e) => { e.stopPropagation(); }}><Bookmark size={16} /></ActionButton>
        </ActionButtons>
      </Content>
    </Card>
  );
};

export default HospitalCard;
