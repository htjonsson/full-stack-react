import { useState, useEffect } from 'react'
import { message, Modal, Typography, Breadcrumb } from 'antd';
import TableList from './table-list';
import TableDrawer from './table-drawer';
import PropTypes from 'prop-types';
import { GetBaseUrl } from '../../services/config.js'; 

function Table({handleNavigation}) {
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerCaption, setDrawerCaption] = useState("");
    const [key, setKey] = useState(null);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
       
    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------
    const baseUrl = GetBaseUrl('tables');

    const fetchData = () => {
        setLoading(true);
        fetch(baseUrl, { method: 'GET', redirect: 'follow' })
            .then(response => { return response.json() })
            .then(json => { setData(json) })
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
        setDrawerCaption("Create new table");
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
        setDrawerCaption("Change table");
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
    }, [reload]);

    useEffect(() => {
        if (error !== null) {
            message.error("Network error");
            console.log(JSON.stringify(error));
        }
    }, [error])

    return (
        <>
            <Typography.Title level={4} style={{ margin: 0 }}>
                Table Maintinance
            </Typography.Title>
            <TableList 
                dataSource={data} 
                loading={loading}
                handleOpen={handleOpen}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleNavigation={handleNavigation}
            />
            <TableDrawer 
                id={key} 
                open={showDrawer}
                caption={drawerCaption}
                handleSave={handleSave} 
                handleClose={handleClose} 
            />
        </>
  )
}

Table.propTypes = {
    handleNavigation: PropTypes.func
}

export default Table