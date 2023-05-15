import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { message, Modal, Typography, Breadcrumb } from 'antd';
import PaymentGatewayList from './payment-gateway-list';
import PaymentGatewayDrawer from './payment-gateway-drawer';
import { GetBaseUrl } from '../../../../services/config.js'; 
import BusinessEntityBreadcrumb from '../business-entity-bread-crumb';

function PaymentGateway() {
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
    const baseUrl = GetBaseUrl('payment-gateways');

    const fetchData = () => {
        setLoading(true);
        fetch(baseUrl, { method: 'GET', redirect: 'follow' })
            .then(response => { return response.json() })
            .then(json => { setViewModel(json) })
            .catch(err => { setError(err) });
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
        setViewModel([
            {
              "id": "old-oak-stripe",
              "businessEntityId": "old-oak",
              "roles": "user",
              "type": "stripe",
              "configName": "old-oak-stripe"
            },
            {
              "id": "old-oak-stripe-staff",
              "businessEntityId": "old-oak",
              "roles": "staff",
              "type": "stripe",
              "configName": "old-oak-stripe-staff"
            },
            {
              "id": "old-oak-moto-bank",
              "businessEntityId": "old-oak",
              "roles": "staff",
              "type": "moto-bank",
              "configName": "old-oak-moto-bank"
            },
            {
              "id": "old-oak-moto-bank-staff",
              "businessEntityId": "old-oak",
              "roles": "user",
              "type": "moto-bank",
              "configName": "old-oak-moto-bank-staff"
            }
          ]);
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
            <BusinessEntityBreadcrumb name={'Old-Oak'} />
            <Typography.Title level={2} style={{ margin: 0 }}>
                PAYMENT GATEWAYS
            </Typography.Title>
            <PaymentGatewayList 
                dataSource={viewModel} 
                loading={loading}
                handleOpen={handleOpen}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <PaymentGatewayDrawer 
                id={key} 
                open={showDrawer}
                caption={drawerCaption}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
        </>
  )
}

export default PaymentGateway