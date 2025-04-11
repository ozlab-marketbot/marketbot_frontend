import React, { useState } from "react";
import "./styles/stock.css";

const initialProducts = [
  {
    product_name: "ps5071 (2개입/히든밴딩/허리밴딩청) 쿨한 하이웨스트 팬츠",
    price: "25,020원",
    market: "에이블리",
    sold: 50,
    stock: 100,
    profit: "1,251,000",
    postedDate: "2024.10.15",
  },
  {
    product_name: "sk7221 [쫀쫀쮸] (에잇ZERO/한정판) 루틴 베이직 생지 스커트",
    price: "39,420원",
    market: "브랜디",
    sold: 100,
    stock: 300,
    profit: "3,942,000",
    postedDate: "2024.4.17",
  },
  {
    product_name: "[1+1보틀] 단백질 쉐이크 490g 2통 / 6종 (NEW 밀키,곡물,고구마 외)",
    price: "52,700원",
    market: "지그재그",
    sold: 30,
    stock: 40,
    profit: "1,581,000",
    postedDate: "2024.6.27",
  },
];

const Dashboard = () => {
  const [productList, setProductList] = useState(initialProducts);
  const [visibleColumns, setVisibleColumns] = useState({
    product_name: true,
    price: true,
    market: true,
    sold: true,
    stock: true,
    profit: true,
    postedDate: true,
  });
  const [showFilter, setShowFilter] = useState(false);

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const deleteRow = (index) => {
    const updated = [...productList];
    updated.splice(index, 1);
    setProductList(updated);
  };

  return (
    <div className="dashboard-container">
      <header></header>

      <h1 className="dashboard-title">MANAGING DASHBOARD</h1>

      <div className="dashboard-body">
        <main className="dashboard-main">
          <button className="filter-toggle-button" onClick={() => setShowFilter(!showFilter)}>
            상품 필터
          </button>

          {showFilter && (
            <div className="filter-panel">
              <div className="filter-group">
                <label htmlFor="postedDate">날짜</label>
                <input id="postedDate" type="date" placeholder="0000년00월00일 ~ 0000년00월00일" />

                
                  <label htmlFor="market">마켓</label>
                  <select id="market">
                    <option>전체</option>
                    <option>쿠팡</option>
                    <option>인터파크</option>
                    <option>기타</option>
                  </select>
                

                <label htmlFor="price">가격대</label>
                <input id="price" type="text" placeholder="0원 ~ 1,000,000,000원" />
              </div>

              <div className="filter-group">
                <label htmlFor="product_name">상품유형</label>
                <input id="product_name" type="text" placeholder="전체" />

                <label htmlFor="stock">재고</label>
                <input id="stock" type="text" placeholder="0 ~ 1,000,000" />

                <label htmlFor="sold">판매량</label>
                <input id="sold" type="text" placeholder="0 ~ 1,000,000" />
                <div className="inline-field">
                  <label htmlFor="profit">판매수익</label>
                  <input id="profit" type="text" placeholder="0원 ~ 1,000,000,000원" />
                </div>
              </div>

              <button className="apply-filter-button">필터 적용</button>
            </div>
          )}

          

          <table className="dashboard-table">
            <thead>
              <tr>
                {visibleColumns.product_name && <th>상품이름</th>}
                {visibleColumns.price && <th>가격</th>}
                {visibleColumns.market && <th>마켓</th>}
                {visibleColumns.sold && <th>판매량</th>}
                {visibleColumns.stock && <th>재고</th>}
                {visibleColumns.profit && <th>판매수익</th>}
                {visibleColumns.postedDate && <th>등록날짜</th>}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((p, i) => (
                <tr key={i}>
                  {visibleColumns.product_name && <td>{p.product_name}</td>}
                  {visibleColumns.price && <td>{p.price}</td>}
                  {visibleColumns.market && <td>{p.market}</td>}
                  {visibleColumns.sold && <td>{p.sold}</td>}
                  {visibleColumns.stock && <td>{p.stock}</td>}
                  {visibleColumns.profit && <td>{p.profit}</td>}
                  {visibleColumns.postedDate && <td>{p.postedDate}</td>}
                  <td>
                    <button className="delete-button" onClick={() => deleteRow(i)}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            
            {/* 열 토글 체크박스 */}
          <div className="column-toggle-box">
            {Object.keys(visibleColumns).map((col) => (
              <label key={col}>
                <input
                  type="checkbox"
                  checked={visibleColumns[col]}
                  onChange={() => toggleColumn(col)}
                />
                {col}
              </label>
            ))}
          </div>


          <div className="search-box">
            <input id="search" type="text" maxLength="10" placeholder="Search" required />
            <button>
              Search
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.87549 16.4859L1 19.2168C2.92165 12.6017 5.95149 6.45802 9.87523 1.00014C13.799 6.45798 16.8289 12.6016 18.7507 19.2167L9.87549 16.4859ZM9.87549 16.4859L9.87549 8.9856" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </main>
      </div>

      <footer></footer>
    </div>
  );
};

export default Dashboard;
