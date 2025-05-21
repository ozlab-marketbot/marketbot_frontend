import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category1: '',
    lprice: '',
    productId: '',
    productType: '1',
    image: '',
    link: '',
    mallName: '',
    maker: ''
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error('상품 데이터 불러오기 실패', err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = () => {
    setFormData({
      title: '', category1: '', lprice: '', productId: '', productType: '1', image: '', link: '', mallName: '', maker: ''
    });
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`)  // productId → id 로 변경 필요 시 수정
      .then(() => {
        setProducts(products.filter(p => p.productId !== productId));
      })
      .catch(err => {
        console.error("삭제 실패:", err);
        alert("삭제 중 오류 발생");
      });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = () => {
    axios.post("http://127.0.0.1:8000/api/products/", formData)
      .then(res => {
        setProducts([res.data, ...products]);
        setIsAddModalOpen(false);
      })
      .catch(err => {
        console.error("추가 실패:", err);
        alert("상품 추가 실패");
      });
  };

  const handleEditSubmit = () => {
    axios.put(`http://127.0.0.1:8000/api/products/${formData.productId}/`, formData)
      .then(res => {
        setProducts(products.map(p => p.productId === formData.productId ? res.data : p));
        setIsEditModalOpen(false);
      })
      .catch(err => {
        console.error("수정 실패:", err);
        alert("상품 수정 실패");
      });
  };

  const getStatusText = (productType) => productType === '1' ? '판매중' : '품절';

  const filteredProducts = products.filter(product =>
    (product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category1 || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-management-container">
      <div className="page-header">
        <h1 className="page-title">상품 관리</h1>
      </div>

      <div className="search-container">
        <FormInput
          type="text"
          placeholder="상품명 또는 카테고리로 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          icon="search"
        />
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>상품명</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>상태</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.title}</td>
                <td>{product.category1}</td>
                <td>{parseInt(product.lprice).toLocaleString()}원</td>
                <td>{getStatusText(product.productType)}</td>
                <td>
                  <Button variant="text" onClick={() => handleEditProduct(product)}>수정</Button>
                  <Button variant="text" className="delete-button" onClick={() => handleDeleteProduct(product.productId)}>삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="modal">
          <h2>상품 추가</h2>
          <input name="title" value={formData.title} onChange={handleFormChange} placeholder="상품명" />
          <input name="category1" value={formData.category1} onChange={handleFormChange} placeholder="카테고리" />
          <input name="lprice" value={formData.lprice} onChange={handleFormChange} placeholder="가격" />
          <input name="productId" value={formData.productId} onChange={handleFormChange} placeholder="고유 ID" />
          <button onClick={handleAddSubmit}>등록</button>
          <button onClick={() => setIsAddModalOpen(false)}>취소</button>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <h2>상품 수정</h2>
          <input name="title" value={formData.title} onChange={handleFormChange} placeholder="상품명" />
          <input name="category1" value={formData.category1} onChange={handleFormChange} placeholder="카테고리" />
          <input name="lprice" value={formData.lprice} onChange={handleFormChange} placeholder="가격" />
          <button onClick={handleEditSubmit}>수정</button>
          <button onClick={() => setIsEditModalOpen(false)}>취소</button>
        </div>
      )}

      <Button variant="primary" onClick={handleAddProduct}>
        + 상품 추가
      </Button>
    </div>
  );
};

export default ProductManagementPage;
