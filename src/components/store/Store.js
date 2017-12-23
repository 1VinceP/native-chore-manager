import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DoubleClick from 'react-native-double-click';
import { Card, CardSection, Button } from '../common';
import { resetSelectedItem, managePoints } from '../../redux/actions/actionIndex';
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

    onDouble( points, uid ) {
        this.props.managePoints( points, 500, uid )
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
        const { points, uid } = this.props.user
        return (
            <Card>
                <CardSection style={{justifyContent: 'space-around'}}>
                    <DoubleClick onClick={() => this.onDouble( points, uid )}>
                        <Text>{this.props.user.points}</Text>
                    </DoubleClick>
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

export default connect( mapStateToProps, { resetSelectedItem, managePoints } )(Store);