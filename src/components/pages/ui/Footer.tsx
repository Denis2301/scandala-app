import { Layout } from 'antd';
import type { FC } from 'react';

export const Footer: FC<{
    mode: boolean;
    className?: string;
    borderRadiusLG: number;
}> = ({ mode, className, borderRadiusLG }) => {
    return (
        <Layout.Footer
            style={{
                backgroundColor: mode ? '#001529' : '#ffffff',
                color: mode ? '#fff' : '#000',
                borderRadius: borderRadiusLG,
                padding: '20px',
                margin: '0px 0px 0px 10px',
            }}
            className={className}
        >
            <div
                style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    lineHeight: 1.5,
                    fontWeight: 400,
                }}
            >
                Данный сайт создан исключительно в обучающих целях.
                <br />
                Все права пренадлежат правообладателям
            </div>
            <div
                style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    lineHeight: 1.5,
                    fontWeight: 400,
                }}
            >
                Scandala ©{new Date().getFullYear()}
            </div>
        </Layout.Footer>
    );
};
