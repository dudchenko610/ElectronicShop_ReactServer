import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { LOAD_STATES } from "../../../../../../core/load-states"
import FillingListComponent from "../../../../../common/components/filling-list/FillingListComponent"

import LoadingComponent from "../../../../../common/components/loading-component/LoadingComponent"
import ProgressBar from "../../../../../common/components/ProgressBar"
import CommentsFillingListComponent from "./list/CommentsFillingListComponent"
import SendCommentComponent from "./list/SendCommentComponent"

import "./styles/comment-tab-styles.css"
import { getCommentsAction } from "../../../../../common/crud/comments/actions/comment-actions"



class CommentsTabComponent extends FillingListComponent {


    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            centered: false
        }
    }

    onEmptyList() {
        return this.onNone()
    }

    onNone() {

        const isAdmin = this.props.meuserReducer.isAdmin
        const isAuthenticated = this.props.meuserReducer.isAuthenticated

        return (
            <div>

                {
                     (isAuthenticated && !isAdmin) ? 
                        <SendCommentComponent
                            productId = { this.props.productId }
                        />
                    :
                        null
                }

                
                <div
                    style = {
                        {
                            width: "100%"
                        }
                    }
                >There no comments</div>
            </div>
        )
    }


    onFailed() {
        return (
            <div>
                <p>Failed First time and repeat should be</p>
                <a
                    onClick = {
                        (e) => {
                            const filter = this.props.commentsReducer.currentFilter
                            this.props.getComments(filter.productId, filter.lastCommendId)
                        }
                    }
                >Repeat</a>
            </div>
        )
    }

    onReadyElement(obj, index, array) {

        const data = Array.from( this.props.commentsReducer.content.keys() )

        const isAdmin = this.props.meuserReducer.isAdmin
        const isAuthenticated = this.props.meuserReducer.isAuthenticated

        switch(index) {
            case 0:
                return (
                    <div 
                        style = {
                            {
                                display: "flex",
                                flexDirection: "row"
                            }
                        }
                        key = { 0 }
                    >
                        
                        {
                            (isAuthenticated && !isAdmin) ? 
                                <SendCommentComponent
                                    productId = { this.props.productId }
                                />
                            :
                                null
                        }

                        

                        {
                            this.props.commentsReducer.addingNewState == LOAD_STATES.LOADING 
                            ?
                                <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/>
                            :
                                <span></span>
                        }
                    </div>
                   
                )
            case 1:
                return (
                    <CommentsFillingListComponent
                        state = { LOAD_STATES.READY }
                        data = { data }
                        key = { 1 }
                    />
                )

            case 2:
                return (
                    <div 
                        className = "pb-comments-container"
                        ref = { this.pbContainerRef }
                        key = { 2 }
                    >
                        <ProgressBar sqSize= "35" phase = {Math.random() * 100} strokeWidth = "1"/>

                       
                    </div>
                )

            default:
                return null
        }
    }


    componentDidMount() {
        if (this.props.commentsReducer.state === LOAD_STATES.NONE && this.props.commentsReducer.hasMore) {
            this.getData()
        }   
    }

    getData(lastCommendId = 0) {
        this.props.getComments(this.props.productId, lastCommendId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.count != this.props.count) {
            this.props.onUpdate()
        }

/*
        
        
        if (innerListHeight < scrollbarHeight) {
        
            if (messagesModel.gettingMessageState === LOAD_STATES.READY && messagesModel.hasMore ) {
                this.getData(messagesModel.messages[0].id)
            }
        }

        */
        
    }

}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getComments: getCommentsAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    //    console.log(state.chatReducer)

    const hasMore = state.commentsReducer.hasMore

    const response = {
        meuserReducer: state.meuserReducer,

        commentsReducer: state.commentsReducer,
        productsReducer: state.productsReducer,

        //state: LOAD_STATES.READY,
        state: state.commentsReducer.state,
        count: state.commentsReducer.content.size

    }

    if (hasMore) {
        response.data = [ {attr: "input field"}, {attr: "filling contacts"}, {attr: "pb"} ]
    } else {
        response.data = [ {attr: "input field"}, {attr: "filling contacts"} ]
    }

    return response
}
    

export default connect(mapStateToProps, matchDispatchToProps)(CommentsTabComponent)