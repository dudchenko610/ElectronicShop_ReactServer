import React, {Component} from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {hidePopupAction} from "../../../actions/popup-actions"

import "./styles/multiple-input-popup-styles.css"

class MultipleInputPopupComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            headerName: "",
            headerErrorMessage: "",

            values: [
                {
                    name: "",
                    savedName: "",
                    errorMessage: "",
                    isInEditMode: true
                }
            ],
        }

    }

    

    updateState = () => {
        this.setState
        (
            function (state, props) {
                return {
                    ...state,
                }
            }
        );
    }


    handleChangeHeader = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState
            (
                function (state, props) {
                    return {
                        ...state,
                        [name] : value
                    }
                }
            );

    }


    handleChangeValue = (event, index) => {
        const target = event.target;
        const value = target.value;

        const valueModel =  this.state.values[index]

        valueModel.name = value

        if (value !== "") {
            valueModel.errorMessage = ""
        }

        this.updateState()

    }

    handleAddValue = (index)=> {
        const valueModel =  this.state.values[index]

        if (valueModel.name === "") {
            valueModel.errorMessage = this.props.itemErrorLabel
        } else {
            valueModel.isInEditMode = false
            valueModel.savedName = valueModel.name
        }
        

        this.updateState()
    }

    handleEditValue = (index) => {
        const valueModel =  this.state.values[index]
        valueModel.isInEditMode = true
        valueModel.name = valueModel.savedName
        valueModel.savedName = ""

        this.updateState()
    }

    handleDeleteValue = (index) => {
        this.state.values.splice(index, 1)

        this.updateState()
    }

    resetCharacteristicValues = () => {
        this.state.values = [
            {
                valueName: "",
                savedValueName: "",
                errorMessage: "",
                isInEditMode: true
            }
        ]

        this.updateState()
    }
   


    render () {
        const viewValItems = []

        this.state.values.map((value, index, array) => {

            let valueJSX

            if (value.isInEditMode) {
                valueJSX = (
                    <div>
                        <input 
                            value = {value.name}
                            onChange = {
                                (event) => {
                                        this.handleChangeValue(event, index)
                                    }
                                } 
                                />
                        <a 
                            onClick = {
                                (event) => {
                                    this.handleAddValue(index)
                                    }
                            }
                        >SAVE</a>

                        {
                            array.length > 1 
                            ? 
                                <a 
                                    onClick= {
                                        () => { 
                                            this.handleDeleteValue(index) 
                                        }
                                    }
                                >DEL</a> 
                            :

                            ""
                        }
                                
                        <label>
                            {
                                value.errorMessage
                            }
                        </label>
                                
                                
                    </div>
                )
            } else {
                valueJSX = (
                    <div>
                        <label>
                            {
                                value.savedName
                            }
                        </label>

                        <a 
                            onClick = {
                                (event) => {
                                    this.handleEditValue(index)    
                                    }
                            }
                        >EDIT</a>

                        {
                            array.length > 1 
                            ? 
                                <a 
                                    onClick= {
                                        () => { 
                                            this.handleDeleteValue(index)    
                                        }
                                    }
                                >DEL</a> 
                            :

                                ""
                        }
                    </div>
                )
            }

            viewValItems.push(valueJSX)

            return value
        })

        viewValItems.push(
            <div>
                <a 
                    onClick = {
                        (event) => {
                            this.state.values.push(
                                {
                                    name: "",
                                    savedName: "",
                                    errorMessage: "",
                                    isInEditMode: true
                                }
                            )
                            this.updateState()

                        }
                    }
                >ADD</a>
                
            </div>
        )

        

        return (
            <div className = "add-popup-container">
                <div>
    
                    {this.state.headerErrorMessage}
     
                    <input 
                        name="headerName" 
                        type="text" 
                        onChange={
                            event => {
                                if (this.state.headerErrorMessage !== "" && event.target.value !== "") {
                                    this.state.headerErrorMessage = ""
                                    this.updateState()
                                }
                                this.handleChangeHeader(event)
                            }
                        } 
                    />

                    <a 
                        onClick={() => 
                            {
        
                                if (this.state.headerName === "") {
                                    this.state.headerErrorMessage = this.props.headerErrorLabel
                                    this.updateState()
                                    return
                                }

                                const values = []

                                this.state.values.map((el, index, array) => {
                                    if (el.savedName !== "") {
                                        values.push(el.savedName)
                                    }

                                    return el
                                })

        
                                this.props.onOk(this.state.headerName, values)
                                this.props.hidePopup()
        
                            }
                        }
                    >{this.props.okLabel}</a>
                
                </div>

                <div className="add-values-scrollbar" id="style-list">

                    <ol className="inner-list-values" ref={ref => (this.scrollView = ref)}>
                        {
                            viewValItems.map((view, index, array) => {
                                return view
                            })
                        }
                    </ol>

                </div>
            </div>

            
        )
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            hidePopup: hidePopupAction,
        },
        dispatch
    )
}


export default connect(null, matchDispatchToProps)(MultipleInputPopupComponent)