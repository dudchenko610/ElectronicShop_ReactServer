import { connect } from "react-redux"

import ImageComponent, { matchDispatchToPropsImageActions } from "../../../components/image/ImageComponent"

class MeUserImageComponent extends ImageComponent {

}

function mapStateToProps(state) {

    return {
        meuserReducer: state.meuserReducer
    }
}

export default connect(mapStateToProps, matchDispatchToPropsImageActions)(MeUserImageComponent)


