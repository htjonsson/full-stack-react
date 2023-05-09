import { Link } from 'react-router-dom';
import { Space, Table, Button, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function TableList({dataSource, loading, handleOpen, handleEdit, handleDelete}) {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a onClick={() => {message.info("Moving on to fields")}}>{text}</a>,
        },
        {
            title: 'Fields',
            dataIndex: 'fieldCount',
            key: 'fieldCount',
            render: (text, record) => <Link to={`/table-column/${record.id}`}><span>{text}</span></Link>
        },        
        {
            title: "Actions",
            width: 30,
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
                    New Table
            </Button>
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

TableList.propTypes = {
    dataSource: PropTypes.any,
    loading: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func
}

export default TableList
