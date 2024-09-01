import React from "react";

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 1 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <label id="rating">
                Rating
                <select value={this.state.value} onChange={this.handleChange} className="rating-select" name="rating">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </label>
        );
    }
}

export default Rating;