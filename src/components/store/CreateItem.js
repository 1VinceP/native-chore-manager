import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { saveItem } from '../../redux/actions/actionIndex';
import { Card, CardSection, Button, Input, NumericInput, InfoModal } from '../common';

import { green } from '../colors';

class CreateItem extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            price: null,
            showModal: false
        }
    }

    handleTextInput( value ) {
        this.setState({
            name: value
        })
    }

    handleNumericInput( value ) {
        this.setState({
            price: value + ''
        })
    }

    onSaveButton() {
        const { name, price } = this.state
        if( name && price > 0 ) {
            this.props.saveItem( name, price * 1 )
            Actions.pop()
        }
        else {
            this.setState({
                showModal: true
            })
        }
    }

    onModalButton() {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input label='Name'
                           value={this.state.name}
                           onChangeText={value => this.handleTextInput(value)}
                           placeholder='Name'
                           autoCorrect={true}
                    />
                </CardSection>

                <CardSection>
                    <NumericInput label='Price'
                                  value={this.state.price}
                                  onChangeText={value => this.handleNumericInput(value)}
                                  placeholder='500'
                    />
                </CardSection>

                <CardSection>
                    <Button color={green} pressed={() => this.onSaveButton()}>
                        Save Item
                    </Button>
                </CardSection>

                <InfoModal visible={this.state.showModal}
                           onButton={() => this.onModalButton()}
                >
                    The name or the price has been left empty, and the item cannot be created
                </InfoModal>
            </Card>
        )
    }
}

export default connect( null, { saveItem })(CreateItem);