import React from 'react';
import styled from 'styled-components';

const NotificationPopup = ({ isOpen, onClose }) => {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'order',
      message: '새로운 주문이 들어왔습니다.',
      time: '5분 전',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      message: '번개장터 상품 가격이 경쟁사보다 높습니다.',
      time: '1시간 전',
      read: false
    },
    {
      id: 3,
      type: 'system',
      message: '시스템 점검이 예정되어 있습니다.',
      time: '어제',
      read: true
    }
  ];

  if (!isOpen) return null;

  return (
    <PopupContainer>
      <PopupHeader>
        <PopupTitle>알림</PopupTitle>
        <MarkAllReadButton>모두 읽음 표시</MarkAllReadButton>
      </PopupHeader>
      <NotificationList>
        {notifications.map(notification => (
          <NotificationItem key={notification.id} unread={!notification.read}>
            <NotificationIcon type={notification.type} />
            <NotificationContent>
              <NotificationMessage>{notification.message}</NotificationMessage>
              <NotificationTime>{notification.time}</NotificationTime>
            </NotificationContent>
          </NotificationItem>
        ))}
      </NotificationList>
      <PopupFooter>
        <ViewAllButton>모든 알림 보기</ViewAllButton>
      </PopupFooter>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 360px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
  z-index: 1000;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #EEEEEE;
`;

const PopupTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #212121;
`;

const MarkAllReadButton = styled.button`
  background: none;
  border: none;
  color: #1E88E5;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NotificationList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #EEEEEE;
  background-color: ${props => props.unread ? '#F5F5F5' : 'white'};
  cursor: pointer;
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const NotificationIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => {
    switch(props.type) {
      case 'order': return '#E8F5E9';
      case 'alert': return '#FFEBEE';
      case 'system': return '#E3F2FD';
      default: return '#F5F5F5';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  
  &:before {
    content: '${props => {
      switch(props.type) {
        case 'order': return '🛒';
        case 'alert': return '⚠️';
        case 'system': return '🔔';
        default: return '📌';
      }
    }}';
    font-size: 18px;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationMessage = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #212121;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #757575;
`;

const PopupFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #EEEEEE;
  text-align: center;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #1E88E5;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default NotificationPopup; 