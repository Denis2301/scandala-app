import { ConfigProvider, Divider, Layout, Menu, theme } from 'antd';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MOVIE_LISTS, TOP_LISTS } from '../constants';
import './App.css';
import { Footer } from './pages/ui/Footer';
import { Header } from './pages/ui/Header';
import { Loading } from './pages/ui/Loading';
import { useMediaQuery } from 'react-responsive';

const Movies = lazy(() => import('./pages/Movies/Movies'));
const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'));
const ActorDetails = lazy(() => import('./pages/ActorDetails/ActorDetails'));
const MoviesListTop = lazy(() => import('./pages/MoviesListTop/MoviesListTop'));
const MoviesListMain = lazy(
    () => import('./pages/MoviesListMain/MoviesListMain'),
);

const { Content, Sider } = Layout;

function App() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 1000 });
    const [mode, setMode] = useState(() => {
        const savedThemeLocalStorage = localStorage.getItem('theme');
        return savedThemeLocalStorage
            ? JSON.parse(savedThemeLocalStorage)
            : true;
    });
    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(mode));
    }, [mode]);
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    return (
        <ConfigProvider
            theme={{
                algorithm: mode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            {' '}
            <div className="wrapper">
                <Layout style={{ position: 'relative' }}>
                    <Sider
                        theme={mode ? 'dark' : 'light'}
                        onCollapse={value => setCollapsed(value)}
                        breakpoint="lg"
                        collapsedWidth="0"
                        collapsed={collapsed}
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                    >
                        <div className="demo-logo-vertical" />
                        <Menu
                            theme={mode ? 'dark' : 'light'}
                            mode="inline"
                            selectedKeys={[location.pathname]}
                            items={MOVIE_LISTS}
                        />
                        <Divider />
                        <Menu
                            theme={mode ? 'dark' : 'light'}
                            mode="inline"
                            selectedKeys={[location.pathname]}
                            items={TOP_LISTS}
                        />
                    </Sider>
                    <Layout>
                        <Header
                            setMode={setMode}
                            mode={mode}
                            borderRadiusLG={borderRadiusLG}
                        />
                        <Content
                            onClick={() => {
                                if (isMobile) {
                                    setCollapsed(true);
                                }
                            }}
                            style={{
                                margin: '10px 0 10px 10px',
                            }}
                        >
                            <div
                                style={{
                                    padding: 20,
                                    minHeight: '100vh',
                                    backgroundColor: mode
                                        ? '#001529'
                                        : '#ffffff',
                                    borderRadius: borderRadiusLG,
                                    color: mode ? '#fff' : '#000',
                                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                                    lineHeight: '1.5',
                                    fontWeight: '400',
                                }}
                            >
                                <Suspense fallback={<Loading />}>
                                    <Routes>
                                        <Route path="/" element={<Movies />} />
                                        <Route
                                            path="/movies"
                                            element={<MoviesListMain />}
                                        />
                                        <Route
                                            path="/serials"
                                            element={<MoviesListMain />}
                                        />
                                        <Route
                                            path="/cartoon"
                                            element={<MoviesListMain />}
                                        />
                                        <Route
                                            path="/movie/:id"
                                            element={<MovieDetails />}
                                        />
                                        <Route
                                            path="/actor/:id"
                                            element={<ActorDetails />}
                                        />
                                        <Route
                                            path="/topMovies"
                                            element={<MoviesListTop />}
                                        />
                                        <Route
                                            path="/topSerials"
                                            element={<MoviesListTop />}
                                        />
                                        <Route
                                            path="/vampires"
                                            element={<MoviesListTop />}
                                        />
                                        <Route
                                            path="/comics"
                                            element={<MoviesListTop />}
                                        />
                                        <Route
                                            path="/family"
                                            element={<MoviesListTop />}
                                        />
                                        <Route
                                            path="/romance"
                                            element={<MoviesListTop />}
                                        />
                                        <Route
                                            path="/zombie"
                                            element={<MoviesListTop />}
                                        />
                                        <Route
                                            path="/disasters"
                                            element={<MoviesListTop />}
                                        />
                                    </Routes>
                                </Suspense>
                            </div>
                        </Content>
                        <Footer
                            mode={mode}
                            borderRadiusLG={borderRadiusLG}
                            className={'footer'}
                        />
                    </Layout>
                </Layout>
            </div>
        </ConfigProvider>
    );
}

export default App;
