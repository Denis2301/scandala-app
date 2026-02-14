export type Film = {
    genres: Array<{ id: number; genre: string }>;
    kinopoiskId: number;
    nameRu: string;
    nameEn?: string;
    year: number;
    posterUrl: string;
    ratingKinopoisk?: number;
    genreId: number | null;
    countries: number[];
    type: string;
};
export type Actor = {
    personId: number;
    webUrl: string;
    nameRu: string;
    nameEn: string;
    sex: 'MALE' | 'FEMALE';
    posterUrl: string;
    growth: string;
    birthday: string;
    death: string | null;
    age: number;
    birthplace: string;
    deathplace: string | null;
    hasAwards: number;
    profession: string;
    facts: string[];
    spouses: {
        personId: number;
        name: string;
        divorced: boolean;
        divorcedReason: string;
        sex: 'MALE' | 'FEMALE';
        children: number;
        webUrl: string;
        relation: string;
    }[];
    films: {
        filmId: number;
        nameRu: string;
        nameEn: string;
        rating: string;
        general: boolean;
        description: string;
        professionKey: string;
    }[];
};

export type Staff = {
    staffId: number;
    nameRu: string;
    nameEn: string;
    description?: string;
    posterUrl: string;
    professionText: string;
    professionKey: string;
};
export type FilmDetails = {
    kinopoiskId: number;
    description: string;
    nameRu: string;
    nameEn?: string;
    nameOriginal?: string;
    posterUrl: string;
    posterUrlPreview: string;
    year: number;
    imdbId: string;
    genres: Array<{ genre: string }>;
    countries: Array<{ country: string }>;
    ratingKinopoisk?: number;
    webUrl: string;
    filmLength: number;
};
export type SequelPrequel = {
    filmId: number;
    nameRu: string;
    nameEn: string;
    nameOriginal: string;
    posterUrl: string;
    posterUrlPreview: string;
    relationType: string;
};
