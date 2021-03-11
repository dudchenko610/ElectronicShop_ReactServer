import { connect } from "react-redux"
import SelectComponent from "../../../components/select/SelectComponent"

class ProductPriceOrderSelectComponent extends SelectComponent {

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
                label: "Desceding price order"
            },
            {
                val: 1,
                label: "Asceding price order"
            }
        ]
    }
}

export default connect(mapStateToProps)(ProductPriceOrderSelectComponent)