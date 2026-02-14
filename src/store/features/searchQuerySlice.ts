import type { Actor } from './../../type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { KinopoiskAPI } from '../../services/kinopoiskAPI';
import type { Film } from '../../type';

type SearchQueryState = typeof initialState;

const initialState = {
    films: [] as Array<Film>,
    error: '' as string | null,
    type: '',
    page: 1,
    keyword: '',
    isLoading: false,
    actor: {} as Actor,
};
export const searchFilms = createAsyncThunk(
    'searchQuery/searchFilms',
    async (
        params: {
            page: number;
            keyword: string;
        },
        { rejectWithValue },
    ) => {
        try {
            const data = await KinopoiskAPI.searchFilmsQuery(
                params.page,
                params.keyword,
            );
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);

export const aboutActor = createAsyncThunk(
    'searchQuery/aboutActor',
    async (params: { id: string | undefined }, { rejectWithValue }) => {
        try {
            const data = await KinopoiskAPI.getStaffId(params.id);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    },
);

const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState,
    reducers: {
        setSearchQuery: (
            state,
            action: { payload: Partial<SearchQueryState> },
        ) => ({
            ...state,
            ...action.payload,
        }),
    },
    extraReducers: builder => {
        builder
            .addCase(searchFilms.pending, state => {
                state.isLoading = true;
            })
            .addCase(searchFilms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.films = [...(action.payload.items || [])];
            })
            .addCase(searchFilms.rejected, state => {
                state.isLoading = false;
            })

            .addCase(aboutActor.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(aboutActor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.actor = action.payload;
            })
            .addCase(aboutActor.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка';
            });
    },
});
export const { setSearchQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
