import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { LOAD_STATES } from "../../../../../core/load-states"
import ProgressBar from "../../../../common/components/ProgressBar"

import { Link } from "react-router-dom"

import "./styles/category-item-styles.css"

var qs = require('qs');

class CategoryItemComponent extends Component {


    render() {

        const category = this.props.categoriesReducer.content.get(this.props.categoryId)

        const productFilter = {
            categoryId: category.id
        }

        const productFilterStr = qs.stringify(productFilter)

        console.log(productFilterStr)

        return (
            
            <Link className='category-item' to={"/search/" + productFilterStr}>
                <label className = "name">{category.name}</label>
            </Link>
        )
    }
}

function mapStateToProps(state) {

    return {
        categoriesReducer: state.categoriesReducer
    }
}

export default connect(mapStateToProps)(CategoryItemComponent)

