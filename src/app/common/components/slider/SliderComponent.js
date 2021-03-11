import React, {Component} from "react"

import ReloadableComponent from "../loading-component/ReloadableComponent"

import "./styles/slider-styles.css"

// selectable (means selectable item)
// tilesNumber
// centered
// isControlOutside

class SliderComponent extends ReloadableComponent {

    constructor(props) {
        super(props)

        this.sliderRef = React.createRef()
        this.sliderWrapperRef = React.createRef()
        this.itemRef = React.createRef()

        this.state = {
            ...this.state,
            
            sliderControlLeft: "",
            sliderControlRight: "slider__control_show",
            animation: "transform 0.6s ease",
            positionLeftItem: 0,
            transform: 0,

            min: 0,
            max: 0
        }

        this.handleClickLeft = this.handleClickLeft.bind(this)
        this.handleClickRight = this.handleClickRight.bind(this)
    }

    setAnimation(animation) {
        this.state.animation = animation
    }

    updateComponent() {
        
        this.state.max = this.state.data.length - 1

        this.state.sliderControlRight = "slider__control_show"
        this.state.sliderControlLeft = "slider__control_show"

        if (this.state.positionLeftItem <= this.state.min) {
            this.state.sliderControlLeft = ""
        }

      //  console.log((this.state.positionLeftItem + this.state.wrapperWidth / this.state.itemWidth - 1))
      //  console.log(this.state.max)

        if (Math.round(this.state.positionLeftItem + this.state.wrapperWidth / this.state.itemWidth - 1) >= this.state.max) {
            this.state.sliderControlRight = ""
        }


        super.updateComponent()
    }

    //  this.forceUpdate()

