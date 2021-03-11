import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { addCommentAction } from "../../../../../../common/crud/comments/actions/comment-actions" 

import "./styles/comment-comp-styles.css"

// scroll to bottom
class SendCommentComponent extends Component {

    constructor(props) {
        super(props)

        this.scrollToBottom = true

        this.handleChangeCommentContent = this.handleChangeCommentContent.bind(this)
        this.handleSendComment = this.handleSendComment.bind(this)

        this.state = {
            contentToSend: ""
        }

    }

    handleChangeCommentContent(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({[name]: value})
    }

    handleSendComment(event) {
        this.props.addComment(this.state.contentToSend, this.props.productId)

        this.setState({contentToSend: ""})
    }


    render() {

        return (
            <div className = "comment-tap-panel">
                
                <input name = "contentToSend"  value={ this.state.contentToSend } onChange={ this.handleChangeCommentContent }></input>
                <a onClick = { (e) => this.handleSendComment(e)}>Send</a>
            </div> 
        )

        
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addComment : addCommentAction
        },
        dispatch
    )
}

export default connect(null, matchDispatchToProps)(SendCommentComponent)

