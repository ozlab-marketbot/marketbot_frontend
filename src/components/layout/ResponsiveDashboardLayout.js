// src/components/layout/ResponsiveDashboardLayout.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import ResponsiveSidebar from './ResponsiveSidebar';
import NotificationPopup from '../notifications/NotificationPopup';
import UserSettingsPopup from '../user/UserSettingsPopup';
import logo from '../assets/images/logo.png';

// Icons (you can replace these with actual icon components)
const DashboardIcon = () => <span>📊</span>;
const ProductsIcon  = () => <span>📦</span>;
const CustomersIcon = () => <span>👥</span>;
const OrdersIcon    = () => <span>🛒</span>;
const StatisticsIcon= () => <span>📈</span>;
const SettingsIcon  = () => <span>⚙️</span>;
const MenuIcon      = () => <span>☰</span>;
const BellIcon      = () => <span>🔔</span>;
const UserIcon      = () => <span>👤</span>;

const ResponsiveDashboardLayout = ({ children }) => {
  // 1) Start closed
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userSettingsOpen, setUserSettingsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', name: '대시보드',     icon: <DashboardIcon/> },
    { path: '/products',  name: '상품 관리',    icon: <ProductsIcon/>  },
    { path: '/customers', name: '고객 관리',    icon: <CustomersIcon/> },
    { path: '/orders',    name: '주문/배송 관리',icon: <OrdersIcon/>    },
    { path: '/statistics',name: '매출 통계',    icon: <StatisticsIcon/>},
    { path: '/settings',  name: '설정',         icon: <SettingsIcon/>  },
  ];

  // 2) Toggle open/closed on click
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleNotification = () => {
    setNotificationOpen(prev => !prev);
    if (userSettingsOpen) setUserSettingsOpen(false);
  };

  const toggleUserSettings = () => {
    setUserSettingsOpen(prev => !prev);
    if (notificationOpen) setNotificationOpen(false);
  };

  // Close popups when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationOpen || userSettingsOpen) {
        const isClickInside = event.target.closest('.popup-trigger');
        if (!isClickInside) {
          setNotificationOpen(false);
          setUserSettingsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationOpen, userSettingsOpen]);

  return (
    <LayoutContainer>
      {/* ☰ always visible */}
      <MenuButton onClick={toggleSidebar}>
        <MenuIcon />
      </MenuButton>

      {/* only mount the sidebar when open */}
      {sidebarOpen && (
        <ResponsiveSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          navItems={navItems}
          activePath={location.pathname}
        />
      )}

      <MainContent>
        <Header>
          <HeaderCenter>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <Logo style={{ cursor: 'pointer' }}>
                <LogoImg src={logo} alt="마켓봇 로고" />
                <LogoText>마켓봇</LogoText>
              </Logo>
            </Link>
          </HeaderCenter>

          <HeaderRight>
            <HeaderButton className="popup-trigger" onClick={toggleNotification}>
              <BellIcon />
              <NotificationBadge>3</NotificationBadge>
            </HeaderButton>
            <NotificationPopup 
              isOpen={notificationOpen} 
              onClose={() => setNotificationOpen(false)} 
            />
            
            <UserProfile className="popup-trigger" onClick={toggleUserSettings}>
              <UserAvatar>
                <UserIcon />
              </UserAvatar>
              <UserName>사용자</UserName>
            </UserProfile>
            <UserSettingsPopup 
              isOpen={userSettingsOpen} 
              onClose={() => setUserSettingsOpen(false)} 
            />
          </HeaderRight>
        </Header>

        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default ResponsiveDashboardLayout;

/* ---------------- Styled Components ---------------- */

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MenuButton = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 200;               /* above the sidebar overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;  height: 40px;
  border: none; background: transparent;
  cursor: pointer; border-radius: 8px;

  &:hover { background-color: #F5F5F5; }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex; flex-direction: column;
  background-color: #F5F5F5;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex; justify-content: space-between; align-items: center;
  height: 64px; padding: 0 24px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: sticky; top: 0; z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex; align-items: center;
`;

const HeaderCenter = styled.div`
  display: flex; align-items: center; flex-grow: 1;
  justify-content: center;
`;

const HeaderRight = styled.div`
  display: flex; align-items: center;
`;

const HeaderButton = styled.button`
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 8px;
  background: transparent; border: none; cursor: pointer;
  margin-left: 8px; position: relative;

  &:hover { background-color: #F5F5F5; }
`;

const NotificationBadge = styled.span`
  position: absolute; top: 4px; right: 4px;
  width: 18px; height: 18px; border-radius: 50%;
  background-color: #F44336; color: #fff;
  font-size: 10px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
`;

const UserProfile = styled.div`
  display: flex; align-items: center; margin-left: 16px; cursor: pointer;
`;

const UserAvatar = styled.div`
  width: 36px; height: 36px; border-radius: 50%;
  background-color: #E3F2FD; display: flex; align-items: center; justify-content: center;
  margin-right: 8px;

  span { font-size: 18px; }
`;

const UserName = styled.span`
  font-size: 14px; font-weight: 500; color: #424242;
  @media (max-width: 480px) { display: none; }
`;

const ContentWrapper = styled.div`
  flex: 1; overflow: auto; padding: 24px  /* add padding as needed */;
`;

const Logo = styled.div`
  display: flex; align-items: center;
`;
const LogoImg = styled.img`
  width: 32px; height: 32px; margin-right: 8px;
`;
const LogoText = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;
