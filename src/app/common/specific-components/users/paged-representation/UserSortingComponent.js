import React from "react"

import EditComponent from "../../../components/edit/EditComponent"
import UserOrderSelectComponent from "../../selects/user-order-select/UserOrderSelectComponent"

import "./styles/user-sorting-styles.css"

// onChangeViewMode
class UserSortingComponent extends EditComponent {

    constructor(props) {
        super(props)

     //   this.state.editable.nameFilter = ""
    }

    onEdit(editable) {
        this.props.onEdit(editable)
    }

    render() {

        if (!this.props.editable) {
            return <></>
        }

        return (
            <div className = "user-sorting">
                <div>
                    <span>User name:</span>
                    <input name="nameFilter" type="text" value={this.props.editable.nameFilter || ''}  onChange={this.handleChange} />
                </div>

               
                <UserOrderSelectComponent
                     onSelected = {
                         (objVal) => {
                             
                         }
                     }

                />

            </div>
        )
    }

}



export default UserSortingComponent