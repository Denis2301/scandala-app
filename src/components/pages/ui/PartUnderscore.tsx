import Title from 'antd/es/typography/Title';
import type { FC } from 'react';

export const PartFormUnderscore: FC<{ title: string }> = ({ title }) => {
    return (
        <div style={{ display: 'flex', marginBottom: 40 }}>
            <Title
                level={4}
                style={{
                    flexShrink: 0,
                    marginInlineEnd: 15,
                    color: '#1890ff',
                    textAlign: 'start',
                    fontWeight: 600,
                    fontSize: 'clamp(16px, 2.5vw, 22px)',
                }}
            >
                {title}
            </Title>
            <div
                style={{
                    width: '100%',
                    borderBlockEnd: '2px solid #bae7ff',
                }}
            ></div>
        </div>
    );
};
