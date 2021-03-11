import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import LoadingComponent from "../../../components/loading-component/LoadingComponent";
import ProgressBar from "../../../components/ProgressBar";

import { dislikeProductAction, likeProductAction, takeReactionBackAction } from "../../../crud/products/actions/product-actions";

import "./styles/product-like-styles.css"
import { store } from "../../../../..";

// product
class ProductLikeComponent extends LoadingComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            centered: false
        }
    }



    neutralContent() {
        return (
            <div className = "product-like-wrapper">
                <div onClick = { (e) => { this.props.likeProduct(this.props.product) } }>Like</div>
                <div onClick = { (e) => { this.props.dislikeProduct(this.props.product) } }>Dislike</div>

            </div>
        )
    }

    likedContent() {
        return (
            <div className = "product-like-wrapper">
                <div onClick = { (e) => { this.props.takeReactionBack(this.props.product) } }>Take reaction back</div>
                <div onClick = { (e) => { this.props.dislikeProduct(this.props.product) } }>Dislike</div>
            </div>
        )
    }

    dislikedContent() {
        return (
            <div className = "product-like-wrapper">
                <div onClick = { (e) => { this.props.takeReactionBack(this.props.product) } }>Take reaction back</div>
                <div onClick = { (e) => { this.props.likeProduct(this.props.product) } }>Like</div>
            </div>
        )
    }

    renderContent() {

        const product = this.props.product
        const productLike = this.props.product.productLike

        const st = store.getState()
        const isAuth = st.meuserReducer.isAuthenticated
        const isAdmin =  st.meuserReducer.isAdmin


        return (
            <div className = "product-like-common-wrapper">

                {

                    isAuth && !isAdmin ?
                        (
                            !productLike.userId ? 
                                this.neutralContent()
                            :
                                productLike.like ?
                                    this.likedContent()
                                :
                                    this.dislikedContent()
                        )
                    : 
                        null
                }

                <div>likes: {product.likeCount} dislikes: {product.dislikeCount}</div>
            </div>
        )
        
    }

    onLoading() {
        return (
            <div 
                style = {
                    {
                        width: "50px",
                        height: "50px"
                    }
                }
            >
                <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            likeProduct: likeProductAction,
            dislikeProduct: dislikeProductAction,
            takeReactionBack: takeReactionBackAction
        },
        dispatch
    )
}

export default connect(null, matchDispatchToProps)(ProductLikeComponent)