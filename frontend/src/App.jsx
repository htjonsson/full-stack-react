import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Layout, Space } from 'antd';
const { Header, Sider, Content } = Layout;
import Employee from './components/employee/Employee';
import Table from './components/table/table';
import TableColumn from './components/table-column/table-column';
import SideMenu from './components/side-menu';
import './App.css'

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
            <Header className='headerStyle'>Header</Header>
            <Layout>
                <Sider width={200} className='siderStyle' style={{backgroundColor:'white'}} collapsible collapsed={collapsed}>
                    <SideMenu handleMenuAction={handleMenuAction}/>
                </Sider>
                <Content className='contentStyle'>
                    <Routes>
                        <Route path="/employee" element={<Employee/>} />
                        <Route path="/table" element={<Table/>} />
                        <Route path="/table-column/:tableId" element={<TableColumn/>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    </Space>
  )
}

export default App;