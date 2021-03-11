import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import ListComponent from "../../../../common/components/list-wrapper/ListComponent"
import CategoryItemComponent from "./CategoryItemComponent"

import {getCategoriesAction} from "../../../../common/crud/categories/actions/category-actions"

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
            <div className = "home-categories-container">
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
            // categories
            getCategories: getCategoriesAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    let categoryIds = Array.from( state.categoriesReducer.content.keys() );

    return {
        categoriesReducer: state.categoriesReducer,

        data: categoryIds,
        state: state.categoriesReducer.state
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoriesComponent)
