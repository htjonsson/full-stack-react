import { Link } from 'react-router-dom';
import { Space, Table, Button, message, Input, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Search } = Input;

function PaymentGatewayList({dataSource, loading, handleOpen, handleEdit, handleDelete}) {

    const columns = [
        {
            title: 'NAME',
            dataIndex: 'configName',
            key: 'configName',
        },
        {
            title: 'TYPE',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'role',
            dataIndex: 'roles',
            key: 'roles'
        },                  
        {
            title: "ACTIONS",
            width: 50,
            render: (record) => {
                return (
                <>
                    <EditOutlined
                        onClick={() => {
                            handleEdit(record);
                    }}
                    />
                    <DeleteOutlined
                        onClick={() => {
                            handleDelete(record);
                        }}
                        style={{ color: "red", marginLeft: 12 }}
                    />
                </>
                );
            },
        },
    ];

    return (
      <>
        <div style={{ marginBottom: 16, }}></div>
        <Space>
            <Button 
                type="primary" 
                onClick={() => handleOpen()} 
                icon={<PlusOutlined />}>
                    NEW
            </Button>
            <Search
                placeholder="Search for ..."
                allowClear
                style={{
                    width: 400,
                }}
                enterButton
            />
        </Space>
        <div style={{ marginTop: 8, }}></div>
        <Table 
          columns={columns} 
          dataSource={dataSource} 
          pagination={false} 
          bordered={true} 
          rowKey={'id'}
          loading={loading}
        />
      </>       
    )
}

PaymentGatewayList.propTypes = {
    dataSource: PropTypes.any,
    loading: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func
}

export default PaymentGatewayList
