import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Tree, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const AnalysisInfoDrawer = ({ dataSource, open, handleSave, handleClose }) => {
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onSave = () => {
        handleSave(checkedItems);
    }

    const onClose = () => {
        handleClose();
    };

    const onOpen = () => {     
    }

    const handleCheck = (checkedKeys, info) => {
        setCheckedItems([...checkedKeys]);
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { 
        setLoading(false);
    }, []);

    useEffect(() => {
        if (open) {
            onOpen();
        }
    }, [open]);

    useEffect(() => {
    }, [error]);

    // -------------------------------------------------------------------------------
    //      VIEW
    // -------------------------------------------------------------------------------

    return (
        <>      
            <Drawer
                title={"INFO"}
                width={720}
                onClose={onClose}
                open={open}
                maskClosable={false}
                destroyOnClose={true}
                bodyStyle={{
                    paddingBottom: 20,
                }}
                extra={
                    <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} type="primary">Save</Button>
                    </Space>
                }>

                {loading && <Spin />}
                {!loading && 
                    <Tree
                        checkable
                        onCheck={handleCheck}
                        autoExpandParent={true}
                        treeData={dataSource.treeData}
                        defaultCheckedKeys={dataSource.checkedKeys}
                    />
                }
            </Drawer>
        </>
    );
};

AnalysisInfoDrawer.propTypes = {
    dataSource: PropTypes.any,  
    open: PropTypes.bool,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default AnalysisInfoDrawer;