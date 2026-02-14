import { Card } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { type FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { FULL_HEIGHT } from '../../../constants';
import { useMovieQuery } from '../../../hook/useMovieQuery';
import { Error } from '../ui/Error';
import { MoviesSkeleton } from '../ui/MoviesSkeleton';
import { PartFormUnderscore } from '../ui/PartUnderscore';
import objStyle from './Movies.module.css';
import type { Film } from '../../../type';

const SelializedDataFormCarousel: FC<{ films: Film[] }> = ({ films }) => {
    return (
        <Slider
            autoplay={true}
            slidesToScroll={2}
            slidesToShow={5}
            arrows={true}
            infinite={true}
            responsive={[
                {
                    breakpoint: 1770,
                    settings: { slidesToShow: 4 },
                },
                {
                    breakpoint: 1470,
                    settings: { slidesToShow: 3 },
                },
                {
                    breakpoint: 1170,
                    settings: { slidesToShow: 2 },
                },
                {
                    breakpoint: 660,
                    settings: { slidesToShow: 1 },
                },
            ]}
        >
            {films.map(row => (
                <div key={row.kinopoiskId}>
                    <Card
                        hoverable
                        style={{
                            background: 'transparent',
                            border: 'none',
                            marginInline: '5px',
                            maxWidth: '300px',
                            margin: '0 auto',
                            borderRadius: 8,
                        }}
                        cover={
                            row.posterUrl ? (
                                <Link to={`/movie/${row.kinopoiskId}`}>
                                    <img
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                        }}
                                        className={objStyle.img}
                                        alt={row.nameRu}
                                        src={row.posterUrl}
                                    />
                                </Link>
                            ) : (
                                <MoviesSkeleton length={0} />
                            )
                        }
                    />
                </div>
            ))}
        </Slider>
    );
};

const Movies: FC<{}> = ({}) => {
    const { responseFilm, responseSerials, responseCartoons, loading, error } =
        useMovieQuery();
    const isMobile = useMediaQuery({ maxWidth: 660 });
    const isTablet = useMediaQuery({ maxWidth: 1170 });
    const isDesktop = useMediaQuery({ maxWidth: 1470 });
    const isDesktopXL = useMediaQuery({ maxWidth: 1770 });

    const slidesToShow = isMobile
        ? 1
        : isTablet
          ? 2
          : isDesktop
            ? 3
            : isDesktopXL
              ? 4
              : 5;

    let carouselItems = [
        {
            title: 'Фильмы',
            url: '/topMovies',
            data: responseFilm?.length ? (
                <SelializedDataFormCarousel films={responseFilm} />
            ) : (
                <MoviesSkeleton length={slidesToShow} />
            ),
        },
        {
            title: 'Сериалы',
            url: '/topSerials',
            data: responseSerials?.length ? (
                <SelializedDataFormCarousel films={responseSerials} />
            ) : (
                <MoviesSkeleton length={slidesToShow} />
            ),
        },
        {
            title: 'Мультфильмы',
            url: '/cartoon',
            data: responseCartoons?.length ? (
                <SelializedDataFormCarousel films={responseCartoons} />
            ) : (
                <MoviesSkeleton length={slidesToShow} />
            ),
        },
    ];
    if (error) {
        return <Error />;
    }

    return (
        <div style={FULL_HEIGHT}>
            {carouselItems.map(carousel => {
                return (
                    <div key={carousel.title}>
                        <Link to={carousel.url}>
                            <PartFormUnderscore
                                title={carousel.title || 'Наш Топ'}
                            />
                        </Link>
                        {carousel.data}
                    </div>
                );
            })}
        </div>
    );
};
export default Movies;
