import React, { useState } from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  
  // Mock data for dashboard stats
  const stats = [
    { id: 1, title: '총 상품 수', value: '320', trend: '+12%', trendUp: true },
    { id: 2, title: '이번 달 판매량', value: '89', trend: '+5%', trendUp: true },
    { id: 3, title: '활성 마켓', value: '4', trend: '0%', trendUp: null },
    { id: 4, title: '평균 판매 가격', value: '₩35,000', trend: '-2%', trendUp: false }
  ];
  
  // Mock data for recent activities
  const activities = [
    { id: 1, type: 'new_product', message: '애플 아이폰 14 Pro 상품이 등록되었습니다.', time: '1시간 전' },
    { id: 2, type: 'order', message: '주문 #12345가 발송 완료되었습니다.', time: '3시간 전' },
    { id: 3, type: 'market', message: '당근마켓 연동이 완료되었습니다.', time: '어제' },
    { id: 4, type: 'alert', message: '번개장터 상품 가격이 경쟁사보다 높습니다.', time: '어제' },
    { id: 5, type: 'system', message: '시스템 점검이 예정되어 있습니다.', time: '2일 전' }
  ];

  // Mock data for sales statistics
  const salesData = {
    week: [
      { date: '월', sales: 1200000, orders: 12 },
      { date: '화', sales: 1500000, orders: 15 },
      { date: '수', sales: 1800000, orders: 18 },
      { date: '목', sales: 1400000, orders: 14 },
      { date: '금', sales: 2000000, orders: 20 },
      { date: '토', sales: 2500000, orders: 25 },
      { date: '일', sales: 2200000, orders: 22 }
    ],
    month: [
      { date: '1주', sales: 8500000, orders: 85 },
      { date: '2주', sales: 9200000, orders: 92 },
      { date: '3주', sales: 8800000, orders: 88 },
      { date: '4주', sales: 9500000, orders: 95 }
    ],
    year: [
      { date: '1월', sales: 35000000, orders: 350 },
      { date: '2월', sales: 38000000, orders: 380 },
      { date: '3월', sales: 42000000, orders: 420 },
      { date: '4월', sales: 40000000, orders: 400 },
      { date: '5월', sales: 45000000, orders: 450 },
      { date: '6월', sales: 48000000, orders: 480 }
    ]
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <DashboardContent>
      <WelcomeSection>
        <WelcomeHeading>안녕하세요, 사용자님!</WelcomeHeading>
        <WelcomeSubheading>오늘의 판매 현황을 확인하세요.</WelcomeSubheading>
      </WelcomeSection>
      
      <StatsGrid>
        {stats.map(stat => (
          <StatCard key={stat.id}>
            <StatTitle>{stat.title}</StatTitle>
            <StatValueContainer>
              <StatValue>{stat.value}</StatValue>
              {stat.trend && (
                <StatTrend trendUp={stat.trendUp}>
                  {stat.trend}
                </StatTrend>
              )}
            </StatValueContainer>
          </StatCard>
        ))}
      </StatsGrid>
      
      <DashboardSections>
        <Section>
          <SectionHeader>
            <SectionTitle>최근 활동</SectionTitle>
            <ViewAllLink href="#">전체 보기</ViewAllLink>
          </SectionHeader>
          <ActivityList>
            {activities.map(activity => (
              <ActivityItem key={activity.id}>
                <ActivityIcon type={activity.type} />
                <ActivityContent>
                  <ActivityMessage>{activity.message}</ActivityMessage>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </Section>
        
        <Section>
          <SectionHeader>
            <SectionTitle>판매 통계</SectionTitle>
            <TimeRangeSelector>
              <TimeRangeButton 
                active={timeRange === 'week'} 
                onClick={() => setTimeRange('week')}
              >
                주간
              </TimeRangeButton>
              <TimeRangeButton 
                active={timeRange === 'month'} 
                onClick={() => setTimeRange('month')}
              >
                월간
              </TimeRangeButton>
              <TimeRangeButton 
                active={timeRange === 'year'} 
                onClick={() => setTimeRange('year')}
              >
                연간
              </TimeRangeButton>
            </TimeRangeSelector>
          </SectionHeader>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData[timeRange]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? formatCurrency(value) : value,
                    name === 'sales' ? '매출' : '주문 수'
                  ]}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#1E88E5"
                  name="매출"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="주문"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Section>
      </DashboardSections>
    </DashboardContent>
  );
};

// Styled components for Dashboard
const DashboardContent = styled.div`
  padding: 24px;
`;

const WelcomeSection = styled.div`
  margin-bottom: 32px;
`;

const WelcomeHeading = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #212121;
  margin: 0 0 8px 0;
`;

const WelcomeSubheading = styled.p`
  font-size: 16px;
  color: #757575;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const StatCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  margin: 0 0 16px 0;
`;

const StatValueContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const StatValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #212121;
`;

const StatTrend = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
  color: ${props => props.trendUp === true ? '#4CAF50' : props.trendUp === false ? '#F44336' : '#757575'};
`;

const DashboardSections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  margin: 0;
`;

const ViewAllLink = styled.a`
  font-size: 14px;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #EEEEEE;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => {
    switch(props.type) {
      case 'new_product': return '#E3F2FD';
      case 'order': return '#E8F5E9';
      case 'market': return '#FFF3E0';
      case 'alert': return '#FFEBEE';
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
        case 'new_product': return '📦';
        case 'order': return '🛒';
        case 'market': return '🏪';
        case 'alert': return '⚠️';
        default: return '🔔';
      }
    }}';
    font-size: 18px;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMessage = styled.p`
  font-size: 14px;
  color: #424242;
  margin: 0 0 4px 0;
`;

const ActivityTime = styled.span`
  font-size: 12px;
  color: #9E9E9E;
`;

const TimeRangeSelector = styled.div`
  display: flex;
  gap: 8px;
`;

const TimeRangeButton = styled.button`
  padding: 6px 12px;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border.light};
  border-radius: 6px;
  background-color: ${props => props.active ? props.theme.colors.background.dark : props.theme.colors.background.main};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.background.dark};
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-top: 16px;
`;

export default DashboardPage;