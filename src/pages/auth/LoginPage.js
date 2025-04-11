import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import logo from '../../components/assets/images/logo.png'
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();
  
  // Initialize form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = '이메일을 입력해주세요';
    if (!formData.password) tempErrors.password = '비밀번호를 입력해주세요';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Use the login function from AuthContext
        await login(formData.email, formData.password);
        // Navigation to dashboard will happen automatically via protected routes
        navigate('/dashboard');
      } catch (error) {
        // Handle login error
        setErrors({ auth: error.message || '로그인에 실패했습니다.' });
      }
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <Logo src={logo} alt="마켓봇 로고" />
          <LogoText>마켓봇</LogoText>
        </LogoContainer>
        
        <LoginHeading>로그인</LoginHeading>
        
        {errors.auth && <ErrorMessage>{errors.auth}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormInput
            label="이메일"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            error={errors.email}
          />
          
          <FormInput
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            error={errors.password}
          />
          
          <ForgotPasswordLink to="/forgot-password">
            비밀번호를 잊으셨나요?
          </ForgotPasswordLink>
          
          <LoginButton type="submit">로그인</LoginButton>
          
          {/* Demo button for presentation */}
          <ViewDashboardButton 
            as={Link} 
            to="/dashboard" 
            style={{ textDecoration: 'none' }}
          >
            대시보드 미리보기 (데모)
          </ViewDashboardButton>
        </Form>
        
        <SignupPrompt>
          계정이 없으신가요? <SignupLink to="/signup">회원가입</SignupLink>
        </SignupPrompt>
      </LoginCard>
    </LoginContainer>
  );
};

// Styled components for the Login page
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F5F5F5;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 40px;
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1E88E5;
  margin: 0;
`;

const LoginHeading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ForgotPasswordLink = styled(Link)`
  align-self: flex-end;
  font-size: 14px;
  color: #616161;
  text-decoration: none;
  margin-top: -12px;
  
  &:hover {
    color: #1E88E5;
    text-decoration: underline;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 24px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
`;

const ViewDashboardButton = styled(Button)`
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  background-color: #4CAF50;
  
  &:hover {
    background-color: #388E3C;
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 32px;
  font-size: 14px;
  color: #616161;
`;

const SignupLink = styled(Link)`
  color: #1E88E5;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
`;

export default LoginPage;