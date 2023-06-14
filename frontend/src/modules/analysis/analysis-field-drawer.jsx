import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const AnalysisFieldDrawer = ({ item, open, handleSave, handleClose }) => {
    const [title, setTitle] = useState("");

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onClose = () => {
        handleClose();
    };

    const onOpen = () => {
        setTitle('FIELD - ' + item.key);
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
                <>
                    <span>{item.title}</span><br/>
                    <span>{item.type}</span><br/>
                    <span>{item.dataType}</span><br/>
                </>
            </Drawer>
        </>
    );
};

AnalysisFieldDrawer.propTypes = {
    item: PropTypes.any,
    open: PropTypes.bool,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default AnalysisFieldDrawer