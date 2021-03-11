import { connect } from "react-redux"
import SelectComponent from "../../../components/select/SelectComponent"

class ManufactSelectComponent extends SelectComponent {

    onOptionValue(manufacturer) {
        return manufacturer.id
    }

    onLabelValue(manufacturer) {
        return manufacturer.name
    }
}

function mapStateToProps(state) {

    const manufacturers = Array.from(state.manufacturerReducer.content, ([name, value]) => ({ ...value }))

    return {
        data : manufacturers
    }
}

export default connect(mapStateToProps)(ManufactSelectComponent)