import React, { Component } from 'react';

export class Testing extends Component {
    static displayName = Testing.name;

    constructor(props) {
        super(props);
        this.state = {
            testData: [],
            loading: true
        };
    }

    componentDidMount() {
        this.testingStringData();
    }

    static renderTestingData(testData) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.map(testUser =>
                        <tr key={testUser.username}>
                            <td>{testUser.id}</td>
                            <td>{testUser.username}</td>
                            <td>{testUser.email}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    render () {
        let contents = this.state.loading
            ? <p><em>Loading User List...</em></p>
            : Testing.renderTestingData(this.state.testData);

        return (
        <div>
            <h1>Laurence Testing</h1>
            {contents}
        </div>
        )
    }

    async testingStringData() {
        const response = await fetch('testing');
        console.log(response);
        const userData = await response.json();
        console.log(userData);
        this.setState({
            testData: userData,
            loading: false
        });
    }
}