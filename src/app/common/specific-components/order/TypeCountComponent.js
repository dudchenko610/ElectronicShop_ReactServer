import React from "react"
import EditComponent from "../../components/edit/EditComponent"

// onEdit

class TypeCountComponent extends EditComponent {

    onEdit(editable) {
        this.props.onEdit(editable)
    }

    render() {

        if (!this.props.editable) {
            return <></>
        }

        return (
            <>
                
                <div>
                    <span>Count:</span>
                    <input name="count" type="number" value={this.props.editable.count || ''} /*defaultValue={this.props.editable.price || ''}*/ onChange={this.handleChange} />
                </div>

            </>
        )


    }
}

export default TypeCountComponent