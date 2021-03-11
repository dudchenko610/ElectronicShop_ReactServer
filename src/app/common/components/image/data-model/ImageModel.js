
import {LOAD_STATES} from "../../../../../core/load-states"

// width
// height
export class ImageModel {

    constructor (
            noImg = null,
            uploadApiFunc = null, 
            updateReducerConst = null,
            pathModel = null, 
            isAuth = false,
            deleteApiFunc = null,
            optionalData = null
        ) {

        this.noImg = noImg
        this.uploadApiFunc = uploadApiFunc
        this.updateReducerConst = updateReducerConst
        this.pathModel = pathModel

        this.deleteApiFunc = deleteApiFunc
        this.optionalData = optionalData

        this.isAuth = isAuth


        if (!pathModel || !pathModel.name) {
            this.state = LOAD_STATES.NONE
        }

        // state
        // file

    }

}