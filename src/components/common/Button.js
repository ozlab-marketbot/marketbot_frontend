import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullwidth = "false",
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      fullwidth={fullwidth}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const buttonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background.main};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.background.dark};
      color: ${props => props.theme.colors.primary};
    }
    
    &:active:not(:disabled) {
      background-color: ${props => props.theme.colors.background.dark};
      color: ${props => props.theme.colors.primary};
    }
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.background.main};
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.background.dark};
    }
    
    &:active:not(:disabled) {
      background-color: ${props => props.theme.colors.background.dark};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.text.secondary};
    border: 1px solid ${props => props.theme.colors.border.light};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.background.dark};
    }
    
    &:active:not(:disabled) {
      background-color: ${props => props.theme.colors.background.dark};
    }
  `,
  danger: css`
    background-color: #F44336;
    color: #FFFFFF;
    
    &:hover:not(:disabled) {
      background-color: #E53935;
    }
    
    &:active:not(:disabled) {
      background-color: #D32F2F;
    }
  `
};

const buttonSizes = {
  small: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  medium: css`
    padding: 10px 20px;
    font-size: 14px;
  `,
  large: css`
    padding: 12px 24px;
    font-size: 16px;
  `
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  
  ${props => buttonVariants[props.variant]}
  ${props => buttonSizes[props.size]}
  
  width: ${props => props.fullwidth ? '100%' : 'auto'};
  
  &:disabled {
    background-color: #E0E0E0;
    color: #9E9E9E;
    cursor: not-allowed;
    border: none;
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.4);
  }
`;

export default Button;