import React from "react"
import UploadImageSliderComponent from "../../../../common/specific-components/sliders/upload-image-slider/UploadImageSliderComponent";

// onSelectTile
// changePickMainPhotoStatus
class UploadImageEditSliderComponent extends UploadImageSliderComponent {

    onSelectTile() {
        if (this.props.onSelectTile) {
            this.props.onSelectTile()
        }
    }

}

export default UploadImageEditSliderComponent