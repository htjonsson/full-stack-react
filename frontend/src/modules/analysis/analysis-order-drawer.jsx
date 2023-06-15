import { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const AnalysisOrderDrawer = ({ item, open, saveCallback, closeCallback }) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState("");

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onClose = () => {
        closeCallback();
    };

    const onFinish = (values) => {
        if (values.orderBy) item.orderBy = values.orderBy;

        console.log("onFinish", values);
        console.log("item", item);

        saveCallback(item);
    }

    const onOpen = () => {
        setTitle('ORDER - ' + item.key);

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
                <Form
                    layout="vertical"
                    requiredMark={true}
                    form={form}
                    onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="orderBy"
                                label="Order by"
                                rules={[]}>
                                <Select
                                    options={[
                                        {
                                          value: 'default',
                                          label: '(default)',
                                        },
                                        {
                                            value: 'asc',
                                            label: 'Ascending',
                                        },
                                        {
                                            value: 'desc',
                                            label: 'Descending',
                                        }
                                    ]}                                        
                                />
                            </Form.Item>
                        </Col>
                    </Row>              
                </Form>   
            </Drawer>
        </>
    );
};

AnalysisOrderDrawer.propTypes = {
    item: PropTypes.any,
    open: PropTypes.bool,
    saveCallback: PropTypes.func,
    closeCallback: PropTypes.func
}

export default AnalysisOrderDrawer