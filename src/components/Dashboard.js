import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { View, Text, StatusBar } from 'react-native';
import { Card, CardSection } from './common';
import AdminList from './AdminList';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {

        const { name, manager, chores, points } = this.props.user
        console.log( 'User props:', this.props.user )

        return (
            <Card>
                <StatusBar hidden={true} />

                <CardSection>
                    <Text>{name}</Text>
                    <Text>{points}</Text>
                </CardSection>

                <CardSection></CardSection>

                <CardSection>
                    { manager
                        ? <AdminList user={this.props.user}/>
                        : null
                    }
                </CardSection>
            </Card>
        )
    }
}

function mapStateToProps( state ) {
    const { user } = state.user;

    return {
        user
    };
}

export default connect( mapStateToProps, {} )(Dashboard);