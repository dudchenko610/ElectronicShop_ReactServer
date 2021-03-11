import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { LOAD_STATES } from "../../../../../../../core/load-states";


import LoadingComponent from "../../../../../../common/components/loading-component/LoadingComponent";
import ProgressBar from "../../../../../../common/components/ProgressBar";
import UserImageComponent from "./UserImageComponent";

class CommentItemComponent extends LoadingComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            centered: false
        }
    }

    onFailed() {
        return (
            <div className = "state-el">
                <a className = "comment-error-btn">Error</a>
                <a 
                    className = "comment-reload-btn"
                    onClick = {
                        (e) => {
                           // const message = this.props.message
                         //   this.props.resendMessage(message)
                        }
                    }
                >Resend</a>
            </div>
        )
    }

    onLoading() {
        return (
            <div className = "state-el">
                <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/>
            </div>
        )
    }



    renderContent() {

        const user = this.props.comment.user

        return (

            <div className="comment-item">
                <div 
                    className="comment-avatar-part"
                    style = {
                        {
                            height: "50px",
                            width: "50px"
                        }
                    }
                >

                    <UserImageComponent
                        imageModel = { user.imageModel }
                        state = { user.imageModel.state }
                    />

                </div>

                <div className="comment-info-part">

                    <div className="comment-name-surname">
                        
                        <Link className='user-name' to={"/user/" + user.id }>
                            <label>{user.name + " " + user.surname}</label>
                        </Link>

                    </div>  

                    { this.props.comment.content }

                </div>  

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    const comment = state.commentsReducer.content.get(ownProps.commentId)

    return {
        commentsReducer: state.commentsReducer,

        comment: comment,
        state: comment.state
        
    }
}

export default connect(mapStateToProps)(CommentItemComponent)