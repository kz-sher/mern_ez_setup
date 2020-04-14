import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu } from 'semantic-ui-react';
import OnlyIf from 'components/utils/OnlyIf';

const styles = {
    sidebar: {
        position: 'fixed',
    }
}

const SideNavBar = ({ isAuthenticated, sidebarOpened, handleSidebarClose, handleSignOut }) => {
    return (
        <Sidebar
            as={Menu}
            animation='push'
            inverted
            onHide={handleSidebarClose}
            vertical
            visible={sidebarOpened}
            width='thin'
            style={styles.sidebar}
            >
            <Menu.Item as={Link} to='/'>Home</Menu.Item>
            <OnlyIf condition={!isAuthenticated}>
                <Menu.Item as={Link} to='/login'>Log In</Menu.Item>
                <Menu.Item as={Link} to='/signup'>Sign Up</Menu.Item>
            </OnlyIf>
            <OnlyIf condition={isAuthenticated}>
                <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
                <Menu.Item onClick={handleSignOut}>Log Out</Menu.Item>
            </OnlyIf>
        </Sidebar>
    )
}

export default SideNavBar;
