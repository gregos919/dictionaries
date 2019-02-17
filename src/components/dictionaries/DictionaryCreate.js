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
            dictionaryName: "",
            dictionaryDescription: "",
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
            isEditModeActive: false,
            highlightedRow: {},
            editedRow: {},
            editedRowDomain: "",
            editedRowRange: "",
            editedRowIndex: ""
        };
    }

    editInputState = (event) => {
        this.setState({ [event.target.id]: event.target.value });
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


                  console.log(this.refs["row" + rowIndex]);


                  return true;
              }
           });
    }

    editExistingRow = () => {
        let dictionaryData =  this.state.dictionaryData;
        let editedDictionary = {domain: this.state.editedRowDomain, range: this.state.editedRowRange};

        let isValid = this.validateNewRow(editedDictionary);

        if(!isValid){

            dictionaryData[this.state.editedRowIndex] = editedDictionary;

            this.setState(prevState => ({
                dictionaryData: dictionaryData
            }));
        }
    }

    createNewRow = () => {

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

    removeRow = (rowIndex) => {

        let dataCopy = this.state.dictionaryData;

        dataCopy.splice(rowIndex, 1);

        this.setState(prevState => ({
            dictionaryData: [...dataCopy]
        }));
    }

    editRow = (dictionary, index) =>{
        this.setState({
            isEditModeActive: true,
            editedRowIndex: index,
            editedRow: {["row" + index]: true},
            editedRowDomain: dictionary.domain,
            editedRowRange: dictionary.range
        });
    }

    cancleEditRow = () => {
        this.setState({
            isEditModeActive: false
        })
    }

    saveDictionary = () => {

        let newDictionary = {
            name: this.state.dictionaryName,
            description: this.state.dictionaryDescription,
            data: this.state.dictionaryData
        };

        let storedDictionaries = JSON.parse(localStorage.getItem("dictionaries"))
            ? JSON.parse(localStorage.getItem("dictionaries"))
            : [];

        storedDictionaries.push(newDictionary);

        localStorage.setItem("dictionaries", JSON.stringify(storedDictionaries));
    }

    render() {
        return (
            <div >
                <AppBar className="page-navbar" color="default">
                    <Toolbar >
                        <Typography variant="h6" color="inherit">
                            Create dictionary
                        </Typography>
                        <Button variant="contained" color="primary" onClick={this.saveDictionary}>
                            Save Dictionary
                        </Button>
                    </Toolbar>
                </AppBar>

                <div className="flex">
                    <Paper className="dictionary-info">
                        <TextField
                            label="Dictionary Name"
                            margin="normal"
                            variant="outlined"
                            id="dictionaryName"
                            value={this.state.dictionaryName}
                            onChange={this.editInputState}
                        />
                        <TextField
                            label="Dictionary Description"
                            margin="normal"
                            id="dictionaryDescription"
                            variant="outlined"
                            value={this.state.dictionaryDescription}
                            onChange={this.editInputState}
                        />
                    </Paper>
                </div>
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
                                    <TableRow key={index} ref={'row' + index} className={(this.state.highlightedRow['row' + index] ? 'errorRow' : "")}>
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
                                            <div className={(this.state.editedRow['row' + index] ? 'hidden' : "vidible")}>
                                                <IconButton aria-label="Delete"  color="primary" onClick={() => this.removeRow(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="Edit" color="primary" onClick={() => this.editRow(dictionary, index)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                            <div className={(!this.state.editedRow['row' + index] ? 'hidden' : "vidible")}>
                                                Row in edit
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
        
                            </TableBody>
                        </Table>
                    </Paper>
                    <Paper className="dictionary-actions">
                        <div className={!this.state.isEditModeActive ? "visible" : "hidden"}>
                            <h1>Create</h1>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6} p="30px">
                                    <TextField
                                        label="Domain"
                                        margin="normal"
                                        variant="outlined"
                                        id="newDictionaryDomain"
                                        value={this.state.newDictionaryDomain}
                                        onChange={this.editInputState}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Range"
                                        margin="normal"
                                        variant="outlined"
                                        id="newDictionaryRange"
                                        value={this.state.newDictionaryRange}
                                        onChange={this.editInputState}
                                    />
                                </Grid>
                            </Grid>


                            <p>{this.state.validationMessage}</p>

                            <Button variant="contained" color="primary" onClick={this.createNewRow}>
                                Create Row
                                </Button>
                        </div>
                        <div className={this.state.isEditModeActive ? "visible" : "hidden"}>
                            <h1>Edit</h1>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6} p="30px">
                                    <TextField
                                        label="Domain"
                                        margin="normal"
                                        variant="outlined"
                                        id="editedRowDomain"
                                        value={this.state.editedRowDomain}
                                        onChange={this.editInputState}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Range"
                                        margin="normal"
                                        variant="outlined"
                                        id="editedRowRange"
                                        value={this.state.editedRowRange}
                                        onChange={this.editInputState}
                                    />
                                </Grid>
                            </Grid>


                            <p>{this.state.validationMessage}</p>

                            <Button variant="contained" color="primary" onClick={this.editExistingRow}>
                                Save Changes
                                </Button>
                            <Button variant="contained" color="primary" onClick={this.cancleEditRow}>
                                Cancel
                                </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default DictionaryCreate;