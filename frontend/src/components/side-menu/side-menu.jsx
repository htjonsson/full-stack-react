import { useNavigate } from "react-router-dom";
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Employee', '/employee', <MailOutlined />, null),
  {
    type: 'divider',
  },
  getItem('Data Dictionary', 'dataDictionary', <SettingOutlined />, [
    getItem('Table', '/table', <SettingOutlined />, null)
  ]),
  getItem('Navigation Three', 'sub4', <AppstoreOutlined />, null),
];

const SideMenu = () => {
    const navigate = useNavigate();

    const handleMenuAction = (e) => {
        console.log(e);
        if (e.key && e.key.length > 0 && e.key[0] === '/') {
            navigate(e.key);
        }
        else {
            console.log("Not executed");
        }
    }

    return (
        <Menu
            onClick={handleMenuAction}
            style={{
                fontSize: 14,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};

export default SideMenu;