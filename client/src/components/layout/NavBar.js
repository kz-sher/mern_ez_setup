import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Responsive, Segment, Container, Menu, Button } from 'semantic-ui-react';
import OnlyIf from 'components/utils/OnlyIf';

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
                    <OnlyIf condition={isAuthenticated}>
                        <Responsive as={Menu.Item} minWidth={Responsive.onlyTablet.minWidth}>
                            <Link to='/dashboard' style={styles.link}>Dashboard</Link>
                        </Responsive>
                    </OnlyIf>
                    <Menu.Item position='right'>
                        <OnlyIf condition={!isAuthenticated}>
                            <Button basic as={Link} to='/login'>
                                Log In
                            </Button>
                            <Button basic as={Link} to='/signup' style={styles.btn}>
                                Sign Up
                            </Button>
                        </OnlyIf>
                        <OnlyIf condition={isAuthenticated}>
                            <Button basic onClick={handleSignOut}>
                                Log Out
                            </Button>
                        </OnlyIf> 
                    </Menu.Item>
                </Menu>
            </Container>
        </Segment>
    )
}

NavBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    handleSidebarOpen: PropTypes.func.isRequired,
    handleSignOut: PropTypes.func.isRequired,
};

export default NavBar;
