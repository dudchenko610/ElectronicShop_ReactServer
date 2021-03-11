import { connect } from "react-redux"
import SelectComponent from "../../../components/select/SelectComponent"

class UserOrderSelectComponent extends SelectComponent {

    onOptionValue(obj) {
        return obj.val
    }

    onLabelValue(obj) {
        return obj.label
    }
}

function mapStateToProps(state) {
    return {
        data : [
            {
                val: 0,
                label: "A - Z"
            },
            {
                val: 1,
                label: "Z - A"
            }
        ]
    }
}

export default connect(mapStateToProps)(UserOrderSelectComponent)