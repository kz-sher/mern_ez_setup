import React from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions/auth.action';
import NavBar from 'components/layout/NavBar';

const MainNavBar = ({ isAuthenticated, handleSidebarOpen, signOut }) => {
    return ( 
        <NavBar 
            isAuthenticated={isAuthenticated} 
            handleSidebarOpen={handleSidebarOpen} 
            handleSignOut={signOut} 
            // role={'User'}
        />
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signOut })(MainNavBar);
