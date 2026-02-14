import { Spin } from 'antd';
import type { FC } from 'react';

export const Loading: FC<{}> = ({}) => {
    return (
        <Spin
            size="large"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        />
    );
};
