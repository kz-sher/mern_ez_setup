import React from 'react'
import { Sidebar, Menu } from 'semantic-ui-react';

const styles = {
    sidebar: {
        position: 'fixed',
    }
}

const SideNavBar = ({ handleSidebarClose, sidebarOpened }) => {
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
            <Menu.Item as='a' active>Home</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>
    )
}

export default SideNavBar;
