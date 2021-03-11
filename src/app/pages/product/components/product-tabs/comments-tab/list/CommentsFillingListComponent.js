import React from "react"

import FillingListComponent from "../../../../../../common/components/filling-list/FillingListComponent"
import CommentItemComponent from "./CommentItemComponent"

class CommentsFillingListComponent extends FillingListComponent {

    onReadyElement(commentId, index) {
        return (
            <CommentItemComponent 
                key = { index }
                commentId = { commentId }
            />
        )
    }

}

export default CommentsFillingListComponent
