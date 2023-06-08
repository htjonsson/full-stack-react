import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const AnalysisFilterDrawer = ({ id, pid, open, handleSave, handleClose }) => {
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState({});

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onClose = () => {
        handleClose();
    };

    const onOpen = () => {     
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { 
        // fetchMetadata(); 
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
                title={"FILTER"}
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
                    <Button onClick={onClose} type="primary">Save</Button>
                    </Space>
                }>

                {loading && <Spin />}
                {!loading && <Spin />}
            </Drawer>
        </>
    );
};

AnalysisFilterDrawer.propTypes = {
    id: PropTypes.string,
    pid: PropTypes.string,
    open: PropTypes.bool,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default AnalysisFilterDrawer;