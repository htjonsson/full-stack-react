import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';

const AnalysisFilterDrawer = ({ filterItem, open, saveCallback, closeCallback }) => {
    const [title, setTitle] = useState("");

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onClose = () => {
        closeCallback();
    };

    const onOpen = () => { 
        setTitle("FILTER");  
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { 
    }, []);

    useEffect(() => {
        if (open) {
            onOpen();
        }
    }, [open]);

    // -------------------------------------------------------------------------------
    //      VIEW
    // -------------------------------------------------------------------------------

    return (
        <>      
            <Drawer
                title={title}
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
            </Drawer>
        </>
    );
};

AnalysisFilterDrawer.propTypes = {
    filterItem: PropTypes.any,
    open: PropTypes.bool,
    saveCallback: PropTypes.func,
    closeCallback: PropTypes.func
}

export default AnalysisFilterDrawer;