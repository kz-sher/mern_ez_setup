import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from 'semantic-ui-react';
import MainSideBar from 'containers/layout/MainSideBar';
import MainNavBar from 'containers/layout/MainNavBar';

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

const WithNavBar = (OriginalComponent) => {

    class OriginalComponentWithNavBar extends Component{

        state = {
            sidebarOpened: false,
        }
        
        handleSidebarClose = () => this.setState({ sidebarOpened: false });
        handleSidebarOpen = () => this.setState({ sidebarOpened: true });

        render(){
            const { sidebarOpened } = this.state;
            return (
                <Sidebar.Pushable style={styles.pushable}>
                    <MainSideBar handleSidebarClose={this.handleSidebarClose} sidebarOpened={sidebarOpened}/>
                    <Sidebar.Pusher dimmed={sidebarOpened} style={styles.pusher}>
                        <MainNavBar handleSidebarOpen={this.handleSidebarOpen} />
                        <OriginalComponent {...this.props} />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            )
        }
    }
    return OriginalComponentWithNavBar;
}

WithNavBar.propTypes = {
    OriginalComponent: PropTypes.element.isRequired,
};

export default WithNavBar;
