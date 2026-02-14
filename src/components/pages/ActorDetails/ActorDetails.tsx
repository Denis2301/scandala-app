import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Row, Typography } from 'antd';
import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { aboutActor } from '../../../store/features/searchQuerySlice';
import type { AppDispatch, RootState } from '../../../store/store';
import { Error } from '../ui/Error';

const { Title, Text } = Typography;
const ActorDetails: FC<{}> = ({}) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { actor, error } = useSelector(
        (state: RootState) => state.searchQueryReducer,
    );

    useEffect(() => {
        dispatch(aboutActor({ id }));
    }, [id, dispatch]);

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
                            src={actor?.posterUrl}
                            alt={actor?.nameRu}
                            style={{
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </Col>
                <Col xs={24} md={18}>
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
                            >
                                {actor?.nameRu || 'Название'}
                            </Title>{' '}
                            <Title
                                style={{
                                    margin: '0px',
                                    fontSize: 'clamp(18px, 3.2vw, 28px)',
                                }}
                            >
                                {actor?.nameEn || 'Название'}
                            </Title>
                        </Col>
                    </Row>
                    <Title
                        style={{
                            marginBottom: 7,
                            fontSize: 'clamp(16px, 2.2vw, 19px)',
                        }}
                    >
                        Об актёре
                    </Title>
                    <Row gutter={[10, 10]} align={'middle'}>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                }}
                            >
                                Карьера:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {' '}
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                {actor?.profession || <Text>Нет данных</Text>}
                            </Title>
                        </Col>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                }}
                            >
                                Рост:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {' '}
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                {actor?.growth || <Text>Нет данных</Text>}
                            </Title>
                        </Col>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                }}
                            >
                                Дата рождения:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                {actor?.birthday && actor?.age ? (
                                    `${actor.birthday} (${actor.age} лет)`
                                ) : (
                                    <Text>Нет данных</Text>
                                )}
                            </Title>
                        </Col>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                }}
                            >
                                Всего фильмов:
                            </Title>
                        </Col>
                        <Col xs={12}>
                            {' '}
                            <Title style={{ margin: 'auto 0' }} level={4}>
                                {actor?.films?.length || (
                                    <Text>Нет данных</Text>
                                )}
                            </Title>
                        </Col>
                        <Col xs={12}>
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                }}
                            >
                                Факты:
                            </Title>
                        </Col>
                        <Col xs={24}>
                            {' '}
                            {actor?.facts?.map(
                                (fact: string, index: number) => (
                                    <Title
                                        key={index}
                                        style={{
                                            margin: 'auto 0',
                                        }}
                                        level={5}
                                    >
                                        {index + 1}. {fact}
                                    </Title>
                                ),
                            ) || <Text>Нет данных</Text>}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Title
                style={{
                    margin: '0px',
                    marginBottom: '7px',
                    fontSize: 'clamp(15px, 3vw, 25px)',
                }}
            >
                Фильмы
            </Title>
            {actor?.films?.length ? (
                actor?.films
                    .filter(
                        (item, index, arr) =>
                            index ==
                            arr.findIndex(el => el.filmId == item.filmId),
                    )
                    ?.map((film, index) => (
                        <Flex
                            style={{ marginBottom: 3 }}
                            justify="space-between"
                            key={film?.filmId}
                        >
                            {' '}
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                    flexShrink: 0,
                                    marginInlineEnd: 7,
                                }}
                            >
                                {index + 1}
                            </Title>
                            <Link
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                    cursor: 'pointer',
                                }}
                                to={`/movie/${film?.filmId}`}
                            >
                                {film?.nameRu ? film?.nameRu : film?.nameEn}
                            </Link>
                            <Title
                                style={{
                                    margin: 'auto 0',
                                    fontSize: 'clamp(15px, 2.1vw, 17px)',
                                    flexShrink: 0,
                                    marginInlineStart: 7,
                                }}
                            >
                                {film?.rating || '-'}
                            </Title>
                        </Flex>
                    ))
            ) : (
                <Text>Нет данных</Text>
            )}
        </div>
    );
};
export default ActorDetails;
