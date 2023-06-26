import { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Drawer, Form, Input, Row, Select, Space, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { query_createFilterItemByData } from './query';

const QueryFilterDrawer = ({ item, filterItem, open, saveCallback, closeCallback }) => {
    const [form] = Form.useForm();
    const [title, setTitle] = useState("");
    const [dataType, setDataType] = useState("");
    const [isRange, setIsRange] = useState(false);
    const [operationOptions, setOperationOptions] = useState();

    // -------------------------------------------------------------------------------
    //      HANDLE ACTIONS
    // -------------------------------------------------------------------------------

    const onClose = () => {
        closeCallback();
    };

    const getFilter = (values) => {
        let _description = "";
        if (values.description) { _description = values.description };

        let _range = {};
        let _value = "";

        if (isRange) {
            if (dataType === "date") {
                _range = {
                    from: dayjs(values.fromDate).format('YYYY-MM-DDT00:00:00Z[Z]'),
                    to: dayjs(values.toDate).format('YYYY-MM-DDT00:00:00Z[Z]')
                }
            } 
            else {
                _range = {
                    from: values.fromValue,
                    to: values.toValue
                }
            }
        } else {
            if (dataType === "date") {
                _value = dayjs(values.dateValue).format('YYYY-MM-DDT00:00:00Z[Z]')
            }
            else {
                _value = values.textValue
            }
        }

        let _filter = {};

        let type = "text";
        if (dataType == "date") {
            type = "date";
        }
        else if (dataType === "number") {
            type = "number";
        }

        const _id = uuidv4();

        if (isRange) {
            _filter = {
                id: _id,
                key: item.key,
                type: type,
                isRange: isRange,
                condition: values.condition,
                operation: values.operation,
                missing: values.missing,
                description: _description,
                range: _range
            }
        }
        else {
            _filter = {
                id: _id,
                key: item.key,
                type: type,
                isRange: isRange,
                condition: values.condition,
                operation: values.operation,
                missing: values.missing,
                description: _description,
                value: _value
            }          
        }

        return _filter;
    } 

    const getValues = (filter) => {
        // Find the type of filter
        /*
        if (filter.type === 'date') {
            setIsDate(true);
            setIsNumber(false);
        }
        else if (filter.type === "number") {
            setIsDate(false);
            setIsNumber(true);
        }
        else {
            setIsDate(false);
            setIsNumber(false);
        }
        */
        // Get values of filter
        let _fromDate = null;
        let _toDate = null;
        let _dateValue = null;
        let _fromValue = "";
        let _toValue = "";
        let _textValue = "";

        if (filter.type === 'date') {
            if (filter.isRange) {
                _fromDate = dayjs(filter.range.fromDate);
                _toDate = dayjs(filter.range.toDate);
            }
            else {
                _dateValue = dayjs(filter.value);
            }
        }
        else {
            if (filter.isRange) {
                _fromValue = filter.range.fromValue;
                _toValue = filter.range.toValue;
            }
            else {
                _textValue = filter.value;
            }
        }

        const values = {
            condition : filter.condition,
            missing: filter.missing,
            operation: filter.operation,
            description: filter.description,
            textValue: _textValue,
            fromValue: _fromValue,
            toValue: _toValue,
            dateValue: _dateValue,
            fromDate: _fromDate,
            toDate: _toDate,
        };      

        return values;
    }

    const onFinish = (values) => {
        values.type = dataType;
        const filter = query_createFilterItemByData(filterItem, values);
        saveCallback(filter);
    }

    const onOpen = () => { 
        setTitle("FILTER - " + item.title);

        setDataType(filterItem.type);
        // Check if filter is a range
        if (filterItem.operation === "range") {
            setIsRange(filterItem.isRange);
        }
        
        form.resetFields();
        form.setFieldsValue(filterItem);
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
        if (dataType === "string") {
            setOperationOptions([
                { value: 'exactlyMatches', label: 'Exactly Matches', },
                { value: 'startsWith', label: 'Starts With', },
                { value: 'endsWith', label: 'Ends With', },
                { value: 'contains', label: 'Contains', }
            ]);
        } 
        else if (dataType === "number" || dataType === "date") {
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
    }, [dataType]);

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
                    {(dataType === "string") &&
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
                    {(dataType === "date"  && isRange === false) &&
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
                    {(dataType === "number" && isRange === true) &&
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
                    {(dataType === "number" && isRange === true)  &&
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
                    {(dataType === "date" && isRange === true)  &&
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
                    {(dataType === "date" && isRange === true)  &&                       
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

QueryFilterDrawer.propTypes = {
    item: PropTypes.any,
    filterItem: PropTypes.any,
    open: PropTypes.bool,
    saveCallback: PropTypes.func,
    closeCallback: PropTypes.func
}

export default QueryFilterDrawer;