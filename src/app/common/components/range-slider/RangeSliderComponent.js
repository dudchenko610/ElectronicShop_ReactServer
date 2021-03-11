import React, { Component } from "react"

import EditComponent from "../edit/EditComponent"

import "./styles/range-slider-styles.css"

class RangeSliderComponent extends EditComponent {


    constructor(props) {
        super(props)

        this.state = {
            ...this.state,

            sliderRef : React.createRef(),
            inputLeftRef : React.createRef(),
            inputRightRef : React.createRef(),

            thumbRight: {
                ref: React.createRef(),
                classNameClick: "",
                classNameOver: ""
            },

            thumbLeft: {
                ref: React.createRef(),
                classNameClick: "",
                classNameOver: ""
            },

            left: {
                percent: "0%",
                value: 0,
                prevVal: 0
            },

            right : {
                percent: "0%",
                value: 100000,
                prevVal: 100000
            },

            min: 0,
            max: 100000

        }

        this.onChangeLeft = this.onChangeLeft.bind(this)
        this.onChangeRight = this.onChangeRight.bind(this)

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
        
        this.onValuesChanged()
        this.updateComponent()
    }

    onValuesChanged(dir = false) {
        const min = parseInt(0)
        const max = this.state.max

        if (!this.state.sliderRef.current) {
            return;
        }

        const width = parseInt(getComputedStyle(this.state.sliderRef.current).width)
        const handleWidth = 30

        const percentDevidedBy100L = ((this.state.left.value  - min) / (max - min)) 
        const percentDevidedBy100R = ((this.state.right.value - min) / (max - min)) 

        const tk =  (handleWidth / width) * this.state.max // ticks that thumb ocuppies
        const k = (handleWidth / width) * 100 // percent that thumb occupies
        const m = 100 - k

        const percNewL = percentDevidedBy100L * m
        this.state.left.percent = percNewL + "%"

        let percNewR = percentDevidedBy100R * m
        percNewR = m - percNewR
        this.state.right.percent = percNewR + "%"


        const lR = percNewL + k
        const rL = percentDevidedBy100R * m

        if (rL < lR) { // from left to right
            
            console.log("collision")

            if (!dir) {
                this.state.left.percent = (percentDevidedBy100R * m - k) + "%"
                this.state.left.value = parseInt(((percentDevidedBy100R * m - k) / m) * max)
            } else {
                const gg = m - percNewL - k
                this.state.right.percent = gg + "%"
                this.state.right.value = this.state.max - parseInt((gg / m) * this.state.max)
            }
            

            if (this.state.right.value >= this.state.max) {
                this.state.right.value = this.state.max
                this.state.right.percent = "0%"
        
                this.state.left.value = parseInt(((m - k) / m) * this.state.max)
                this.state.left.percent = (m - k) + "%"
            }

            if (this.state.left.value <= 0) {
                this.state.left.value = 0
                this.state.left.percent = "0%"

                this.state.right.value = parseInt((k / m) * this.state.max)
                this.state.right.percent = (m - k) + "%"
            }
            
        } 

        if (this.state.right.value > this.state.max) {
            this.state.right.value = this.state.max
            this.state.right.percent = "0%"
        }

        if (this.state.left.value < 0) {
            this.state.left.value = 0
            this.state.left.percent = "0%"
        }

    }


    updateThumbs() {

        const min = parseInt(0)
        const max = this.state.max
        const width = parseInt(getComputedStyle(this.state.sliderRef.current).width)
        const handleWidth = 30

        const percentDevidedBy100L = ((this.state.left.value  - min) / (max - min)) 
        const percentDevidedBy100R = ((this.state.right.value - min) / (max - min)) 

        const tk =  (handleWidth / width) * max // ticks that thumb ocuppies
        const k = (handleWidth / width) * 100 // percent that thumb occupies
        const m = 100 - k

        const percNewL = percentDevidedBy100L * m
        this.state.left.percent = percNewL + "%"

        let percNewR = percentDevidedBy100R * m
        percNewR = m - percNewR
        this.state.right.percent = percNewR + "%"


        const lR = percNewL + k
        const rL = percentDevidedBy100R * m

      //  console.log(lR + "   " + rL)

        const moveLeftThumbToRight = (this.state.left.value - this.state.left.prevVal) > 0
        const moveRightThumbToLeft = (this.state.right.value - this.state.right.prevVal) < 0

    //    console.log("moveLeftThumbToRight = " + moveLeftThumbToRight)
      //  console.log("moveRightThumbToLeft = " + moveRightThumbToLeft)

        if (moveLeftThumbToRight && rL < lR) { // from left to right
            
            const gg = m - percNewL - k
            this.state.right.percent = gg + "%"
            this.state.right.value = max - parseInt((gg / m) * max)
                

            if (this.state.right.value >= max) {
                this.state.right.value = max
                this.state.right.percent = "0%"
        
                this.state.left.value = parseInt(((m - k) / m) * max)
                this.state.left.percent = (m - k) + "%"
            }

            
        } 

        if (moveRightThumbToLeft && rL < lR) {
            this.state.left.percent = (percentDevidedBy100R * m - k) + "%"
            this.state.left.value = parseInt(((percentDevidedBy100R * m - k) / m) * max)

            if (this.state.left.value <= 0) {
                this.state.left.value = 0
                this.state.left.percent = "0%"

                this.state.right.value = parseInt((k / m) * max)
                this.state.right.percent = (m - k) + "%"
            }
        }

       /* */

        this.state.right.prevVal = this.state.right.value
        this.state.left.prevVal = this.state.left.value


    }

