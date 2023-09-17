import React, { Component } from 'react';

export class Testing extends Component {
    static displayName = Testing.name;

    constructor(props) {
        super(props);
        this.state = {
            data: "Test"
        };
    }

    componentDidMount() {
        this.testingStringData();
    }

    render () {
        return (
        <div>
            <h1>Laurence Testing</h1>
            {this.state.data}
        </div>
        )
    }

    async testingStringData() {
        const response = await fetch('testing');
        const data = await response.json();
        this.setState({
            data: data
        });
    }
}