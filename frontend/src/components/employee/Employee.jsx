import React, { useState, useEffect } from 'react'
import ListEmployees from './ListEmployees';
import CreateEmployeeDrawer from './CreateEmployeeDrawer';
import UpdateEmployeeDrawer from './UpdateEmployeeDrawer';
import { Button, Space, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import './employee.css';

function Employee() {
    const [updateShowDrawer, setUpdateShowDrawer] = useState(false);
    const [createShowDrawer, setCreateShowDrawer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(-1);
    const [employeeData, setEmployeeData] = useState([]);
       
    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = "http://localhost:3000/";

    const fetchEmployeeData = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        setIsLoading(true);

        fetch(baseUrl + "employees", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setEmployeeData(data)
                console.info("setEmployeeData", data);
            })
            .catch(error => {
                console.error('Failure loading data -> ', error);          
                message.error("Failure loading data");    
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const fetchEmployeeDelete = (id) => {
        const requestOptions = {
            method: 'Delete',
            redirect: 'follow'
        };

        fetch(baseUrl + "employees/" + id, requestOptions)
        .then(response => {
            return response.json()
        })
        .then(data => {
            message.success("Record has been deleted");
            console.info("setEmployeeData", data);
            fetchEmployeeData();
        })
        .catch(error => {
            console.error('Failure loading data -> ', error);          
            message.error("Failure loading data");    
        })
        .finally(() => {
        });
    }

    const fetchEmployeeUpdate = (id, model) => {
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: requestHeaders,
            body: JSON.stringify(model)
        };

        fetch(baseUrl + "employees/" + id, requestOptions)
        .then(response => {
            return response.text()
        })
        .then(data => {
            message.success("Record has been updated");
            console.info("setEmployeeData", data);
            fetchEmployeeData();
        })
        .catch(error => {
            console.error('Failure loading data -> ', error);          
            message.error("Failure loading data");    
        })
        .finally(() => {
        });
    }

    const fetchEmployeeInsert = (model) => {
        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: requestHeaders,
            body: JSON.stringify(model)
        };

        fetch(baseUrl + "employees", requestOptions)
        .then(response => {
            return response.text()
        })
        .then(data => {
            message.success("Record has been create");
            console.info("setEmployeeData", data);
            fetchEmployeeData();
        })
        .catch(error => {
            console.error('Failure loading data -> ', error);          
            message.error("Failure loading data");    
        })
        .finally(() => {
        });
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
                fetchEmployeeDelete(record.id);
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
        
        setUpdateShowDrawer(false);
        setSelectedId(-1);

        model.hireDate = model.hireDate.toISOString();
        model.birthDate = model.birthDate.toISOString();

        console.log("pre update", model);

        fetchEmployeeUpdate(model.id, model);
    }

    const handleCreateSave = (model) => {
        setCreateShowDrawer(false);
        setSelectedId(-1);

        model.id = uuidv4();
        if (model.hireData) { model.hireDate = model.hireDate.toISOString(); }
        model.birthDate = model.birthDate.toISOString();        

        console.log("Model", model)

        fetchEmployeeInsert(model);
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => {
        fetchEmployeeData();
        console.log("employeeData -> ", employeeData);
    }, []);

    return (
        <>
            <div className='employee-button-bar'>
                <Space>
                    <Button type="primary" onClick={() => handleOpenCreateDrawer()} icon={<PlusOutlined />}>New Employee</Button>
                </Space>
            </div>

            <CreateEmployeeDrawer open={createShowDrawer} handleSave={handleCreateSave} handleClose={handleCloseCreateDrawer} />
            <UpdateEmployeeDrawer open={updateShowDrawer} handleSave={handleUpdateSave} handleClose={handleCloseUpdateDrawer} id={selectedId} />
            <ListEmployees 
                handleOpenDrawer={handleOpenUpdateDrawer} 
                dataSource={employeeData} 
                loading={isLoading}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
  )
}

export default Employee