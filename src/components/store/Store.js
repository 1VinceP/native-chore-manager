import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from '../common';
import { connect } from 'react-redux';
import { resetSelectedItem } from '../../redux/actions/actionIndex';
import StoreList from './StoreList';

class Store extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentWillUnmount() {
        this.props.resetSelectedItem()
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Text>{this.props.user.points}</Text>
                </CardSection>

                <CardSection>
                    <StoreList />
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

export default connect( mapStateToProps, { resetSelectedItem } )(Store);