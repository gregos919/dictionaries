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
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import './DictionaryCreateEdit.css';

class DictionaryCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDictionaryInEditMode: false,
            dictionaryName: "",
            dictionaryDescription: "",
            dictionaryData: [
                {
                    domain: "domain1",
                    range: "range1"
                },
                {
                    domain: "domain2",
                    range: "range2"
                },
                {
                    domain: "domain3",
                    range: "range3"
                },
                {
                    domain: "domain4",
                    range: "range4"
                },
                {
                    domain: "domain1",
                    range: "range1"
                },
                {
                    domain: "domain2",
                    range: "range2"
                },
                {
                    domain: "domain3",
                    range: "range3"
                },
                {
                    domain: "domain4",
                    range: "range4"
                },
                {
                    domain: "domain1",
                    range: "range1"
                },
                {
                    domain: "domain2",
                    range: "range2"
                },
                {
                    domain: "domain3",
                    range: "range3"
                },
                {
                    domain: "domain4",
                    range: "range4"
                },
                {
                    domain: "domain1",
                    range: "range1"
                },
                {
                    domain: "domain2",
                    range: "range2"
                },
                {
                    domain: "domain3",
                    range: "range3"
                },
                {
                    domain: "domain4",
                    range: "range4"
                },
                {
                    domain: "domain1",
                    range: "range1"
                },
                {
                    domain: "domain2",
                    range: "range2"
                },
                {
                    domain: "domain3",
                    range: "range3"
                },
                {
                    domain: "domain4",
                    range: "range4"
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
            editedRowIndex: "",
            actionsHeight: "calc(100vh - 350px)",
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
    componentDidMount() {
        window.addEventListener('scroll', this.setActionsHeightOnScroll);
    }

    componentWillMount() {


        if(this.props.location.state)
        {
            let editIndex = this.props.location.state.index;

            this.setState({
                isDictionaryInEditMode: true
            });

            this.setState({
                isDictionaryInEditMode: true
            });

            let dictionaryForEdit = JSON.parse(localStorage.getItem("dictionaries"))[editIndex];

            this.setState({
                dictionaryData: [...dictionaryForEdit.data]
            });
        }
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.setActionsHeightOnScroll);
    }

    setActionsHeightOnScroll = (event) => {

        // let scrollTopActions = ReactDOM
        //     .findDOMNode(this.refs['actionsParent'])
        //     .offsetTop;
        //
        // let scrollTopLine = ReactDOM
        //     .findDOMNode(this.refs['rowInEditLine'])
        //     .offsetTop;
        //
        // let lineHeight;
        //
        // console.log(scrollTopLine);
        // console.log(scrollTopActions);
        //
        // if(Number(scrollTopLine) > Number(scrollTopActions))
        // {
        //     lineHeight = {
        //         top: "-" + (scrollTopLine - scrollTopActions + 30) + "px",
        //         bottom: 0
        //     }
        // }
        // else
        // {
        //     lineHeight = {
        //         top: 0,
        //         bottom: (scrollTopLine - scrollTopActions + 30) + "px",
        //     }
        // }
        //
        // this.setState(prevState => ({
        //     rowInEditLineStyle: lineHeight
        // }));
    }

    editInputState = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    validateNewRow = (rowForValidation) => {
        let highlightedRowIndex = this.state.dictionaryData.some((rowData, rowIndex) =>
           {
              if(rowData.domain === rowForValidation.domain)
              {
                  this.setState({
                      validationMessage: "Row with same domain value already exists. Please change this rows domain or edit highlighted row before saving"
                  });

                  return rowIndex;
              }

              if(rowData.range === rowForValidation.range)
              {
                  this.setState({
                      validationMessage: "Row with same range value already exists. Please change this rows range or edit highlighted row before saving"
                  });

                  return rowIndex;
              }

              if(rowData.domain === rowForValidation.range)
              {
                  this.setState({
                      validationMessage: "Specified range already appears in others row domain value which would result in never-ending transformation. Please change this rows range or edit highlighted row before saving"
                  });

                  return rowIndex;
              }

              if(rowData.range === rowForValidation.domain)
              {
                  this.setState({
                      validationMessage: "Specified domain already appears in others row range value which would result in never-ending transformation. Please change this rows range or edit highlighted row before saving"
                  });

                  return rowIndex;
              }

               return false;
           });

        if(highlightedRowIndex){
            this.setState(prevState => ({
                highlightedRow: {["row" + highlightedRowIndex]: true}
            }));

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

    cancelEditRow = () => {
        this.setState({
            isEditModeActive: false
        })

        this.setState({
            editedRow: {}
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
                            {
                                this.state.isDictionaryInEditMode ? "Edit dictionary" :  "Create dictionary"
                            }
                        </Typography>
                        <Button variant="contained" color="primary" onClick={this.saveDictionary}>
                            Save Dictionary
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
                                    {this.state.dictionaryData.map((dictionary, index) => (
                                        <TableRow key={index} ref={'row' + index}
                                                  className={
                                                        `${this.state.highlightedRow['row' + index] ? 'errorRow' : ""}
                                                         ${this.state.editedRow['row' + index] ? 'edited-row' : ""}
                                                      `}>
                                            <TableCell align="right">
                                                {dictionary.domain}
                                            </TableCell>
                                            <TableCell align="center" width="120px">
                                                <CompareArrowsIcon />
                                            </TableCell>
                                            <TableCell>
                                                {dictionary.range}
                                            </TableCell>
                                            <TableCell width="160px" align="center" >
                                                <div className={(this.state.editedRow['row' + index] ? 'hidden' : "vidible")}>
                                                    <IconButton aria-label="Delete"  color="primary" onClick={() => this.removeRow(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="Edit" color="primary" onClick={() => this.editRow(dictionary, index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </div>
                                                <div ref="rowInEditLine"></div>
                                                <div  className={(!this.state.editedRow['row' + index] ? 'hidden row-in-edit' : "visible row-in-edit")}>
                                                    Row in edit
                                                    <div  className="row-in-edit-line" style={this.state.rowInEditLineStyle}></div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                    <Paper ref="actionsParent" className="dictionary-actions row-edit" style={{ maxHeight: this.state.actionsHeight }}>
                        <div className={!this.state.isEditModeActive ? "visible" : "hidden"}>
                            <h1 className="card-title">Create new row</h1>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6} p="30px">
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


                            <p>{this.state.validationMessage}</p>

                            <Button variant="contained" color="primary" disabled={!this.state.newDictionaryRange || !this.state.newDictionaryDomain} onClick={this.createNewRow}>
                                Create Row
                                </Button>
                        </div>
                        <div className={this.state.isEditModeActive ? "visible" : "hidden"}>
                            <h1 className="card-title">Editing row</h1>
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
                            <Button variant="contained" color="primary" onClick={this.cancelEditRow}>
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