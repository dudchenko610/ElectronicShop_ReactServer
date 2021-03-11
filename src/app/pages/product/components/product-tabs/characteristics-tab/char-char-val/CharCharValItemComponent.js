import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import LoadingComponent from "../../../../../../common/components/loading-component/LoadingComponent"

import { getCharacteristicAction } from "../../../../../../common/crud/characteristics/actions/characteristic-actions"

import "./styles/char-char-val-styles.css"
import { LOAD_STATES } from "../../../../../../../core/load-states"

// characteristicValueId
class CharCharValItemComponent extends LoadingComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,

            centered: false
        }
    }

    onFailed() {
        return (
            <div >
                <div>Error</div>
                <div
                    onClick = {
                        (event) => {
                            this.props.getCharacteristic(this.props.characteristicId)
                        }
                    }

                >Repeat</div>

            </div>
        )
    }

    renderContent () {

        const characteristicId = parseInt(this.props.characteristicId)
        const characteristic = this.props.characteristicReducer.content.get(characteristicId)

        const characteristicValueId = parseInt(this.props.characteristicValueId)
        const characteristicValue = this.props.characteristicReducer.charValuesContent.get(characteristicValueId)

        return (
            <div 
                className = "char-char-val-container"
            >
                <div>{ characteristic.name } : { characteristicValue.name }</div>

            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getCharacteristic: getCharacteristicAction
        },
        dispatch
    )
}

function mapStateToProps(state, ownProps) {

    
    const characteristicId = parseInt(ownProps.characteristicId)
    const characteristic = state.characteristicReducer.content.get(characteristicId)

    if (!characteristic) {

      //  console.log("!characteristic")

        return {
            characteristicReducer: state.characteristicReducer,
            state: LOAD_STATES.LOADING
        }
    }

  //  console.log("mapStateToProps characteristicId = " + characteristicId)

    return {
        characteristicReducer: state.characteristicReducer,
        state: characteristic.state
    }
}  

export default connect(mapStateToProps, matchDispatchToProps)(CharCharValItemComponent)