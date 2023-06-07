import { useState, useEffect } from 'react'
import { Link, useParams  } from 'react-router-dom';
import { message, Modal, Typography, Space, Table, Button, Input, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import ProductGroupDrawer from './product-group-drawer';
import BusinessEntityBreadcrumb from '../business-entity-bread-crumb';
import { GetBaseUrl } from '../../../../services/config.js'; 

const { Search } = Input;

function ProductGroupPage() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [key, setKey] = useState({id: null, pid: null});
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [error, setError] = useState(null);
    const [viewModel, setViewModel] = useState([]);
    const [searchText, setSearchText] = useState(null);

    const { id } = useParams();
       
    // -------------------------------------------------------------------------------
    //      FETCH SERVICE
    // -------------------------------------------------------------------------------
    const baseUrl = GetBaseUrl('productGroups');

    const fetchData = (id) => {
        httpQuery(`${baseUrl}?businessEntityId=${id}`, { method: 'GET', redirect: 'follow' });
    }

    const fetchDataByFilter = (id, filter) => {
        httpQuery(`${baseUrl}?name_like=${filter}&businessEntityId=${id}`, { method: 'GET', redirect: 'follow' });
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
        console.log("post - model", raw);
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
        setKey({id: null, pid: id});
        console.log(JSON.stringify(key));
        setShowDrawer(true);
    }

    const handleDelete = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this product group ?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: () => {
                fetchDelete(record.id);
            },
        });  
    }

    const handleEdit = (record) => {
        setKey({id: record.id, pid: record.businessEntityId});
        console.log(JSON.stringify(key));
        setShowDrawer(true);
    }

    const handleSave = (id, model) => {
        console.log('id:', id);
        console.log('model:', JSON.stringify(model));
        
        if (id) {
            fetchPut(id, model);
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
        console.log(value);
        setReload(!reload);
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchData(id);
    }, []);

    useEffect(() => {
        if (searchText) {
            console.log('fetchDataByFilter');
            fetchDataByFilter(id, searchText);
        } else {
            fetchData(id);
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
            title: 'PRODUCT TYPE',
            dataIndex: 'productType',
            key: 'productType',
        },
        {
            title: 'NOMINAL CODE',
            dataIndex: 'accountCode',
            key: 'accountCode'
        },
        {
            title: 'PAYMENT GATEWAYS',
            dataIndex: 'paymentGateways',
            key: 'paymentGateways',
            render: (paymentGateways) => {
                return (
                <>
                    {paymentGateways.map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
              );
            },
        },
        {
            title: 'TRACKING',
            dataIndex: 'tracking',
            key: 'tracking',
            align: 'center',
            width: 60,
            render: (tracking) => {
                return (
                    <>
                        {tracking && <CheckOutlined />}
                    </>
                );
            }
        },          
        {
            title: 'SEPAREATE AUTO INVOICES',
            dataIndex: 'separateAutoInvoices',
            key: 'separateAutoInvoices',
            align: 'center',
            width: 60,
            render: (tracking) => {
                return (
                    <>
                        {tracking && <CheckOutlined />}
                    </>
                );
            }            
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
            <BusinessEntityBreadcrumb name={'Old-Oak'} />
            <Typography.Title level={2} style={{ margin: 0 }}>
                PRODUCT GROUPS
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
            <ProductGroupDrawer 
                id={key.id}
                pid={key.pid} 
                open={showDrawer}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
        </>
  )
}

export default ProductGroupPage