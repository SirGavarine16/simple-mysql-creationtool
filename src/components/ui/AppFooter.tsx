import { FC } from 'react';
import { Col, Typography } from 'antd';

interface Props {
}

const AppFooter: FC<Props> = () => {
    return (
        <footer>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography.Text>
                    Developed by
                </Typography.Text>
                <Typography.Link
                    href="https://danieldelagavarain-dev.vercel.app/"
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ color: '#121212', textDecoration: 'underline', margin: '0 0.25rem' }}
                >
                    Daniel De la Cruz
                </Typography.Link>
                <Typography.Text>
                    © 2022 |
                </Typography.Text>
                <Typography.Link
                    href="https://github.com/SirGavarine16/simple-mysql-creationtool"
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ color: '#121212', textDecoration: 'underline', margin: '0 0.25rem' }}
                >
                    Github
                </Typography.Link>
            </Col>
        </footer>
    );
}

export default AppFooter;