
import SelectComponent from "../../../components/select/SelectComponent"

class CharValueSelectComponent extends SelectComponent{

    onOptionValue(charValue) {
        return charValue.id
    }

    onLabelValue(charValue) {
        return charValue.name
    }
}

export default CharValueSelectComponent
