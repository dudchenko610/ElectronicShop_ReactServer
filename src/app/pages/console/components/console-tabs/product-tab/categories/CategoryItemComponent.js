import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"

import { LOAD_STATES } from "../../../../../../../core/load-states"

import ProgressBar from "../../../../../../common/components/ProgressBar"

import InputPopupComponent from "../../../../../../common/components/popups/InputPopupComponent"
import QuestionPopupComponent from "../../../../../../common/components/popups/QuestionPopupComponent"

import {showAlertPopupXAction} from "../../../../../../common/actions/popup-actions"
import {updateCategoryAction, removeCategoryAction} from "../../../../../../common/crud/categories/actions/category-actions"
import {pickCategoryAction} from "../../../../actions/console-actions"
import {resetProductFiltersAction, getProductsAction} from "../../../../../../common/crud/products/actions/product-actions"

import "./styles/category-item-styles.css"

var qs = require('qs');


class CategoryItemComponent extends Component {


    render() {

        const category = this.props.categoriesReducer.content.get(this.props.categoryId)
        const currentCategory = this.props.consoleReducer.currentCategory
        
        return (
            <div 
                className = "category-item" 
                onClick = {
                    (event) => {

                        if (currentCategory && currentCategory.id === category.id) {
                            this.props.pickCategory(null)
                            this.props.resetProductFilters()

                            

                            this.props.history.push({
                                pathname: generatePath(this.props.match.path,  {} )
                            })

                        } else {
                            this.props.pickCategory(category)
                            this.props.resetProductFilters()

                            this.props.getProducts(null, {categoryId: category.id})

                            const productFilter = {
                                categoryId: category.id
                            }

                            const productFilterStr = qs.stringify(productFilter)

                            this.props.history.push({
                                pathname: generatePath(this.props.match.path,  
                                    {
                                        productFilter: productFilterStr
                                    } 
                                )
                            })
                        }

                    }
                
                }
                style = {
                    
                    currentCategory && currentCategory.id === category.id ? 
                        {
                            border : "1px  solid red"
                        } 
                        : 
                        {

                        }
                    }
                >


                <label className = "name">{category.name}</label>

                <div className = "actions">
               
                    {
                        category.state === LOAD_STATES.LOADING ?
                            <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/> :
                            <>
                                <a 
                                    className = "update" 
                                    onClick = {
                                        (event) => { 
                                            event.stopPropagation()

                                            this.props.showAlertPopupX
                                            (
                                                {width: 300, height: 250},
                                                <InputPopupComponent 
                                                    okLabel = "Save Category"
                                                    initialText = {category.name}
                                                    emptyMsg = "Category name cannot be empty!"
                                                    onOk = {(categoryName) => {

                                                        const newCategory = {
                                                            name : categoryName
                                                        }

                                                        this.props.updateCategory(category, newCategory)
                                                    }}/>
                                            ) 
                                        }
                                    }
                                >UPD</a>
                    
                                <a 
                                    className = "delete" 
                                    onClick = 
                                    {
                                        (event) => { 
                                            event.stopPropagation()
                                            this.props.showAlertPopupX
                                            (
                                                {width: 300, height: 250},
                                                <QuestionPopupComponent
                                                    okLabel = "Delete Category"
                                                    notification = "This action deletes some related data, are you sure?"
                                                    feature = {category}
                                                    onOk = {(feature) => {

                                                        if (currentCategory && currentCategory.id === category.id) {
                                                            this.props.pickCategory(null)
                                                        }
                                                        

                                                        this.props.removeCategory(category)
                                                    }}
                                                />
                                            ) 

                                        }
                                    }
                                >DEL</a>    
                            
                            </>
                    }
                    

                </div>
                
            </div>
        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            removeCategory: removeCategoryAction,
            updateCategory: updateCategoryAction,

            pickCategory: pickCategoryAction,

            showAlertPopupX: showAlertPopupXAction,

            resetProductFilters: resetProductFiltersAction,
            getProducts: getProductsAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        categoriesReducer: state.categoriesReducer,
        consoleReducer: state.consoleReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(CategoryItemComponent))

