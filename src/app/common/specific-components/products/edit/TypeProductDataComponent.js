import React from "react"

import EditComponent from "../../../components/edit/EditComponent"


// onEdit

class TypeProductDataComponent extends EditComponent {

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
                    <span>Product name:</span>
                    <input name="name" type="text" value={this.props.editable.name || ''} /*defaultValue={this.props.editable.name || ''}*/ onChange={this.handleChange} />
                </div>

                <div>
                    <span>Price:</span>
                    <input name="price" type="number" value={this.props.editable.price || ''} /*defaultValue={this.props.editable.price || ''}*/ onChange={this.handleChange} />
                </div>

                <div>
                    <span>Description Full:</span>
                    <input name="description" type="text" value={this.props.editable.description || ''} /*defaultValue={this.props.editable.descriptionFull || ''}*/ onChange={this.handleChange} />
                </div>

                <div>
                    <span>Count:</span>
                    <input name="count" type="number" value={this.props.editable.count || ''} /*defaultValue={this.props.editable.price || ''}*/ onChange={this.handleChange} />
                </div>

            </>
        )


    }
}

export default TypeProductDataComponent