    onChangeLeft(event) {

        const value = event.target.value

        this.state.left.prevVal = this.state.left.value
        this.state.left.value = value //=  Math.min(parseInt(value), parseInt(this.state.right.value) - 1)

        this.updateThumbs()
        this.updateComponent()
    }

    onChangeRight(event) {

        const value = event.target.value

        this.state.right.prevVal = this.state.right.value
        this.state.right.value = value //=  Math.min(parseInt(value), parseInt(this.state.right.value) - 1)

        this.updateThumbs()
        this.updateComponent()
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize) // it takes current state snapshot
        
        const inputLeft = this.state.inputLeftRef.current
        const inputRight = this.state.inputRightRef.current

        inputLeft.addEventListener("mouseover", () => {
            this.state.thumbLeft.classNameOver = "hover"
            this.updateComponent()
        })
        inputLeft.addEventListener("mouseout", () => {
            this.state.thumbLeft.classNameOver = ""
            this.state.thumbLeft.classNameClick = ""
            this.updateComponent()
        })
        inputLeft.addEventListener("mousedown", () => {
            this.state.thumbLeft.classNameClick = "active"
            this.updateComponent()
        })
        inputLeft.addEventListener("mouseup", () => {
            this.state.thumbLeft.classNameClick = ""
            this.updateComponent()
        })



        inputRight.addEventListener("mouseover", () => {
            this.state.thumbRight.classNameOver = "hover"
            this.updateComponent()
        })
        inputRight.addEventListener("mouseout", () => {
            this.state.thumbRight.classNameOver = ""
            this.state.thumbRight.classNameClick = ""
            this.updateComponent()
        })
        inputRight.addEventListener("mousedown", () => {
            this.state.thumbRight.classNameClick = "active"
            this.updateComponent()
        })
        inputRight.addEventListener("mouseup", () => {
            this.state.thumbRight.classNameClick = ""
            this.updateComponent()
        })
        

    }

    render() {
        return (

            <div 
                className="multi-range-slider"
                style = { this.props.style }
                ref = { this.state.sliderRef }

                onMouseOver = {
                    (event) => {
                     //   console.log("MOUSE OVER")
                    }
                }
            >

                    <input 
                        ref = {this.state.inputLeftRef}
                        className = "input-left-clss"
                        name= "leftValue2"
                        type="range" 
                        id="input-left" 
                        min = { this.state.min } 
                        max = { this.state.max } 
                        value = {this.state.left.value}

                        
                        onChange = {  this.onChangeLeft }
                    />


                    <input 
                        ref = {this.state.inputRightRef}
                        className = "input-right-clss"
                        name= "rightValue2"
                        type="range" 
                        id="input-right" 
                        min = { this.state.min } 
                        max = { this.state.max } 
                        value = {this.state.right.value}
                     //   defaultValue="75"
                        onChange = { this.onChangeRight }
                    />

                    <div 
                        className="range-slider"
                        >
                        <div 
                            className="track"
                        />

                        <div 
                            className="range"

                            style = {
                                {
                                    left: this.state.left.percent,
                                    right: this.state.right.percent
                                }
                            }
                        />

                        <div 
                            className = { "thumb left " + this.state.thumbLeft.classNameClick + " " + this.state.thumbLeft.classNameOver }
                            
                            style = {
                                {
                                    left: this.state.left.percent
                                }
                            }

                            ref = {
                                this.state.thumbLeft.ref
                            }

                            

                        />

                        <div 
                            className = { "thumb right " + this.state.thumbRight.classNameClick + " " + this.state.thumbRight.classNameOver }
                            
                            style = {
                                {
                                    right: this.state.right.percent
                                }
                            }

                            ref = {
                                this.state.thumbRight.ref
                            }
                        />
                    </div>

                    
                </div>
            
        )
    }
}


export default RangeSliderComponent