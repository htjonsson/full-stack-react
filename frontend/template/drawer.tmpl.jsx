import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { GetBaseUrl } from '../../../../services/config.js'; 

const #instance# = ({ id, open, handleSave, handleClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState({});
    const [caption, setCaption] = useState("");

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = GetBaseUrl('#endPoint#');
    
    const fetchData = (id) => {
        setLoading(true);
        
        fetch(`${baseUrl}?id=${id}`, { method: 'GET', redirect: 'follow' })
            .then(response => { if (!response.ok) { throw new Error() } return response.json() })
            .then(json => { setViewModel(json) })
            .catch(error => { setError(error) })
            .finally(() => { setLoading(false) });
    }

    const metaUrl = GetBaseUrl('metadata');
    const metadataKey = '#metadataKey#';

    const fetchMetadata = () => {
        fetch(`${metaUrl}?id=${metadataKey}`, { method: 'GET', redirect: 'follow' })
            .then(response => { if (!response.ok) { throw new Error() } return response.json() })
            .then(json => { 
                if (Array.isArray(json) && json.length != 0) { 
                    setMetadata(json[0]); 
                }
            })
            .catch(error => { setError(error) });
    }

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onFinish = (values) => {
        form.resetFields();
        handleSave(id, values);
    }

    const onClose = () => {
        form.resetFields();
        handleClose();
    };

    const onOpen = () => {
        if (id === null) {
            onNewRecord(uuidv4(), form);
            setLoading(false); 
        } 
        else {
            onEditRecord(id);
        }       
    }

    const onNewRecord = (id, form) => {
        setCaption("#captionForNew#");
        form.setFieldValue("id", id);
    }

    const onEditRecord = (id) => {
        setCaption("#captionForEdit#");
        fetchData(id);
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { 
        fetchMetadata(); 
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
                title={caption}
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
                        <Button onClick={form.submit} type="primary">Save</Button>
                    </Space>
                }>

                {loading && <Spin />}
                {!loading && <Form
                    layout="vertical"
                    requiredMark={true}
                    form={form}
                    onFinish={onFinish}>
                    #columns#
                    <Row gutter={16}>
                        <Col span={24}>
                                <Form.Item
                                name="id"
                                label="ID"
                                rules={[]}
                                >
                                <Input placeholder="Id" readOnly={true} />
                            </Form.Item>
                        </Col>
                    </Row>     
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="NAME"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please enter name',
                                    },
                                ]}>
                                <Input placeholder="Please enter name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="estateId"
                                label="ESTATE"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please enter estate',
                                    },
                                ]}>
                                <Select
                                    allowClear
                                    options= {metadata.estateOptions} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="DESCRIPTION"
                                rules={[]}>
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>                
                </Form>}
            </Drawer>
        </>
    );
};

#instance#.propTypes = {
    id: PropTypes.any,
    open: PropTypes.bool,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default #instance#;