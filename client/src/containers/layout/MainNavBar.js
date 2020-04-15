import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

MainNavBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    handleSidebarOpen: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signOut })(MainNavBar);
