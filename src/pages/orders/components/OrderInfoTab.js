// src/pages/orders/components/OrderDetailModal.js

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Modal,
  ModalContent,
  ModalHeader,
  CloseButton,
  TabNav,
  Tab,
  TabContent
} from '../../../pages/orders/styles/OrderStyles';

import OrderInfoTab from './OrderInfoTab';
import OrderItemsTab from './OrderItemsTab';
import ShippingInfoTab from './ShippingInfoTab';
import OrderStatusUpdate from './OrderStatusUpdate';

function OrderDetailModal({ order, onClose }) {
  const [activeTab, setActiveTab] = useState('info');

  if (!order) {
    return null;
  }

  // Example usage of date-fns: If order.orderDate is a date string,
  // convert to a Date object and format it. 
  // Adjust the format string ('yyyy-MM-dd HH:mm') as you like.
  const formattedOrderDate = order.orderDate 
    ? format(new Date(order.orderDate), 'yyyy-MM-dd HH:mm') 
    : '날짜 정보 없음';

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUpdateStatus = (newStatus) => {
    console.log('Order status changed to:', newStatus);
    // Insert your logic here to update status in the backend or state.
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>주문 상세 정보</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        {/* Show a quick date field somewhere using date-fns */}
        <div style={{ marginBottom: '16px', fontSize: '14px' }}>
          <strong>주문 날짜:</strong> {formattedOrderDate}
        </div>

        <TabNav>
          <Tab active={activeTab === 'info'} onClick={() => handleTabChange('info')}>
            주문 정보
          </Tab>
          <Tab active={activeTab === 'items'} onClick={() => handleTabChange('items')}>
            상품 정보
          </Tab>
          <Tab active={activeTab === 'shipping'} onClick={() => handleTabChange('shipping')}>
            배송 정보
          </Tab>
          <Tab active={activeTab === 'status'} onClick={() => handleTabChange('status')}>
            상태 업데이트
          </Tab>
        </TabNav>

        <TabContent active={activeTab === 'info'}>
          <OrderInfoTab order={order} />
        </TabContent>
        
        <TabContent active={activeTab === 'items'}>
          <OrderItemsTab items={order.items} />
        </TabContent>
        
        <TabContent active={activeTab === 'shipping'}>
          <ShippingInfoTab shippingInfo={order.shipping} />
        </TabContent>
        
        <TabContent active={activeTab === 'status'}>
          <OrderStatusUpdate 
            currentStatus={order.status} 
            onUpdateStatus={handleUpdateStatus} 
          />
        </TabContent>
      </ModalContent>
    </Modal>
  );
}

export default OrderDetailModal;
