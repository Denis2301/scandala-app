import { Pagination } from 'antd';
import type { FC } from 'react';

export const Paginator: FC<{
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onChange: (value: number) => void;
}> = ({ currentPage, totalCount, pageSize, onChange }) => {
    return (
        <Pagination
            pageSize={pageSize}
            current={currentPage}
            onChange={onChange}
            total={totalCount}
        />
    );
};
