import React, { useState } from 'react'
import { Layout, Space } from 'antd';
import SideMenu from './components/side-menu/side-menu';
const { Header, Sider, Content } = Layout;
import './App.css'
import AppRoutes from './AppRoutes';


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
                  <AppRoutes />
                </Content>
            </Layout>
        </Layout>
    </Space>
  )
}

export default App;