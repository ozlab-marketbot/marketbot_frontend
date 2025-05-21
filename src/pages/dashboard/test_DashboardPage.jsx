import React, { useState } from 'react';
// import "./styles/stock.css";

const products = [
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
  return (
    <div className="dashboard-container">
      <header >
      </header>

      <h1 className="dashboard-title">MANAGING DASHBOARD</h1>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <button className="active">상품관리</button>
          <button>주문/배송</button>
          <button>고객관리</button>
        </aside>

        <main className="dashboard-main">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>상품이름</th>
                <th>가격</th>
                <th>마켓</th>
                <th>판매량</th>
                <th>재고</th>
                <th>판매수익</th>
                <th>등록날짜</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td>{p.product_name}</td>
                  <td>{p.price}</td>
                  <td>{p.market}</td>
                  <td>{p.sold}</td>
                  <td>{p.stock}</td>
                  <td>{p.profit}</td>
                  <td>{p.postedDate}</td>
                  <td>
                    <button className="edit-button" aria-label="edit">
                      {/* 수정 아이콘 넣어야함 */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div class="search-box">
            <input id="search" type="text" maxlength="10" placeholder="Search" required />
            <button>
              Search
            </button>
          </div>

        </main>
      </div>

      <footer>

      </footer>
    </div>
  );
};

export default Dashboard;
