// src/services/api/orderService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Helper to get auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const orderService = {
  // Get all orders with optional filters
  getOrders: async (filters = {}) => {
    try {
      // In a real app, you would make an API call with filters
      // const response = await axios.get(`${API_URL}/orders`, {
      //   headers: getAuthHeader(),
      //   params: filters
      // });
      // return response.data;
      
      // For demo purposes, return mock data
      const mockOrders = [
        {
          id: '1001',
          orderNumber: 'ORD-20250401-001',
          customerName: '김지수',
          orderDate: '2025-04-01T09:30:00',
          totalAmount: 52000,
          status: 'pending',
          paymentMethod: '카드결제',
          items: [
            { id: '1', productName: '블랙 티셔츠', quantity: 2, price: 15000 },
            { id: '2', productName: '청바지', quantity: 1, price: 22000 }
          ],
          shippingInfo: {
            address: '서울특별시 강남구 테헤란로 123',
            contactNumber: '010-1234-5678',
            trackingNumber: '',
            carrier: ''
          }
        },
        {
          id: '1002',
          orderNumber: 'ORD-20250401-002',
          customerName: '이민준',
          orderDate: '2025-04-01T10:15:00',
          totalAmount: 76500,
          status: 'processing',
          paymentMethod: '무통장입금',
          items: [
            { id: '3', productName: '후드티', quantity: 1, price: 35000 },
            { id: '4', productName: '운동화', quantity: 1, price: 41500 }
          ],
          shippingInfo: {
            address: '경기도 성남시 분당구 판교로 256',
            contactNumber: '010-9876-5432',
            trackingNumber: '',
            carrier: ''
          }
        },
        {
          id: '1003',
          orderNumber: 'ORD-20250330-001',
          customerName: '박서준',
          orderDate: '2025-03-30T14:20:00',
          totalAmount: 128000,
          status: 'shipped',
          paymentMethod: '카드결제',
          items: [
            { id: '5', productName: '아웃도어 재킷', quantity: 1, price: 128000 }
          ],
          shippingInfo: {
            address: '부산광역시 해운대구 해운대로 100',
            contactNumber: '010-5555-7777',
            trackingNumber: 'TK123456789',
            carrier: 'CJ대한통운'
          }
        },
        {
          id: '1004',
          orderNumber: 'ORD-20250329-002',
          customerName: '최예은',
          orderDate: '2025-03-29T16:45:00',
          totalAmount: 27000,
          status: 'delivered',
          paymentMethod: '간편결제',
          items: [
            { id: '6', productName: '여름 샌들', quantity: 1, price: 27000 }
          ],
          shippingInfo: {
            address: '인천광역시 연수구 센트럴로 194',
            contactNumber: '010-2222-3333',
            trackingNumber: 'TK987654321',
            carrier: '로젠택배'
          }
        },
        {
          id: '1005',
          orderNumber: 'ORD-20250328-001',
          customerName: '정도현',
          orderDate: '2025-03-28T11:30:00',
          totalAmount: 96000,
          status: 'cancelled',
          paymentMethod: '카드결제',
          items: [
            { id: '7', productName: '스마트워치', quantity: 1, price: 96000 }
          ],
          shippingInfo: {
            address: '대전광역시 유성구 대학로 99',
            contactNumber: '010-8888-9999',
            trackingNumber: '',
            carrier: ''
          }
        }
      ];
      
      // Apply filters if any
      let filteredOrders = [...mockOrders];
      
      if (filters.status) {
        filteredOrders = filteredOrders.filter(order => order.status === filters.status);
      }
      
      if (filters.orderNumber) {
        filteredOrders = filteredOrders.filter(order => 
          order.orderNumber.toLowerCase().includes(filters.orderNumber.toLowerCase())
        );
      }
      
      if (filters.customerName) {
        filteredOrders = filteredOrders.filter(order => 
          order.customerName.includes(filters.customerName)
        );
      }
      
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        filteredOrders = filteredOrders.filter(order => 
          new Date(order.orderDate) >= startDate
        );
      }
      
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999); // End of the day
        filteredOrders = filteredOrders.filter(order => 
          new Date(order.orderDate) <= endDate
        );
      }
      
      return {
        orders: filteredOrders,
        totalCount: filteredOrders.length,
        pageCount: Math.ceil(filteredOrders.length / (filters.pageSize || 10))
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  },
  
  // Get a single order by ID
  getOrderById: async (orderId) => {
    try {
      // In a real app, you would make an API call
      // const response = await axios.get(`${API_URL}/orders/${orderId}`, {
      //   headers: getAuthHeader()
      // });
      // return response.data;
      
      // For demo purposes
      const mockOrders = [
        {
          id: '1001',
          orderNumber: 'ORD-20250401-001',
          customerName: '김지수',
          orderDate: '2025-04-01T09:30:00',
          totalAmount: 52000,
          status: 'pending',
          paymentMethod: '카드결제',
          items: [
            { id: '1', productName: '블랙 티셔츠', quantity: 2, price: 15000 },
            { id: '2', productName: '청바지', quantity: 1, price: 22000 }
          ],
          shippingInfo: {
            address: '서울특별시 강남구 테헤란로 123',
            contactNumber: '010-1234-5678',
            trackingNumber: '',
            carrier: ''
          }
        },
        {
          id: '1002',
          orderNumber: 'ORD-20250401-002',
          customerName: '이민준',
          orderDate: '2025-04-01T10:15:00',
          totalAmount: 76500,
          status: 'processing',
          paymentMethod: '무통장입금',
          items: [
            { id: '3', productName: '후드티', quantity: 1, price: 35000 },
            { id: '4', productName: '운동화', quantity: 1, price: 41500 }
          ],
          shippingInfo: {
            address: '경기도 성남시 분당구 판교로 256',
            contactNumber: '010-9876-5432',
            trackingNumber: '',
            carrier: ''
          }
        }
      ];
      
      const order = mockOrders.find(order => order.id === orderId);
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      return order;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order details');
    }
  },
  
  // Update order status
  updateOrderStatus: async (orderId, status, shippingInfo = {}) => {
    try {
      // In a real app, you would make an API call
      // const response = await axios.patch(
      //   `${API_URL}/orders/${orderId}/status`,
      //   { status, ...shippingInfo },
      //   { headers: getAuthHeader() }
      // );
      // return response.data;
      
      // For demo purposes
      return {
        id: orderId,
        status,
        shippingInfo,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update order status');
    }
  },
  
  // Update shipping information
  updateShippingInfo: async (orderId, shippingInfo) => {
    try {
      // In a real app, you would make an API call
      // const response = await axios.patch(
      //   `${API_URL}/orders/${orderId}/shipping`,
      //   shippingInfo,
      //   { headers: getAuthHeader() }
      // );
      // return response.data;
      
      // For demo purposes
      return {
        id: orderId,
        shippingInfo,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update shipping information');
    }
  },
  
  // Export orders to CSV/Excel
  exportOrders: async (filters = {}) => {
    try {
      // In a real app, you would make an API call
      // const response = await axios.get(`${API_URL}/orders/export`, {
      //   headers: getAuthHeader(),
      //   params: filters,
      //   responseType: 'blob'
      // });
      // return response.data;
      
      // For demo purposes, return a mock URL
      return {
        downloadUrl: 'mock-export-url.csv'
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to export orders');
    }
  }
};

export default orderService;