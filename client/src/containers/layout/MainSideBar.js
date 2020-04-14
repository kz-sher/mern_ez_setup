import React from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions/auth.action';
import SideBar from 'components/layout/SideBar';

const MainSideBar = ({ isAuthenticated, sidebarOpened, handleSidebarClose, signOut }) => {
    return ( 
        <SideBar 
            isAuthenticated={isAuthenticated} 
            handleSidebarClose={handleSidebarClose}
            sidebarOpened={sidebarOpened} 
            handleSignOut={signOut} 
            // role={'User'}
        />
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signOut })(MainSideBar);
