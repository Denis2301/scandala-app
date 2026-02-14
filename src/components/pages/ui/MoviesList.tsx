import type { FC } from 'react';
import { MovieCard } from './MovieCard/MovieCard';
import { Paginator } from './Pagination';
import type { Film } from '../../../type';

export const MoviesList: FC<{
    movies: Film[];
    total: number;
    page: number;
    setPage: (value: number) => void;
    pageSize: number;
}> = ({ movies, total, page, setPage, pageSize }) => {
    return (
        <div
            style={{
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '10px',
                }}
            >
                {movies.map(movie => (
                    <MovieCard key={movie.kinopoiskId} movie={movie} />
                ))}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '24px',
                }}
            >
                <Paginator
                    pageSize={pageSize}
                    currentPage={page}
                    onChange={setPage}
                    totalCount={total}
                />
            </div>
        </div>
    );
};
