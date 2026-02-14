import {
    GlobalOutlined,
    LeftOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Image, Row, Skeleton, Typography } from 'antd';
import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchFilm,
    fetchSequelsAndPrequels,
    fetchStaff,
} from '../../../store/features/currentQuerySlice';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../../store/store';
import { Error } from '../ui/Error';
import { MoviesSkeleton } from '../ui/MoviesSkeleton';
import { VideoPlayer } from '../ui/VideoPlayer/VideoPlayer';

const { Title, Text } = Typography;
const MovieDetails: FC<{}> = ({}) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { error, film, staff, sequelsAndPrequels } = useSelector(
        (state: RootState) => state.currentQueryReducer,
    );

    useEffect(() => {
        if (!id) return;
        dispatch(fetchFilm({ id }));
        dispatch(fetchSequelsAndPrequels({ id }));
        dispatch(fetchStaff({ id }));
    }, [dispatch, id]);
    if (error) {
        return <Error />;
    }
    return (
        <div>
            <Row gutter={[30, 0]} style={{ marginBottom: 15 }}>
                <Col
                    xs={24}
                    md={6}
                    style={{ minWidth: '225px', marginBottom: 10 }}
                >
                    <div
                        style={{
                            width: '100%',
                            aspectRatio: '2 / 3',
                            backgroundColor: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            borderRadius: '8px',
                        }}
                    >
                        {' '}
                        <img
                            src={film?.posterUrl}
                            alt={film?.nameRu}
                            style={{
                                width: '100%',
                                objectFit: 'cover',
                                borderRadius: 8,
                            }}
                        />
                    </div>
                    <Button.Group style={{ marginTop: 10 }} size="small">
                        <Button
                            target="_blank"
                            href={film?.webUrl}
                            iconPosition="end"
                            icon={<GlobalOutlined />}
                            style={{ borderColor: '#1677ff' }}
                        >
                            Кинопоиск
                        </Button>{' '}
                        <Button
                            iconPosition="end"
                            icon={<VideoCameraOutlined />}
                            target="_blank"
                            href={`https://www.imdb.com/title/${film?.imdbId}`}
                            style={{ borderColor: '#1677ff' }}
                        >
                            IMDB
                        </Button>
                    </Button.Group>
                </Col>
                <Col xs={24} md={12} flex={'auto'}>
                    <Row
                        gutter={[10, 10]}
                        style={{ marginBottom: 20 }}
                        align={'middle'}
                    >
                        <Col>
                            <Button
                                icon={<LeftOutlined />}
                                style={{
                                    color: 'white',
                                    borderColor: 'white',
                                    padding: '0 16px',
                                    height: '32px',
                                    width: 'auto',
                                    marginInlineEnd: '10px',
                                }}
                                type="default"
                                ghost
                                onClick={() => navigate(-1)}
                            >
                                Назад
                            </Button>
                        </Col>
                        <Col flex={'auto'}>
                            <Title
                                style={{
                                    margin: '0px',
                                    fontSize: 'clamp(20px, 4vw, 32px)',
                                }}
                                level={2}
                            >
                                {film?.nameRu || 'Название'}
                            </Title>
                        </Col>
                    </Row>{' '}
                    <Row style={{ marginBottom: 7 }}>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(14px, 2.2vw, 18px)',
                                }}
                            >
                                Год:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {' '}
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                {' '}
                                {film?.year || <Text>Нет данных</Text>}
                            </Title>
                        </Col>
                    </Row>{' '}
                    <Row style={{ marginBottom: 7 }}>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 0,
                                    fontSize: 'clamp(14px, 2.2vw, 18px)',
                                }}
                            >
                                Страна:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {film?.countries?.length ? (
                                film.countries.map(({ country }) => (
                                    <Text
                                        key={country}
                                        style={{
                                            display: 'block',
                                            lineHeight: 1.5,
                                            fontSize: 'clamp(13px, 2vw, 16px)',
                                        }}
                                    >
                                        {country}
                                    </Text>
                                ))
                            ) : (
                                <Text>Нет данных</Text>
                            )}
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 7 }}>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 0,
                                    fontSize: 'clamp(14px, 2.2vw, 18px)',
                                }}
                            >
                                Жанры:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {film?.genres?.length ? (
                                film?.genres.map(({ genre }) => (
                                    <Text
                                        key={genre}
                                        style={{
                                            display: 'block',
                                            lineHeight: '1.5',
                                            fontSize: 'clamp(13px, 2vw, 16px)',
                                        }}
                                    >
                                        {genre}
                                    </Text>
                                ))
                            ) : (
                                <Text>Нет данных</Text>
                            )}
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 7 }}>
                        <Col xs={12}>
                            <Title style={{ margin: 0 }} level={4}>
                                Режиссеры:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {Array.isArray(staff) ? (
                                staff
                                    ?.filter(
                                        el => el.professionText === 'Режиссеры',
                                    )
                                    .slice(0, 6)
                                    .map(({ nameRu }) => (
                                        <Text
                                            key={nameRu}
                                            style={{
                                                display: 'block',
                                                lineHeight: '1.5',
                                            }}
                                        >
                                            {nameRu}
                                        </Text>
                                    ))
                            ) : (
                                <Text>Нет данных</Text>
                            )}
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 7 }}>
                        <Col xs={12}>
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                Время:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {' '}
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                {' '}
                                {film?.filmLength} мин.
                            </Title>
                        </Col>
                    </Row>{' '}
                    <Row style={{ marginBottom: 7 }}>
                        <Col flex={'auto'}>
                            <Title level={4}>Описание:</Title>
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                {' '}
                                {film?.description || 'Описание отсутствует'}
                            </Title>
                        </Col>
                    </Row>{' '}
                </Col>
                <Col xs={24} md={6}>
                    <Title style={{ margin: 0, marginBottom: 20 }} level={3}>
                        В главных ролях:
                    </Title>
                    {Array.isArray(staff) ? (
                        staff
                            ?.filter(el => el.professionText === 'Актеры')
                            .slice(0, 11)
                            .map(({ nameRu, staffId }) => (
                                <Link
                                    style={{
                                        display: 'block',
                                        lineHeight: '1.5',
                                        marginBottom: 3,
                                        cursor: 'pointer',
                                        fontSize: 'clamp(13px, 2vw, 16px)',
                                    }}
                                    key={staffId}
                                    to={`/actor/${staffId}`}
                                >
                                    {nameRu}
                                </Link>
                            ))
                    ) : (
                        <Text>Нет данных</Text>
                    )}
                </Col>
            </Row>

            <Row
                style={{
                    marginBottom: 20,
                }}
            >
                <Col
                    xs={24}
                    style={{
                        marginBottom: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Title
                        style={{
                            margin: 0,
                            marginBottom: 20,
                            textAlign: 'center',
                        }}
                        level={3}
                    >
                        Смотреть онлайн:
                    </Title>
                    <VideoPlayer filmId={id} />
                </Col>
                <Col xs={24}>
                    <Title
                        style={{
                            margin: 0,
                            textAlign: 'center',
                            marginBottom: 20,
                        }}
                        level={3}
                    >
                        Сиквелы и приквелы:
                    </Title>
                    {sequelsAndPrequels?.length ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                flexWrap: 'wrap',
                                gap: '10px',
                            }}
                        >
                            {sequelsAndPrequels.map(movie => (
                                <Card
                                    key={movie.filmId}
                                    hoverable
                                    style={{ width: 220, borderRadius: '8px' }}
                                    bodyStyle={{ padding: 0 }}
                                >
                                    <Link to={`/movie/${movie.filmId}`}>
                                        <Image
                                            src={movie.posterUrlPreview}
                                            width={'100%'}
                                            height={330}
                                            preview={false}
                                            style={{ objectFit: 'cover' }}
                                            placeholder={
                                                <Skeleton.Image
                                                    active
                                                    style={{
                                                        width: 220,
                                                        height: 330,
                                                        borderRadius: '8px',
                                                    }}
                                                />
                                            }
                                        />
                                        <Card.Meta
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                padding: '10px 0',
                                                fontSize:
                                                    'clamp(14px, 2.5vw, 18px)',
                                            }}
                                            title={movie.nameRu}
                                        />
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <MoviesSkeleton length={1} />
                    )}
                </Col>
            </Row>
        </div>
    );
};
export default MovieDetails;
