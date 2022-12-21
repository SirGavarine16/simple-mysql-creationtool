import { Tag } from 'antd';
import { FC } from 'react';
import { FieldKey } from '../../types/forms';

interface Props {
    type: FieldKey;
}

const FieldKeyType: FC<Props> = ({ type }) => {
    switch(type) {
        case 'pk':
            return <Tag color='gold'>PK</Tag>
        case 'fk':
            return <Tag color='purple'>FK</Tag>
        case 'regular':
            return <Tag color='geekblue'>Regular</Tag>
        default:
            return null;
    }
}

export default FieldKeyType;