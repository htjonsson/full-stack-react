import React, { useState, useEffect } from 'react'
import ListEmployees from './ListEmployees';
import CreateEmployeeDrawer from './CreateEmployeeDrawer';
import UpdateEmployeeDrawer from './UpdateEmployeeDrawer';
import ToolbarEmployee from './ToolbarEmployee';
import { message, Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';

function Employee() {
    const [updateShowDrawer, setUpdateShowDrawer] = useState(false);
    const [createShowDrawer, setCreateShowDrawer] = useState(false);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(-1);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
       
    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = "http://localhost:3000/employees";

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
                fetchData("baseUrl");
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
                fetchData("http://localhost:3000/employees");
                
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
                fetchData("http://localhost:3000/employees");
                
            })
            .catch(err => { setError(err) });
        setReload(!reload);
    }

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const handleCloseCreateDrawer = () => {
        setCreateShowDrawer(false);
    }    

    const handleCloseUpdateDrawer = () => {
        setSelectedId(-1);
        setUpdateShowDrawer(false);
    }
    
    const handleOpenCreateDrawer = () => {
        setCreateShowDrawer(true);
    }

    const handleOpenUpdateDrawer = (record) => {
        setSelectedId(record.id);
        setUpdateShowDrawer(true);
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
        handleOpenUpdateDrawer(record);
        // console.log("handleEdit");
        // fetchEmployeeUpdate(record.id, record);
    }

    const handleUpdateSave = (model) => {
        console.log("pre", model);

        model.id = selectedId;
        model.hireDate = model.hireDate.toISOString();
        model.birthDate = model.birthDate.toISOString();

        console.log("pre update", model);

        setUpdateShowDrawer(false);
        setSelectedId(-1);

        fetchPut(model.id, model);
    }

    const handleCreateSave = (model) => {
        setCreateShowDrawer(false);
        setSelectedId(-1);

        model.id = uuidv4();
        if (model.hireData) { model.hireDate = model.hireDate.toISOString(); }
        model.birthDate = model.birthDate.toISOString();        

        console.log("Model", model)

        fetchPost(model);
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchData();
    }, [reload]);

    useEffect(() => {
        message.error("Network error");
    }, [error])

    return (
        <>
            <ToolbarEmployee handleCreate={handleOpenCreateDrawer}/>
            <CreateEmployeeDrawer open={createShowDrawer} handleSave={handleCreateSave} handleClose={handleCloseCreateDrawer} />
            <UpdateEmployeeDrawer open={updateShowDrawer} handleSave={handleUpdateSave} handleClose={handleCloseUpdateDrawer} id={selectedId} />
            <ListEmployees 
                handleOpenDrawer={handleOpenUpdateDrawer} 
                dataSource={data} 
                loading={loading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
  )
}

export default Employee