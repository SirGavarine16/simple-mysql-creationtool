import { FC } from 'react';
import { Typography } from 'antd';

interface Props {
    title: string;
}

const AppHeader: FC<Props> = ({ title }) => {
    return (
        <header>
            <Typography.Title
                style={{ margin: '0.5rem', textAlign: 'center' }}
            >
                {title}
            </Typography.Title>
        </header>
    );
}

export default AppHeader;