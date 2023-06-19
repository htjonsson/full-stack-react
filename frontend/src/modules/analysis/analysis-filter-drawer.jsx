import { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Drawer, Form, Input, Row, Select, Space, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import { triggerFocus } from 'antd/es/input/Input';

const AnalysisFilterDrawer = ({ filterItem, open, saveCallback, closeCallback }) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState("");
    const [isRange, setIsRange] = useState(false);
    const [isDate, setIsDate] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    const [operationOptions, setOperationOptions] = useState();

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onClose = () => {
        closeCallback();
    };

    const onFinish = (values) => {
        console.log("onFinish", values)

        if (values.dateValue) { alert(dayjs(values.dateValue).format())}
        if (values.fromDate) { alert(dayjs(values.fromDate).format())}
        if (values.toDate) { alert(dayjs(values.toDate).format())}
    }

    const onOpen = () => { 
        setTitle("FILTER");

        setIsDate(true);
        setIsNumber(false);
        setIsRange(false);
        
        const defaults = {
            condition : "show",
            missing: "default", 
            operation: "exactlyMatches"
        };

        form.resetFields();
        form.setFieldsValue(defaults);
    }

    const onSelect = (value) => {
        if (value === "range") {
            setIsRange(true);
        } else {
            setIsRange(false);    
        }
    }

    // -------------------------------------------------------------------------------
    //      HOOKS
    // -------------------------------------------------------------------------------

    useEffect(() => { 
    }, []);

    useEffect(() => { 
        if (isDate === false && isNumber === false) {
            setOperationOptions([
                { value: 'exactlyMatches', label: 'Exactly Matches', },
                { value: 'startsWith', label: 'Starts With', },
                { value: 'endsWith', label: 'Ends With', },
                { value: 'contains', label: 'Contains', },
                { value: 'range', label: 'Is In Range'}
            ]);
        } 
        else if (isDate === false && isNumber === true) {
            setOperationOptions([
                { value: 'exactlyMatches', label: 'Exactly Matches', },
                { value: 'greaterThen', label: 'Greater Then', },
                { value: 'greaterEqualTo', label: 'Greater Or Equal To', },
                { value: 'lessThen', label: 'Less Then', },
                { value: 'lessEqualTo', label: 'Less Or Equal To', },              
                { value: 'range', label: 'Is In Range'}
            ]);        
        }
        else {
            setOperationOptions([
                { value: 'exactlyMatches', label: 'Exactly Matches', },
                { value: 'range', label: 'Is In Range'}
            ]);
        }
    }, [isDate,isNumber]);

    useEffect(() => {
        if (open) {
            onOpen();
        }
    }, [open]);

    // -------------------------------------------------------------------------------
    //      VIEW
    // -------------------------------------------------------------------------------

    // https://www.ibm.com/docs/en/cognos-analytics/11.1.0?topic=filters-create-simple-filter
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
                        <Col span={24}>
                            <Form.Item
                                label="CONDITION"
                                name="condition"
                                rules={[]}>
                                <Select
                                    options={[
                                        { value: 'show', label: 'Show only the following', },
                                        { value: 'notShow', label: 'Do not show the following (NOT)', }
                                    ]}                                        
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="OPERATION"
                                name="operation"
                                rules={[]}>
                                <Select
                                    onSelect={onSelect}
                                    options={operationOptions}                                        
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {(isDate === false && isRange === false) &&
                        <Row gutter={[0, 0]}>
                            <Col span={16}>
                                <Form.Item
                                    label="VALUE"
                                    name="textValue"
                                    tooltip="Value to be searched for"
                                    rules={[]}>
                                    <Input placeholder='ENTER VALUE' />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                    {(isDate === true && isRange === false) &&
                        <Row gutter={[0, 0]}>
                            <Col span={16}>
                                <Form.Item
                                    label="DATE"
                                    name="dateValue"
                                    tooltip="Date to search for"
                                    rules={[]}>
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                    }                                        
                    {(isDate === false && isRange === true) &&
                        <Row gutter={[0, 0]}>
                            <Col span={16}>
                                <Form.Item
                                    label="FROM"
                                    name="fromValue"
                                    tooltip="If empty then there is now lowest value in this filter"
                                    rules={[]}>
                                    <Input placeholder='LOWEST VALUE' />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                    {(isDate === false && isRange === true)  &&
                        <Row gutter={[0, 0]}>
                            <Col span={16}>
                                <Form.Item
                                    label="TO"
                                    name="toValue"
                                    tooltip="If empty then there is now highest value in this filter"
                                    rules={[]}>
                                    <Input placeholder='HIGHEST VALUE' allowClear={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                    {(isDate === true && isRange === true)  &&
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="FROM"
                                    name="fromDate"
                                    tooltip="If empty then there is no from date in this filter"
                                    rules={[]}>
                                    <DatePicker allowClear={true}/>
                                </Form.Item>
                            </Col>
                        </Row>   
                    }
                    {(isDate === true && isRange === true)  &&                       
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="TO"
                                    name="toDate"
                                    tooltip="If empty then there is no to date in this filter"
                                    rules={[]}>
                                    <DatePicker allowClear={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="MISSING VALUES"
                                name="missing"
                                tooltip="What to do with empty values (null) "
                                rules={[]}>
                                <Select
                                    options={[
                                        { value: 'default', label: '(Default)', },
                                        { value: 'include', label: 'Include missing values', },
                                        { value: 'leaveOut', label: 'Leave out missing values', },
                                        { value: 'showOnly', label: 'Show only missing values', }
                                    ]}                                        
                                />
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

AnalysisFilterDrawer.propTypes = {
    filterItem: PropTypes.any,
    open: PropTypes.bool,
    saveCallback: PropTypes.func,
    closeCallback: PropTypes.func
}

export default AnalysisFilterDrawer;

/*
"filter" {
    "id": "",
    "type": "text|range",
    "filterType": "contains|notContains",
    "range": {
        "from": "",
        "minimum": true,
        "to": "",
        "maximum": true    
    },
    "text": {
        ""value"": "",
        "condition": "match|contains|startsWith|endsWith",
        "caseSensitive": true
    },
    "missing"value"s": "default|hide|show"
},

<list name="List1" refQuery="Query1">
 ...
  <listColumns>
  ...
  </listColumns>
 <sortList> 
  <sortItem refDataItem="Revenue" sortOrder="descending"/> 
 </sortList> 
</list>

*/