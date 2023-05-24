import { useState, useEffect } from 'react'
import { message, Modal, Typography, Breadcrumb } from 'antd';
import BusinessEntityList from './business-entity-list';
import BusinessEntityDrawer from './business-entity-drawer';
import { GetBaseUrl } from '../../../../services/config.js'; 

function BusinessEntity() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerCaption, setDrawerCaption] = useState("");
    const [key, setKey] = useState(null);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewModel, setViewModel] = useState([]);
       
    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------
    const baseUrl = GetBaseUrl('businessEntites');
    console.log(baseUrl);

    const fetchData = () => {
        setLoading(true);
        fetch(baseUrl, { method: 'GET', redirect: 'follow' })
            .then(response => {console.log(JSON.stringify(response)); return response.json() })
            .then(json => { console.log(JSON.stringify(json)); setViewModel(json) })
            .catch(err => { console.error(JSON.stringify(err)); setError(err) });
        setLoading(false);
    }

    const fetchDelete = (id) => {
        fetch(`${baseUrl}/${id}`, { method: 'DELETE', redirect: 'follow' })
            .then(response => { return response.json() })
            .then(json => { 
                message.success("Record has been deleted"); 
                fetchData();
            })
            .catch(err => { setError(err) });
        setReload(!reload);
    }    

    const fetchPut = (id, model) => {
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");  
        const raw = JSON.stringify(model);      

        fetch(`${baseUrl}/${id}`, { method: 'PUT', redirect: 'follow', headers: requestHeaders, body: raw })
            .then(response => { return response.text() })
            .then(data => {
                message.success("Record has been updated");
                fetchData();
            })
            .catch(err => { setError(err) });
        setReload(!reload);
    } 

    const fetchPost = (model) => {
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");  
        const raw = JSON.stringify(model);      

        fetch(baseUrl, { method: 'POST', redirect: 'follow', headers: requestHeaders, body: raw })
            .then(response => { return response.text() })
            .then(data => {
                message.success("Record has been create");
                fetchData(); 
            })
            .catch(err => { setError(err) });
        setReload(!reload);
    }

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const handleOpen = () => {
        setKey(null);
        setDrawerCaption("NEW - BUSINESS ENTITY");
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
        setDrawerCaption("CHANGE - BUSINESS ENTITY");
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

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchData();
        /*
        setViewModel([
            {
                "id": "old-oak",
                "name": "Old Oak (local)",
                "estateId": "old-oak",
                "estateName": "Old Oak",
                "numberOfBankAccounts" : 2,
                "numberOfPaymentGateways" : 4,
                "numberOfProductGroups" : 14
            }
        ]);
        */
    }, []);

    useEffect(() => {
       fetchData();
    }, [reload]);

    useEffect(() => {
        if (error !== null) {
            message.error("Network error");
            console.log(JSON.stringify(error));
        }
    }, [error])

    return (
        <>
            <Typography.Title level={2} style={{ margin: 0 }}>
                BUSINESS ENTITY
            </Typography.Title>
            <BusinessEntityList 
                dataSource={viewModel} 
                loading={loading}
                handleOpen={handleOpen}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <BusinessEntityDrawer 
                id={key} 
                open={showDrawer}
                caption={drawerCaption}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
        </>
  )
}

export default BusinessEntity