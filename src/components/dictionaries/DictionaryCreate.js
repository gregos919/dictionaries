import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


function DictionaryCreate() {

    return (
        <div  className="root">
            <AppBar className="page-navbar" color="default">
                <Toolbar alignContent="space-between">
                    <Typography variant="h6" color="inherit">
                        Create dictionary
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper>

            </Paper>
        </div>

    );
}
export default DictionaryCreate;