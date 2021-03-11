import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { sendMessageAction, getMessagesAction } from "../actions/message-actions"

import MessagesFillingListComponent from "./MessagesFillingListComponent"
import ListComponent from "../../../../../common/components/list-wrapper/ListComponent"
import ProgressBar from "../../../../../common/components/ProgressBar"

import "./styles/messages-list-styles.css"
import { LOAD_STATES } from "../../../../../../core/load-states"


class MessagesListComponent extends ListComponent {

    constructor(props) {
        super(props)

        this.disableScroll = false
      //  this.scrollToBottom = true
        this.pbContainerRef = React.createRef()

        this.state = {
            ...this.state,
         //   isReverse: true,

            messageModelState: null
           
        }

    }

    componentDidMount() {
        // get first messages
        this.getData("")
    }

    onScroll(e) {
        

        let innerListHeight = 0
        if (this.innerListRef.current) {
            innerListHeight = this.innerListRef.current.clientHeight
        
        }

        let scrollTop = e.target.scrollTop


        const target = e.target


      //  console.log("scrollTop = " + scrollTop)

        const maxScrollY = (target.scrollHeight - target.clientHeight)
    //    console.log("maxScrollY = " + maxScrollY)



        const cnctInfo = this.props.chatReducer.currentChatModel.contactInfo
        const messagesModel = cnctInfo.messagesModel

/*

        if(target.clientHeight + scrollTop >= target.scrollHeight - 5) {
            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        } 
*/
        if (messagesModel.gettingMessageState === LOAD_STATES.READY && messagesModel.hasMore ) {
            if (this.scrollViewRef.current) {
                const wrapperPbHeight = this.pbContainerRef.current.clientHeight

                /*
                let scrollTop = 0
                if (this.scrollViewRef.current) {
                    scrollTop = this.scrollViewRef.current.scrollTop
                }*/



              //  console.log("scrollX = " + target.scrollX)

          //      console.log("wrapperPbHeight = " + wrapperPbHeight)

                  

                if (scrollTop < wrapperPbHeight) {
                    this.getData(messagesModel.messages[0].id)
                }

                

                
            }
            
        
        }

        

    }

    onNone() {
        return <p>You have not any messages still</p>
    }

    onEmptyList() {
        return <p>You have not any messages still</p>
    }
    

    onFailed() {
        return (
            <div>
                <p>Failed First time and repeat should be</p>
                <a
                    onClick = {
                        (e) => {
                            this.getData()
                        }
                    }
                >Repeat</a>
            </div>
        )
    }

    onReadyElement(obj, index, array) {

        if (array.length === 1) {
            return (
                <MessagesFillingListComponent
                    state = { LOAD_STATES.READY }
                    data = {  this.props.chatReducer.currentChatModel.contactInfo.messagesModel.messages }
                    key = { 1 }
                />
            )
        }

        switch(index) {
            case 0:
                return (
                    <div 
                        className = "pb-messages-container"
                        ref = { this.pbContainerRef }
                        key = { 0 }
                    >
                        <ProgressBar sqSize= "35" phase = {Math.random() * 100} strokeWidth = "1"/>

                       
                    </div>
                )
            case 1:
                return (
                    <MessagesFillingListComponent
                        state = { LOAD_STATES.READY }
                        data = { this.props.chatReducer.currentChatModel.contactInfo.messagesModel.messages }
                        key = { 1 }
                    />
                )

            default:
                return null
        }
    }


    getData(lastMessageId = "") {

        const cnctInfo = this.props.chatReducer.currentChatModel.contactInfo

        if (cnctInfo) {
            const contactInfo = {
                user: {
                    ...cnctInfo.user,
                    imageModel: null
                }
            }
    
            const getMessagesRequest = {
                contactInfo: contactInfo,
                messageId: lastMessageId
            }
    
    
            this.props.getMessages(getMessagesRequest)
        }

        
    }


    componentDidUpdate(prevProps, prevState, snapshot) {


        const cnctInfo = this.props.chatReducer.currentChatModel.contactInfo
        const messagesModel = cnctInfo.messagesModel

        if (messagesModel.state === LOAD_STATES.NONE && messagesModel.hasMore) {
            this.getData("")
            return
        }   

        let innerListHeight = 0
        if (this.innerListRef.current) {
           innerListHeight = this.innerListRef.current.clientHeight
        }
    
        let scrollbarHeight = 0
        if (this.scrollViewRef.current) {
            scrollbarHeight = this.scrollViewRef.current.scrollHeight
        }

        if (this.props.count - prevProps.count > 1) {

         //   console.log("400000000000000")

   //         const wrapperPbHeight = (this.props.count - prevProps.count) < 10 ? 36 : 0
            let value = (this.props.count - prevProps.count) * 40 

            if (!messagesModel.hasMore) {
                const wrapperPbHeight = 36
                value -= wrapperPbHeight
            }

            this.scrollViewRef.current.scrollTop += value


        } else if (this.props.count - prevProps.count == 1) { // new message, I wrote the message

            const lastMessage = messagesModel.messages[messagesModel.messages.length - 1]

            if (!lastMessage.id || lastMessage.came) {
                const maxScrollY = (this.scrollViewRef.current.scrollHeight - this.scrollViewRef.current.clientHeight)
                this.scrollViewRef.current.scrollTop = maxScrollY
            }

        //    const maxScrollY = (this.scrollViewRef.current.scrollHeight - this.scrollViewRef.current.clientHeight)
          //  this.scrollViewRef.current.scrollTop = maxScrollY

        }

        
        if (this.props.scrollToBottom) {
            const maxScrollY = (this.scrollViewRef.current.scrollHeight - this.scrollViewRef.current.clientHeight)
            this.scrollViewRef.current.scrollTop = maxScrollY
        }

        
        if (innerListHeight < scrollbarHeight) {
        
            if (messagesModel.gettingMessageState === LOAD_STATES.READY && messagesModel.hasMore ) {
                this.getData(messagesModel.messages[0].id)
            }
        }
        
    }
  
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            sendMessage : sendMessageAction,
            getMessages : getMessagesAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

//    console.log(state.chatReducer)

    const currentMessageModel = state.chatReducer.currentChatModel.contactInfo.messagesModel

    const response = {
        chatReducer : state.chatReducer,
    //    state: LOAD_STATES.READY
        state: state.chatReducer.currentChatModel.contactInfo.messagesModel.state,
        count: state.chatReducer.currentChatModel.contactInfo.messagesModel.messages.length

    }

    if (currentMessageModel.hasMore) {
        response.data = [ {attr: "pb"},  {attr: "filling messages"}, {} ]
    } else {
        response.data = [ {attr: "filling messages"} ]
    }

    return response
}

export default connect(mapStateToProps, matchDispatchToProps)(MessagesListComponent)

