import { Card, Rate, Tag } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Film } from '../../../../type';
import objStyle from './MovieCard.module.css';

export const MovieCard: FC<{ movie: Film }> = ({ movie }) => {
    return (
        <Card
            hoverable
            style={{ borderRadius: 8 }}
            cover={
                <Link
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    to={`/movie/${movie.kinopoiskId}`}
                >
                    <img
                        style={{ borderRadius: 8 }}
                        className={objStyle.img}
                        alt={movie.nameRu}
                        src={movie.posterUrl}
                    />
                </Link>
            }
        >
            <Card.Meta
                title={
                    <Link to={`/movie/${movie.kinopoiskId}`}>
                        {movie.nameRu
                            ? `${movie.nameRu} ${movie.year}`
                            : `${movie.nameEn} ${movie.year}`}
                    </Link>
                }
                description={
                    <div>
                        {movie.genres?.map((g: any) => {
                            return (
                                <Tag
                                    key={g.genre}
                                    style={{ margin: '0 4px 4px 0' }}
                                    color={'blue'}
                                >
                                    {g.genre}
                                </Tag>
                            );
                        })}
                        <div
                            style={{
                                fontWeight: 600,
                                paddingTop: '10px',
                            }}
                        >
                            <Rate
                                style={{
                                    color: '#fadb14',
                                    fontSize: 18,
                                    cursor: 'pointer',
                                }}
                                disabled
                                allowHalf
                                defaultValue={
                                    movie.ratingKinopoisk
                                        ? movie.ratingKinopoisk / 2
                                        : 0
                                }
                            />
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            {' '}
                            Оценка: {`${movie.ratingKinopoisk || 0} из 10`}
                        </div>
                    </div>
                }
            />
        </Card>
    );
};
