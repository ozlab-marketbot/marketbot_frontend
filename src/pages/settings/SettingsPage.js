import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <SettingsContainer>
      <PageHeader>
        <PageTitle>설정</PageTitle>
      </PageHeader>

      <SettingsContent>
        <SettingsSidebar>
          <SettingsNav>
            <SettingsNavItem 
              active={activeTab === 'general'} 
              onClick={() => setActiveTab('general')}
            >
              일반 설정
            </SettingsNavItem>
            <SettingsNavItem 
              active={activeTab === 'account'} 
              onClick={() => setActiveTab('account')}
            >
              계정 설정
            </SettingsNavItem>
            <SettingsNavItem 
              active={activeTab === 'notifications'} 
              onClick={() => setActiveTab('notifications')}
            >
              알림 설정
            </SettingsNavItem>
          </SettingsNav>
        </SettingsSidebar>

        <SettingsMain>
          {activeTab === 'general' && (
            <SettingsSection>
              <SectionTitle>일반 설정</SectionTitle>
              <SettingsForm>
                <FormGroup>
                  <FormLabel>언어</FormLabel>
                  <FormSelect>
                    <option value="ko">한국어</option>
                    <option value="en">English</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>시간대</FormLabel>
                  <FormSelect>
                    <option value="Asia/Seoul">서울 (UTC+9)</option>
                    <option value="America/New_York">뉴욕 (UTC-5)</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>화폐 단위</FormLabel>
                  <FormSelect>
                    <option value="KRW">원화 (₩)</option>
                    <option value="USD">미국 달러 ($)</option>
                  </FormSelect>
                </FormGroup>
              </SettingsForm>
            </SettingsSection>
          )}

          {activeTab === 'account' && (
            <SettingsSection>
              <SectionTitle>계정 설정</SectionTitle>
              <SettingsForm>
                <FormGroup>
                  <FormLabel>이름</FormLabel>
                  <FormInput type="text" placeholder="이름을 입력하세요" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>이메일</FormLabel>
                  <FormInput type="email" placeholder="이메일을 입력하세요" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>비밀번호 변경</FormLabel>
                  <FormInput type="password" placeholder="현재 비밀번호" />
                  <FormInput type="password" placeholder="새 비밀번호" />
                  <FormInput type="password" placeholder="새 비밀번호 확인" />
                </FormGroup>
              </SettingsForm>
            </SettingsSection>
          )}

          {activeTab === 'notifications' && (
            <SettingsSection>
              <SectionTitle>알림 설정</SectionTitle>
              <SettingsForm>
                <FormGroup>
                  <FormLabel>이메일 알림</FormLabel>
                  <ToggleSwitch>
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </FormGroup>
                <FormGroup>
                  <FormLabel>주문 알림</FormLabel>
                  <ToggleSwitch>
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </FormGroup>
                <FormGroup>
                  <FormLabel>재고 알림</FormLabel>
                  <ToggleSwitch>
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </ToggleSwitch>
                </FormGroup>
              </SettingsForm>
            </SettingsSection>
          )}
        </SettingsMain>
      </SettingsContent>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  padding: 24px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #212121;
  margin: 0;
`;

const SettingsContent = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsSidebar = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SettingsNav = styled.nav`
  padding: 16px;
`;

const SettingsNavItem = styled.button`
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  border-radius: 8px;
  color: ${props => props.active ? '#1E88E5' : '#757575'};
  background-color: ${props => props.active ? '#E3F2FD' : 'transparent'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#E3F2FD' : '#F5F5F5'};
  }
`;

const SettingsMain = styled.main`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

const SettingsSection = styled.section`
  padding: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #212121;
  margin: 0 0 24px 0;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #424242;
`;

const FormInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1E88E5;
  }
`;

const FormSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #1E88E5;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #E0E0E0;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + .slider {
    background-color: #1E88E5;
  }
  
  input:checked + .slider:before {
    transform: translateX(24px);
  }
`;

const ApiKeyContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ApiKeyInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 14px;
  background-color: #F5F5F5;
  
  &:focus {
    outline: none;
    border-color: #1E88E5;
  }
`;

const CopyButton = styled.button`
  padding: 8px 16px;
  background-color: #1E88E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #1976D2;
  }
`;

export default SettingsPage; 