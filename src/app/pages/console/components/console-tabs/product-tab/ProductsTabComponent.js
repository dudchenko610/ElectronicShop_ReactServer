import React, { Component } from "react"

import CategoriesComponent from "./categories/CategoriesComponent"
import CharComponent from ".//characteristics/CharComponent"
import ManufactComponent from "./manufacturers/ManufactComponent"

import ProductsComponent from "./products/ProductsComponent"
import FilterComponent from "../../../../../common/specific-components/products/filtering/FilterComponent"

import "./styles/product-tab-styles.css"

class ProductsTabComponent extends Component {
    render () {
        return (
            <div className = "market-console-container">

                <div className = "categor-manufact-container">
                    <CategoriesComponent/>
                    <ManufactComponent/>
                </div>
                

                <div className = "characts-filter-container">
                    
                    <CharComponent/>

                    <div className = "console-product-filter-container">
                        <FilterComponent/>
                    </div>
                    
                </div>
                
            

                <ProductsComponent />  

            </div>
        )
    }
}

export default ProductsTabComponent