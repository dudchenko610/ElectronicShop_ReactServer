import React, { Component } from "react"

import "./styles/expandable-styles.css"

// contentJSX
// buttonLabel
// buttonStyle
// isExpanded

class ExpandableComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buttonClass: "",
            contentMaxHeight: 0,

            isLoaded: false, 

            contentRef: React.createRef()
        }
    }

    updateComponent() {
        this.setState
        (
            function (state, props) {
                return {
                    ...state
                }
            }
        )
    }

    resize = () => {

        if (this.state.contentMaxHeight != 0) {

            if (this.state.contentRef.current) {
                this.state.contentMaxHeight = this.state.contentRef.current.scrollHeight + "px"
            }
        }

        this.updateComponent()
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)

        if (this.props.isExpanded) {
            this.state.buttonClass = "--active"
            this.state.contentMaxHeight = this.state.contentRef.current.scrollHeight + "px"
            this.updateComponent()
        }

    }

    render() {

       // console.log("render = " + this.state.contentMaxHeight)

        

        return (

            <div 
                className = "accordion"
            >
                <button 
                    type = "button"
                    className = {"accordion__button" + this.state.buttonClass}
                    onClick = {
                        (event) => {
                            if (!this.state.buttonClass) {
                                this.state.buttonClass = "--active"
                                this.state.contentMaxHeight = this.state.contentRef.current.scrollHeight + "px"
                            } else {
                                this.state.buttonClass = ""
                                this.state.contentMaxHeight = 0
                            }

                          //  console.log(this.state.contentRef)

                            this.updateComponent()
                        }
                    }
                >{this.props.buttonLabel}</button>

                <div
                    ref = { this.state.contentRef }
                    className = "accordion__content"
                    style = {
                        {
                            maxHeight: this.state.contentMaxHeight
                        }
                    }
                >
                    {
                        this.props.contentJSX
                    }
                </div>

            </div>
        )
    }

}

/**
 * <p>
                        Lorem ipsum dolor sit amsmod tempor incididunt ut labore et dsLorem ipsum dolor sit amsmod tempor incididunt ut labore et dsLorem ipsum dolor sit amsmod tempor incididunt ut labore et dsLorem ipsum dolor sit amsmod tempor incididunt ut labore et dsLorem ipsum dolor sit amsmod tempor incididunt ut labore et dsLorem ipsum dolor sit amsmod tempor incididunt ut labore et dsLorem ipsum dolor sit amsmod tempor incididunt ut labore et ds
                    </p>
 */

export default ExpandableComponent