import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from 'react-router-dom';
import './NavBar.css';
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    }
});

function NavBar() {

    return (
        <div className="root">
            <CssBaseline />
      
            <Drawer
                className="drawer drawerPaper"
                variant="permanent"
                anchor="left"
            >
                <div className="toolbar" />
                <Divider />
                <List>
                    <ListItem button>
                        <Link to="/dictionaries" className="navbar-link">
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText>Dictionaries</ListItemText>
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="/datasets" className="navbar-link">
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText>Datasets</ListItemText>
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}


export default NavBar;