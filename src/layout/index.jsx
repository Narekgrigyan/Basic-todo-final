import {Button, Layout} from "antd";
import {useMemo} from "react";
import {useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useSignOut} from 'react-firebase-hooks/auth'
import {auth} from "../firebase.config";

const {Header, Content, Footer} = Layout
const MainLayout = () => {
    const location = useLocation()
    const [signOut, loading, error] = useSignOut(auth);

    const buttonData = useMemo(() => {
        let data = null;
        if (location.pathname === '/sign-up') {
            data = {
                text: 'Sign In',
                path: '/sign-in'
            }
        } else if (location.pathname === '/sign-in') {
            data = {
                text: 'Sign Up',
                path: '/sign-up'
            }
        } else {
            data = {
                text: 'Logout',
                path: '/sign-in'
            }
        }
        return data
    }, [location.pathname])
    return (
        <Layout>
            <Header
                style={{
                    color: "#fff",
                }}
            >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <NavLink to={'/'}>
                        <h2>LOGO</h2>
                    </NavLink>
                    <NavLink onClick={() => {
                        if (buttonData.text === 'Logout') {
                            signOut()
                        }
                    }} to={buttonData.path}>
                        <Button type="link">
                            {buttonData.text}
                        </Button>
                    </NavLink>

                </div>
            </Header>
            <Content style={{display: 'flex', justifyContent: 'center', height: 'calc(100vh - 130px)'}}>
                <Outlet/>
            </Content>
            <Footer style={{
                color: "#fff",
                background: '#001529'
            }}
            >
                <div>
                    <NavLink to={'/'}>
                        <h2>FOOTER</h2>
                    </NavLink>


                </div>
            </Footer>
        </Layout>
    );
};

export default MainLayout
