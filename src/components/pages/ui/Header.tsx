import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Layout, Switch } from 'antd';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.jpg';
import { Search } from './Search';

export const Header: FC<{
    borderRadiusLG: number;
    mode: boolean;
    setMode: (value: boolean) => void;
}> = ({ borderRadiusLG, setMode, mode }) => {
    return (
        <Layout.Header
            style={{
                marginInlineStart: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: mode ? '#001529' : '#ffffff',
                color: mode ? '#fff' : '#000',
                alignItems: 'center',
                padding: 10,
                borderRadius: borderRadiusLG,
                lineHeight: 'normal',
            }}
        >
            <Link to={'/'}>
                <img
                    src={logo}
                    style={{
                        width: '60px',
                        backgroundColor: '#0d0d0d',
                        marginInline: '10px',
                        borderRadius: '50%',
                    }}
                />
            </Link>{' '}
            <Search />
            <Switch
                checked={mode}
                onChange={checked => setMode(checked)}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
                style={{ marginInline: 10 }}
            />
        </Layout.Header>
    );
};
