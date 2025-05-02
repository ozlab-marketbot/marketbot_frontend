import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logofull from '../../components/assets/images/logo.png';
import image1 from '../../components/assets/images/image2.jpg';
import image2 from '../../components/assets/images/image2.jpg';
import image3 from '../../components/assets/images/image2.jpg';
import image4 from '../../components/assets/images/image1.jpg';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 20px;
  gap: 15px;
  width: 100%;
`;

const Logo = styled.img`
  width: 60px;
  height: 35px;
`;

const LoginButton = styled.h1`
  margin-left: auto;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: #1E88E5;
  }
`;

const Part1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  width: 100%;
`;

const MainHeader = styled.header`
  h1 {
    font-size: 10rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
`;

const MainImage = styled.div`
  width: 1050px;
  height: 500px;
  max-width: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Part2 = styled.div`
  width: 100%;
  padding: 40px 0;
  min-height: 105vh;
  background-color: black;
`;

const ServiceTitle = styled.h3`
  font-size: 3.2rem;
  color: #ffffff;
  text-align: left;
  margin-bottom: 70px;
  margin-left: 50px;
  margin-top: 35px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  width: 100%;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
`;

const GalleryImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const ImageCaption = styled.p`
  margin-top: 15px;
  font-size: 1.8rem;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
`;

const ImageDescription = styled.p`
  margin-top: 15px;
  font-size: 1.3rem;
  color: #ffffff;
  text-align: center;
`;

const Part3 = styled.div`
  background-attachment: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;
  background: url(${image4}) center/cover no-repeat fixed;
`;

const AboutPage = styled.div`
  background: rgba(255, 255, 255);
  color: white;
  padding: 3rem;
  border-radius: 0px;
  max-width: 800px;
  width: 90%;
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  font-weight: bolder;
  color: rgb(0, 0, 0);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AboutContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #000000;
  margin-bottom: 2.5rem;
`;

const LearnMoreButton = styled.a`
  display: block;
  background: black;
  color: white;
  text-align: center;
  font-size: 1.2rem;
  padding: 1.2rem;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
  margin: 0 auto;
  width: 200px;
  height: 60px;
  border-radius: 50px;
  border: 0px solid rgb(0, 0, 0);
  cursor: pointer;

  &:hover {
    background: #090909;
    transform: scale(1.03);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <LandingContainer>
      <TopBar>
        <Logo src={logofull} alt="Top logo" />
        <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
      </TopBar>

      <Part1>
        <MainHeader>
          <h1>MARKET BOT</h1>
        </MainHeader>
        <MainImage>
          <img src={image4} alt="Main banner" />
        </MainImage>
      </Part1>

      <Part2>
        <ServiceTitle>OUR SERVICE</ServiceTitle>
        <ImageContainer>
          <ImageWrapper>
            <GalleryImage src={image1} alt="First sample" />
            <ImageCaption>상품 등록</ImageCaption>
            <ImageDescription>
              간단한 상품 정보를 적으면 AI 가 최적화/자동화 기술로 세부적인 상품 정보를 적어드림과 동시에 추가로 필요한 내용을 가져와요!
            </ImageDescription>
          </ImageWrapper>
          <ImageWrapper>
            <GalleryImage src={image2} alt="Second sample" />
            <ImageCaption>상품/고객 관리</ImageCaption>
            <ImageDescription>
              상품 재고, 배송현황, 고객문의, 리뷰등 다양한 정보를 한눈에 확인해봐요! 답장도 AI가 작성해주신 내용을 바탕으로 포스팅해줍니다.
            </ImageDescription>
          </ImageWrapper>
          <ImageWrapper>
            <GalleryImage src={image3} alt="Third sample" />
            <ImageCaption>매출 통계</ImageCaption>
            <ImageDescription>
              원하는 기록, 데이터간의 관계 등 판매분석을 도와줍니다!
            </ImageDescription>
          </ImageWrapper>
        </ImageContainer>
      </Part2>

      <Part3>
        <AboutPage>
          <AboutTitle>ABOUT US</AboutTitle>
          <AboutContent>
            <p>
              미국 Purdue University에 재학 중인 15명의 대학생으로 구성된 동아리 '오즈(OZ)'는,
              한 기업의 의뢰를 받아 본 프로젝트를 수행하게 되었습니다. 프로젝트의 효율적이고
              전문적인 진행을 위해 프론트엔드, 백엔드, 비즈니스, 데이터 분석 등 4개의 분야로
              팀을 분화하였으며, 각 팀은 해당 분야에 대한 전문성과 책임을 바탕으로 협력하였습니다.
              모든 구성원들은 의뢰 기업의 니즈를 충실히 반영하고, 실질적인 가치를 창출할 수 있는
              결과물을 완성하기 위해 적극적으로 참여하였고, 이를 통해 성공적인 프로젝트 결과를
              도출해낼 수 있었습니다.
            </p>
          </AboutContent>
          <LearnMoreButton href="#more">자세히 알아보기</LearnMoreButton>
        </AboutPage>
      </Part3>
    </LandingContainer>
  );
};

export default LandingPage; 