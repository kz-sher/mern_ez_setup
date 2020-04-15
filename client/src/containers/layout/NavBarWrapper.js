import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from 'semantic-ui-react';
import MainSideBar from 'containers/layout/MainSideBar';
import MainNavBar from 'containers/layout/MainNavBar';
// import OnlyIf from 'components/utils/OnlyIf';

const styles = {
    pushable: {
        transform: 'none',
        height: 'auto',
        flexGrow: 1,
    },
    pusher: {
        display: 'flex',
        flexDirection: 'column',
    }
}

const NavBarWrapper = ({ children }) => {

    const [sidebarOpened, setSidebarOpened] = useState(false);   
    const handleSidebarClose = () => setSidebarOpened(false);
    const handleSidebarOpen = () => setSidebarOpened(true);

    // isAdmin && location === '/admin'

    return (
        <Sidebar.Pushable style={styles.pushable}>
            <MainSideBar handleSidebarClose={handleSidebarClose} sidebarOpened={sidebarOpened}/>
            <Sidebar.Pusher dimmed={sidebarOpened} style={styles.pusher}>
                <MainNavBar handleSidebarOpen={handleSidebarOpen} />
                { children }
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

NavBarWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default NavBarWrapper;