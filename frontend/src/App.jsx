import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Layout, Space } from 'antd';
const { Header, Sider, Content } = Layout;
import './App.css'
import BusinessEntity from './modules/finance-business-entity/components/business-entity/business-entity';
import ProductGroup from './modules/finance-business-entity/components/product-group/product-group';
import PaymentGateway from './modules/finance-business-entity/components/payment-gateway/payment-gateway';
import BankAccount from './modules/finance-business-entity/components/bank-account/bank-account';

function App () {
  const [menuKey, setMenuKey] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  const handleMenuAction = (e) => {
    setMenuKey(e.key);
  };

  return (
    <Space
        direction="vertical"
        style={{
          width: '100%',
          height: '100%'
        }}>
        <Layout>
            <Sider trigger={null} className='siderStyle' style={{backgroundColor:'white'}} collapsible collapsed={collapsed}>
              <SideMenu handleMenuAction={handleMenuAction}/>
            </Sider>
            <Layout style={{backgroundColor:'white'}}>
                <Content className='contentStyle'>
                    <Routes>
                        <Route path="/business-entity" element={<BusinessEntity/>} />
                        <Route path="/product-group/:id" element={<ProductGroup/>} />
                        <Route path="/bank-account/:id" element={<BankAccount/>} />
                        <Route path="/payment-gateway/:id" element={<PaymentGateway/>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    </Space>
  )
}

export default App;