import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin, Table } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FilterFilled, FilterOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const QueryFilterTab = ({ dataSource }) => {
    const [loading, setLoading] = useState(true);

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { 
        setLoading(false);
    }, [dataSource]);

    // -------------------------------------------------------------------------------
    //      COLUMNS
    // -------------------------------------------------------------------------------

    const columns = [
        {
            title: 'EXPRESSION',
            dataIndex: 'expression',
            key: 'expression',
            render: (text, record) => <Link><span onClick={() => handleFieldClick(record.key)}>{text}</span></Link>,
        },                
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },          
        {
            title: 'ENABLED',
            dataIndex: 'enabled',
            key: 'enabled',
            width: 80,
        },        
        {
            title: "ACTIONS",
            width: 90,
            render: (record) => {
                return (
                <>
                    <DeleteOutlined
                        onClick={() => {
                            handleDeleteClick(record);
                        }}
                        style={{ color: "red", marginLeft: 12 }}
                    />
                </>
                );
            },
        },              
    ];  

    // -------------------------------------------------------------------------------
    //      VIEW
    // -------------------------------------------------------------------------------

    return (
        <>      
            <div style={{ marginBottom: 16, }}></div>
            <Table 
                columns={columns} 
                dataSource={dataSource} 
                pagination={false} 
                bordered={true} 
                rowKey={'id'}
                loading={loading}
            />
        </>
    );
};

QueryFilterTab.propTypes = {
    dataSource: PropTypes.any
}

export default QueryFilterTab