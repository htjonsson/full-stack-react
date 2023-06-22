import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space, Select } from 'antd';
import PropTypes from 'prop-types';

const QueryFieldDrawer = ({ item, open, saveCallback, closeCallback }) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState("");

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onClose = () => {
        closeCallback();
    };

    const onFinish = (values) => {
        let refresh = false;
        
        if (values.title) item.title = values.title;
        if (values.orderBy) item.orderBy = values.orderBy;
        if (values.description) item.description = values.description;

        if (values.number) {
            const parsed = parseInt(values.number, 0);
            if (!isNaN(parsed) && item.number !== parsed) { 
                item.number = parsed; 
                refresh = true;
            }
        }
        saveCallback(item, refresh);
    }

    const onOpen = () => {
        setTitle('FIELD - ' + item.title);

        form.resetFields();
        form.setFieldsValue(item);
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
                width={500}
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
                <Form
                    layout="vertical"
                    requiredMark={true}
                    form={form}
                    onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item 
                                name="title" 
                                label="Name"
                                rules={[
                                    { required: true, message: 'Please enter name', },
                                ]}>
                                <Input placeholder="Name of field" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item 
                                name="type" 
                                label="Type"
                                rules={[]}>
                                <Input readOnly={true} />
                            </Form.Item>
                        </Col>
                    </Row>   
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item 
                                name="dataType" 
                                label="Data Type"
                                rules={[]}>
                                <Input readOnly={true} />
                            </Form.Item>
                        </Col>
                    </Row>                  
                    <Row gutter={16}>
                        <Col span={11}>
                            <Form.Item
                                name="orderBy"
                                label="Order by"
                                rules={[]}>
                                <Select
                                    options={[
                                        { value: 'default', label: 'Don\'t sort', },
                                        { value: 'asc', label: 'Ascending (A to Z)', },
                                        { value: 'desc', label: 'Descending (Z to A)', },    
                                    ]}                                        
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item 
                                name="number" 
                                label="Order in Query"
                                rules={[]}>
                                <Input />
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
                </Form>                
            </Drawer>
        </>
    );
};

QueryFieldDrawer.propTypes = {
    item: PropTypes.any,
    open: PropTypes.bool,
    saveCallback: PropTypes.func,
    closeCallback: PropTypes.func
}

export default QueryFieldDrawer