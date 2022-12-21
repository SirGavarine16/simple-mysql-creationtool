import { FC, Fragment } from 'react';
import { Button, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CheckOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';

import { TableFieldData } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FieldKeyType from './FieldKeyType';
import { setTableFields } from '../../redux/slice/forms';

interface Props {
}

const FieldsTable: FC<Props> = () => {
    const dispatch = useAppDispatch();
    const { tableFields } = useAppSelector((state) => state.forms);

    const deleteFieldOnTableFields = (record: TableFieldData) => {
        dispatch(
            setTableFields(
                tableFields.filter((tbField) => tbField.id !== record.id)
            )
        );
    }

    const columns: ColumnsType<TableFieldData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <FieldKeyType type={text} />,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text, record) =>
                (record.key === 'pk' || record.key === 'fk')
                    ? 'INT'
                    :  text === 'VARCHAR' ? `VARCHAR(${record.varcharLength})` : text,
        },
        {
            title: 'Allows Null',
            dataIndex: 'allowsNull',
            key: 'allowsNull',
            render: (bool, record) => 
                (record.key === 'pk') 
                    ? 'N/A' 
                    : bool ? <CheckOutlined /> : <StopOutlined />,
        },
        {
            title: 'ENUM Fields',
            dataIndex: 'enumFields',
            key: 'enumFields',
            render: (text) => text ?? 'N/A',
        },
        {
            title: 'Constraints',
            dataIndex: 'constraints',
            key: 'constraints',
            render: (_, record) => 
                (record.constraintDelete && record.constraintUpdate)
                    ?   `ON DELETE ${record.constraintDelete} ON UPDATE ${record.constraintUpdate}`
                    : 'N/A',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Fragment>
                    <Tooltip title='Delete Field'>
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => deleteFieldOnTableFields(record)}
                        />
                    </Tooltip>
                </Fragment>
            )
        }
    ]

    return (
        <Table dataSource={tableFields} rowKey='id' columns={columns} />
    );
}

export default FieldsTable;