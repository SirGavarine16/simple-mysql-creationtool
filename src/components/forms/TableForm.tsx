import { FC, Fragment, useState } from 'react';
import { Button, Col, Form, Input, notification, Row, Typography } from 'antd';
import FieldsTable from './FieldsTable';
import TableFieldModal from './TableFieldModal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setResult, setTableFields } from '../../redux/slice/forms';

interface Props {
}

const TableForm: FC<Props> = () => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const dispatch = useAppDispatch();
    const { tableFields } = useAppSelector((state) => state.forms);

    const [fieldModalActive, setFieldModalActive] = useState(false);
    const [fieldModalMode, setFieldModalMode] = useState<'add' | 'update'>('add');

    const showNoFieldsNotification = () => {
        api.error({
            message: 'No Fields in Table!',
            description: 'To create a Table you need to at least specify a field.',
            placement: 'topRight',
            duration: 3,
        });
    }

    const showPrimaryKeyNotification = () => {
        api.info({
            message: 'Primary Key not valid!',
            description: 'A Table must have a single Primary Key.',
            placement: 'top',
            duration: 3,
        });
    }

    const parseEnumFields = (enumFields: string) => {
        const fields = enumFields.split(',');
        const sanitizedFields = fields.map((field) => field.trim());

        let parsedEnumFields = '';
        sanitizedFields.forEach((field, fieldIndex) => {
            parsedEnumFields += `'${field}'`;

            if (fieldIndex !== (sanitizedFields.length - 1)) {
                parsedEnumFields += ', ';
            }
        });

        return parsedEnumFields;
    }

    const onSubmit = (data: { tbName: string }) => {
        if (tableFields.length <= 0) {
            return showNoFieldsNotification();
        }

        if (tableFields.filter((tbField) => tbField.key === 'pk').length !== 1) {
            return showPrimaryKeyNotification();
        }

        let fieldsSentence = '';

        const hasFkFields = tableFields.filter((tbField) => tbField.key === 'fk').length > 0;

        tableFields.forEach((tbField, tbFieldIndex) => {
            if (tbField.key === 'pk') {
                fieldsSentence += `${tbField.name} INT PRIMARY KEY AUTO_INCREMENT NOT NULL`
            }

            const tbFieldNull = tbField.allowsNull ? '' : ' NOT NULL';
            const tbFieldUnique = tbField.unique ? ' UNIQUE' : '';

            if (tbField.key === 'fk') {
                fieldsSentence += `${tbField.name} INT ${tbFieldNull}${tbFieldUnique}`;
            }

            if (tbField.key === 'regular') {
                const tbFieldType =
                    tbField.type === 'VARCHAR'
                        ? `${tbField.type}(${tbField.varcharLength})`
                        : tbField.type === 'ENUM'
                            ? `${tbField.type}(${parseEnumFields(tbField.enumFields!)})`
                            : tbField.type;

                fieldsSentence += `${tbField.name} ${tbFieldType}${tbFieldNull}${tbFieldUnique}`;
            }

            if (tbFieldIndex !== (tableFields.length - 1)) {
                fieldsSentence += ', ';
            } else {
                if (hasFkFields) {
                    fieldsSentence += ', '
                }
            }
        });

        tableFields.filter((tbField) => tbField.key === 'fk').forEach((tbField, tbFieldIndex) => {
            fieldsSentence += `CONSTRAINT ${tbField.fkName} FOREIGN KEY(${tbField.name}) REFERENCES ${tbField.fkTableName}(${tbField.name}) ON DELETE ${tbField.constraintDelete} ON UPDATE ${tbField.constraintUpdate}`;

            if (tbFieldIndex !== (tableFields.filter((tbField) => tbField.key === 'fk').length - 1)) {
                fieldsSentence += ', ';
            }
        });

        const querySentence = `CREATE TABLE IF NOT EXISTS ${data.tbName} (${fieldsSentence});`

        dispatch(setResult(querySentence));

        form.resetFields();
        dispatch(setTableFields([]));
    }

    const handleAddField = () => {
        setFieldModalMode('add');
        setFieldModalActive(true);
    }

    return (
        <Fragment>
            {contextHolder}
            <Form layout='vertical' form={form} autoComplete='off' onFinish={onSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='Table Name'
                            name='tbName'
                            rules={[
                                { required: true, message: 'This field is required.' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col span={24}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <Typography.Text>
                                Table Fields
                            </Typography.Text>
                            <Button type='primary' onClick={handleAddField}>
                                ADD FIELD
                            </Button>
                        </div>
                        <FieldsTable />
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
            <TableFieldModal
                open={fieldModalActive}
                onClose={() => setFieldModalActive(false)}
                mode={fieldModalMode}
            />
        </Fragment>
    );
}

export default TableForm;