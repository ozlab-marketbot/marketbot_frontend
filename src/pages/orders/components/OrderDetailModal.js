// src/pages/orders/components/OrderDetailModal.js

import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  CloseButton,
  TabNav,
  Tab,
  TabContent
} from '../../../pages/orders/styles/OrderStyles';

// Import your tab components (implement or adjust as needed)
import OrderInfoTab from './OrderInfoTab';
import OrderItemsTab from './OrderItemsTab';
import ShippingInfoTab from './ShippingInfoTab';
import OrderStatusUpdate from './OrderStatusUpdate';

function OrderDetailModal({ order, onClose }) {
  const [activeTab, setActiveTab] = useState('info');

  if (!order) {
    return null;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Example callback to update the order status
  const handleUpdateStatus = (newStatus) => {
    // Implement status update logic here (API call, local state update, etc.)
    console.log('Order status changed to:', newStatus);
    // Possibly close modal or re-fetch data
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>주문 상세 정보</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        {/* Tab Navigation */}
        <TabNav>
          <Tab
            active={activeTab === 'info'}
            onClick={() => handleTabChange('info')}
          >
            주문 정보
          </Tab>
          <Tab
            active={activeTab === 'items'}
            onClick={() => handleTabChange('items')}
          >
            상품 정보
          </Tab>
          <Tab
            active={activeTab === 'shipping'}
            onClick={() => handleTabChange('shipping')}
          >
            배송 정보
          </Tab>
          <Tab
            active={activeTab === 'status'}
            onClick={() => handleTabChange('status')}
          >
            상태 업데이트
          </Tab>
        </TabNav>

        {/* Tab Content */}
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
