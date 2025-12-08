import React, { useState } from 'react';
import styled from 'styled-components';
import HospitalCard from './HospitalCard';

const SheetContainer = styled.div`
  position: absolute;
  bottom: 60px; // Above Navbar
  left: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  z-index: 500;
  transition: height 0.3s ease-in-out, top 0.3s ease-in-out;
  
  /* Dynamic height based on expanded state */
  height: ${props => props.$isExpanded ? 'calc(100% - 120px)' : '300px'};
  overflow-y: ${props => props.$isExpanded ? 'auto' : 'hidden'};
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  margin: 0 auto 15px auto;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const BottomSheet = ({ hospitals }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SheetContainer $isExpanded={isExpanded}>
      <Handle onClick={toggleExpand} />
      <Title onClick={toggleExpand}>지금 내 근처에 있는 곳</Title>
      {hospitals.map(hospital => (
        <HospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </SheetContainer>
  );
};

export default BottomSheet;
