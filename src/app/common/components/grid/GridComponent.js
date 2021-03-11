import React from "react"

import ReloadableComponent from "../loading-component/ReloadableComponent"
import "./styles/grid-styles.css"
import "./styles/grid-item-styles.css"


// data 
// state
class GridComponent extends ReloadableComponent {

    constructor(props) {
        super(props)


    }
    
    onReadyElement(element, index) {
        return <div></div>
    }

    onReadyOuterElement(element, index, array) {
        return (
            <div className = "grid-item" key = { index }>
                { this.onReadyElement(element, index) }
            </div>
        )
    }

    renderContent () {
        return (
            <div className = "grid-container">
                {
                    this.props.data.map((element, index, array) => {
                        return this.onReadyOuterElement(element, index, array)
                    })
                }
            </div>
        )
    }

}

export default GridComponent