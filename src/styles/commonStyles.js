import styled from 'styled-components';
import { theme } from './theme';

// Common button styles
export const Button = styled.button`
  padding: 8px 16px;
  border-radius: ${theme.borderRadius.medium};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${theme.colors.border.light};
  background-color: ${props => props.variant === 'primary' ? theme.colors.primary : theme.colors.background.main};
  color: ${props => props.variant === 'primary' ? theme.colors.background.main : theme.colors.text.primary};
  
  &:hover {
    background-color: ${props => props.variant === 'primary' ? theme.colors.background.dark : theme.colors.background.dark};
    border-color: ${theme.colors.primary};
    color: ${props => props.variant === 'primary' ? theme.colors.background.main : theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Common input styles
export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.medium};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
  
  &:disabled {
    background-color: ${theme.colors.background.dark};
    cursor: not-allowed;
  }
`;

// Common select styles
export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.medium};
  font-size: 14px;
  background-color: ${theme.colors.background.main};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

// Common card styles
export const Card = styled.div`
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.large};
  padding: 24px;
  box-shadow: ${theme.shadows.medium};
`;

// Common table styles
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 16px;
    border-bottom: 1px solid ${theme.colors.border.light};
    text-align: left;
  }
  
  th {
    font-weight: 600;
    color: ${theme.colors.text.secondary};
    background-color: ${theme.colors.background.dark};
  }
  
  tr:hover {
    background-color: ${theme.colors.background.dark};
  }
`;

// Common modal styles
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.large};
  padding: 24px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.large};
`;

// Common badge styles
export const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => theme.colors.status[props.status] || theme.colors.background.dark};
  color: ${props => props.status ? theme.colors.background.main : theme.colors.text.secondary};
`; 