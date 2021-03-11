import React, { Component } from "react"
import ProgressBar from "../ProgressBar"

import ReloadableComponent from "../loading-component/ReloadableComponent"

import {LOAD_STATES} from "../../../../core/load-states"

import "./styles/list-styles.css"

//isReverse
class ListComponent extends ReloadableComponent {

    constructor(props) {
        super(props)

        this.scrollViewRef = React.createRef()

     
        this.innerListRef = React.createRef()

        this.state = {
            ...this.state,
            
        }
    }

    onScrollbarStyles() {
        return {

        }
    }


    onNone() {
        return <p>None</p>
    }

    onFailed() {
        return <p>Failed</p>
    }

    onLoading() {
        return <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>
    }

    onEmptyList() {
        return <label>Empty</label>
    }

    onReadyElement(element, index, array) {
        return <>
            <label>index = {index}</label><br/>
        </>
    }

    onFormList() {

    }

    onScroll(e) {
       /* console.log("scrollBottom = " + (parseInt(e.target.scrollTop) + parseInt(e.target.clientHeight)));
        console.log("scrollTop = " + e.target.scrollTop);
        console.log("scrollHeight = " + e.target.scrollHeight);
        console.log("clientHeight = " + e.target.clientHeight);*/
    }

    onScrollbarId() {
        return null
    }
    
    renderContent () {

        let scrollbarStyle = " "

        if (this.props.isReverse || this.state.isReverse) {
            scrollbarStyle += "scrollbar-reverse "
        }

        return (
            <div className= { "scrollbar" + scrollbarStyle } style = {this.onScrollbarStyles()} id="style" onScroll=
                {
                    e => { this.onScroll(e) }
                }
                ref = { this.scrollViewRef }
                
            >

                <div className="force-overflow"></div>

                
                <div 
                    className = "inner-list" 
                    ref = { this.innerListRef }
                >

                    {
                        this.props.data.map((element, index, array) => {
                            return this.onReadyElement(element, index, array)
                        })
                    }
                </div>

            </div>
        )

    }
}

export default ListComponent