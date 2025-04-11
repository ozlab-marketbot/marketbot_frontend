import styled from 'styled-components';

// Table styles
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 16px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover {
    background-color: #f5f8ff;
  }

  @media (max-width: 1024px) {
    th:nth-child(4), td:nth-child(4),
    th:nth-child(5), td:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    th:nth-child(3), td:nth-child(3) {
      display: none;
    }
  }
`;

// Table header styles
export const Th = styled.th`
  font-weight: 600;
  color: #555;
  background-color: #f9f9f9;
  padding: 16px;
`;

// Table cell styles
export const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

// Status badge styles
export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background-color: #fff8e1;
          color: #f57c00;
        `;
      case 'processing':
        return `
          background-color: #e3f2fd;
          color: #1976d2;
        `;
      case 'shipping':
        return `
          background-color: #e8f5e9;
          color: #2e7d32;
        `;
      case 'delivered':
        return `
          background-color: #e0f2f1;
          color: #00897b;
        `;
      case 'cancelled':
        return `
          background-color: #ffebee;
          color: #d32f2f;
        `;
      default:
        return `
          background-color: #f5f5f5;
          color: #757575;
        `;
    }
  }}
`;

// Action button styles
export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #2196f3;
  cursor: pointer;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s;
  
  ${props => props.variant === 'text' && `
    text-decoration: underline;
  `}
  
  ${props => props.size === 'small' && `
    font-size: 12px;
    padding: 6px;
  `}
  
  &:hover {
    background-color: #e3f2fd;
  }
  
  &:disabled {
    color: #bdbdbd;
    cursor: not-allowed;
    
    &:hover {
      background: none;
    }
  }
`;

// Pagination container
export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// Page button for pagination
export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid ${props => props.active ? '#2196f3' : '#e0e0e0'};
  background-color: ${props => props.active ? '#e3f2fd' : '#fff'};
  color: ${props => props.active ? '#2196f3' : '#757575'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    border-color: #2196f3;
    color: #2196f3;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #bdbdbd;
    cursor: not-allowed;
  }
`;

// Modal styles
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #757575;
  
  &:hover {
    color: #333;
  }
`;

// Container styles
export const OrderContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h1 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

// Filter container
export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Detail section styles
export const DetailSection = styled.div`
  margin-bottom: 24px;
  
  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }
`;

// Info grid for order details
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 14px;
    color: #757575;
    margin-bottom: 4px;
  }
  
  span {
    font-size: 16px;
    color: #333;
  }
`;

// Tab navigation for order details
export const TabNav = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
`;

export const Tab = styled.button`
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#2196f3' : 'transparent'};
  color: ${props => props.active ? '#2196f3' : '#757575'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #2196f3;
  }
`;

export const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

// Add any additional styles from the OrderTable.js component as needed