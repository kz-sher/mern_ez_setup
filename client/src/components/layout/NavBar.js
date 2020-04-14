import React from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Segment, Container, Menu, Button } from 'semantic-ui-react';

const styles = {
    sidebar:{
        marginLeft: '0.5em'
    },
    link: {
        color: '#404040'  
    },
    btn: {
        marginLeft: '0.5em'
    }
}

const NavBar = ({ isAuthenticated, handleSidebarOpen, handleSignOut }) => {
    return (
        <Segment vertical>
            <Container>
                <Menu secondary>
                    <Responsive 
                        {...Responsive.onlyMobile} 
                        as={Menu.Item} 
                        onClick={handleSidebarOpen}
                        icon='sidebar'
                        style={styles.sidebar}
                    />
                    <Responsive as={Menu.Item} minWidth={Responsive.onlyTablet.minWidth}>
                        <Link to='/' style={styles.link}>Home</Link>
                    </Responsive>
                    { isAuthenticated &&
                        <Responsive as={Menu.Item} minWidth={Responsive.onlyTablet.minWidth}>
                            <Link to='/dashboard' style={styles.link}>Dashboard</Link>
                        </Responsive>
                    }
                    <Menu.Item position='right'>
                        { !isAuthenticated ?
                        <>
                            <Button basic as={Link} to='/login'>
                                Log In
                            </Button>
                            <Button basic as={Link} to='/signup' style={styles.btn}>
                                Sign Up
                            </Button>
                        </> :
                            <Button basic onClick={handleSignOut}>
                                Log Out
                            </Button>
                        }
                    </Menu.Item>
                </Menu>
            </Container>
        </Segment>
    )
}

export default NavBar;
