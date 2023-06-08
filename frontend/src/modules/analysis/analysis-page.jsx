import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { message, Modal, Typography, Space, Table, Button, Input, Tree, Skeleton, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './analysis.css'

const { Search } = Input;

function AnalysisPage() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [key, setKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [error, setError] = useState(null);
    const [viewModel, setViewModel] = useState([]);
    const [reportModel, setReportModel] = useState([]);
    const [searchText, setSearchText] = useState(null);
       
    // -------------------------------------------------------------------------------
    //      FETCH SERVICE
    // -------------------------------------------------------------------------------

    const treeData = [  
        {
          title: 'Products',
          key: 'Products',
          children: [
            {
              title: 'ProductID',
              key: 'Products.ProductID',
              value: 'Products.ProductID',
            },
            {
                title: 'ProductName',
                key: 'Products.ProductName',
                value: 'Products.ProductName',
            },
            {
                title: 'SupplierID',
                key: 'Products.SupplierID',
                value: 'Products.SupplierID',
            },
            {
                title: 'CategoryID',
                key: 'Products.CategoryID',
                value: 'Products.CategoryID',
            }, 
            {
                title: 'QuantityPerUnit',
                key: 'Products.QuantityPerUnit',
                value: 'Products.QuantityPerUnit',
            }, 
            {
                title: 'UnitPrice',
                key: 'Products.UnitPrice',
                value: 'Products.UnitPrice',
            },            
            {
                title: 'UnitInStock',
                key: 'Products.UnitInStock',
                value: 'Products.UnitInStock',
            },
            {
                title: 'UnitOnOrder',
                key: 'Products.UnitOnOrder',
                value: 'Products.UnitOnOrder',
            },
            {
                title: 'ReorderLevel',
                key: 'Products.ReorderLevel',
                value: 'Products.ReorderLevel',
            },
            {
                title: 'Discontinued',
                key: 'Products.Discontinued',
                value: 'Products.Discontinued',
            }
          ],
        },
        {
            title: 'Suppliers',
            key: 'Suppliers',
            children: [
              {
                title: 'ProductID',
                key: 'Suppliers.SupplierID',
                value: 'Suppliers.SupplierID',
              },
              {
                  title: 'CompanyName',
                  key: 'Suppliers.CompanyName',
                  value: 'Suppliers.CompanyName',
              },
              {
                  title: 'ContactName',
                  key: 'Suppliers.ContactName',
                  value: 'Suppliers.ContactName',
              },
              {
                  title: 'ContactTitle',
                  key: 'Suppliers.ContactTitle',
                  value: 'Suppliers.ContactTitle',
              }, 
              {
                  title: 'Address',
                  key: 'Suppliers.Address',
                  value: 'Suppliers.Address',
              }, 
              {
                  title: 'City',
                  key: 'Suppliers.City',
                  value: 'Suppliers.City',
              },            
              {
                  title: 'Region',
                  key: 'Suppliers.Region',
                  value: 'Suppliers.Region',
              },
              {
                  title: 'PostalCode',
                  key: 'Suppliers.PostalCode',
                  value: 'Suppliers.PostalCode',
              },
              {
                  title: 'Country',
                  key: 'Suppliers.Country',
                  value: 'Suppliers.Country',
              },
              {
                  title: 'Phone',
                  key: 'Suppliers.Phone',
                  value: 'Suppliers.Phone',
              },
              {
                title: 'Fax',
                key: 'Suppliers.Fax',
                value: 'Suppliers.Fax',
                },              
                {
                title: 'HomePage',
                key: 'Suppliers.HomePage',
                value: 'Suppliers.HomePage',
                }
            ],
          },   
      ];

    const fetchData = () => {
        setViewModel(treeData);
    }

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const handleOpen = () => {
        setKey(null);
        setShowDrawer(true);
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

    const handleSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    const handleCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        setReportModel([...checkedKeys]);
        console.log(JSON.stringify(viewModel));
        console.log(JSON.stringify(reportModel));
    }

    const handleClick = (event) => {
        console.log('handleClick', JSON.stringify(event));
        alert(JSON.stringify(event));
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [reload])

    useEffect(() => {

    }, [reportModel]);

    useEffect(() => {
        if (error !== null) {
            message.error("Network error");
            console.log(JSON.stringify(error));
        }
    }, [error])

    // -------------------------------------------------------------------------------
    //      COLUMNS
    // -------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------
    //      VIEW
    // -------------------------------------------------------------------------------

    const print = () => {
        return reportModel.map((key) => <td key={key} className="c8-title" onClick={() => handleClick(key)}>{key}</td>)
    }

    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>
                ANALYSIS
            </Typography.Title>
            <div style={{ marginBottom: 16, }}></div>
            <Skeleton />
            <div className='c8-wrapper'>
                <table className="c8-table">
                    <tr>
                        {print()}
                    </tr>     
                </table>
            </div>
            <Row>
                <Col span={6}>
                    <Tree
                    checkable
                    autoExpandParent={true}
                    onSelect={handleSelect}
                    onCheck={handleCheck}
                    treeData={viewModel}
                    />
                </Col>
                <Col span={4}>

                </Col>
                <Col span={8}></Col>
            </Row>



            
        </>
  )
}

export default AnalysisPage