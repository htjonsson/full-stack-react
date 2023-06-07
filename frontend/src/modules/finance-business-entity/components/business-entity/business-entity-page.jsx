import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { message, Modal, Typography, Space, Table, Button, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BusinessEntityDrawer from './business-entity-drawer';
import { GetBaseUrl } from '../../../../services/config.js'; 

const { Search } = Input;

function BusinessEntityPage() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [key, setKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [error, setError] = useState(null);
    const [viewModel, setViewModel] = useState([]);
    const [searchText, setSearchText] = useState(null);
       
    // -------------------------------------------------------------------------------
    //      FETCH SERVICE
    // -------------------------------------------------------------------------------
    const baseUrl = GetBaseUrl('businessEntites');

    const fetchData = () => {
        httpQuery(baseUrl, { method: 'GET', redirect: 'follow' });
    }

    const fetchDataByFilter = (filter) => {
        httpQuery(`${baseUrl}?name_like=${filter}`, { method: 'GET', redirect: 'follow' });
    }

    const fetchDelete = (id) => {
        httpCommand(`${baseUrl}/${id}`, { method: 'DELETE', redirect: 'follow' });
    }

    const fetchPut = (id, model) => {
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");  
        const raw = JSON.stringify(model);  

        httpCommand(`${baseUrl}/${id}`, { method: 'PUT', redirect: 'follow', headers: requestHeaders, body: raw });
    }    

    const fetchPost = (model) => {
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");  
        const raw = JSON.stringify(model);  

        httpCommand(`${baseUrl}`, { method: 'POST', redirect: 'follow', headers: requestHeaders, body: raw });
    }    

    const httpQuery = (url, options) => {
        setLoading(true);
        
        fetch(url, options)
            .then(response => { if (!response.ok) { throw new Error() } return response.json() })
            .then(json => { setViewModel(json) })
            .catch(error => { setError(error) })
            .finally(() => { setLoading(false) });
    }

    const httpCommand = (url, options) => {
        fetch(url, options)
            .then(response => { if (!response.ok) { throw new Error() } return response.json() })
            .then(json => { setReload(!reload) })
            .catch(error => { setError(error) })   
            .finally(() => fetchData() )    
    }
    
    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const handleOpen = () => {
        setKey(null);
        setShowDrawer(true);
    }

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this record?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => {
                fetchDelete(record.id);
            },
        });  
    }

    const handleEdit = (record) => {
        setKey(record.id);
        setShowDrawer(true);
    }

    const handleSave = (key, model) => {
        if (key) {
            fetchPut(key, model);
        }
        else {
            fetchPost(model);
        }
        setShowDrawer(false);
    }

    const handleClose = () => {
        setShowDrawer(false);
    }

    const handleSearch = (value) => {
        setSearchText(value);
        setReload(!reload);
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchText) {
            fetchDataByFilter(searchText);
        } else {
            fetchData();
        }
    }, [reload])

    useEffect(() => {
        if (error !== null) {
            message.error("Network error");
            console.log(JSON.stringify(error));
        }
    }, [error])

    // -------------------------------------------------------------------------------
    //      COLUMNS
    // -------------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------------
    //      VIEW
    // -------------------------------------------------------------------------------

    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>
                BUSINESS ENTITY
            </Typography.Title>
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
                    onSearch={handleSearch}
                />
            </Space>
            <div style={{ marginTop: 8, }}></div>
            <Table 
                columns={columns} 
                dataSource={viewModel} 
                pagination={false} 
                bordered={true} 
                rowKey={'id'}
                loading={loading}
            />
            <BusinessEntityDrawer 
                id={key} 
                open={showDrawer}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
        </>
  )
}

export default BusinessEntityPage