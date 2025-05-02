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

const SalesStatisticsPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  
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
    <StatisticsContainer>
      <PageHeader>
        <PageTitle>매출 통계</PageTitle>
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
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatTitle>총 매출</StatTitle>
          <StatValue>
            {formatCurrency(salesData[timeRange].reduce((sum, item) => sum + item.sales, 0))}
          </StatValue>
          <StatTrend trendUp={true}>+12%</StatTrend>
        </StatCard>
        <StatCard>
          <StatTitle>총 주문 수</StatTitle>
          <StatValue>
            {salesData[timeRange].reduce((sum, item) => sum + item.orders, 0)}건
          </StatValue>
          <StatTrend trendUp={true}>+8%</StatTrend>
        </StatCard>
        <StatCard>
          <StatTitle>평균 주문 금액</StatTitle>
          <StatValue>
            {formatCurrency(
              salesData[timeRange].reduce((sum, item) => sum + item.sales, 0) /
              salesData[timeRange].reduce((sum, item) => sum + item.orders, 0)
            )}
          </StatValue>
          <StatTrend trendUp={true}>+5%</StatTrend>
        </StatCard>
      </StatsGrid>

      <ChartSection>
        <ChartCard>
          <ChartHeader>
            <ChartTitle>매출 추이</ChartTitle>
            <ChartLegend>
              <LegendItem>
                <LegendColor color="#1E88E5" />
                <LegendText>매출</LegendText>
              </LegendItem>
              <LegendItem>
                <LegendColor color="#4CAF50" />
                <LegendText>주문 수</LegendText>
              </LegendItem>
            </ChartLegend>
          </ChartHeader>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={400}>
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
                  name="매출"
                  stroke="#1E88E5"
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
        </ChartCard>
      </ChartSection>
    </StatisticsContainer>
  );
};

const StatisticsContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  margin: 0;
`;

const TimeRangeSelector = styled.div`
  display: flex;
  gap: 8px;
`;

const TimeRangeButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? '#1E88E5' : '#E0E0E0'};
  border-radius: 8px;
  background-color: ${props => props.active ? '#E3F2FD' : 'white'};
  color: ${props => props.active ? '#1E88E5' : '#757575'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#E3F2FD' : '#F5F5F5'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #757575;
  margin: 0 0 8px 0;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 8px;
`;

const StatTrend = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.trendUp ? '#4CAF50' : '#F44336'};
`;

const ChartSection = styled.div`
  margin-top: 24px;
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ChartTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  margin: 0;
`;

const ChartLegend = styled.div`
  display: flex;
  gap: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

const LegendText = styled.span`
  font-size: 14px;
  color: #757575;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
`;

export default SalesStatisticsPage; 