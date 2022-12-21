import { FC } from 'react';
import { Card, Col, Row } from 'antd';

import { FormContent } from '../forms';
import { OptionsContent } from '../options';

interface Props {
}

const AppContent: FC<Props> = () => {
    return (
        <main>
            <Row style={{ maxWidth: '95%', margin: '1rem auto' }} gutter={8}>
                <Col span={16}>
                    <Card style={{ boxShadow: '2px 3px 3px 2px #eaecef' }}>
                        <FormContent />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ boxShadow: '2px 3px 3px 2px #eaecef' }}>
                        <OptionsContent />
                    </Card>
                </Col>
            </Row>
        </main>
    );
}

export default AppContent;