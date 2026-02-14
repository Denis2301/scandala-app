import {
    AppstoreOutlined,
    FireOutlined,
    GithubOutlined,
    HeartOutlined,
    SmileOutlined,
    StarOutlined,
    TeamOutlined,
    UserOutlined,
    WarningOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'styled-components';

export const iconComponents = {
    AppstoreOutlined,
    FireOutlined,
    GithubOutlined,
    HeartOutlined,
    SmileOutlined,
    StarOutlined,
    TeamOutlined,
    UserOutlined,
    WarningOutlined,
    VideoCameraOutlined,
};
type MenuItem = Required<MenuProps>['items'][number];
export const MOVIE_LIST_TITLE = [
    {
        icon: VideoCameraOutlined,
        title: 'Фильмы',
        path: '/movies',
        value: 'FILM',
    },
    {
        icon: VideoCameraOutlined,
        title: 'Сериалы',
        path: '/serials',
        value: 'TV_SERIES',
    },
    {
        icon: SmileOutlined,
        title: 'Мультфильмы',
        path: '/cartoon',
        value: 'FILM',
    },
];
export const MOVIE_LISTS: MenuItem[] = MOVIE_LIST_TITLE.map(item => {
    return {
        key: item.path,
        icon: React.createElement(item.icon),
        label: (
            <Link key={item.title} to={item.path}>
                {item.title}
            </Link>
        ),
    } as MenuItem;
});

export const TOP_LIST_TITLES = [
    {
        icon: StarOutlined,
        title: 'Топ 100 фильмов',
        path: '/topMovies',
        value: 'TOP_POPULAR_MOVIES',
    },
    {
        icon: FireOutlined,
        title: 'Топ сериалы',
        path: '/topSerials',
        value: 'POPULAR_SERIES',
    },
    {
        icon: GithubOutlined,
        title: 'Вампиры',
        path: '/vampires',
        value: 'VAMPIRE_THEME',
    },
    {
        icon: AppstoreOutlined,
        title: 'Комиксы',
        path: '/comics',
        value: 'COMICS_THEME',
    },
    { icon: TeamOutlined, title: 'Семейный', path: '/family', value: 'FAMILY' },
    {
        icon: HeartOutlined,
        title: 'Романтика',
        path: '/romance',
        value: 'LOVE_THEME',
    },
    {
        icon: UserOutlined,
        title: 'Зомби',
        path: '/zombie',
        value: 'ZOMBIE_THEME',
    },
    {
        icon: WarningOutlined,
        title: 'Катастрофы',
        path: '/disasters',
        value: 'CATASTROPHE_THEME',
    },
];

export const TOP_LISTS: MenuItem[] = TOP_LIST_TITLES.map(item => {
    return {
        key: item.path,
        icon: React.createElement(item.icon),
        label: (
            <Link key={item.title} to={item.path}>
                {item.title}
            </Link>
        ),
    } as MenuItem;
});

export const FULL_HEIGHT: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};