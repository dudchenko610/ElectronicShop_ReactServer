import React from "react"

import ListComponent from "../list-wrapper/ListComponent"
import ExpandableComponent from "../expandable/ExpandableComponent"

// expandedElements
class AnimatedDoubleListComponent extends ListComponent {

    onReadyLowerElement(lowerElement, lowerIndex, upperElement, upperIndex) {
        return <>
            <label>lower index = {lowerIndex}</label><br/>
        </>
    }

    onPrepareLowerElements(upperElement, index) {
        return []
    }

    onUpperElementLabel(upperElement, index) {
        return ""
    }

    isExpanded(upperElement, index) {
        return false
    }

    onReadyElement(upperElement, index, array) {

        const lowerElements = this.onPrepareLowerElements(upperElement, index)
        const buttonLabel = this.onUpperElementLabel(upperElement, index)

        return (<ExpandableComponent 
                    key = { index }
                    buttonLabel = { buttonLabel } 
                    isExpanded = { this.isExpanded(upperElement, index) }
                    contentJSX = {
                        <>
                            {
                                lowerElements.map((lowerElement, lowerIndex, array) => {
                                    return this.onReadyLowerElement(lowerElement, lowerIndex, upperElement, index)
                                })
                            }
                        </>
                    }
                />)
    }

}  

export default AnimatedDoubleListComponent