import { CloseOutlined } from '@ant-design/icons';
import { Button, Select, Space } from 'antd';
import { useEffect, type FC } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
    fetchGenreAndCountries,
    resetQuery,
    selectQuery,
} from '../../../store/features/currentQuerySlice';
import type { AppDispatch } from '../../../store/store';
import { Error } from './Error';
import { Loading } from './Loading';

export const SelectMovies: FC<{
    countries: number;
    countriesList: Array<{ id: number; country: string }>;
    year: string;
    order: string;
    genresList: Array<{ id: number; genre: string }>;
    genreId: number | null;
    loading: boolean;
    error: string | null;
}> = ({
    countriesList,
    genreId,
    year,
    order,
    countries,
    loading,
    error,
    genresList,
}) => {
    const isMobile = useMediaQuery({ maxWidth: 600 });
    const dispatch = useDispatch<AppDispatch>();

    const ordersList = [
        { title: 'По рейтингу', value: 'RATING' },
        { title: 'По оценкам', value: 'NUM_VOTE' },
    ];

    const yearsList = new Array(60).fill(null).map((_, index) => ({
        title: new Date().getFullYear() - index,
        value: new Date().getFullYear() - index,
    }));

    useEffect(() => {
        if (
            (!loading && genresList.length === 0) ||
            countriesList.length === 0
        ) {
            dispatch(fetchGenreAndCountries());
        }
    }, [dispatch, genresList.length, countriesList.length]);

    const handleReset = () => {
        dispatch(resetQuery());
    };
    if (error) {
        return <Error />;
    }
    if (loading) {
        return <Loading />;
    }
    return (
        <Space
            style={{ marginBottom: '40px' }}
            direction={isMobile ? 'vertical' : 'horizontal'}
            wrap
            size={'small'}
        >
            <Select
                placeholder="Сортировка"
                value={order}
                onChange={value =>
                    dispatch(
                        selectQuery({
                            order: value,
                        }),
                    )
                }
                style={{ width: 120 }}
                options={ordersList.map(
                    (order: { title: string; value: string }) => ({
                        value: order.value,
                        label: order.title,
                    }),
                )}
            />
            <Select
                placeholder={'Страна'}
                value={countries}
                onChange={value => {
                    dispatch(
                        selectQuery({
                            countries: value,
                        }),
                    );
                }}
                style={{ width: 120 }}
                options={countriesList.map(
                    (country: { id: number; country: string }) => ({
                        value: country.id,
                        label: country.country,
                    }),
                )}
            />
            <Select
                placeholder={'Жанр'}
                value={genreId}
                onChange={value =>
                    dispatch(
                        selectQuery({
                            genreId: value,
                        }),
                    )
                }
                style={{ width: 120 }}
                options={genresList.map(genre => ({
                    value: genre.id,
                    label: genre.genre,
                }))}
            />
            <Select
                value={year || null}
                placeholder={'Год'}
                onChange={value =>
                    dispatch(
                        selectQuery({
                            year: value,
                        }),
                    )
                }
                style={{ width: 120 }}
                options={yearsList.map(genre => ({
                    value: genre.value,
                    label: genre.title,
                }))}
            />
            <Button danger icon={<CloseOutlined />} onClick={handleReset}>
                Сброс
            </Button>
        </Space>
    );
};
