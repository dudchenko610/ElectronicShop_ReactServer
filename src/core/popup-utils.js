import {store} from "../index"

export function PopupListener (waitingDiv, styleWaiting, errorDiv, styleError, hide, show, doAction, data = null, onSuc = null) {
            
    this.waitingDiv = waitingDiv
    this.styleWaiting = styleWaiting

    this.errorDiv = errorDiv
    this.styleError = styleError

    this.hide = hide
    this.show = show

    this.doAction = doAction
    this.data = data

    this.onSuc = onSuc

    this.errorDivWithError = ""

    this.onRepeat = function() {
        store.dispatch(hide(this.errorDivWithError))
        store.dispatch(show(styleWaiting, waitingDiv))

        if (this.data) {
            store.dispatch(doAction(data, this))
        } else {
            store.dispatch(doAction(this))
        }

        
    }

    this.onSuccess = () => {
        store.dispatch(hide(waitingDiv))

        if (this.onSuc) {
            this.onSuc()
        }

    }

    this.onError = (errorMsgFromServer) => {
        this.errorDivWithError = errorDiv(errorMsgFromServer)

        store.dispatch(hide(waitingDiv))
        store.dispatch(show(styleError,  this.errorDivWithError))
    }
    
}