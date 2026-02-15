export const KinopoiskAPI = {
    path: import.meta.env.VITE_KINOPOISK_API_URL as string,
    key: import.meta.env.VITE_KINOPOISK_API_KEY as string,
    getFilmsTop: async (type: string, page: number) => {
        const res = await fetch(
            KinopoiskAPI.path +
                `v2.2/films/collections?type=${type}&page=${page}`,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': KinopoiskAPI.key,
                },
            },
        );
        return res.json();
    },
    getFilms: async (
        countries: number,
        genreId: number | null,
        order = 'NUM_VOTE',
        type = 'FILM',
        year: string,
        page: number,
        keyword = '',
    ) => {
        const res = await fetch(
            KinopoiskAPI.path +
                `v2.2/films?countries=${countries}&genres=${genreId == null ? '' : genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo=${year}&page=${page}&keyword=${keyword}`,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': KinopoiskAPI.key,
                },
            },
        );
        return res.json();
    },
    searchFilmsQuery: async (page: number, keyword: string) => {
        const res = await fetch(
            KinopoiskAPI.path + `v2.2/films?page=${page}&keyword=${keyword}`,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': KinopoiskAPI.key,
                },
            },
        );
        return res.json();
    },
    getGenreAndCountries: async () => {
        const res = await fetch(KinopoiskAPI.path + `v2.2/films/filters`, {
            method: 'GET',
            headers: {
                'X-API-KEY': KinopoiskAPI.key,
            },
        });
        return res.json();
    },
    getFilm: async (id: string) => {
        const res = await fetch(KinopoiskAPI.path + `v2.2/films/${id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': KinopoiskAPI.key,
            },
        });
        return res.json();
    },
    getSequelsAndPrequels: async (id: string | undefined) => {
        const res = await fetch(
            KinopoiskAPI.path + `v2.1/films/${id}/sequels_and_prequels`,
            {
                method: 'GET',
                headers: {
                    'X-API-KEY': KinopoiskAPI.key,
                },
            },
        );
        const data = await res.json();
        return data.map((el: any) => ({ ...el, kinopoiskId: el.filmId }));
    },
    getStaff: async (id: string | undefined) => {
        const res = await fetch(KinopoiskAPI.path + `v1/staff?filmId=${id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': KinopoiskAPI.key,
            },
        });
        return res.json();
    },
    getStaffId: async (id: string | undefined) => {
        const res = await fetch(KinopoiskAPI.path + `v1/staff/${id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': KinopoiskAPI.key,
            },
        });
        return res.json();
    },
};
