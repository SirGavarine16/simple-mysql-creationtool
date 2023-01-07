import { FC } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

import { useAppDispatch } from '../../hooks';
import { DatabaseFormData } from '../../interfaces/forms';
import { setResult } from '../../redux/slice/forms';

interface Props {
}

const DatabaseForm: FC<Props> = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const onSubmit = (formData: DatabaseFormData) => {
        dispatch(setResult(`CREATE DATABASE IF NOT EXISTS ${formData.dbName};`));
        form.resetFields();
    }

    return (
        <Form layout='vertical' form={form} autoComplete='off' onFinish={onSubmit}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label='Database Name'
                        name='dbName'
                        rules={[
                            { required: true, message: 'This field is required.' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='end'>
                <Col span={6}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            CREATE
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default DatabaseForm;