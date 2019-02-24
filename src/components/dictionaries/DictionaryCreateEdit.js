import React from 'react';
import ReactDOM from "react-dom";
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
import Warning from '@material-ui/icons/Warning';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { withSnackbar } from 'notistack';
import { Link } from 'react-router-dom';


import './DictionaryCreateEdit.css';

class DictionaryCreateEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDictionaryInEditMode: false,
            editedDictionaryIndex: null,
            dictionaryName: "",
            dictionaryDescription: "",
            dictionaryData: [],
            newDictionaryDomain: "",
            newDictionaryRange: "",
            validationMessage: "",
            isEditModeActive: false,
            highlightedRow: {},
            editedRow: {},
            editedRowDomain: "",
            editedRowRange: "",
            editedRowIndex: null,
            errors: {
                domain: false,
                range: false,
                editDictionaryDomain: false,
                editDictionaryRange: false
            },
            rowInEditLineStyle: {
                top: 0,
                bottom: 0
            }
        };
    }

    componentWillMount() {

        if(this.props.location.state)
        {
            let editIndex = this.props.location.state.index;

            this.setState({
            });
            let dictionaryForEdit = JSON.parse(localStorage.getItem("dictionaries"))[editIndex];

            this.setState({
                dictionaryData: [...dictionaryForEdit.data],
                dictionaryName: dictionaryForEdit.name,
                dictionaryDescription: dictionaryForEdit.description,
                isDictionaryInEditMode: true,
                editedDictionaryIndex: editIndex
            });
        }
    }



    render() {
        return (
            <div >
                <AppBar className="page-navbar" color="default">
                    <Toolbar >

                        <Typography variant="h4" color="inherit" className="header-link header-title" component={Link} to="/dictionaries">
                            Dictionaries Overview
                        </Typography>
                        <Typography variant="h4" color="inherit" className="header-title">
                            /
                        </Typography>
                        <Typography variant="h4" color="inherit" className="header-title">

                            {
                                this.state.isDictionaryInEditMode ? "Edit dictionary" :  "Create dictionary"
                            }
                        </Typography>
                        <Button variant="contained" className="save-button" style={{marginLeft: "auto"}}  onClick={this.saveDictionary}>
                            {
                                this.state.isDictionaryInEditMode ? "Update dictionary" :  "Save dictionary"
                            }
                        </Button>
                    </Toolbar>
                </AppBar>

                <div>
                    <Paper className="dictionary-info">
                        <h1 className="card-title">Dictionary Information</h1>
                        <div className="flex">
                            <TextField
                                label="Dictionary Name"
                                margin="normal"
                                style = {{width: '25%', marginRight: "30px"}}
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
                                style = {{width: '75%'}}
                                value={this.state.dictionaryDescription}
                                onChange={this.editInputState}
                            />
                        </div>
                    </Paper>
                </div>
                <div className="flex">
                    <Paper className="dictionary-rows">
                        <h1 className="card-title">Dictionary Rows</h1>
                        <div className="rows-parent">
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

                                    <TableRow className={(this.state.dictionaryData.length == 0 ? 'visible' : "hidden")}>
                                        <TableCell align="center" colspan="4">
                                            <strong><i>No rows added yet. Please use right box to create first row for this dictionary.</i></strong>
                                        </TableCell>
                                    </TableRow>

                                    {this.state.dictionaryData.map((dictionary, index) => (
                                        <TableRow key={index} ref={'row' + index}
                                                  className={
                                                        `${this.state.highlightedRow['row' + index] ? 'errorRow' : ""}
                                                         ${this.state.editedRow['row' + index] ? 'edited-row' : ""}
                                                      `}>
                                            <TableCell align="right">
                                                {dictionary.domain}
                                            </TableCell>
                                            <TableCell align="center" width="60px">
                                                <CompareArrowsIcon />
                                            </TableCell>
                                            <TableCell>
                                                {dictionary.range}
                                            </TableCell>
                                            <TableCell width="160px" align="center" >
                                                <div className={(this.state.editedRow['row' + index] ? 'hidden' : "vidible")}>
                                                    <IconButton aria-label="Delete" color="secondary" onClick={() => this.removeRow(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="Edit" color="primary" onClick={() => this.editRow(dictionary, index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </div>
                                                <div ref="rowInEditLine"></div>
                                                <div  className={(!this.state.editedRow['row' + index] ? 'hidden row-in-edit' : "visible row-in-edit")}>
                                                    <strong>Row in edit</strong>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }

                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                    <Paper ref="actionsParent" className="dictionary-actions" >
                        <div className={!this.state.isEditModeActive ? "visible" : "hidden"}>
                            <h1 className="card-title">Create new row</h1>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6} p="30px" style={{marginBottom: "10px"}}>
                                    <TextField
                                        label="Domain"
                                        margin="normal"
                                        variant="outlined"
                                        id="newDictionaryDomain"
                                        value={this.state.newDictionaryDomain}
                                        onChange={this.editInputState}
                                        error={this.state.errors.domain}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Range"
                                        margin="normal"
                                        variant="outlined"
                                        id="newDictionaryRange"
                                        value={this.state.newDictionaryRange}
                                        error={this.state.errors.range}
                                        onChange={this.editInputState}
                                    />
                                </Grid>
                            </Grid>

                            {this.state.validationMessage ?
                                <div className="error-parent">
                                    <Warning />
                                    <p className="error-message">{this.state.validationMessage}</p>
                                </div>
                                :
                                ""
                            }
                            <Button variant="contained" color="primary" disabled={!this.state.newDictionaryRange || !this.state.newDictionaryDomain} onClick={this.createNewRow}>
                                Create Row
                            </Button>
                        </div>
                        <div className={this.state.isEditModeActive ? "visible" : "hidden"}>
                            <h1 className="card-title edit-row-title">Editing row</h1>
                            <Grid container spacing={24} style={{marginBottom: "0px"}}>
                                <Grid item xs={12} sm={6} p="30px" >
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


                            {this.state.validationMessage ?
                                <div className="error-parent">
                                    <Warning />
                                    <p className="error-message">{this.state.validationMessage}</p>
                                </div>
                                :
                                ""
                            }

                            <Button variant="contained" color="primary" style={{marginRight: "15px"}}  onClick={this.editExistingRow}>
                                Save Changes
                            </Button>
                            <Button variant="contained" color="secondary" onClick={this.cancelEditRow}>
                                Cancel
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }

    editInputState = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    validateNewRow = (rowForValidation) => {
        this.setState({
            validationMessage: "",
            highlightedRow: {}
        });

        let rowIndexError;

        let highlightedRowIndex = this.state.dictionaryData.some((rowData, rowIndex) =>
           {
               if(this.state.editedRowIndex === null || this.state.editedRowIndex != rowIndex)
               {
                   if(rowData.domain === rowForValidation.domain)
                   {
                       this.setState({
                           validationMessage: "Row with same domain value already exists. Please change this rows domain or edit highlighted row before saving"
                       });

                       rowIndexError = rowIndex;

                       return true;
                   }

                   if(rowData.range === rowForValidation.range)
                   {
                       this.setState({
                           validationMessage: "Row with same range value already exists. Please change this rows range or edit highlighted row before saving"
                       });

                       rowIndexError = rowIndex;

                       return true;
                   }

                   if(rowData.domain === rowForValidation.range)
                   {
                       this.setState({
                           validationMessage: "Specified range already appears in others row domain value which would result in never-ending transformation. Please change this rows range or edit highlighted row before saving"
                       });

                       rowIndexError = rowIndex;

                       return true;
                   }

                   if(rowData.range === rowForValidation.domain)
                   {
                       this.setState({
                           validationMessage: "Specified domain already appears in others row range value which would result in never-ending transformation. Please change this rows range or edit highlighted row before saving"
                       });

                       rowIndexError = rowIndex;

                       return true;
                   }

                   if(rowForValidation.range === rowForValidation.domain)
                   {
                       this.setState({
                           validationMessage: "Specified domain is same as Specified range value."
                       });

                       rowIndexError = rowIndex;

                       return true;
                   }
               }

               return false;
           });

        if(highlightedRowIndex){
            this.setState(prevState => ({
                highlightedRow: {["row" + rowIndexError]: true}
            }));

            let errorRowoffsetTop = ReactDOM
                 .findDOMNode(this.refs["row" + rowIndexError])
                 .offsetTop;

            window.scrollTo({
                top: errorRowoffsetTop,
                behavior: 'smooth'
            });

            return true;
        }
    }

    editExistingRow = () => {
        let dictionaryData =  this.state.dictionaryData;
        let editedDictionary = {domain: this.state.editedRowDomain, range: this.state.editedRowRange};

        let isValid = this.validateNewRow(editedDictionary);

        if(!isValid){

            dictionaryData[this.state.editedRowIndex] = editedDictionary;

            this.setState(prevState => ({
                dictionaryData: dictionaryData,
                isEditModeActive: false,
                validationMessage: "",
                highlightedRow: {},
                editedRow: {},
                editedRowIndex: null
            }));

            this.props.enqueueSnackbar('Row edited successfully', {
                variant: 'success'
            });
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
                dictionaryData: [...prevState.dictionaryData, newDictionary],
                newDictionaryDomain: "",
                newDictionaryRange: ""

            }));

            this.props.enqueueSnackbar('Row created successfully', {
                variant: 'success'
            });
        }
    }

    removeRow = (rowIndex) => {

        let dataCopy = this.state.dictionaryData;

        dataCopy.splice(rowIndex, 1);

        this.setState(prevState => ({
            dictionaryData: [...dataCopy]
        }));

        this.props.enqueueSnackbar('Row removed successfully', {
            variant: 'success'
        });
    }

    editRow = (dictionary, index) =>{
        this.setState({
            isEditModeActive: true,
            editedRowIndex: index,
            editedRow: {["row" + index]: true},
            editedRowDomain: dictionary.domain,
            editedRowRange: dictionary.range,
            validationMessage: "",
            highlightedRow: {},
        });
    }

    cancelEditRow = () => {
        this.setState({
            isEditModeActive: false,
            validationMessage: "",
            highlightedRow: {},
            editedRow: {},
            editedRowIndex: null
        });
    }

    saveDictionary = () => {
        let newDictionary = {
            name: this.state.dictionaryName,
            description: this.state.dictionaryDescription,
            data: this.state.dictionaryData
        };

        if(!newDictionary.name || !newDictionary.description)
        {
            this.props.enqueueSnackbar('Please give your dictionary name and description before saving', {
                variant: 'error'
            });

            return;
        }

        let storedDictionaries = JSON.parse(localStorage.getItem("dictionaries"))
            ? JSON.parse(localStorage.getItem("dictionaries"))
            : [];

        if(this.state.editedDictionaryIndex == null)
        {
            storedDictionaries.push(newDictionary);
        }
        else
        {
            storedDictionaries[this.state.editedDictionaryIndex] = newDictionary;
        }

        localStorage.setItem("dictionaries", JSON.stringify(storedDictionaries));

        this.props.enqueueSnackbar('Dictionary saved successfully', {
            variant: 'success'
        });

        this.props.history.push('/dictionaries');
    }

}

export default withSnackbar(DictionaryCreateEdit);