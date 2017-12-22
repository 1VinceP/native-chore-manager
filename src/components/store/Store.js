import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
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

    renderAddButton() {
        if( this.props.user.manager ) {
            return (
                <Button color='brown' pressed={() => Actions.createItem()}>
                    Add Item
                </Button>
            )
        }
    }

    render() {
        return (
            <Card>
                <CardSection style={{justifyContent: 'space-around'}}>
                    <Text>{this.props.user.points}</Text>
                    {this.renderAddButton()}
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