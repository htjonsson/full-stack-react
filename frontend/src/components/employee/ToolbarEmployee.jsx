import { Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './ToolbarEmployee.css';

function ToolbarEmployee({handleCreate}) {

    return (
        <div className='toolbar-employee-button-bar'>
        <Space>
            <Button type="primary" onClick={() => handleCreate()} icon={<PlusOutlined />}>New Employee</Button>
        </Space>
    </div>    
    )
}

ToolbarEmployee.propTypes = {
  handleCreate: PropTypes.func
}

export default ToolbarEmployee
