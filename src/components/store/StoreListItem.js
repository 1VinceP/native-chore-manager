import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Button } from '../common';
import { selectItem, managePoints, addItemToUser, deleteItem } from '../../redux/actions/actionIndex';

import { green, red, blue } from '../colors';

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental(true)

class StoreListItem extends Component {
    constructor() {
        super();

        this.state = {
            error: false
        }
    }

    componentWillMount() {
        if( this.props.user.points < this.props.storeItem.price ) {
            this.setState({
                error: true
            })
        }
    }

    componentWillReceiveProps( nextProps ) {
        if( nextProps.user.points < this.props.storeItem.price ) {
            this.setState({
                error: true
            })
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    renderDescription() {
        const { selection, expanded } = this.props
        const { name, price, uid } = this.props.storeItem

        if( expanded ) {
            return (
                <CardSection style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <View style={{flexDirection: "row"}}>
                        { this.state.error
                            ? <Button color='#ffcdd2'>Not Enough Points</Button>
                            : <Button color={blue} pressed={() => this.onRedeem(name, price)}>Redeem</Button>
                        }
                        {this.renderDelete()}
                    </View>
                </CardSection>
            )
        }
    }

    renderDelete() {
        const { user, storeItem } = this.props
        if( user.manager ) {
            return (
                <Button color={red} pressed={() => this.props.deleteItem(storeItem.uid)}>
                    Delete Item
                </Button>
            )
        }
    }

    onRedeem( name, price ) {
        const { user } = this.props

        if( user.points >= price ) {
            this.props.managePoints( user.points, -price, user.uid )
            this.props.addItemToUser( name, user.uid )
        }
    }

    render() {
        const { titleStyle, priceStyle, errorPriceStyle } = styles
        const { name, price, uid } = this.props.storeItem

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectItem(uid)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{name} --</Text>
                        <Text style={ this.state.error ? errorPriceStyle : priceStyle }>{price}</Text>
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
    },
    priceStyle: {
        color: green,
        fontSize: 18,
        paddingLeft: 7
    },
    errorPriceStyle: {
        color: red,
        fontSize: 18,
        paddingLeft: 7
    }
}

function mapStateToProps( state, ownProps ) {
    const { user } = state.user
    const { selectedItem } = state.storeItems
    const expanded = selectedItem === ownProps.storeItem.uid

    return {
        user,
        expanded
    };
}

export default connect( mapStateToProps, { selectItem, managePoints, addItemToUser, deleteItem } )(StoreListItem);