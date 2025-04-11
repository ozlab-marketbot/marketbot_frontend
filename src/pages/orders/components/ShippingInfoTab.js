// src/pages/orders/components/ShippingInfoTab.js

import React from 'react';
import styled from 'styled-components';

const ShippingContainer = styled.div`
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;
`;

const ShippingInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 4px;
  }

  span {
    font-size: 14px;
    color: #111827;
    font-weight: 500;
  }

  input {
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    width: 100%;
  }
`;

const ShippingInfoTab = ({ shippingInfo = {} }) => {
  // shippingInfo object might look like:
  // {
  //   address: "서울특별시 강남구 테헤란로 123",
  //   courier: "CJ대한통운",
  //   trackingNumber: "123456789",
  //   estimatedDelivery: "2023-12-01"
  // }
  // Adjust as needed.

  const {
    address = '',
    courier = '',
    trackingNumber = '',
    estimatedDelivery = '',
    contactNumber = ''
  } = shippingInfo;

  return (
    <ShippingContainer>
      <h3>배송 정보</h3>
      <ShippingInfoGroup>
        <label>주소</label>
        <span>{address || '정보 없음'}</span>
      </ShippingInfoGroup>
      <ShippingInfoGroup>
        <label>택배사</label>
        <span>{courier || '정보 없음'}</span>
      </ShippingInfoGroup>
      <ShippingInfoGroup>
        <label>운송장 번호</label>
        <span>{trackingNumber || '정보 없음'}</span>
      </ShippingInfoGroup>
      <ShippingInfoGroup>
        <label>도착 예정일</label>
        <span>{estimatedDelivery || '정보 없음'}</span>
      </ShippingInfoGroup>
      <ShippingInfoGroup>
        <label>연락처</label>
        <span>{contactNumber || '정보 없음'}</span>
      </ShippingInfoGroup>
    </ShippingContainer>
  );
};

export default ShippingInfoTab;
