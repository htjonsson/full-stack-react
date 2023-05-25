import { useState, useEffect } from 'react'
import { Link, useParams  } from 'react-router-dom';
import { message, Modal, Typography, Breadcrumb } from 'antd';
import BankAccountList from './bank-account-list';
import BankAccountDrawer from './bank-account-drawer';
import { GetBaseUrl } from '../../../../services/config.js'; 
import BusinessEntityBreadcrumb from '../business-entity-bread-crumb';

function BankAccount() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerCaption, setDrawerCaption] = useState("");
    const [key, setKey] = useState(null);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewModel, setViewModel] = useState({});
    const [bankAccounts, setBankAccounts] = useState([]);
       
    const { id } = useParams();

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------
    const baseUrl = GetBaseUrl('bankAccounts');

    const fetchData = (id) => {
        setLoading(true);
        console.log(`${baseUrl}?businessEntityId=${id}`);
        fetch(`${baseUrl}?businessEntityId=${id}`, { method: 'GET', redirect: 'follow' })
            .then(response => { return response.json() })
            .then(json => { 
                console.log(JSON.stringify(json)); 
                setViewModel(json);
                setBankAccounts(json.bankAccounts); 
            })
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
        setDrawerCaption("NEW - BANK ACCOUNT");
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
        setDrawerCaption("CHANGE - BANK ACCOUNT");
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
        console.log(id);
        
        //fetchData(id);
        console.log(JSON.stringify(viewModel));
        
        setViewModel(
          {
            "id": "old-oak-xero",
            "businessEntityId": "old-oak",
            "configName": "old-oak-xero",
            "bankAccounts": [
              {
                "id": "07c866e8-7f81-46b6-9bb8-260c128a4426",
                "paymentType": "moto-bank",
                "code": "00002"
              },
              {
                "id": "a0cc981f-32fe-4592-9a0c-97bc9783a492",
                "paymentType": "stripe",
                "code": "00003"
              }
            ]
          }
        );
        
    }, []);

    useEffect(() => {
       fetchData(id);
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
                BANK ACCOUNTS
            </Typography.Title>
            <div>Data : {JSON.stringify(viewModel)}</div>
            <BankAccountList 
                dataSource={viewModel.bankAccounts} 
                loading={loading}
                handleOpen={handleOpen}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <BankAccountDrawer 
                id={key} 
                open={showDrawer}
                caption={drawerCaption}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
        </>
  )
}

export default BankAccount