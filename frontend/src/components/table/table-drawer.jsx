import { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const TableDrawer = ({ id, open, caption, handleSave, handleClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = "http://localhost:3000/tables";

    const fetchData = (id) => {
        setLoading(true);
        fetch(`${baseUrl}/${id}`, { method: 'GET', redirect: 'follow' })
            .then(response => { return response.json() })
            .then(json => { form.setFieldsValue(json); })
            .catch(err => { setError(err) });
        setLoading(false);
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

    useEffect(() => {
        if (open) {
            if (id === null) {
                setLoading(false);
                form.setFieldValue("id", uuidv4());
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
                                label="Id"
                                rules={[]}
                                >
                                <Input placeholder="Id" readOnly={true} />
                            </Form.Item>
                        </Col>
                    </Row>     
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please enter table name',
                                    },
                                ]}>
                                <Input placeholder="Please enter table name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
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

TableDrawer.propTypes = {
    id: PropTypes.any,
    open: PropTypes.bool,
    caption: PropTypes.string,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default TableDrawer;