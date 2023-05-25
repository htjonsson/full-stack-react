import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { message, Modal, Typography, Breadcrumb } from 'antd';
import ProductGroupList from './product-group-list';
import ProductGroupDrawer from './product-group-drawer';
import { GetBaseUrl } from '../../../../services/config.js'; 
import BusinessEntityBreadcrumb from '../business-entity-bread-crumb';

function ProductGroup() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerCaption, setDrawerCaption] = useState("");
    const [key, setKey] = useState(null);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewModel, setViewModel] = useState([]);
       
    const { id } = useParams();

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------
    const baseUrl = GetBaseUrl('productGroups');

    const fetchData = (id) => {
        console.log(`${baseUrl}?businessEntityId=${id}`);

        setLoading(true);
        fetch(`${baseUrl}?businessEntityId=${id}`, { method: 'GET', redirect: 'follow' })
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
        setDrawerCaption("NEW - PRODUCT GROUP");
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
        setDrawerCaption("CHANGE - PRODUCT GROUP");
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
      fetchData(id);
      /*
        setViewModel([
            {
                "id": "old-oak-lettings-carparking",
                "businessEntityId": "old-oak",
                "name": "Car Parking",
                "productType": "lettings",
                "accountCode": "xxxx55",
                "tracking": true,
                "paymentGateways": [
                  "old-oak-moto-bank",
                  "old-oak-stripe-staff"
                ],
                "separateAutoInvoices": true
              },
              {
                "id": "old-oak-lettings-storagecage",
                "businessEntityId": "old-oak",
                "name": "Storage Cage",
                "productType": "lettings",
                "accountCode": "xxxx55",
                "tracking": true,
                "paymentGateways": [
                  "old-oak-moto-bank",
                  "old-oak-stripe-staff"
                ],
                "separateAutoInvoices": true
              },
              {
                "id": "old-oak-lettings-payments",
                "businessEntityId": "old-oak",
                "name": "Rental Income",
                "productType": "lettings",
                "accountCode": "xxxx10",
                "tracking": true,
                "paymentGateways": [
                  "old-oak-moto-bank-staff",
                  "old-oak-stripe-staff"
                ],
                "separateAutoInvoices": true
              },
              {
                "id": "old-oak-lettings-fee",
                "businessEntityId": "old-oak",
                "name": "Booking Fees",
                "productType": "lettings",
                "accountCode": "xxxx15",
                "paymentGateways": [
                  "old-oak-moto-bank",
                  "old-oak-stripe"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-lettings-deposit",
                "businessEntityId": "old-oak",
                "name": "Booking Deposit",
                "productType": "lettings",
                "accountCode": "xxx9",
                "paymentGateways": [
                  "old-oak-moto-bank-staff",
                  "old-oak-stripe-staff"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-cust_charge_cleaning",
                "businessEntityId": "old-oak",
                "name": "Customer Recharge - Cleaning",
                "productType": "lettings",
                "accountCode": "xxxx80",
                "paymentGateways": [
                  "old-oak-moto-bank",
                  "old-oak-stripe-staff"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-cust_charge_redecoration",
                "businessEntityId": "old-oak",
                "name": "Customer Recharge - Redecoration",
                "productType": "lettings",
                "accountCode": "xxxx20",
                "paymentGateways": [
                  "old-oak-moto-bank",
                  "old-oak-stripe-staff"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-cust_charge_repairs",
                "businessEntityId": "old-oak",
                "name": "Customer Recharge - Repairs",
                "productType": "lettings",
                "accountCode": "xxxx20",
                "paymentGateways": [
                  "old-oak-moto-bank",
                  "old-oak-stripe-staff"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-cust_charge_keys",
                "businessEntityId": "old-oak",
                "name": "Customer Recharge - Keys",
                "productType": "lettings",
                "accountCode": "xxxx20",
                "paymentGateways": [
                  "old-oak-moto-bank",
                  "old-oak-stripe-staff"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-lettings-cancellaton",
                "businessEntityId": "old-oak",
                "name": "Booking Cancellation Fees",
                "productType": "lettings",
                "accountCode": "xxxxx5",
                "paymentGateways": [],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-laundry",
                "businessEntityId": "old-oak",
                "name": "Laundry",
                "productType": "lettings",
                "accountCode": "xxxxx5",
                "paymentGateways": [
                  "old-oak-stripe-staff"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-gym",
                "businessEntityId": "old-oak",
                "name": "Gym",
                "productType": "lettings",
                "accountCode": "xxxxx0",
                "paymentGateways": [
                  "old-oak-stripe-staff"
                ],
                "tracking": true,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-events",
                "businessEntityId": "old-oak",
                "name": "Events",
                "productType": "event",
                "accountCode": "xxxx0",
                "paymentGateways": [
                  "old-oak-stripe-staff"
                ],
                "tracking": false,
                "separateAutoInvoices": false
              },
              {
                "id": "old-oak-services",
                "businessEntityId": "old-oak",
                "name": "Services",
                "productType": "service",
                "accountCode": "xxxx5",
                "paymentGateways": [
                  "old-oak-stripe-staff"
                ],
                "tracking": false,
                "separateAutoInvoices": false
              }
        ]);
      */
    }, []);
    /*
    useEffect(() => {
       fetchData();
       console.log('reload');
    }, [reload]);
    */
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
                PRODUCT GROUPS
            </Typography.Title>
            <ProductGroupList 
                dataSource={viewModel} 
                loading={loading}
                handleOpen={handleOpen}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <ProductGroupDrawer 
                id={key} 
                open={showDrawer}
                caption={drawerCaption}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
        </>
  )
}

export default ProductGroup