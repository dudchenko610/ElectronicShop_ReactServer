import React, {Component} from "react"
import RangeSliderComponent from "../../range-slider/RangeSliderComponent"

import "./styles/range-slider-inputs-styles.css"

// onValuesChanged
// min
// max 

class RangeSliderWithInputsComponent extends RangeSliderComponent {

    constructor(props) {
        super(props)

       this.state = {
           ...this.state,
            editable: {
                lowerValue: 20,
                upperValue: 50000
            }
        } 

        
    }

    onEdit(editable) {

        console.log("onEdit")
        console.log(editable)

        var t = false

        if (typeof editable.lowerValue === 'string') {
            t = true
        }

        this.state.left.value = this.convertToInnerSystem(parseFloat(editable.lowerValue))
        this.state.right.value = this.convertToInnerSystem(parseFloat(editable.upperValue))

       // console.log("this.state.right.value = " + this.state.right.value)

        this.onValuesChanged(t)
        this.updateComponent()

    }

    convertToInnerSystem(value) {
        return ((value - parseFloat(this.props.min)) / (parseFloat(this.props.max) - parseFloat(this.props.min))) * this.state.max
    }

    convertToOuterSystem(value) {
        return (value / this.state.max) * parseFloat(this.props.max) + parseFloat(this.props.min)
    }

    render() {

        this.state.editable.lowerValue = this.convertToOuterSystem(this.state.left.value)
        this.state.editable.upperValue = this.convertToOuterSystem(this.state.right.value)

        if (Number.isNaN(this.state.editable.lowerValue)) {
            this.state.left.value = this.state.min
            this.state.editable.lowerValue = this.convertToOuterSystem(this.state.left.value) 
        }

        if (Number.isNaN(this.state.editable.upperValue)) {
            this.state.right.value = this.state.max 
            this.state.editable.upperValue = this.convertToOuterSystem(this.state.right.value) 
            
        }

        this.props.onValuesChanged(this.state.editable.lowerValue, this.state.editable.upperValue)

      //  console.log("render")
      //  console.log(this.state.editable)

        return (
            <div className = "range-slider-with-inputs">
                <div className = "range-slider-inputs">
                    <input name="lowerValue" type="number" value={this.state.editable.lowerValue}  onChange={this.handleChange} />
                    <input name="upperValue" type="number" value={this.state.editable.upperValue}  onChange={this.handleChange} />
                </div>

                {
                    super.render()
                }

            </div>
        )
    }
}

export default RangeSliderWithInputsComponent