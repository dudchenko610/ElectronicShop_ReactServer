import { connect } from "react-redux"

import ImageComponent, { matchDispatchToPropsImageActions } from "../../../components/image/ImageComponent"

class UserImageComponent extends ImageComponent {

}

function mapStateToProps(state) {

    return {
        userDataReducer: state.userDataReducer
    }
}

export default connect(mapStateToProps, matchDispatchToPropsImageActions)(UserImageComponent)


