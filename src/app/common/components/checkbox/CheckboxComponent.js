import React, { Component } from "react"

// label
// onCheck(isChecked)
// isChecked

class CheckboxComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isChecked: false
        }
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

    updateCheckbox() {
        this.state.isChecked = !this.state.isChecked

        this.props.onCheck(this.state.isChecked)

        this.updateComponent()
    }

    componentDidMount() {
        this.state.isChecked = this.props.isChecked
        this.updateComponent()
    }

    render() {
        return (
            <div className = "custom-checkbox">
                <input      
                    type = "checkbox" 
                    checked  = { this.state.isChecked }
                    onChange = {
                        (event) => {
                            this.updateCheckbox()
                        }
                    }
                />

                <label
                    onClick = {
                        (event) => {
                            this.updateCheckbox()
                        }
                    }
                >
                    { this.props.label }
                </label>

            </div>
        )
    }
}

export default CheckboxComponent