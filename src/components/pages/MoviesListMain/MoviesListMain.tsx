import { LeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { useCallback, useEffect, useState, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FULL_HEIGHT, MOVIE_LIST_TITLE } from '../../../constants';
import {
    fetchFilms,
    selectQuery,
} from '../../../store/features/currentQuerySlice';
import type { AppDispatch, RootState } from '../../../store/store';
import { Error } from '../ui/Error';
import { MoviesList } from '../ui/MoviesList';
import { MoviesSkeleton } from '../ui/MoviesSkeleton';
import { PartFormUnderscore } from '../ui/PartUnderscore';
import { SelectMovies } from '../ui/SelectMovies';

const { Item } = Breadcrumb;

export const MoviesListMain: FC<{}> = ({}) => {
    const [page, setPage] = useState(1);
    const [viewSkeleton, setViewSkeleton] = useState(true);
    const handlePageChange = useCallback((page: number) => {
        setPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const movieType = MOVIE_LIST_TITLE.find(m => m.path === location.pathname);
    const {
        loading,
        error,
        countries,
        order,
        year,
        countriesForSelect,
        genres,
        genreId,
        films,
        total,
    } = useSelector((state: RootState) => state.currentQueryReducer);

    useEffect(() => {
        setViewSkeleton(true);
        dispatch(
            fetchFilms({
                type: movieType?.value || 'TOP_POPULAR_MOVIES',
                page,
                countries,
                genreId,
                order,
                year,
				keyword: ''
            }),
        ).finally(() => setViewSkeleton(false));
    }, [dispatch, page, movieType, countries, genreId, order, year]);
    useEffect(() => {
        if (location.pathname === '/cartoon') {
            dispatch(selectQuery({ genreId: 18 }));
        } else {
            dispatch(selectQuery({ genreId: undefined }));
        }
    }, [location.pathname, dispatch]);

    const pageSize = 10;

    if (error) {
        return <Error />;
    }

    return (
        <div style={FULL_HEIGHT}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                {' '}
                <Button
                    icon={<LeftOutlined />}
                    style={{
                        color: 'white',
                        borderColor: 'white',
                        padding: '0 16px',
                        height: '32px',
                        width: 'auto',
                        marginInlineEnd: '8px',
                        fontSize: 'clamp(12px, 1.8vw, 14px)',
                    }}
                    type="default"
                    ghost
                    onClick={() => navigate(-1)}
                >
                    Назад
                </Button>{' '}
                <Breadcrumb
                    style={{
                        marginBottom: 16,
                        cursor: 'pointer',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 'clamp(12px, 1.6vw, 14px)',
                    }}
                >
                    <Item>
                        <Link style={{ color: 'white' }} to={'/'}>
                            Главная
                        </Link>
                    </Item>
                    <Item>
                        <span style={{ color: 'white' }}>
                            {movieType?.title}
                        </span>
                    </Item>
                </Breadcrumb>
            </div>
            <PartFormUnderscore title={movieType?.title || 'Наш Топ'} />
            <SelectMovies
                countriesList={countriesForSelect}
                genresList={genres}
                order={order}
                genreId={genreId}
                countries={countries}
                year={year}
                loading={loading}
                error={error}
            />
            {!viewSkeleton ? (
                <MoviesList
                    movies={films}
                    total={total}
                    page={page}
                    setPage={handlePageChange}
                    pageSize={pageSize}
                />
            ) : (
                <MoviesSkeleton length={20} />
            )}
        </div>
    );
};
export default MoviesListMain;
