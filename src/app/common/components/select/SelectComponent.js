import React, {Component} from "react"

// onSelected
// defaultValue
// data

class SelectComponent extends Component {

    constructor(props) {
        super(props)

        this.state = 
        {
            value: null,
            isLoaded: false
        }
    
        this.handleChange = this.handleChange.bind(this)
    
    }

    handleChange(event) {

        this.setState({value: event.target.value, isLoaded: true})
        this.props.onSelected(parseInt(event.target.value))
    }

    onOptionValue(element) {
        return "value"
    }

    onLabelValue(element) {
        return "text"
    }
    
    componentDidUpdate() {
        if (!this.state.isLoaded) {
            this.setState( { value:  this.props.defaultValue, isLoaded: true } )
        }
    }


    render() {

        const st = this.state.isLoaded ? (this.state.value ? this.state.value : '') : this.props.defaultValue

        return (
            <select 
              //  defaultValue = {this.props.defaultValue} 
                value={st} 

                onClick = {
                    (event) => {
                        if (this.props.stopPropagation) {
                            event.stopPropagation()
                        }
                    }
                }

                onChange={ this.handleChange }
                
                >
                {
                    this.props.data.map((element, index, array) => {
                        return (
                            <option 
                                
                                key = {index} 
                                value = { this.onOptionValue(element) }>
                                    { this.onLabelValue(element) }
                            </option>
                        )
                    }) 
                }
            </select>
        )
    }
}

export default SelectComponent