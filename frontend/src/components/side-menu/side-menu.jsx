import { useNavigate } from "react-router-dom";
import { MailOutlined, SettingOutlined, AppstoreOutlined, FileOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
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
  getItem('Config', 'config', <HomeOutlined />, [
    getItem('Business Entity', '/business-entity', <FileOutlined />, null),
  ]),
  {
    type: 'divider',
  },
  getItem('Employee', '/employee', <MailOutlined />, null),
  {
    type: 'divider',
  },
  getItem('Developer', 'developer', <SettingOutlined />, [
    getItem('Tables', '/table', <SettingOutlined />, null),
    getItem('Forms', 'form', <SettingOutlined />, null),
    getItem('Reports', 'report', <SettingOutlined />, null),
    getItem('XMLports', 'xml-port', <SettingOutlined />, null),
    getItem('CodeUnit', 'code-unit', <SettingOutlined />, null),
    getItem('Queries', 'query', <SettingOutlined />, null),
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
            message.info("Not executed");
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