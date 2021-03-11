import React, { Component } from "react"

import Footer from "./Footer"
import Header from "./Header"
import ContentContainer from "./ContentContainer"
import PopupDialog from "../components/PopupDialog"

import "../styles/base-styles.css"
import "../styles/reset-styles.css"

class App extends Component {
    
    render() {

    /*    const obj = {
            categoryId: 13,
            manufacturers: [
                1, 5, 2, 5
            ],
            charValues: [
                1, 3, 4, 2, 345, 4
            ]
        }

        const serObj = JSON.stringify(obj)

        console.log(serObj)

        const deserObj = JSON.parse(serObj)

        console.log(deserObj)*/


        return (

            <>
                <PopupDialog /> 

                <div className="container">
                
                    <Header />
                    <ContentContainer />

                </div>
            </>

        )
    }
}

export default App