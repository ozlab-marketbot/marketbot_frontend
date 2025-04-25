import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const UserSettingsPopup = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Close popup
    onClose();
    // Refresh the page
    window.location.href = '/login';
  };

  return (
    <PopupContainer>
      <UserInfo>
        <UserAvatar>
          <span>👤</span>
        </UserAvatar>
        <UserDetails>
          <UserName>{currentUser?.name || '사용자'}</UserName>
          <UserEmail>{currentUser?.email || 'user@example.com'}</UserEmail>
        </UserDetails>
      </UserInfo>
      
      <MenuList>
        <MenuItem>
          <MenuItemIcon>👤</MenuItemIcon>
          <MenuItemText>프로필 설정</MenuItemText>
        </MenuItem>
        <MenuItem>
          <MenuItemIcon>⚙️</MenuItemIcon>
          <MenuItemText>계정 설정</MenuItemText>
        </MenuItem>
        <MenuItem>
          <MenuItemIcon>🔔</MenuItemIcon>
          <MenuItemText>알림 설정</MenuItemText>
        </MenuItem>
        <MenuItem>
          <MenuItemIcon>❓</MenuItemIcon>
          <MenuItemText>도움말</MenuItemText>
        </MenuItem>
      </MenuList>
      
      <LogoutButton onClick={handleLogout}>
        <LogoutIcon>🚪</LogoutIcon>
        <LogoutText>로그아웃</LogoutText>
      </LogoutButton>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
  z-index: 1000;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #EEEEEE;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #E3F2FD;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  
  span {
    font-size: 24px;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #212121;
`;

const UserEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: #757575;
`;

const MenuList = styled.div`
  padding: 8px 0;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const MenuItemIcon = styled.span`
  font-size: 20px;
  margin-right: 12px;
`;

const MenuItemText = styled.span`
  font-size: 14px;
  color: #212121;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  border-top: 1px solid #EEEEEE;
  cursor: pointer;
  color: #F44336;
  
  &:hover {
    background-color: #FFEBEE;
  }
`;

const LogoutIcon = styled.span`
  font-size: 20px;
  margin-right: 12px;
`;

const LogoutText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export default UserSettingsPopup; 