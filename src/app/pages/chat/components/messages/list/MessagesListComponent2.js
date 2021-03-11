import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { sendMessageAction, getMessagesAction } from "../actions/message-actions"

import MessagesFillingListComponent from "./MessagesFillingListComponent"
import ListComponent from "../../../../../common/components/list-wrapper/ListComponent"
import ProgressBar from "../../../../../common/components/ProgressBar"

import "./styles/messages-list-styles.css"
import { LOAD_STATES } from "../../../../../../core/load-states"
import { insertAt } from "../../../../../../core/array-methods"


class MessagesListComponent2 extends ListComponent {

    constructor(props) {
        super(props)

        this.scrollToBottom = true
        this.pbContainerRef = React.createRef()

        this.state = {
            ...this.state,
           // isReverse: true,

            size: 20
           
        }

    }


    onScroll(e) {
        
        const obj = {
            scrollBottom: e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop,
            scrollTop: e.target.scrollTop,
            scrollHeight: e.target.scrollHeight,
            clientHeight: e.target.clientHeight
        }
      //  console.log(obj)

        // save handle data here

        let innerListHeight = 0
        if (this.innerListRef.current) {
            innerListHeight = this.innerListRef.current.clientHeight
        
        }

        let scrollTop = 0
        if (this.scrollViewRef.current) {
            scrollTop = this.scrollViewRef.current.scrollTop
        }

       // console.log("onScroll, scrollTop = " + scrollTop)
       // console.log("offsetHeight = " + this.scrollViewRef.current.offsetHeight)

 
        
      /*  this.setState
        (
            function (state, props) {
                return {
                    ...state,
                    handleData: {
                        ...state.handleData,
                        contentHeight: innerListHeight,
                        scrollTop: scrollTop,
                    }
                }
            }
        )*/

        if (scrollTop == 0 ) {
            const start = this.props.data[0].ind
            for (var i = 0; i < 10; i ++) {
                insertAt( this.props.data, 0, { ind: start + i + 1 })
            }

            this.updateComponent()

        }

        

    }

    onNone() {
        return <p>You have not any messages still</p>
    }

    onEmptyList() {
        return <p>You have not any messages still</p>
    }
    

    onFailed() {
        return <p>Failed First time and repeat should be</p>
    }

    onReadyElement(obj, index, array) {

        if (index == array.length - 1) {
            console.log("onReadyElement")
        }

        return (
            <div
                key = { index }
                style = { { height: "40px" } }
                onClick = {
                    (e => {
                        this.scrollViewRef.current.scrollTo(0, 400)


                  //   this.scrollViewRef.current.scrollTo(0, -100)

                    })
                }
            >
                { obj.ind }
            </div>
        )

        
    }

    componentDidMount() {

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };


        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );

        this.observer.observe(this.scrollViewRef.current);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;

        console.log("handleObserver")
        console.log(entities[0].boundingClientRect)

    }
 
   
    componentDidUpdate(prevProps, prevState, snapshot) {

        // check for handle position

        let innerListHeight = 0
        if (this.innerListRef.current) {
           innerListHeight = this.innerListRef.current.clientHeight
        
        }

        let scrollbarHeight = 0
        if (this.scrollViewRef.current) {
            scrollbarHeight = parseInt(getComputedStyle(this.scrollViewRef.current).height)
        }

        let scrollTop = 0
        if (this.scrollViewRef.current) {
            scrollTop = this.scrollViewRef.current.scrollTop
        }

        console.log("before")

        this.scrollViewRef.current.scrollTop = 400

        if (prevState.size != this.state.size) {
            const maxScrollY = (this.scrollViewRef.current.scrollHeight - this.scrollViewRef.current.clientHeight)
            console.log("____ maxScrollY = " + maxScrollY)

            console.log("previous size = " + prevState.size)
            console.log("current size = " + this.state.size)
            console.log("current length = " + this.props.data.length)



            const val = scrollTop + 400

            console.log("val = " + val)

       /*     setTimeout(() => {
                this.scrollViewRef.current.scrollTo(0, 400)
            }, 100)*/

        }

     /*   if (prevState.handleData.contentHeight != innerListHeight) {

            if (prevState.handleData.contentHeight == 0) {
                return 
            }
        


            return
        }*/

 
        
    }
  
}



function mapStateToProps(state) {

    const data = []

    for (var i = 20; i > 0; i --) {
        data.push({ind: i})
    }

    return {
        data : data,
        state: LOAD_STATES.READY
    }
}

export default connect(mapStateToProps)(MessagesListComponent2)



