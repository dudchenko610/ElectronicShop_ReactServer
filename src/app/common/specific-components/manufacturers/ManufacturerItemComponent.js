import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { LOAD_STATES } from "../../../../core/load-states"

import ReloadableComponent from "../../components/loading-component/ReloadableComponent"

import { getManufacturerAction } from "../../crud/manufacturers/actions/manufacturer-actions"

import "./styles/manufacturer-item-styles.css"
import LoadingComponent from "../../components/loading-component/LoadingComponent"

class ManufactItemComponent extends LoadingComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            centered: false
        }
    }

    onFailed() {
        return (
            <>
                <div>Error</div>
                <a 
                    className = "update" 
                    onClick = {
                        (event) => { 
                            this.props.getManufacturer(this.props.manufacturer.id)         
                        }
                    }
                >Reload</a>
            </>
        )
    }


    renderContent() {

        const manufacturer = this.props.manufacturer
        
        return (
            <div className = "manufacturer-item" >
                <label className = "name">{ manufacturer.name }</label>
            </div>
        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getManufacturer: getManufacturerAction
        },
        dispatch
    )
}

function mapStateToProps(state, props) {

    const manufacturer = state.manufacturerReducer.content.get(props.manufacturerId)

    return {
        manufacturerReducer: state.manufacturerReducer,
        manufacturer : manufacturer,
        state: manufacturer ? manufacturer.state : LOAD_STATES.NONE
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ManufactItemComponent)

