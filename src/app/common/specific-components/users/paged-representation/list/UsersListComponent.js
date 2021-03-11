import React from "react"
import { connect } from "react-redux"

import FillingListComponent from "../../../../components/filling-list/FillingListComponent"
import UserListItemComponent from "./UserListItemComponent"


// paginationFilter
// productFilter
// onScrollToBottom

class UsersListComponent extends FillingListComponent {

    constructor(props) {
        super(props)
        
    }

    onReadyElement(user, index) {
        return <UserListItemComponent 
                    key = {index}
                    userId = {user.id}/>
    }

}

function mapStateToProps(state) {

    return {
      //  isReverse: true
    }
}

export default connect(mapStateToProps)(UsersListComponent)