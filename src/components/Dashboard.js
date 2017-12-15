import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection } from './common';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <Card>
                <CardSection></CardSection>
                <CardSection></CardSection>
                <CardSection></CardSection>
            </Card>
        )
    }
}

export default Dashboard;