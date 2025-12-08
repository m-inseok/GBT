import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  z-index: 100;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  padding: 10px 15px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
  font-size: 1rem;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchBar = () => {
    return (
        <SearchContainer>
            <Search size={20} color="#aaa" />
            <Input placeholder="장소, 키워드, 주소 검색" />
        </SearchContainer>
    );
};

export default SearchBar;
