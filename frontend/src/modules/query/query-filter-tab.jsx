import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin, Table } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const QueryFilterTab = ({ dataSource }) => {
    const [tableModel, setTableModel] = useState([]);
    const [loading, setLoading] = useState(true);

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { 
    }, [dataSource]);

    // -------------------------------------------------------------------------------
    //      COLUMNS
    // -------------------------------------------------------------------------------

    const columns = [
        {
            title: 'EXPRESSION',
            dataIndex: 'expression',
            key: 'expression',
            width: 120,
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
            title: "",
            width: 90,
            render: (record) => {
                return (
                <>
                    <FilterOutlined
                        onClick={() => {
                            handleFilterClick(record);
                        }}
                        style={{ color: "black", marginLeft: 12 }}
                    />
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
                dataSource={tableModel} 
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