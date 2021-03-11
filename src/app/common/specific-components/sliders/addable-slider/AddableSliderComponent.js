import React from "react"

import SliderComponent from "../../../components/slider/SliderComponent"

import "./styles/addable-slider-styles.css"

class AddableSliderComponent extends SliderComponent {

    constructor(props) {
        super(props)

        this.state.addElem = 
        {
            add: "a",
            added: false
        }

    }

    onAddClicked(element, index) {

    }

    showAddButton() {

        if (!this.state.addElem.added) {
            this.state.addElem.added = true
            this.state.data.push(this.state.addElem)

            this.state.max = this.state.data.length - 1

            return true
        }

        return false
    }

    hideAddButton() {
        if (this.state.addElem.added) {
            this.state.addElem.added = false
            this.state.data.pop()

            this.state.max = this.state.data.length - 1

            return true
        }

        return false
    }


    onReadyCustomElement(element, index) {

    }

    onReadyElement (element, index, array) {

        if (element.add) {

            return (
                <div 
                    className = "item-test" 
                    style = {{
                        lineHeight: this.state.height + "px",
                        height: this.state.height + "px",
                        width: this.state.itemWidth + "px"
                    }}
                    
                    onClick = {
                        e => {
                            this.onAddClicked(element, index)
                        }
                    }
                >+</div>
            )
        }

        return this.onReadyCustomElement(element, index)
    }


}

export default AddableSliderComponent