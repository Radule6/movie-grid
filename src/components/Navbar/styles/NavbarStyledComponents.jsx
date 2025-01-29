import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ $darkMode }) => ($darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)')};
  color: ${({ $darkMode }) => ($darkMode ? '#f8f9fa' : '#333')};
  transition: background-color 0.3s ease, color 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

export const ToggleButton = styled.button`
  background: none;
  border: 2px solid ${({ $darkMode }) => ($darkMode ? '#fff' : '#333')};
  color: ${({ $darkMode }) => ($darkMode ? '#fff' : '#333')};
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $darkMode }) => ($darkMode ? '#fff' : '#333')};
    color: ${({ $darkMode }) => ($darkMode ? '#333' : '#fff')};
  }
`;