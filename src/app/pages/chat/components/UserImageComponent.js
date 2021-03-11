import React from "react"
import { connect } from "react-redux"

import ImageComponent, { matchDispatchToPropsImageActions } from "../../../common/components/image/ImageComponent"
import ProgressBar from "../../../common/components/ProgressBar"

class UserImageComponent extends ImageComponent {
    onLoading() {
        return (
            <div className = "other-than-ready-container">
                <ProgressBar sqSize= "15" phase = {Math.random() * 100} strokeWidth = "2"/>
                <label>Downloading</label>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        chatReducer: state.chatReducer
    }
}

export default connect(mapStateToProps, matchDispatchToPropsImageActions)(UserImageComponent)


