import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import DatabaseForm from './DatabaseForm';
import TableForm from './TableForm';
import EmptyContent from './EmptyContent';
import { setTableFields } from '../../redux/slice/forms';

interface Props {
}

const FormContent: FC<Props> = () => {
    const dispatch = useAppDispatch();
    const { creationOption } = useAppSelector((state) => state.options);

    useEffect(() => {
        dispatch(setTableFields([]));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creationOption]);

    switch(creationOption){
        case 'db':
            return <DatabaseForm />
        case 'tb':
            return <TableForm />
        default:
            return <EmptyContent />
    }
}

export default FormContent;