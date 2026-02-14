import { LeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { useCallback, useEffect, useState, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FULL_HEIGHT, TOP_LIST_TITLES } from '../../../constants';
import { fetchFilmsTop } from '../../../store/features/currentQuerySlice';
import type { AppDispatch, RootState } from '../../../store/store';
import { Error } from '../ui/Error';
import { MoviesList } from '../ui/MoviesList';
import { MoviesSkeleton } from '../ui/MoviesSkeleton';
import { PartFormUnderscore } from '../ui/PartUnderscore';

const { Item } = Breadcrumb;

const MoviesListTop: FC<{}> = ({}) => {
    const [page, setPage] = useState(1);
    const [viewSkeleton, setViewSkeleton] = useState(true);
    const handlePageChange = useCallback((page: number) => {
        setPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const location = useLocation();
    const navigate = useNavigate();
    const movieType = TOP_LIST_TITLES.find(m => m.path === location.pathname);
    const dispatch = useDispatch<AppDispatch>();
    const { films, error, total } = useSelector(
        (state: RootState) => state.currentQueryReducer,
    );

	
    const pageSize = 10;
    useEffect(() => {
        setViewSkeleton(true);
        dispatch(
            fetchFilmsTop({
                type: movieType?.value || 'TOP_POPULAR_MOVIES',
                page,
            }),

        ).finally(() => setViewSkeleton(false));
    }, [dispatch, page, movieType]);
	
    useEffect(() => {
        setPage(1);
    }, [location.pathname]);
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
                        fontSize: 'clamp(12px, 2.5vw, 14px)',
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
                        fontSize: 'clamp(12px, 2.5vw, 14px)', 
                        lineHeight: 1.3,
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
export default MoviesListTop;
