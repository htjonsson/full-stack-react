import { Link } from 'react-router-dom';
import { Space, Table, Button, message, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Search } = Input;

function BusinessEntityList({dataSource, loading, handleOpen, handleEdit, handleDelete}) {

    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ESTATE',
            dataIndex: 'estateName',
            key: 'estateName',
        },
        {
            title: 'BANK ACCOUNTS',
            dataIndex: 'numberOfBankAccounts',
            key: 'numberOfBankAccounts',
            width: 60,
            render: (text, record) => <Link to={`/bank-account/${record.id}`}><span>{text}</span></Link>,
        },
        {
            title: 'PAYMENT GATEWAYS',
            dataIndex: 'numberOfPaymentGateways',
            key: 'numberOfPaymentGateways',
            width: 60,
            render: (text, record) => <Link to={`/payment-gateway/${record.id}`}><span>{text}</span></Link>,
        },
        {
            title: 'PRODUCT GROUPS',
            dataIndex: 'numberOfProductGroups',
            key: 'numberOfProductGroups',
            width: 60,
            render: (text, record) => <Link to={`/product-group/${record.id}`}><span>{text}</span></Link>,
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

BusinessEntityList.propTypes = {
    dataSource: PropTypes.any,
    loading: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func
}

export default BusinessEntityList
