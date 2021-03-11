import { connect } from "react-redux"

import ImageComponent, { matchDispatchToPropsImageActions } from "../../../components/image/ImageComponent"

class MeUserImageUplComponent extends ImageComponent {
    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            isUploadable: true,
            uploadLabel: "Upload avatar"
        }
    }
}

function mapStateToProps(state) {

    return {
        meuserReducer: state.meuserReducer
    }
}

export default connect(mapStateToProps, matchDispatchToPropsImageActions)(MeUserImageUplComponent)