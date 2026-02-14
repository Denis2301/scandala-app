import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilms } from '../store/features/currentQuerySlice';
import type { AppDispatch, RootState } from '../store/store';

export const useMovieQuery = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [responseFilm, setResponseFilm] = useState([]);
    const [responseSerials, setResponseSerials] = useState([]);
    const [responseCartoons, setResponseCartoons] = useState([]);

    const {
        page,
        countries,
        genreId,
        order,
        year,
        loading,
        error,
        total,
    } = useSelector((state: RootState) => state.currentQueryReducer);
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [filmsGenre1Res, tvSeriesRes, filmsGenre18Res] =
                    await Promise.all([
                        dispatch(
                            fetchFilms({
                                type: 'FILM',
                                page,
                                countries,
                                genreId: 1,
                                order,
                                year,
                                keyword: '',
                            }),
                        ).unwrap(),
                        dispatch(
                            fetchFilms({
                                type: 'TV_SERIES',
                                page,
                                countries,
                                genreId: 1,
                                order,
                                year,
                                keyword: '',
                            }),
                        ).unwrap(),
                        dispatch(
                            fetchFilms({
                                type: 'FILM',
                                page,
                                countries,
                                genreId: 18,
                                order,
                                year,
                                keyword: '',
                            }),
                        ).unwrap(),
                    ]);
                setResponseFilm(filmsGenre1Res.items || []);
                setResponseSerials(tvSeriesRes.items || []);
                setResponseCartoons(filmsGenre18Res.items || []);
            } catch (err) {
                console.error('Ошибка при загрузке фильмов:', err);
            }
        };
        fetchAll();
    }, [dispatch, page, countries, genreId, order, year]);
    return {
        total,
        order,
        countries,
        loading,
        error,
        genreId,
        responseFilm,
        responseSerials,
        responseCartoons,
    };
};
