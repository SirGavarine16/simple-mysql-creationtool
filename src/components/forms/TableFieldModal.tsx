import { FC, Fragment, useEffect } from 'react';
import { Col, Form, Input, InputNumber, Modal, notification, Radio, Row, Select, Switch } from 'antd';

import { TableFieldFormData } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTableFields } from '../../redux/slice/forms';

interface Props {
    open: boolean;
    onClose: () => void;
    mode: 'add' | 'update'
}

const TableFieldModal: FC<Props> = ({ open, onClose, mode }) => {
    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm();
    const key = Form.useWatch('key', form);
    const type = Form.useWatch('type', form);

    const dispatch = useAppDispatch();
    const { tableFields } = useAppSelector((state) => state.forms);

    useEffect(() => {
        form.resetFields();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const showNegativeVarcharLengthNotification = () => {
        api.info({
            message: 'VARCHAR Length is not valid!',
            placement: 'top',
            duration: 3,
        })
    }

    const onSubmit = (data: TableFieldFormData) => {
        if (type === 'VARCHAR' && data.varcharLength! <= 0) {
            return showNegativeVarcharLengthNotification();
        }

        dispatch(setTableFields(
            [...tableFields, {
                id: tableFields.length,
                ...data,
            }]
        ));
        onClose();
    }

    return (
        <Fragment>
            {contextHolder}
            <Modal
                title={mode === 'add' ? 'Add Table Field' : 'Update Table Field'}
                open={open}
                onOk={() => form.submit()}
                onCancel={onClose}
                okText={mode === 'add' ? 'ADD' : 'UPDATE'}
                width='60%'
            >
                <Form layout='vertical' form={form} autoComplete='off' onFinish={onSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label='Field Name'
                                name='name'
                                rules={[
                                    { required: true, message: 'This field is required.' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Key"
                                name='key'
                                rules={[
                                    { required: true, message: 'This field is required.' }
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value="pk">PK</Radio>
                                    <Radio value="fk">FK</Radio>
                                    <Radio value='regular'>Regular</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    {
                        key === 'fk'
                            ? <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="On Delete"
                                        name='constraintDelete'
                                        rules={[
                                            { required: true, message: 'This field is required.' }
                                        ]}
                                    >
                                        <Select>
                                            <Select.Option value='NO ACTION'>No Action</Select.Option>
                                            <Select.Option value='RESTRICT'>Restrict</Select.Option>
                                            <Select.Option value='CASCADE'>Cascade</Select.Option>
                                            <Select.Option value='SET NULL'>Set Null</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="On Update"
                                        name='constraintUpdate'
                                        rules={[
                                            { required: true, message: 'This field is required.' }
                                        ]}
                                    >
                                        <Select>
                                            <Select.Option value='NO ACTION'>No Action</Select.Option>
                                            <Select.Option value='RESTRICT'>Restrict</Select.Option>
                                            <Select.Option value='CASCADE'>Cascade</Select.Option>
                                            <Select.Option value='SET NULL'>Set Null</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        key === 'fk'
                            ? <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label='FK Name (should start with fk)'
                                        name='fkName'
                                        rules={[
                                            { required: true, message: 'This field is required.' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label='Foreign Table Name'
                                        name='fkTableName'
                                        rules={[
                                            { required: true, message: 'This field is required.' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            : null
                    }
                    <Row gutter={16}>
                        {
                            key !== 'pk'
                                ? <Col span={12}>
                                    <Form.Item
                                        label='Allows Null'
                                        name='allowsNull'
                                        valuePropName="checked"
                                        initialValue={false}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Col>
                                : null
                        }
                        {
                            key === 'regular'
                                ? <Col span={12}>
                                    <Form.Item
                                        label='Type'
                                        name='type'
                                        rules={[
                                            { required: true, message: 'This field is required.' }
                                        ]}
                                    >
                                        <Select>
                                            <Select.Option value='INT'>INT</Select.Option>
                                            <Select.Option value='FLOAT'>FLOAT</Select.Option>
                                            <Select.Option value='VARCHAR'>VARCHAR</Select.Option>
                                            <Select.Option value='VARCHAR(255)'>VARCHAR(255)</Select.Option>
                                            <Select.Option value='VARCHAR(500)'>VARCHAR(500)</Select.Option>
                                            <Select.Option value='DATETIME'>DATETIME</Select.Option>
                                            <Select.Option value='ENUM'>ENUM</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                : null
                        }
                    </Row>
                    <Row gutter={16}>
                        {
                            type === 'VARCHAR'
                                ? <Col span={12}>
                                    <Form.Item
                                        label='VARCHAR Length'
                                        name='varcharLength'
                                        rules={[
                                            { required: true, message: 'This field is required.' }
                                        ]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                : null
                        }
                        {
                            type === 'ENUM'
                                ? <Col span={12}>
                                    <Form.Item
                                        label='ENUM Fields (separated by a comma)'
                                        name='enumFields'
                                        rules={[
                                            { required: true, message: 'This field is required.' }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                : null
                        }
                    </Row>
                </Form>
            </Modal>
        </Fragment>
    );
}

export default TableFieldModal;