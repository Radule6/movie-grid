import styled from 'styled-components';

export const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$visibleCards}, 1fr);
  gap: 5rem;
  justify-items: center;
`;

export const CategoryTitle = styled.h2`
  margin: 0.5rem 0;
  font-size: 17px;
  font-weight: 600;
`;

export const StyledGridCard = styled.div`
  padding: 0.3rem;
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  color: ${({ $isSelected }) => $isSelected ? 'white' : 'black'};
  border: ${({ $isSelected }) => $isSelected ? '4px solid #1e40af' : '2px solid #ccc'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover ;
  background-repeat: no-repeat;
  @media (max-width: 1200px) {
    width: 180px;
    height: 270px;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 210px;
    padding: 0.25rem;
  }
`;


export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  outline: none;
  padding: 2rem;
  min-height: 100%;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;