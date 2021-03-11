import React from "react"
import { connect } from "react-redux"

import SliderComponent from "../../../components/slider/SliderComponent"

import {LOAD_STATES} from "../../../../../core/load-states"

import "./styles/page-switch-slider-styles.css"

// onPageClicked
// pageCount
// currentNumber
// onPageChoosen


class PageSwitchSliderComponent extends SliderComponent {

    constructor(props){
        super(props)
        
        this.state = {
            ...this.state,

            isDataCreated: false,
            isControlOutside: true,
            state: LOAD_STATES.READY,
            data: [
                {
                    i: 0
                }
            ]

        }
    }

    componentDidMount() {
        
     //   console.log("PageSwitchSliderComponent")

        const pageCount = parseInt(this.props.pageCount)

        if (!this.state.isDataCreated) {

         //   console.log("if (!this.state.isDataCreated) {")


            this.state.data = []

            let i = 0
            
            

            this.state.data = []

            for(i = 0; i < pageCount; i ++) {
                this.state.data.push(i)
            }

            this.state.isDataCreated = true
        }

      //  console.log(this.state.loadingState)
      //  console.log(this.state.data)

        super.componentDidMount()

        let currentNumber = parseInt(this.props.currentNumber)

        if (currentNumber > pageCount - 1) {
            currentNumber = pageCount - 1
        }

        currentNumber = currentNumber - 2

        if (currentNumber > 0) {
            this.scrollToN(currentNumber)
        }
        

    }

    onReadyElement (element, index, array) {

        const currentNumber = parseInt(this.props.currentNumber)



        return (
            <div 
                className = "page-ref-container"
                style = {

                    currentNumber == (index + 1) ?
                        {
                            border : "1px  solid green"
                        }
                    :
                        {
                            
                        }
                }

                onClick = {
                    (e) => {
                        this.props.onPageChoosen(index + 1)
                    }
                }> 
                {  (index + 1) }
            </div>
        )
    }

}

function mapStateToProps(state) {
    
    return {
        tilesNumber: "3",
        centered: true
    }
}

export default connect(mapStateToProps)(PageSwitchSliderComponent)