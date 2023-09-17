import React, { Component } from 'react';

export class Testing extends Component {
    static displayName = Testing.name;

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.testingStringData();
    }


    async testingStringData() {
        const response = await fetch('testing');
        const data = await response.json();
        this.setState({});
    }
}