import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KinopoiskAPI } from '../../services/kinopoiskAPI';
import type { Film, FilmDetails, SequelPrequel, Staff } from '../../type';

type CurrentQueryState = typeof initialState;

const initialState = {
    countries: 1,
    countriesForSelect: [] as Array<{ id: number; country: string }>,
    genres: [] as Array<{ id: number; genre: string }>,
    genreId: 1,
    order: 'NUM_VOTE',
    type: '' as string | null,
    yearFrom: '',
    year: '',
    yearTo: '',
    page: 1,
    total: 0,
    films: [] as Array<Film>,
    sequelsAndPrequels: [] as Array<SequelPrequel> | null,
    film: {} as FilmDetails | null,
    staff: [] as Array<Staff>,
    loading: false,
    error: null as string | null,
};
export const fetchFilm = createAsyncThunk(
    'currentQuery/fetchFilm',
    async (params: { id: string }, { rejectWithValue }) => {
        try {
            const data = await KinopoiskAPI.getFilm(params.id);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);
export const fetchSequelsAndPrequels = createAsyncThunk(
    'currentQuery/fetchSequelsAndPrequels',
    async (params: { id: string }, { rejectWithValue }) => {
        try {
            const data = await KinopoiskAPI.getSequelsAndPrequels(params.id);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);
export const fetchStaff = createAsyncThunk(
    'currentQuery/fetchStaff',
    async (params: { id: string }, { rejectWithValue }) => {
        try {
            const data = await await KinopoiskAPI.getStaff(params.id);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);
export const fetchFilmsTop = createAsyncThunk(
    'currentQuery/fetchFilmsTop',
    async (params: { type: string; page: number }, { rejectWithValue }) => {
        try {
            const data = await KinopoiskAPI.getFilmsTop(
                params.type,
                params.page,
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);
export const fetchGenreAndCountries = createAsyncThunk(
    'currentQuery/fetchGenreAndCountries',
    async (_, { rejectWithValue }) => {
        const excludeGenres = [
            '',
            'новости',
            'для взрослых',
            'церемония',
            'реальное ТВ',
            'ток-шоу',
        ];
        try {
            const data = await KinopoiskAPI.getGenreAndCountries();
            return {
                ...data,
                genres: data.genres.filter(
                    (item: { genre: string | any }) =>
                        !excludeGenres.includes(item.genre),
                ),
                countries: data.countries.slice(0, 100),
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);
export const fetchFilms = createAsyncThunk(
    'currentQuery/fetchFilms',
    async (
        params: {
            countries: number;
            genreId: number;
            order: string;
            type: string;
            year: string;
            page: number;
            keyword: string;
        },
        { rejectWithValue },
    ) => {
        try {
            const data = await KinopoiskAPI.getFilms(
                params.countries,
                params.genreId,
                params.order,
                params.type,
                params.year,
                params.page,
                params.keyword,
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);

const currentQuerySlice = createSlice({
    name: 'currentQuery',
    initialState,
    reducers: {
        selectQuery: (
            state,
            action: { payload: Partial<CurrentQueryState> },
        ) => ({
            ...state,
            ...action.payload,
        }),
        resetQuery: () => ({
            ...initialState,
        }),
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilm.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilm.fulfilled, (state, action) => {
                state.loading = false;
                state.film = action.payload;
            })
            .addCase(fetchFilm.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Error loading';
            })

            .addCase(fetchSequelsAndPrequels.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSequelsAndPrequels.fulfilled, (state, action) => {
                state.loading = false;
                state.sequelsAndPrequels = action.payload;
            })
            .addCase(fetchSequelsAndPrequels.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Error loading';
            })

            .addCase(fetchStaff.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.loading = false;
                state.staff = action.payload;
            })
            .addCase(fetchStaff.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Error loading';
            })

            .addCase(fetchFilmsTop.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilmsTop.fulfilled, (state, action) => {
                state.loading = false;
                state.total = action.payload.total;
                state.films = [...(action.payload.items || [])];
            })
            .addCase(fetchFilmsTop.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Error loading';
            })

            .addCase(fetchFilms.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.loading = false;
                state.total = action.payload.total;
                state.films = [...(action.payload.items || [])];
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Error loading';
            })

            .addCase(fetchGenreAndCountries.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenreAndCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload.genres;
                state.countriesForSelect = action.payload.countries;
            })
            .addCase(fetchGenreAndCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Error loading';
            });
    },
});
export const { selectQuery, resetQuery } = currentQuerySlice.actions;
export default currentQuerySlice.reducer;
