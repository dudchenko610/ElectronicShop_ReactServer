import React from "react"

import AddableSliderComponent from "../addable-slider/AddableSliderComponent"
import ImageChooseComponent from "../../../components/image-choose/ImageChooseComponent"

import {ImageModel} from "../../../components/image/data-model/ImageModel"
import { LOAD_STATES } from "../../../../../core/load-states"

//import "./styles/upload-image-styles.css"

// onNextFileChoosen()

class UploadImageSliderComponent extends AddableSliderComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            data : [
                {
                    imageModel: new ImageModel()
                }
                
            ],
          //  loadingState : true

        }

    }

    onChangeSelectStatus() {
        this.onImageChoose()
    }

    onImageChoose() {
        const imageModels = []
        this.state.data.map((element, index, array) => {
            if (!element.add && element.imageModel.img) {

               // console.log("rearrange")

                element.imageModel.isMain = false
                if (element.isSelected) {
                    element.imageModel.isMain = true
                }

                imageModels.push(element.imageModel)
            }
        })

        this.props.onImageChoose(imageModels, this.state.data)
    }

    areAllSelected() {

        let res = true

        this.state.data.map((el, ind, arr) => {

            if (!el.add && !el.imageModel.img) {
                res = false
            }
        })

        return res
    }

    

    onAddClicked(element, index) {
    
        this.hideAddButton()

        this.state.data.push({
            imageModel: new ImageModel()
        })

        this.updateComponent()
    }

    isSelectable(element) {
        return element.imageModel.img
    }


    onReadyCustomElement(element, index) {    

        return (
            <div
                style = {{
                    height: this.state.height + "px",
                    width: this.state.itemWidth + "px"
                }}
            >

                <ImageChooseComponent
                    imageModel = {element.imageModel}
                    

                    stopPropagation = { true }

                    style = {{
                        height: "90%",
                        width: "100%"
                    }}

                    onFileChoosen = {
                        file => {

                            if (this.areAllSelected()) {

                                this.showAddButton()
                                this.setAnimation("transform 0.6s ease")
                                this.handleClickRightToBorder()

                            }

                            this.updateComponent()
                            this.onImageChoose()
                        }
                    }

                    onFileDetached = {
                        () => {

                            if(this.isItTheMostRight() & this.hideAddButton()) {
                                this.setAnimation("")
                                this.handleClickLeft()
                            }
                            
                            this.updateComponent()
                            this.onImageChoose()
                        }
                    }
                />

                {
                    (this.state.data.length > 1 && !this.state.addElem.added) || this.state.data.length > 2
                    ? 
                        (
                            <a 
                                onClick = { 
                                    event => {
                                       
                                        const len = this.state.data.length

                                        this.state.data.splice(index, 1)
                                        this.state.max = this.state.data.length - 1

                                        if (len > 2) {
                                            this.setAnimation("")
                                            this.handleClickLeft()
                                        }

                                        if (this.areAllSelected()) {
                                            this.showAddButton()
                                        }

                                        this.updateComponent()
                                        this.onImageChoose() 
                                    }
                                }
                            >Remove</a>
                        ) 
                    : 
                        ("")
                }
                
                
            </div>

            
        )

    }

}

export default UploadImageSliderComponent