import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { spacing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import './DictionaryCreate.css';

class DictionaryCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dictionaryData: [
                {
                    domain: "test",
                    range: "test2"
                },
                {
                    domain: "test",
                    range: "test2"
                },
                {
                    domain: "test",
                    range: "test2"
                },
                {
                    domain: "test",
                    range: "test2"
                }
            ],
            newDictionaryDomain: "",
            newDictionaryRange: "",
            validationMessage: "",
            highlightedRow: {}
        };
    }

    setNewRowDomain = (e) => {
        this.setState({
            newDictionaryDomain: e.target.value
        })
    }

    setNewRowRange = (e) => {
        this.setState({
            newDictionaryRange: e.target.value
        })
    }


    validateNewRow = (rowForValidation) => {
        return this.state.dictionaryData.some((rowData, rowIndex) =>
           {
              if(rowData.domain === rowForValidation.domain)
              {
                  this.setState({
                      validationMessage: "Row with same domain value already exists, please change this row domain or edit existing one before saving"
                  });

                  this.setState(prevState => ({
                      highlightedRow: {["row" + rowIndex]: true}
                  }));

                  return true;
              }
           });
    }

    createNewRow = (e) => {

        let newDictionary = {
            domain: this.state.newDictionaryDomain,
            range: this.state.newDictionaryRange
        };


       let isValid = this.validateNewRow(newDictionary);


        if(!isValid){
            this.setState(prevState => ({
                dictionaryData: [...prevState.dictionaryData, newDictionary]
            }));
        }
    }

    render() {
        return (
            <div >
                <AppBar className="page-navbar" color="default">
                    <Toolbar alignContent="space-between">
                        <Typography variant="h6" color="inherit">
                            Create dictionary
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="flex">
                    <Paper className="dictionary-rows">
                        <Table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  align="right">Domain</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Range</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.dictionaryData.map((dictionary, index) => (
                                    <TableRow className={(this.state.highlightedRow['row' + index] ? 'errorRow' : "")}>
                                        <TableCell align="right">
                                            {dictionary.domain}
                                        </TableCell>
                                        <TableCell align="center" width="120px">
                                            <CompareArrowsIcon />
                                        </TableCell>
                                        <TableCell>
                                            {dictionary.range}
                                        </TableCell>
                                        <TableCell width="160px" align="center">
                                            <IconButton aria-label="Delete"  color="primary">
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton aria-label="Delete" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
        
                            </TableBody>
                        </Table>
                    </Paper>
                    <Paper className="dictionary-actions">
                        <h1>Create</h1>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6} p="30px">
                                    <TextField
                                        id="outlined-with-placeholder"
                                        label="Domain"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.newDictionaryDomain}
                                        onChange={this.setNewRowDomain}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="outlined-with-placeholder"
                                        label="Range"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.newDictionaryRange}
                                        onChange={this.setNewRowRange}
                                    />
                                </Grid>
                            </Grid>


                            <p>{this.state.validationMessage}</p>

                            <Button variant="contained" color="primary" onClick={this.createNewRow}>
                                Save
                            </Button>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default DictionaryCreate;