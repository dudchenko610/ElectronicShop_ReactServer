import React, {Component} from "react"


class EditComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.props.editable[name] = value
       
        this.onEdit(this.props.editable)
        this.setState( {} )

    }

    updateComponent() {
        this.setState
        (
            function (state, props) {
                return {
                    ...state
                }
            }
        ) 
    }

    handleEdit(event) {
        const mapOriginal = new Map(Object.entries(this.props.editable))
        const mapEdited = new Map(Object.entries(this.state.editable))

        //console.log(this.props.editable)
      //  console.log(this.state.editable)


        let editedObj = {}

        mapOriginal.forEach((value, key) => {
            const val = mapEdited.get(key)

            if (!val) {
                editedObj = {
                    ...editedObj,
                    [key]: value
                }
            } else {
                editedObj = {
                    ...editedObj,
                    [key]: val
                }
            }


        })

        this.onEdited(editedObj)


    }

    onEdited(editable) {

    }

    onEdit(editable) {

    }

}

export default EditComponent