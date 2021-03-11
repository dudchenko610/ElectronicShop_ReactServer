import React from "react"

import SliderComponent from "../../../components/slider/SliderComponent"

class ImageViewSliderComponent extends SliderComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            isLoaded: false,

            data: [{}, {}]

        }
    }

    componentDidMount() {

        if (!this.state.isLoaded) {
            this.state.isLoaded = true

            this.state.data = this.props.data
        }

        super.componentDidMount()
    }


   /* onReadyCustomElement(imageModel, index) {   

        return (
            <></>
        )
    }*/
}

export default ImageViewSliderComponent