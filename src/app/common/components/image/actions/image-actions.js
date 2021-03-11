import {LOAD_STATES} from "../../../../../core/load-states"
import {commonApi} from "../../../../../core/api"
import {authApi} from "../../../../../core/api"

import {objectToFormData} from "../../../../../core/form-data-utils"

export const uploadImageAction = (imageModel, file) => {
    return dispatch => {

    //    imageModel.file = null
        imageModel.state = LOAD_STATES.UPLOADING
        imageModel.currentlyUploadFile = file

        dispatch({
            type: imageModel.updateReducerConst,
            payload: imageModel.updateReducerPayload
        })

       /* const formData = new FormData()
        formData.append("formFile", file)
        formData.append("fileName", file.name)

        if (imageModel.optionalData) {
            formData.append("optional", imageModel.optionalData)
        }*/


    //    console.log(imageModel.optionalData)

        const formData = new FormData()
        formData.append("formFile", file)
        formData.append("fileName", file.name)
        formData.append("optionalStr", JSON.stringify(imageModel.optionalData))

        imageModel.uploadApiFunc()(formData)
            .then(
                res => {

                    if (res.data.error) {

                        
                        console.log("failed upload file")
                        console.log(res.data.error)

                        imageModel.state = LOAD_STATES.UPLOADING_FAILED

                        dispatch({
                            type: imageModel.updateReducerConst,
                            payload: imageModel.updateReducerPayload
                        })

                        return
                    }

                    const downloadUrl = window.URL.createObjectURL(file)

                    const img = new Image()
                    img.onload = () => {

                        imageModel.img = downloadUrl
                        imageModel.state = LOAD_STATES.READY
                        imageModel.currentlyUploadFile = null
                        
                        imageModel.width = img.width
                        imageModel.height = img.height


                        if (res.data) {
                            imageModel.optionalData = res.data
                        }

                        dispatch({
                            type: imageModel.updateReducerConst,
                            payload: imageModel.updateReducerPayload
                        })
                      
                    }

                    img.src = downloadUrl


                }
            )
            .catch(
                err => {
                    imageModel.state = LOAD_STATES.UPLOADING_FAILED
                    dispatch({
                        type: imageModel.updateReducerConst,
                        payload: imageModel.updateReducerPayload
                    })
                }
            )
    }
}

export const downloadImageAction = (imageModel) => {
    return dispatch => {

       // console.log(imageModel)

        imageModel.state = LOAD_STATES.LOADING
        dispatch({
            type: imageModel.updateReducerConst,
            payload: imageModel.updateReducerPayload
        })

        if (!imageModel.pathModel || !imageModel.pathModel.name) {

            imageModel.state = LOAD_STATES.NONE
            dispatch({
                type: imageModel.updateReducerConst,
                payload: imageModel.updateReducerPayload
            })

            return
        }

        const downloadFun = imageModel.isAuth ? authApi().downloadProfileFile : commonApi().downloadFile


        downloadFun(imageModel.pathModel)
            .then(
                res => {

                    console.log(res.data)

                    if (res.data.error) {

                        imageModel.state = LOAD_STATES.FAILED

                        console.log("failed file")
                        console.log(res.data.error)

                        dispatch({
                            type: imageModel.updateReducerConst,
                            payload: imageModel.updateReducerPayload
                        })

                        return
                    }

                    const blob = new Blob([res.data])
                    const downloadUrl = window.URL.createObjectURL(blob)

                    const img = new Image()
                    img.onload = function() {
                        imageModel.width = img.width
                        imageModel.height = img.height

                        imageModel.img = downloadUrl
                        imageModel.state = LOAD_STATES.READY
                        dispatch({
                            type: imageModel.updateReducerConst,
                            payload: imageModel.updateReducerPayload
                        })


                        

                       // console.log("NEW IMAGE width", imageModel.width);
                       // console.log("NEW IMAGE height: ", imageModel.height);


                    }

                    img.src = downloadUrl
                   
                    //console.log("blob", downloadUrl);

                   // console.log("ready file dowmloaded")
                  //  console.log(imageModel)
                }
            )
            .catch(
                err => {

                    console.log(err)

                    imageModel.state = LOAD_STATES.FAILED

                   // console.log("failed file")
                  //  console.log(imageModel)

                    dispatch({
                        type: imageModel.updateReducerConst,
                        payload: imageModel.updateReducerPayload
                    })
                }
            )

    }
}

export const deleteImageAction = (imageModel) => {
    return dispatch => {

    }
}