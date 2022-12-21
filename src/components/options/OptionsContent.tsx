import { FC, Fragment } from 'react';
import { Divider, Input, notification, Radio } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCreationOption } from '../../redux/slice/options';
import { setResult } from '../../redux/slice/forms';

interface Props {
}

const OptionsContent: FC<Props> = () => {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();
    const { creationOption } = useAppSelector((state) => state.options);
    const { result } = useAppSelector((state) => state.forms);

    const copyResultToClipboard = async () => {
        await navigator.clipboard.writeText(result);
        api.info({
            message: `Result copied to clipboard!`,
            placement: 'bottomRight',
            duration: 0.75
        });
    };

    const deleteResult = () => {
        dispatch(setResult(''));
    }

    return (
        <Fragment>
            {contextHolder}
            <h2 style={{ margin: 0 }}>Creation</h2>
            <Radio.Group buttonStyle='solid' value={creationOption} onChange={(e) => dispatch(setCreationOption(e.target.value))} >
                <Radio.Button value="db">Database</Radio.Button>
                <Radio.Button value="tb">Table</Radio.Button>
            </Radio.Group>
            <Divider style={{ margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Query</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CopyOutlined style={{ cursor: 'pointer', marginRight: '0.25rem' }} onClick={copyResultToClipboard} />
                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={deleteResult} />
                </div>
            </div>
            <Input.TextArea rows={10} value={result} disabled style={{ cursor: 'default' }} />
        </Fragment>
    );
}

export default OptionsContent;