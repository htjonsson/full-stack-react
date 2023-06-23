import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { message, Modal, Typography, Space, Table, Button, Input, Tabs, Tree, Skeleton, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FilterFilled, FilterOutlined } from '@ant-design/icons';
import QuerySourceDrawer from "./query-source-drawer";
import QueryFilterDrawer from "./query-filter-drawer";
import QueryFieldDrawer from "./query-field-drawer";
import QueryFilterTab from "./query-filter-tab";
import { query_getItemDataByKeys, query_getItemByKey, query_saveFilter, query_fetchData, query_createFilterItem, query_removeItem } from './query.js';
import { v4 as uuidv4 } from 'uuid';
import './query.css'

function QueryPage() {
    // -------------------------------------------------------------------------------
    //      DRAWERS
    // -------------------------------------------------------------------------------

    const [showSourceDrawer, setShowSourceDrawer] = useState(false);
    const [showFieldDrawer, setShowFieldDrawer] = useState(false);
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);

    // -------------------------------------------------------------------------------
    //      DATA MODELS
    // -------------------------------------------------------------------------------
    
    const [tableModel, setTableModel] = useState([]);
    const [filterTableModel, setFilterTableModel] = useState([]);
    const [dataModel, setDataModel] = useState(null);

    // -------------------------------------------------------------------------------
    //      PAGE STATE
    // -------------------------------------------------------------------------------
    
    const [loading, setLoading] = useState(true);
    const [tabState, setTabState] = useState("columns")

    // -------------------------------------------------------------------------------
    //      
    // -------------------------------------------------------------------------------
    
    const [item, setItem] = useState(null);
    const [filterItem, setFilterItem] = useState(null);
       
    // -------------------------------------------------------------------------------
    //      FETCH SERVICE
    // -------------------------------------------------------------------------------

    const fetchData = () => {
        const data = query_fetchData();

        data.items = query_getItemDataByKeys(data.external.items, data.external.tree.selected);

        setDataModel(data);
        updateTableModel();
        
        setLoading(false);
    }

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const handleClose = () => {
        setShowSourceDrawer(false);
        setShowFieldDrawer(false);
        setShowFilterDrawer(false);
    }

    const handleDeleteClick = (record) => {
        query_removeItem(dataModel.items, record.key);
        updateTableModel(); 
    }

    const handleFieldClick = (id) => {
        const item = query_getItemByKey(dataModel, id);
        if (item) {
            setItem(item);
            setShowFieldDrawer(true);
        }
    }

    const handleFieldSave = (field, refresh) => {
        if (refresh) {
            updateTableModel();
        }
        handleClose();
    }

    const handleFilterClick = (record) => {
        const item = query_getItemByKey(dataModel, record.key);

        if (item) {
            setItem(item);
            setFilterItem(query_createFilterItem(uuidv4(), item.key, item.dataType));
            setShowFilterDrawer(true);
        }
    }

    const handleFilterSave = (filter) => {
        query_saveFilter(dataModel, filter);
        updateFilterTableModel();

        handleClose();
    }

    const handleSourceClick = () => {
        setShowSourceDrawer(true);
    }

    const handleSourceSave = (data) => {
        dataModel.external.tree.selected = [...data];
        dataModel.items = query_getItemDataByKeys(dataModel.external.items, dataModel.external.tree.selected);
        
        updateTableModel();

        handleClose();
    }

    const handleTabChange = (key) => {
        setTabState(key);
    }

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

    const updateFilterTableModel = () => {
        if (dataModel && dataModel.filters) {
            setFilterTableModel([...dataModel.filters]);
        } 
        else {
            setFilterTableModel([]);
        }
    }    

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
    }, [tabState]);

    // -------------------------------------------------------------------------------
    //      TABS
    // -------------------------------------------------------------------------------

    const tabs = [
        {
            key: 'columns',
            label: `COLUMNS`,
        },
        {
            key: 'filters',
            label: `FILTERS`,
        },
        {
            key: 'configuration',
            label: `CONFIGURATION`,
        },
    ];

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
            title: 'NAME',
            dataIndex: 'title',
            key: 'title',
            width: 240,
            render: (text, record) => <Link><span onClick={() => handleFieldClick(record.key)}>{text}</span></Link>,
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
            title: 'LENGTH',
            dataIndex: 'length',
            key: 'length',
            width: 80,
        },        
        {
            title: 'ORDER',
            dataIndex: 'orderBy',
            key: 'orderBy',
            width: 60,
        },
        {
            title: "ACTIONS",
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

    return (
        <>
            <div style={{ marginBottom: 16, }}></div>
            <Tabs 
                defaultActiveKey={tabState}
                items={tabs}
                onChange={handleTabChange}
            />
            {tabState == 'columns' && <>
                <Space>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => handleSourceClick()}>
                            SOURCE
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
            </>}

            {tabState == 'filters' &&
                <QueryFilterTab
                    dataSource={filterTableModel}
                />
            }

            <QuerySourceDrawer             
                open={showSourceDrawer}
                dataSource={dataModel}
                handleSave={handleSourceSave} 
                handleClose={handleClose} 
            />
            <QueryFieldDrawer 
                item={item}
                open={showFieldDrawer}
                saveCallback={handleFieldSave} 
                closeCallback={handleClose} 
            />
            <QueryFilterDrawer 
                item={item}
                filterItem={filterItem}
                open={showFilterDrawer}
                saveCallback={handleFilterSave} 
                closeCallback={handleClose} 
            />                     
        </>
  )
}

export default QueryPage