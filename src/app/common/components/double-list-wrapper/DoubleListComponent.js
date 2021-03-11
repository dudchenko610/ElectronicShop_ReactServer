import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import ProgressBar from "../ProgressBar"
import {LOAD_STATES} from "../../../../core/load-states"

import {listDidMountAction, listWillUnmountAction, expandItemAction} from "./actions/double-list-actions"

import "./styles/double-list-styles.css"

class DoubleListComponent extends Component {

    static COUNTER = 0

    constructor(props) {
        super(props)

        DoubleListComponent.COUNTER ++
        this.doubleListId = DoubleListComponent.COUNTER

        const upperWithExpandOpts = new Map()
        this.state = {
            upperWithExpandOpts : upperWithExpandOpts
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

    onReadyUpperElement(element, index, array, isExpanded) {
        return <>
            <label>upper index = {index}</label><br/>
        </>
    }

    onReadyLowerElement(lowerElement, upperElement, index, array) {
        return <>
            <label>lower index = {index}</label><br/>
        </>
    }

    onPrepareLowerElements(upperElement) {

        return []
    }



    onUpperElementStyle(upperElement) {
        return {

        }
    }

    onScrollbarStyles() {
        return {

        }
    }



    isUpperExpanded(upperElement) {

        const mappedVal = this.state.upperWithExpandOpts.get(upperElement)
        if (mappedVal) {
            if (mappedVal.expanded) {
                return true
            }
        }

        return false
    }


    componentDidMount() {
        this.props.listDidMount(this.doubleListId, this.state.upperWithExpandOpts)
    }
  
    componentWillUnmount() {
        this.props.listWillUnmount(this.doubleListId)
    }

    render () {

        var renderData_JSX = null

        switch (this.props.state) {
            case LOAD_STATES.NONE:
                renderData_JSX = (
                    <div className = "center-notification-pb-txt">
                        {this.onNone()}
                    </div>
                )
                break
            case LOAD_STATES.LOADING:
                renderData_JSX = (
                    <div className = "center-notification-pb-txt">
                        {this.onLoading()}
                    </div>
                )
                break
            case LOAD_STATES.READY:

                if (!this.props.dataUpper || this.props.dataUpper.length === 0) {

                    renderData_JSX = (
                        <div className = "center-notification-pb-txt">
                            {this.onEmptyList(this.doubleListId)}
                        </div>
                    )

                    break
                }

                const totalItemList_JSX = []
                
                this.props.dataUpper.map((upperElement, index, array) => {

                    const isExpanded = this.isUpperExpanded(upperElement)

                    totalItemList_JSX.push(
                        <div 
                            style = 
                            {
                                this.onUpperElementStyle(upperElement)
                            } 
                            onClick = 
                            {
                                event => {
                                    this.props.expandItem(upperElement, this.doubleListId)
                                }
                            }
                            key = {index}>

                            {this.onReadyUpperElement(upperElement, index, array, isExpanded)}

                        </div>
                    )

                    
                    if (isExpanded) {
                        const lowerElements = this.onPrepareLowerElements(upperElement)

                        lowerElements.map((lowerElement, index_j, array_lower) => {
                            totalItemList_JSX.push(this.onReadyLowerElement(lowerElement, upperElement, index_j, array_lower))
                        })
                    }

                })

                renderData_JSX = (
                    <div className="scrollbar" style = {this.onScrollbarStyles()} id="style" onScroll=
                        {
                            e => {
                                //  console.log("scrollTop = " + e.target.scrollTop);
                                //  console.log("scrollHeight = " + e.target.scrollHeight);
                                //  console.log("clientHeight = " + e.target.clientHeight);
                            }
                        }>

                        <div className="force-overflow"></div>

                        <ol className="inner-list" ref={
                            ref => {
                                this.scrollView = ref

                                if (ref && this.scrollToBottom) {
                                    this.scrollView.scrollIntoView({ block: "end", behavior: "smooth" })
                                }
                            }

                        
                            }>

                            {
                                totalItemList_JSX
                            }
                        </ol>
                    </div>
                )
                break
            case LOAD_STATES.FAILED:
                renderData_JSX = (
                    <div className = "center-notification-pb-txt">
                        {this.onFailed()}
                    </div>
                )
                break
            default:
                renderData_JSX = (
                    <div className = "center-notification-pb-txt">
                        <p>Unreachable</p>
                    </div>
                )
                break
        }

        return (
            renderData_JSX
        )

    }


}


export const matchDispatchToPropsDoubleList = () => {
    return {
        listDidMount: listDidMountAction,
        listWillUnmount: listWillUnmountAction,
        expandItem: expandItemAction
    }
    
}

export const mapStateToPropsDoubleList = state => {

    return {
        doubleListReducer: state.doubleListReducer
    }
}

export default DoubleListComponent