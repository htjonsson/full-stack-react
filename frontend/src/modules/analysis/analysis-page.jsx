import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { message, Modal, Typography, Space, Table, Button, Input, Tree, Skeleton, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FilterFilled, FilterOutlined } from '@ant-design/icons';
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

    const handleEdit = (record) => {

    }

    const handleDeleteClick = (record) => {

    }

    const handleFieldClick = (id) => {
        console.log('handleFieldClick', id)
        console.log('id', id)

        const item = analysisService_getByKey(dataModel.items, id);
        console.log('item', item)
        if (item) {
            setItem(item);
            setShowFieldDrawer(true);
        }
    }

    const handleFieldSave = (field, refresh) => {
        console.log("handleFieldSave", field);
        if (refresh) {
            updateTableModel();
        }
        handleClose();
    }

    const handleFilterClick = (record) => {
        const item = analysisService_getByKey(dataModel.items, record.key);

        if (item) {
            setItem(item);
            setShowFilterDrawer(true);
        }
    }

    const handleFilterSave = (item) => {
        console.log("handleFilterSave", JSON.stringify(item));
        console.log("items", JSON.stringify(dataModel.items));
        handleClose();
    }

    const handleInfoClick = () => {
        setShowInfoDrawer(true);
    }

    // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
    // objs.sort((a,b) => (a-b))

    // -------------------------------------------------------------------------------
    //      UTILITY 
    // -------------------------------------------------------------------------------

    const updateTableModel = () => {
        if (dataModel && dataModel.items) {
            // reorder 
            dataModel.items.sort((a,b) => a.number - b.number);

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
            title: 'Id',
            dataIndex: 'key',
            key: 'key',
            width: 120,
            render: (text, record) => <Link><span onClick={() => handleFieldClick(record.key)}>{text}</span></Link>,
        },                
        {
            title: 'TITLE',
            dataIndex: 'title',
            key: 'title',
            width: 240,
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },          
        {
            title: 'TYPE',
            dataIndex: 'type',
            key: 'type',
            width: 80,
        },        
        {
            title: 'DATA TYPE',
            dataIndex: 'dataType',
            key: 'dataType',
            width: 80,
        },
        {
            title: 'ORDER',
            dataIndex: 'orderBy',
            key: 'orderBy',
            width: 60,
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
            <div className={'c8-wrapper'}>
            <Table 
                columns={columns} 
                dataSource={tableModel} 
                pagination={false} 
                bordered={true} 
                rowKey={'key'}
                loading={loading}
            />
            </div>
            <AnalysisInfoDrawer             
                open={showInfoDrawer}
                dataSource={dataModel}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
            <AnalysisFieldDrawer 
                item={item}
                open={showFieldDrawer}
                saveCallback={handleFieldSave} 
                closeCallback={handleClose} 
            />
            <AnalysisFilterDrawer 
                item={item}
                open={showFilterDrawer}
                saveCallback={handleFilterSave} 
                closeCallback={handleClose} 
            />                     
        </>
  )
}

export default AnalysisPage