import { AutoComplete, Input, Spin, Tag } from 'antd';
import { useEffect, type FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
    searchFilms,
    setSearchQuery,
} from '../../../store/features/searchQuerySlice';
import type { AppDispatch, RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

enum MovieType {
    FILM = 'FILM',
    TV_SERIES = 'TV_SERIES',
    TV_SHOW = 'TV_SHOW',
    MINI_SERIES = 'MINI_SERIES',
}
const movieTypes: Record<MovieType, { title: string; color: string }> = {
    FILM: { title: 'Фильм', color: '#E53935' },
    TV_SERIES: { title: 'Сериал', color: '#1E88E5' },
    TV_SHOW: { title: 'ТВ-Шоу', color: '#FB8C00' },
    MINI_SERIES: { title: 'Мини-сериал', color: '#43A047' },
};

export const Search: FC<{}> = ({}) => {
    const isMobile = useMediaQuery({ maxWidth: 800 });
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [inputValue, setInputValue] = useState('');

    const { films, keyword, page, isLoading } = useSelector(
        (state: RootState) => state.searchQueryReducer,
    );

    useEffect(() => {
        dispatch(setSearchQuery({ keyword: inputValue }));
    }, [inputValue]);

    useEffect(() => {
        if (!keyword || keyword.length < 2) return;
        const timer = setTimeout(() => {
            dispatch(
                searchFilms({
                    page,
                    keyword,
                }),
            );
        }, 400);
        return () => clearTimeout(timer);
    }, [dispatch, keyword, page]);

    return (
        <div style={{ maxWidth: 300 }}>
            <AutoComplete
                notFoundContent={
                    isLoading && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                padding: 8,
                            }}
                        >
                            <Spin size="small" />
                        </div>
                    )
                }
                value={inputValue}
                style={
                    isMobile
                        ? { width: 200 }
                        : {
                              width: 250,
                          }
                }
                onSearch={value => {
                    setInputValue(value);
                }}
                onSelect={(value, options) => {
                    setInputValue(value);
                    navigate(`/movie/${options.filmId}`);
                }}
                options={
                    films
                        ? films.map(film => ({
                              value: `${film.nameRu || film.nameEn} - ${movieTypes[film.type as MovieType]?.title} - ${film.year}`,
                              label: (
                                  <span
                                      title={`${film.nameRu || film.nameEn} - ${movieTypes[film.type as MovieType]?.title} - ${film.year}`}
                                      style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: 4,
                                          width: '100%',
                                      }}
                                  >
                                      {film.nameRu || film.nameEn} -{' '}
                                      <span
                                          style={{
                                              color: movieTypes[
                                                  film.type as MovieType
                                              ]?.color,
                                          }}
                                      >
                                          {
                                              movieTypes[film.type as MovieType]
                                                  ?.title
                                          }
                                      </span>{' '}
                                      - {film.year}
                                  </span>
                              ),
                              filmId: film.kinopoiskId,
                          }))
                        : []
                }
            >
                <Input
                    onPressEnter={() => {
                        if (films?.length > 0)
                            navigate(`/movie/${films[0].kinopoiskId}`);
                    }}
                    onClear={() => dispatch(setSearchQuery({ keyword: '' }))}
                    placeholder="Поиск"
                    allowClear
                />
            </AutoComplete>
        </div>
    );
};
