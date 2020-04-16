import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from 'actions/auth.action';
import SideBar from 'components/layout/SideBar';

const MainSideBar = ({ isAuthenticated, sidebarOpen, handleSidebarClose, signOut }) => {
    return ( 
        <SideBar 
            isAuthenticated={isAuthenticated} 
            handleSidebarClose={handleSidebarClose}
            sidebarOpen={sidebarOpen} 
            handleSignOut={signOut} 
            // role={'User'}
        />
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

MainSideBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    handleSidebarClose: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signOut })(MainSideBar);
