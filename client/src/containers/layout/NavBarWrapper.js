import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Sidebar } from 'semantic-ui-react';
import MainSideBar from 'containers/layout/MainSideBar';
import MainNavBar from 'containers/layout/MainNavBar';
import { openSidebar, closeSidebar } from 'actions/view.action';

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

const NavBarWrapper = ({ children, sidebarOpen, openSidebar, closeSidebar }) => {

    // isAdmin && location === '/admin'

    return (
        <Sidebar.Pushable style={styles.pushable}>
            <MainSideBar handleSidebarClose={closeSidebar} sidebarOpen={sidebarOpen}/>
            <Sidebar.Pusher dimmed={sidebarOpen} style={styles.pusher}>
                <MainNavBar handleSidebarOpen={openSidebar} />
                { children }
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

const mapStateToProps = state => ({
    sidebarOpen: state.view.sidebarOpen,
})

NavBarWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    sidebarOpen: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { 
    openSidebar,
    closeSidebar
})(NavBarWrapper);