    resize = () => {

        if (this.state.loadingState) {
            return
        }

        this.state.wrapperWidth = parseFloat(this.state.sliderStyles.stylesSliderWrapper.width)
        this.state.itemWidth = parseFloat(this.state.sliderStyles.stylesItem.width)
        this.state.height = parseFloat(this.state.sliderStyles.stylesWrapper.height)

        this.state.wrapperWidth = parseFloat(this.state.sliderStyles.stylesSliderWrapper.width)
        this.state.itemWidth = parseFloat(this.state.sliderStyles.stylesItem.width)
        this.state.height = parseFloat(this.state.sliderStyles.stylesWrapper.height)

        this.state.step = (this.state.itemWidth / this.state.wrapperWidth) * 100

        this.updateComponent()
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    componentDidMount() {

        if (this.state.loadingState) {
            return
        }

        if (!this.state.data || this.state.data.length === 0) {
            return
        }

        this.state.sliderStyles = {
            stylesSliderWrapper : getComputedStyle(this.sliderWrapperRef.current),
            stylesItem : getComputedStyle(this.itemRef.current),
            stylesWrapper : getComputedStyle(this.sliderRef.current)

        }

        window.addEventListener('resize', this.resize) // it takes current state snapshot

        this.state.wrapperWidth = parseFloat(this.state.sliderStyles.stylesSliderWrapper.width)
        this.state.itemWidth = parseFloat(this.state.sliderStyles.stylesItem.width)
        this.state.height = parseFloat(this.state.sliderStyles.stylesWrapper.height)

   //   console.log("stylesWrapper.height = " + stylesWrapper.height)
        
        
        
    //  console.log(this.state.itemWidth)

        
        this.state.step = (this.state.itemWidth / this.state.wrapperWidth) * 100
        this.state.halfWidth = (this.state.wrapperWidth / 2)
        this.state.max = this.state.data.length - 1

        // fires componentDidUpdate
        this.updateComponent()

    }

    isItTheMostLeft() {
        return this.state.positionLeftItem <= this.state.min
    }

    isItTheMostRight() {
        return Math.round(this.state.positionLeftItem + this.state.wrapperWidth / this.state.itemWidth - 1) >= this.state.max
    }


    handleClickLeft() {

        if (this.state.positionLeftItem <= this.state.min) {
            return
        }

        this.state.positionLeftItem--
        this.state.transform += this.state.step
    }

    handleClickRight() {

        if (Math.round(this.state.positionLeftItem + this.state.wrapperWidth / this.state.itemWidth - 1) >= this.state.max) {
            return
        }

        this.state.positionLeftItem ++
        this.state.transform -= this.state.step
    }


    scrollToN(n) {
        if (Math.round(this.state.positionLeftItem + this.state.wrapperWidth / this.state.itemWidth - 1) >= this.state.max) {
            return
        }

        if (n > 0) {
            for(var i = 0; i < n; i ++){
                this.state.positionLeftItem ++
                this.state.transform -= this.state.step
            }
        } else {

            for(var i = 0; i < Math.abs(n); i ++){
                this.state.positionLeftItem--
                this.state.transform += this.state.step
            }

           
        }

        

        this.setAnimation("")
        this.updateComponent()
    }

    handleClickRightToBorder() {
        if (Math.round(this.state.positionLeftItem + this.state.wrapperWidth / this.state.itemWidth - 1) >= this.state.max) {
            return
        }

        while(!(Math.round(this.state.positionLeftItem + this.state.wrapperWidth / this.state.itemWidth - 1) >= this.state.max)) {

            this.state.positionLeftItem ++
            this.state.transform -= this.state.step
        }


        this.updateComponent()

    }

    onReadyElement(element, index, array) {
        return <>
            <label>index = {index}</label><br/>
        </>
    }


    isSelectable(element) {
        return true
    }

    deselectAll() {

        this.state.data.map((element, index, data) => {
            if (!element.add) {
                element.isSelected = false
            }
        })
    }

    checkSelected() {
        this.state.data.map((element, index, data) => {
            if (!element.add) {
                if (!this.isSelectable(element)) {
                    element.isSelected = false
                    this.onChangeSelectStatus()
                }
            }
        })
    }

    onChangeSelectStatus() {

    }

    componentDidUpdate() {
        if (!this.state.data || this.state.data.length === 0) {
            return
        }

        this.checkSelected()
    }

    onSelectTile(element) {

    }

    renderContent() {

       
        if (!this.state.data || this.state.data.length === 0) {
            return <span></span> // should be smth other
        }


        const incomingData = this.state.data
        const renderItems = []
        const tzis = this

        

        const tilesNumber = parseInt(this.props.tilesNumber)
        const percents = ((1.0 / tilesNumber) * 100) + "%"

      //  console.log("percents = " + percents)

        incomingData.map((element, index, array) => {
            renderItems.push(
                {
                    item: (
                        <div 
                            key = {index}
                            className="slider__item__container" 

                            ref={ index === 0 ? tzis.itemRef : React.createRef() }

                            onClick = {
                                (event) => {

                                    if (!this.props.selectable) {
                                        return
                                    }

                                    if (!element.add && this.isSelectable(element)) {
                                        if (element.isSelected) {
                                            element.isSelected = false
                                        } else {
                                            this.deselectAll()
                                            element.isSelected = true
                                        }

                                        this.onChangeSelectStatus()
                                        this.onSelectTile(element)
                                        this.updateComponent()

                                    }
                              //      console.log("slider__item__container")
                                }
                            }

                            style = {

                                this.props.selectable && element.isSelected ?

                                {
                                    border: "1px  solid red",

                                    flex: "0 0 " + percents,
                                    maxWidth: percents
                                }

                                :

                                {
                                    flex: "0 0 " + percents,
                                    maxWidth: percents
                                }
                            }>

                            {
                                this.onReadyElement(element, index, incomingData)
                            }

                            
                        </div>
                    ),
    
                    position: index,
                    transform: 0
                }
            )

        }) 

        const controls = this.state.data.length > 1 ? 
            (
                <>
                    <a 
                        className= {"slider__control slider__control_left " + this.state.sliderControlLeft }
                        role="button" 
                        onClick={(e) => 
                            {
                                this.setAnimation("transform 0.6s ease")
                                this.handleClickLeft(e)
                                this.updateComponent()
                                
                            }
                        }>
                    </a>

                    <a 
                        className= {"slider__control slider__control_right " + this.state.sliderControlRight }
                        role="button" 
                        onClick={(e) => 
                            {
                                this.setAnimation("transform 0.6s ease")
                                this.handleClickRight(e)
                                this.updateComponent()
                            } 
                        }> 
                    </a>
                </>
            )
            :
            null


        let transition = this.state.transform
        let animation = this.state.animation

        // centered effect on slider__wrapper div
        if (this.props.centered && this.state.data.length <= this.props.tilesNumber) {
            transition = 50 - (this.state.data.length / 2) * this.state.step
            animation = ""
        }

        let sliderStyle = { ...this.props.style }

        if (this.props.isControlOutside || this.state.isControlOutside) {
            sliderStyle= {
                ...this.props.style,
                paddingLeft: "40px",
                paddingRight: "40px"
            }
        }

        return (
            
            <div 
                style = {sliderStyle}
                className="slider"
                ref = {
                    this.sliderRef
                }
            >
                <div 
                    className="slider__wrapper" 
                    style = {
                        {
                            //transform: "translateX(" + this.state.transform + "%)",
                            transform: "translateX(" + transition + "%)",
                            transition: animation,
                        }
                    } 

                    ref = {
                        this.sliderWrapperRef
                    }
                >

                    {
                       renderItems.map((val, index, arr) => {
                           return val.item
                       })  
                    }
                </div>

                {
                    controls
                }
                

            </div>

        )
    }   

}

export default SliderComponent