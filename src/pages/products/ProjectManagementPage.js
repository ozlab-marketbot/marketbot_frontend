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
    name: '',
    price: '',
    status: 'SALE',
    origin_product_no: '',
    channel_product_no: '',
    stock: ''
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
      name: '',
      price: '',
      status: 'SALE',
      origin_product_no: '',
      channel_product_no: '',
      stock: ''
    });
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axios.delete(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
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
    axios.put(`http://127.0.0.1:8000/api/products/${formData.id}/`, formData)
      .then(res => {
        setProducts(products.map(p => p.id === formData.id ? res.data : p));
        setIsEditModalOpen(false);
      })
      .catch(err => {
        console.error("수정 실패:", err);
        alert("상품 수정 실패");
      });
  };

  const getStatusText = (status) => {
    if (status === 'SALE') return '판매중';
    if (status === 'SUSPENSION') return '판매중지';
    return '기타';
  };

  const filteredProducts = products.filter(product =>
    (product.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-management-container">
      <div className="page-header">
        <h1 className="page-title">상품 관리</h1>
      </div>

      <div className="search-container">
        <FormInput
          type="text"
          placeholder="상품명 검색"
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
              <th>가격</th>
              <th>재고</th>
              <th>상태</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.channel_product_no}>
                <td>{product.name}</td>
                <td>{parseInt(product.price).toLocaleString()}원</td>
                <td>{product.stock}</td>
                <td>{getStatusText(product.status)}</td>
                <td>
                  <Button variant="text" onClick={() => handleEditProduct(product)}>수정</Button>
                  <Button variant="text" className="delete-button" onClick={() => handleDeleteProduct(product.id)}>삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="modal">
          <h2>상품 추가</h2>
          <input name="name" value={formData.name} onChange={handleFormChange} placeholder="상품명" />
          <input name="price" value={formData.price} onChange={handleFormChange} placeholder="가격" />
          <input name="stock" value={formData.stock} onChange={handleFormChange} placeholder="재고 수량" />
          <input name="origin_product_no" value={formData.origin_product_no} onChange={handleFormChange} placeholder="원본 상품번호" />
          <input name="channel_product_no" value={formData.channel_product_no} onChange={handleFormChange} placeholder="채널 상품번호" />
          <button onClick={handleAddSubmit}>등록</button>
          <button onClick={() => setIsAddModalOpen(false)}>취소</button>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <h2>상품 수정</h2>
          <input name="name" value={formData.name} onChange={handleFormChange} placeholder="상품명" />
          <input name="price" value={formData.price} onChange={handleFormChange} placeholder="가격" />
          <input name="stock" value={formData.stock} onChange={handleFormChange} placeholder="재고 수량" />
          <button onClick={handleEditSubmit}>수정</button>
          <button onClick={() => setIsEditModalOpen(false)}>취소</button>
        </div>
      )}

      {/* ✅ 고정 버튼 */}
      <Button
        variant="primary"
        onClick={handleAddProduct}
        className="fixed-add-button"
      >
        + 상품 추가
      </Button>
    </div>
  );
};

export default ProductManagementPage;
