import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DoubleClick from 'react-native-double-click';
import { Card, CardSection, Button } from '../common';
import { resetSelectedItem, managePoints } from '../../redux/actions/actionIndex';
import StoreList from './StoreList';

import { blue } from '../colors';

class Store extends Component {

    componentWillUnmount() {
        this.props.resetSelectedItem()
    }

    onDouble( points, uid ) {
        this.props.managePoints( points, 500, uid )
    }

    renderAddButton() {
        if( this.props.user.manager ) {
            return (
                <Button color={blue} width={100} pressed={() => Actions.createItem()}>
                    Add Item
                </Button>
            )
        }
    }

    render() {
        const { points, uid } = this.props.user
        const { sectionStyle, textStyle } = styles
        return (
            <Card>
                <CardSection style={sectionStyle}>
                    <DoubleClick onClick={() => this.onDouble( points, uid )}>
                        <Text style={textStyle}>{this.props.user.points} points</Text>
                    </DoubleClick>
                    {this.renderAddButton()}
                </CardSection>

                <CardSection style={{width: '100%'}}>
                    <StoreList />
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    sectionStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 6
    },
    textStyle: {
        fontSize: 18
    }
}

function mapStateToProps( state ) {
    const { user } = state.user;

    return {
        user
    };
}

export default connect( mapStateToProps, { resetSelectedItem, managePoints } )(Store);