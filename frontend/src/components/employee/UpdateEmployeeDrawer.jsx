import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import { useEffect, useState } from 'react';

const UpdateEmployeeDrawer = ({open, handleSave, handleClose, id}) => {
  const [form] = Form.useForm();
  const [meta, setMeta] = useState({});

    // -------------------------------------------------------------------------------
    //      FETCH 
    // -------------------------------------------------------------------------------

    const baseUrl = "http://localhost:3000/";

    const fetchEmployeeData = (form, id) => {
      if (id === -1) {
        console.log("uploaded id undefined")
        return;
      }

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        console.log("fetchEmployeeData", id);

        fetch(baseUrl + "employees/" + id, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // convert string to date
                data.birthDate = dayjs(data.birthDate);
                data.hireDate = dayjs(data.hireDate);

                form.setFieldsValue(data);
            })
            .catch(error => {
                console.error('Failure loading data -> ', error);          
                message.error("Failure loading data");    
            })
            .finally(() => {
            });
    }

    const fetchDrawerConfigData = (id) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        console.log("drawerConfig", id);

        fetch(baseUrl + "drawerConfigs/" + id, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
              setMeta(data);
            })
            .catch(error => {
                console.error('Failure loading data -> ', error);          
                message.error("Failure loading data");    
            })
            .finally(() => {
            });
    }    

  const onFinish = (values) => {
    form.resetFields();
    handleSave(values);
  }

  useEffect(() => {
    console.log("useEffect");
    fetchEmployeeData(form, id);
    fetchDrawerConfigData("UpdateEmployeeDrawer");
  }, [id]);

  const onClose = () => {
    form.resetFields();
    handleClose();
  };

  return (
      <Drawer
        title="Update Employee"
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
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user first name',
                  },
                ]}
              >
                <Input placeholder="Please enter user first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user last name',
                  },
                ]}
              >
                <Input placeholder="Please enter user last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter address',
                  },
                ]}
              >
                <Input placeholder="Please enter user address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={[
                  {
                    required: true,
                    message: 'Please enter postalCode',
                  },
                ]}
              >
                <Input placeholder="Please enter postalCode" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true,
                    message: 'Please enter city',
                  },
                ]}
              >
                <Input placeholder="Please enter city" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="state"
                label="State"
                rules={[
                  {
                    required: true,
                    message: 'Please enter state',
                  },
                ]}>
                <Input placeholder="Please enter state" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: 'Please enter country',
                  },
                ]}>
                <Input placeholder="Please enter country" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: 'Please enter phone',
                  },
                ]}>
                <Input placeholder="Please enter phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fax"
                label="Fax"
                rules={[]}>
                <Input placeholder="Please enter fax" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter email',
                  },
                ]}>
                <Input placeholder="Please enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter title',
                  },
                ]}>
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="reportsTo"
                label="Reports To"
                rules={[]}>
                <Select placeholder="Please enter reportsTo" options={meta.reportsTo}>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthDate"
                label="Birth Date"
                rules={[
                  {
                    required: true,
                    message: 'Please enter birth date',
                  },
                ]}>
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hireDate"
                label="Hire Date"
                rules={[]}>
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    
  );
};

UpdateEmployeeDrawer.propTypes = {
    open: PropTypes.bool,
    id: PropTypes.any,
    handleSave: PropTypes.func,
    handleClose: PropTypes.func
}

export default UpdateEmployeeDrawer;