import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from '../common';
import { selectInventoryChild, removeItemFromUser } from '../../redux/actions/actionIndex';

import { blue } from '../colors';

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental(true)

class InventoryListItem extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    renderDescription() {
        const { expanded, item, user } = this.props

        if( expanded ) {
            return (
                <CardSection style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <Button color={blue} pressed={() => this.onUse( user.uid, item.uid )}>Use item</Button>
                </CardSection>
            )
        }
    }

    onUse( userUid, itemUid ) {
        this.props.removeItemFromUser( userUid, itemUid )
    }

    render() {
        const { titleStyle } = styles
        const { itemName, uid } = this.props.item

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectInventoryChild(uid)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{itemName}</Text>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    descStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    }
}

function mapStateToProps( state, ownProps ) {
    const { user, inventorySelection } = state.user;
    const expanded = inventorySelection === ownProps.item.uid

    return {
        user,
        expanded
    };
}

export default connect( mapStateToProps, { selectInventoryChild, removeItemFromUser } )(InventoryListItem);