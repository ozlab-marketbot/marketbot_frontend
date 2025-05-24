import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import './ProjectManagementPage.css';


const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    status: 'SALE',
    origin_product_no: '',
    channel_product_no: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  const fetchProducts = () => {
    axios
      .get(`http://127.0.0.1:8000/api/products/?page=${page}&page_size=${pageSize}`)
      .then(res => {
        setProducts(res.data.results || []);
        setCount(res.data.count || 0);
      })
      .catch(err => {
        console.error('상품 데이터 불러오기 실패', err);
        setProducts([]);
        setCount(0);
      });
  };

  const handleSyncProducts = () => {
    if (!window.confirm("네이버 스마트스토어에서 데이터를 다시 불러올까요?")) return;
    axios.get('http://127.0.0.1:8000/api/products/sync/')
      .then(() => {
        alert("✅ 동기화 완료! 최신 데이터를 불러옵니다.");
        fetchProducts();
      })
      .catch(err => {
        console.error("동기화 실패:", err);
        alert("❌ 동기화 실패");
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = () => {
    setFormData({
      name: '', price: '', status: 'SALE', origin_product_no: '', channel_product_no: '', stock: ''
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

      <div className="sync-container" style={{ marginBottom: '20px' }}>
        <Button $variant="outline" onClick={handleSyncProducts}>
          🔄 네이버 스마트스토어 동기화
        </Button>
      </div>

      <div className="search-container">
        <FormInput
          type="text"
          placeholder="상품명 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          $icon="search"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
        {/* 페이지당 개수는 추후 만들기로... */}
        {/* <div>
          페이지당 개수:
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={{ marginLeft: '8px' }}>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div> */}
        <div>
          {Array.from({ length: Math.ceil(count / pageSize) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              style={{
                marginRight: '5px',
                backgroundColor: page === i + 1 ? '#007bff' : '#eee',
                color: page === i + 1 ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
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
                  <Button $variant="text" onClick={() => handleEditProduct(product)}>수정</Button>
                  <Button $variant="text" className="delete-button" onClick={() => handleDeleteProduct(product.id)}>삭제</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay">
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
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>상품 수정</h2>
            <input name="name" value={formData.name} onChange={handleFormChange} placeholder="상품명" />
            <input name="price" value={formData.price} onChange={handleFormChange} placeholder="가격" />
            <input name="stock" value={formData.stock} onChange={handleFormChange} placeholder="재고 수량" />
            <button onClick={handleEditSubmit}>수정</button>
            <button onClick={() => setIsEditModalOpen(false)}>취소</button>
          </div>
        </div>
      )}

      <Button
        $variant="primary"
        onClick={handleAddProduct}
        className="fixed-add-button"
      >
        + 상품 추가
      </Button>
    </div>
  );
};

export default ProductManagementPage;
