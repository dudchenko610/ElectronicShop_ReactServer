import React from "react"

import NewsComponent from "./components/NewsComponent";
import CategoriesComponent from  "./components/categories/CategoriesComponent";
import ProductsComponent from "./components/ProductsComponent";

import "./styles/home-styles.css"

const HomePage = () => (
    <div className = "home-tab">
        <CategoriesComponent
       //     isReverse = { true }
              //alignedBottom = { true }
        />

        <div className = "home-data-container">
            <NewsComponent/>
            <ProductsComponent/>
        </div>
        
    </div>
)

export default HomePage

