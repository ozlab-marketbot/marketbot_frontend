// src/pages/orders/components/OrderItemsTab.js

import React from 'react';
import styled from 'styled-components';

const ItemsContainer = styled.div`
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  th, td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
  }

  th {
    background-color: #f3f4f6;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    th:nth-child(3), td:nth-child(3) {
      display: none; /* Example: hide quantity column on smaller screens */
    }
  }
`;

const OrderItemsTab = ({ items = [] }) => {
  if (!items.length) {
    return <ItemsContainer>주문 상품 정보가 없습니다.</ItemsContainer>;
  }

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <ItemsContainer>
      <h3>주문 상품 목록</h3>
      <ItemsTable>
        <thead>
          <tr>
            <th>상품명</th>
            <th>단가</th>
            <th>수량</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString()}원</td>
              <td>{item.quantity}</td>
              <td>{(item.price * item.quantity).toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </ItemsTable>
      <div style={{ marginTop: '16px', textAlign: 'right', fontWeight: '600' }}>
        총 합계: {totalPrice.toLocaleString()}원
      </div>
    </ItemsContainer>
  );
};

export default OrderItemsTab;
