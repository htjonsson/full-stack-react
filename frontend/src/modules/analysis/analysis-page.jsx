import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { message, Modal, Typography, Space, Table, Button, Input, Tree, Skeleton, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AnalysisInfoDrawer from "./analysis-info-drawer";
import AnalysisFilterDrawer from "./analysis-filter-drawer";
import AnalysisFieldDrawer from "./analysis-field-drawer";
import AnalysisOrderDrawer from "./analysis-order-drawer";
import './analysis.css'
import './analysisService.js'
import { analysisService_external_getItemData, analysisService_external_getTreeData, analysisService_getItemDataByKeys, analysisService_getByKey, analysisService_setOrderNumbers, analysisService_fetchData } from './analysisService.js';

const { Search } = Input;

function AnalysisPage() {
    // -------------------------------------------------------------------------------
    //      DRAWERS
    // -------------------------------------------------------------------------------

    const [showInfoDrawer, setShowInfoDrawer] = useState(false);
    const [showFieldDrawer, setShowFieldDrawer] = useState(false);
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);
    const [showOrderDrawer, setShowOrderDrawer] = useState(false);
    const [showQueryDrawer, setShowQueryDrawer] = useState(false);

    // -------------------------------------------------------------------------------
    //      DATA MODELS
    // -------------------------------------------------------------------------------
    
    const [viewModel, setViewModel] = useState(null);
    const [tableModel, setTableModel] = useState([]);
    const [dataModel, setDataModel] = useState(null);

    // -------------------------------------------------------------------------------
    //      PAGE STATE
    // -------------------------------------------------------------------------------
    
    const [loading, setLoading] = useState(true);

    // -------------------------------------------------------------------------------
    //      
    // -------------------------------------------------------------------------------
    
    const [item, setItem] = useState(null);
    const [id, setId] = useState(null);
    const [pId, setPId] = useState(null);
    const [reload, setReload] = useState(false);
    const [error, setError] = useState(null);
    const [reportModel, setReportModel] = useState([]);
       
    // -------------------------------------------------------------------------------
    //      FETCH SERVICE
    // -------------------------------------------------------------------------------

    const fetchData = () => {
        const data = analysisService_fetchData();

        data.items = analysisService_getItemDataByKeys(data.external.items, data.external.tree.selected);

        setDataModel(data);
        updateTableModel();
        
        setLoading(false);
    }

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const handleSave = (data) => {
        dataModel.external.tree.selected = [...data];
        dataModel.items = analysisService_getItemDataByKeys(dataModel.external.items, dataModel.external.tree.selected);
        
        updateTableModel();

        handleClose();
    }

    const handleClose = () => {
        setShowInfoDrawer(false);
        setShowFieldDrawer(false);
        setShowFilterDrawer(false);
        setShowQueryDrawer(false);
        setShowOrderDrawer(false);
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
        console.log('handleFieldClick', id)
        const item = analysisService_getByKey(dataModel.items, id);
        console.log('item', item)
        if (item) {
            setItem(item);
            setShowFieldDrawer(true);
        }
    }

    const handleFilterClick = (id) => {
        setShowFilterDrawer(true);
    }

    const handleInfoClick = () => {
        setShowInfoDrawer(true);
    }

    const handleOrderClick = () => {
        setShowOrderDrawer(true);
    }

    // -------------------------------------------------------------------------------
    //      UTILITY 
    // -------------------------------------------------------------------------------

    const updateTableModel = () => {
        if (dataModel && dataModel.items) {
            setTableModel([...dataModel.items]);
        } 
        else {
            setTableModel([]);
        }
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

    const columns = [
        {
            title: '',
            dataIndex: 'number',
            key: 'number',
            width: 20,
        },        
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link><span onClick={() => handleFieldClick(record.key)}>{text}</span></Link>,
        },
        {
            title: 'TYPE',
            dataIndex: 'type',
            key: 'type',
        },        
        {
            title: 'KEY',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'DATA TYPE',
            dataIndex: 'dataType',
            key: 'dataType',
        },
        {
            title: 'FILTERS',
            dataIndex: 'numberOfFilters',
            key: 'numberOfFilters',
            width: 60,
            render: (text, record) => <Link><span onClick={() => handleFilterClick(record.key)}>{text}</span></Link>,
        },
        {
            title: 'ORDER',
            dataIndex: 'order',
            key: 'order',
            width: 60,
            render: (text, record) => <Link><span onClick={() => handleOrderClick(record.key)}>{text}</span></Link>,
        },              
    ];    

    // -------------------------------------------------------------------------------
    //      VIEW
    // -------------------------------------------------------------------------------

    /*
    const titleList = () => {
        return reportModel.map((key) => <td key={key} className="c8-title" onClick={() => handleFieldClick(key)}>{key}</td>)
    }

    const filterList = () => {
        return reportModel.map((key) => <td key={key} className="c8-title" onClick={() => handleFilterClick(key)}>FILTER</td>)
    }   

    const dataList = () => {
        return reportModel.map((key) => <td key={key} className="c8-text">XXXX-XXXX-XXXX</td>)
    } 
    */   

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
            <div style={{ marginBottom: 16, }}></div>
            <Table 
                columns={columns} 
                dataSource={tableModel} 
                pagination={false} 
                bordered={true} 
                rowKey={'key'}
                loading={loading}
            />
            <AnalysisInfoDrawer             
                open={showInfoDrawer}
                dataSource={dataModel}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
            <AnalysisFieldDrawer 
                item={item}
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
            <AnalysisOrderDrawer 
                id={id}
                pid={pId} 
                open={showOrderDrawer}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />                      
        </>
  )
}

export default AnalysisPage