import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { message, Modal, Typography, Space, Table, Button, Input, Tree, Skeleton, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AnalysisInfoDrawer from "./analysis-info-drawer";
import AnalysisFilterDrawer from "./analysis-filter-drawer";
import AnalysisFieldDrawer from "./analysis-field-drawer";
import './analysis.css'

const { Search } = Input;

function AnalysisPage() {
    const [showInfoDrawer, setShowInfoDrawer] = useState(false);
    const [showFieldDrawer, setShowFieldDrawer] = useState(false);
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);
    const [showQueryDrawer, setShowQueryDrawer] = useState(false);

    const [id, setId] = useState(null);
    const [pId, setPId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [error, setError] = useState(null);
    const [viewModel, setViewModel] = useState(null);
    const [reportModel, setReportModel] = useState([]);
       
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
        console.log('fetchData');
        var model = {treeData: [...treeData]};
        setViewModel(model);
        // console.log(JSON.stringify(model));
        // console.log(JSON.stringify(viewModel));
    }

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------


    const handleSave = (data) => {
        setReportModel([...data]);
        handleClose();

        var model = {treeData: [...treeData], checkedKeys: [...data]};
        setViewModel(model);

        console.log(JSON.stringify(model))
    }

    const handleClose = () => {
        setShowInfoDrawer(false);
        setShowFieldDrawer(false);
        setShowFilterDrawer(false);
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

    const handleFieldClick = (id) => {
        setShowFieldDrawer(true);
    }

    const handleFilterClick = (id) => {
        setShowFilterDrawer(true);
    }

    const handleInfoClick = () => {
        setShowInfoDrawer(true);
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchData();
        setShowInfoDrawer(true);
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

    const titleList = () => {
        return reportModel.map((key) => <td key={key} className="c8-title" onClick={() => handleFieldClick(key)}>{key}</td>)
    }

    const filterList = () => {
        return reportModel.map((key) => <td key={key} className="c8-title" onClick={() => handleFilterClick(key)}>FILTER</td>)
    }   

    const dataList = () => {
        return reportModel.map((key) => <td key={key} className="c8-text">XXXX-XXXX-XXXX</td>)
    }    

    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>
                ANALYSIS
            </Typography.Title>
            <div style={{ marginBottom: 16, }}></div>
            <Space>
                <Button 
                    type="primary" 
                    onClick={() => handleInfoClick()}>
                        SETUP
                </Button>
            </Space>
            <div className='c8-wrapper'>
                <table className="c8-table">
                    <tr>
                        {titleList()}
                    </tr> 
                    <tr>
                        {filterList()}
                    </tr> 
                    <tr>
                        {dataList()}
                    </tr>
                    <tr>
                        {dataList()}
                    </tr>  
                    <tr>
                        {dataList()}
                    </tr>  
                    <tr>
                        {dataList()}
                    </tr>  
                    <tr>
                        {dataList()}
                    </tr>  
                    <tr>
                        {dataList()}
                    </tr>  
                </table>
            </div>
            <AnalysisInfoDrawer             
                open={showInfoDrawer}
                dataSource={viewModel}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
            <AnalysisFieldDrawer 
                id={id}
                pid={pId} 
                open={showFieldDrawer}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
            <AnalysisFilterDrawer 
                id={id}
                pid={pId} 
                open={showFilterDrawer}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />                       
        </>
  )
}

export default AnalysisPage