import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';



class DictionaryOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dictionaries: []
        };
    }

    componentWillMount =  () => {
        var data =  JSON.parse(localStorage.getItem("dictionaries"))
        this.setState({dictionaries : data});
    }

    removeDictionary = (dictionaryIndex) =>{
        let dictionariesCopy = this.state.dictionaries;

        dictionariesCopy.splice(dictionaryIndex, 1);

        this.setState(prevState => ({
            dictionaries: [...dictionariesCopy]
        }));

        localStorage.setItem("dictionaries", JSON.stringify(dictionariesCopy));
    }

    editDictionary = (dictionaryIndex) =>{
        this.props.history.push({
            pathname: '/dictionaries/create',
            search: '?index=' + dictionaryIndex,
            state: { index: dictionaryIndex }
        })
    }

    render() {

        return (
            <div className="root">
                <AppBar className="page-navbar" color="default">
                    <Toolbar alignContent="space-between">
                        <Typography variant="h6" color="inherit">
                            Dictionaries
                        </Typography>
                        <Button color="primary" component={Link} to="dictionaries/create">Create dictionary</Button>
                    </Toolbar>
                </AppBar>
                <Paper className="table-parent">
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.dictionaries.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="Delete"  color="primary" onClick={() => this.removeDictionary(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="Delete" color="primary" onClick={() => this.editDictionary(index)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

        );
    }
}
export default withSnackbar(DictionaryOverview);