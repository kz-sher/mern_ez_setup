import React, { Component } from 'react';
import { Sidebar } from 'semantic-ui-react';
import SideNavBar from '../layout/SideNavBar';
import MainNavBar from '../layout/MainNavBar';

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
                    <SideNavBar handleSidebarClose={this.handleSidebarClose} sidebarOpened={sidebarOpened}/>
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

export default WithNavBar;
