import { Typography } from 'antd';
import { FC } from 'react';

interface Props {
}

const EmptyContent: FC<Props> = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography.Text>
                No Creation option selected.
            </Typography.Text>
        </div>
    );
}

export default EmptyContent;