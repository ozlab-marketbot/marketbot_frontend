import React, { useState } from 'react';
import ResponsiveDashboardLayout from '../../components/layout/ResponsiveDashboardLayout';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';

const allColumns = {
  product_name: '상품명',
  price: '가격',
  market: '마켓',
  sold: '판매량',
  stock: '재고',
  profit: '판매수익',
  postedDate: '등록날짜'
};

const ProductManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(Object.keys(allColumns));

  const [products] = useState([
    {
      product_name: "ps5071 쿨한 하이웨스트 팬츠",
      price: "25,020원",
      market: "에이블리",
      sold: 50,
      stock: 100,
      profit: "1,251,000",
      postedDate: "2024.10.15",
    },
    {
      product_name: "sk7221 루틴 베이직 생지 스커트",
      price: "39,420원",
      market: "브랜디",
      sold: 100,
      stock: 300,
      profit: "3,942,000",
      postedDate: "2024.4.17",
    },
    {
      product_name: "단백질 쉐이크 490g 2통",
      price: "52,700원",
      market: "지그재그",
      sold: 30,
      stock: 40,
      profit: "1,581,000",
      postedDate: "2024.6.27",
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleColumn = (key) => {
    setVisibleColumns(prev =>
      prev.includes(key) ? prev.filter(col => col !== key) : [...prev, key]
    );
  };

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ResponsiveDashboardLayout>
      <div className="product-management-container">
        <div className="page-header">
          <h1 className="page-title">상품 관리</h1>
        </div>

        <div className="search-container">
          <FormInput
            type="text"
            placeholder="상품명 또는 마켓명으로 검색"
            value={searchTerm}
            onChange={handleSearchChange}
            icon="search"
          />
        </div>

        <div className="column-toggle">
          {Object.entries(allColumns).map(([key, label]) => (
            <label key={key} style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                checked={visibleColumns.includes(key)}
                onChange={() => toggleColumn(key)}
              />
              {label}
            </label>
          ))}
        </div>

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                {visibleColumns.includes('product_name') && <th>상품명</th>}
                {visibleColumns.includes('price') && <th>가격</th>}
                {visibleColumns.includes('market') && <th>마켓</th>}
                {visibleColumns.includes('sold') && <th>판매량</th>}
                {visibleColumns.includes('stock') && <th>재고</th>}
                {visibleColumns.includes('profit') && <th>판매수익</th>}
                {visibleColumns.includes('postedDate') && <th>등록날짜</th>}
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, i) => (
                <tr key={i}>
                  {visibleColumns.includes('product_name') && <td>{product.product_name}</td>}
                  {visibleColumns.includes('price') && <td>{product.price}</td>}
                  {visibleColumns.includes('market') && <td>{product.market}</td>}
                  {visibleColumns.includes('sold') && <td>{product.sold}</td>}
                  {visibleColumns.includes('stock') && <td>{product.stock}</td>}
                  {visibleColumns.includes('profit') && <td>{product.profit}</td>}
                  {visibleColumns.includes('postedDate') && <td>{product.postedDate}</td>}
                  <td className="action-buttons">
                    <Button variant="text">수정</Button>
                    <Button variant="text" className="delete-button">삭제</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Button variant="primary">
        + 상품 추가
      </Button>
    </ResponsiveDashboardLayout>
  );
};

export default ProductManagementPage;
