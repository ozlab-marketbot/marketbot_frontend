// src/pages/orders/components/OrderStatusUpdate.js

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/common/Button';

// A styled container for the status update section
const StatusUpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 16px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 4px;
  }

  select {
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
  }
`;

const OrderStatusUpdate = ({ currentStatus, onUpdateStatus }) => {
  const [status, setStatus] = useState(currentStatus || 'pending');

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the callback provided by the parent to actually update the status.
    onUpdateStatus(status);
  };

  return (
    <StatusUpdateContainer>
      <h3>주문 상태 변경</h3>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <label>현재 상태: {currentStatus}</label>
          <select value={status} onChange={handleChange}>
            <option value="pending">결제완료</option>
            <option value="shipping">배송중</option>
            <option value="delivered">배송완료</option>
            <option value="canceled">취소</option>
          </select>
        </FieldGroup>

        <div style={{ marginTop: '16px' }}>
          <Button type="submit" variant="primary">
            상태 업데이트
          </Button>
        </div>
      </form>
    </StatusUpdateContainer>
  );
};

export default OrderStatusUpdate;
