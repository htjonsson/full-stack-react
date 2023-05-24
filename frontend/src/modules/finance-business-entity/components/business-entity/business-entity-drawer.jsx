import { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { GetBaseUrl } from '../../../../services/config.js'; 

const BusinessEntityDrawer = ({ id, open, caption, handleSave, handleClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState({});

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = GetBaseUrl('businessEntites');

    const fetchData = (id) => {
        setLoading(true);
        fetch(`${baseUrl}/${id}`, { method: 'GET', redirect: 'follow' })
            .then(response => { return response.json() })
            .then(json => { form.setFieldsValue(json); })
            .catch(err => { setError(err) });
        setLoading(false);
    }

    const loadMetadata = () => {
        setMetadata({
            "estateOptions" : [
                {
                    value: 'old-oak',
                    label: 'Old Oak',
                },
                {
                    value: 'new-oak',
                    label: 'New Oak',
                }  
            ]
        });
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

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { loadMetadata(); }, []);

    useEffect(() => {
        if (open) {
            if (id === null) {
                setLoading(false);
                form.setFieldValue("id", uuidv4());
                loadMetadata();
            } 
            else {
                fetchData(id);
            }
        }
    }, [open]);

    useEffect(() => {
    }, [error]);

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

BusinessEntityDrawer.propTypes = {
    id: PropTypes.any,
    open: PropTypes.bool,
    caption: PropTypes.string,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default BusinessEntityDrawer;