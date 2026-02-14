import { Button, Flex, Result } from 'antd';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const Error: FC<{}> = ({}) => {
    const navigate = useNavigate();
    return (
        <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
            <Result
                status="500"
                title="500"
                subTitle="Извините, что-то пошло не так."
                extra={
                    <Button type="primary" onClick={() => navigate('/')}>
                        На Главную
                    </Button>
                }
            />
        </Flex>
    );
};
