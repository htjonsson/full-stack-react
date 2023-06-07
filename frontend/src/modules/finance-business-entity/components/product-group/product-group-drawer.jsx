import { useEffect, useState } from 'react';
import { Button, Col, Checkbox, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { GetBaseUrl } from '../../../../services/config.js'; 

const ProductGroupDrawer = ({ id, pid, open, handleSave, handleClose }) => {
    const [form] = Form.useForm();
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState({});

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = GetBaseUrl('productGroups');

    const fetchData = (id) => {
        setLoading(true);
        console.log(`${baseUrl}?id=${id}`);
        fetch(`${baseUrl}?id=${id}`, { method: 'GET', redirect: 'follow' })
            .then(response => { if (!response.ok) { throw new Error() } return response.json() })
            .then(json => { 
                if (Array.isArray(json) && json.length != 0) {
                    form.setFieldsValue(json[0]);
                    console.log(JSON.stringify(json))
    }
            })
            .catch(error => { setError(error) })
            .finally(() => { setLoading(false) });
                }  

    const metaUrl = GetBaseUrl('metadata');
    const metadataKey = 'productGroups';

    const fetchMetadata = () => {
        fetch(`${metaUrl}?id=${metadataKey}`, { method: 'GET', redirect: 'follow' })
            .then(response => { if (!response.ok) { throw new Error() } return response.json() })
            .then(json => { 
                if (Array.isArray(json) && json.length != 0) { 
                    setMetadata(json[0]); 
                    console.log(JSON.stringify(json))
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
        setCaption("NEW - PRODUCT GROUP");
        form.setFieldValue("id", id);
        form.setFieldValue("businessEntityId", pid);
    }

    const onEditRecord = (id) => {
        setCaption("CHANGE - PRODUCT GROUP");
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
                                name="productType"
                                label="PRODUCT TYPE"
                                rules={[
                                    { required: true, message: 'Please enter product type', },
                                ]}>
                                <Select
                                    allowClear
                                    options= {metadata.productTypeOptions} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="accountCode"
                                label="NOMINAL CODE"  
                                rules={[]}>
                                <Input placeholder="Please enter nominal code" />
                            </Form.Item>
                        </Col>                        
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="paymentGateways"
                                label="PAYMENT GATEWAY(S)"  
                                rules={[]}>
                                <Select
                                    allowClear
                                    mode="multiple"
                                    options= {metadata.paymentGatewayOptions} />
                            </Form.Item>
                        </Col>                        
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="tracking"
                                label="TRACKING"
                                valuePropName="checked"
                                rules={[]}>
                                <Checkbox></Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="separateAutoInvoices"
                                label="SEPARATE AUTO INVOICE"
                                valuePropName="checked"
                                rules={[]}>
                                <Checkbox></Checkbox>
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
                    <Form.Item name="businessEntityId"><Input type="hidden"/></Form.Item>                    
                </Form>}
            </Drawer>
        </>
    );
};

ProductGroupDrawer.propTypes = {
    id: PropTypes.string,
    pid: PropTypes.string,
    open: PropTypes.bool,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default ProductGroupDrawer;