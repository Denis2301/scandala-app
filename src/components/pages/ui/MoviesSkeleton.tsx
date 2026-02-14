import { Card, Skeleton } from 'antd';
import type { FC } from 'react';
import { useMediaQuery } from 'react-responsive';

export const MoviesSkeleton: FC<{ length: number }> = ({ length }) => {
    const isMobile = useMediaQuery({ maxWidth: 800 });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '15px',
            }}
        >
            {new Array(length).fill(null).map((_, i) => {
                return (
                    <Card
                        key={i}
                        style={{
                            width: isMobile ? '200px' : '250px',
                            height: isMobile ? '300px' : '350px',
                            borderRadius: 8,
                        }}
                    >
                        <Skeleton
                            active
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Card>
                );
            })}
        </div>
    );
};
