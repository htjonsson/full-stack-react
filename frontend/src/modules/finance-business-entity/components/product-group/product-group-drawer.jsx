import { useEffect, useState } from 'react';
import { Button, Col, Checkbox, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { GetBaseUrl } from '../../../../services/config.js'; 

const ProductGroupDrawer = ({ id, open, caption, handleSave, handleClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState({});

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = GetBaseUrl('product-groups');

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
            "productTypeOptions" : [
                {
                    "value" : "lettings",
                    "label" : "lettings"
                },
                {
                    "value" : "service",
                    "label" : "service"
                },
                {
                    "value" : "event",
                    "label" : "event"
                }  
            ],
            "paymentGatewayOptions" : [
                {
                    "value" : "old-oak-stripe",
                    "label" : "old-oak-stripe"
                },
                {
                    "value" : "old-oak-stripe-staff",
                    "label" : "old-oak-stripe-staff"
                },
                {
                    "value" : "old-oak-moto-bank",
                    "label" : "old-oak-moto-bank"
                },
                {
                    "value" : "old-oak-moto-bank-staff",
                    "label" : "old-oak-moto-bank-staff"
                }
            ],
            "roleOptions" : [
                {
                    "value" : "user",
                    "label" : "User"
                },
                {
                    "value" : "staff",
                    "label" : "Staff"
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
                                name="nominalCode"
                                label="NOMINAL CODE"  
                                rules={[]}>
                                <Input placeholder="Please enter nominal code" />
                            </Form.Item>
                        </Col>                        
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="paymentGateway"
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
                                rules={[]}>
                                <Checkbox></Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="separateAutoInvoices"
                                label="SEPARATE AUTO INVOICE"
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
                </Form>}
            </Drawer>
        </>
    );
};

ProductGroupDrawer.propTypes = {
    id: PropTypes.any,
    open: PropTypes.bool,
    caption: PropTypes.string,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default ProductGroupDrawer;