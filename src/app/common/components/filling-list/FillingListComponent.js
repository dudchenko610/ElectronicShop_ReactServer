import React from "react"

import LoadingComponent from "../loading-component/LoadingComponent"

import "./styles/filling-list-styles.css"


// data 
// state
class FillingListComponent extends LoadingComponent {

    constructor(props) {
        super(props)
    }
    
    onReadyElement(element, index) {
        return <div></div>
    }


    renderContent () {

        let scrollbarStyle = " "

        if (this.props.isReverse || this.state.isReverse) {
            scrollbarStyle += "filling-list-reverse"
        }

        return (
            <div className = { "filling-list-container" + scrollbarStyle }>
                {
                
                    this.props.data.map((element, index, array) => {
                        return this.onReadyElement(element, index)
                    })
                }
            </div>
        )
    }

}

export default FillingListComponent