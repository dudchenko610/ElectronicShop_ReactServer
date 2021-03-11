import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { LOAD_STATES } from "../../../../../../../core/load-states"

import ProgressBar from "../../../../../../common/components/ProgressBar"

import ListComponent from "../../../../../../common/components/list-wrapper/ListComponent"
import InputPopupComponent from "../../../../../../common/components/popups/InputPopupComponent"

import {showAlertPopupXAction} from "../../../../../../common/actions/popup-actions"
import {addCategoryAction, getCategoriesAction} from "../../../../../../common/crud/categories/actions/category-actions"

import CategoryItemComponent from "./CategoryItemComponent"

import "./styles/category-styles.css"

class CategoriesComponent extends ListComponent {

    onNone() {
        return <p>Список категорий пуст !</p>
    }

    onEmptyList() {
        return <p>Список категорий пуст !</p>
    }

    onFailed() {
        return (
            <>
                <label>Failed</label><br/>
                <a onClick = {() => {this.props.getCategories()}}>Reload</a>
            </>
        )
    }

    onReadyElement(element, index, array) {
        return <CategoryItemComponent 
                    key = {element} 
                    categoryId = {element}/>
    }


    render() {

        return (
            <div className = "categories-container">

                <div className="add-category-btn-container">

                    {
                        this.props.state === LOAD_STATES.READY || this.props.state === LOAD_STATES.NONE ?
                        
                        <>
                            <a 
                                className="add-category-a" 
                                onClick={
                                    () => 
                                        this.props.showAlertPopupX
                                        (
                                            {
                                                width: 800,
                                                height: 450
                                            },
                                            <InputPopupComponent 
                                                okLabel = "Add Category"
                                                emptyMsg = "Category name cannot be empty!"
                                                onOk = {(categoryName) =>{
                                                    const category = {
                                                        name: categoryName
                                                    }
                                                    this.props.addCategory(category)
                                                }}/>
                                        )
                                }
                            >Add
                            </a>
                        </>

                        :
                        <span></span>
                    }

                    
                        
                    {
                        this.props.categoriesReducer.addingNewState === LOAD_STATES.LOADING 

                        ? 
                            <ProgressBar sqSize= "16" phase = {Math.random() * 100} strokeWidth = "1"/> 
                        :
                            ""
                    }
                        
                </div>

                {
                    super.render()
                }

            </div>
        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // popup
            showAlertPopupX: showAlertPopupXAction,

            // categories
            getCategories: getCategoriesAction,
            addCategory: addCategoryAction,
        },
        dispatch
    )
}

function mapStateToProps(state) {


    return {
        categoriesReducer: state.categoriesReducer,

        data: Array.from( state.categoriesReducer.content.keys() ),
        state: state.categoriesReducer.state
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoriesComponent)

