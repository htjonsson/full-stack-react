import { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { GetBaseUrl } from '../../../../services/config.js'; 

const BankAccountDrawer = ({ id, open, caption, handleSave, handleClose }) => {
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
            "paymentTypeOptions" : [
                {
                    "value" : "moto-bank",
                    "label" : "moto-bank"
                },
                {
                    "value" : "moto-cash",
                    "label" : "moto-cash"
                },
                {
                    "value" : "moto-cheque",
                    "label" : "moto-cheque"
                },
                {
                    "value" : "moto-card",
                    "label" : "moto-card"
                }  
            ],
            "roleOptions" : [
                {
                    "value" : "staff",
                    "label" : "Staff"
                },
                {
                    "value" : "user",
                    "label" : "User"
                },                
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
                                rules={[]}>
                                <Input placeholder="Id" readOnly={true} />
                            </Form.Item>
                        </Col>
                    </Row>     
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="bankAccount"
                                label="BANK ACCOUNT"
                                rules={[
                                    { required: true, message: 'Please enter bank account', },
                                ]}>
                                <Input placeholder="Please enter bank account" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="paymentType"
                                label="PAYMENT TYPE"
                                rules={[
                                    { required: true, message: 'Please enter payment type', },
                                ]}>
                                <Select
                                    allowClear
                                    options= {metadata.paymentTypeOptions} />
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

BankAccountDrawer.propTypes = {
    id: PropTypes.any,
    open: PropTypes.bool,
    caption: PropTypes.string,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default BankAccountDrawer;