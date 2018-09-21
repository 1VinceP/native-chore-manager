import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createChore } from '../../redux/actions/actionIndex';
import { Card, CardSection, Button, Input, SwitchInput, NumericInput, PickerInput } from '../common';

import { green } from '../colors';

class CreateChore extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            reward: null,
            priority: 0,
            recurring: false
        }
    }

    onValueChange( prop, value ) {
        this.setState({
            [prop]: value
        })
    }

    onSave() {
        const { name, reward, priority, recurring } = this.state

        if( name && reward >= 0 )
            this.props.createChore( name, priority * 1, reward * 1, recurring )
        else
            Alert.alert( 'One or more required fields is empty' )

        Actions.pop()
    }

    render() {

        pickerList = ['0', '1', '2', '3']

        return (
            <Card>
                <CardSection>
                    <Input
                        label='Name'
                        value={this.state.name}
                        onChangeText={value => this.onValueChange( 'name', value )}
                        placeholder='Empty dishwasher'
                    />
                </CardSection>

                <CardSection>
                    <NumericInput
                        label='Reward'
                        value={this.state.reward}
                        onChangeText={value=> this.onValueChange( 'reward', value )}
                        placeholder='200'
                    />
                </CardSection>

                <CardSection>
                    <PickerInput
                        label='Priority'
                        selectedValue={this.state.priority}
                        onValueChange={value=> this.onValueChange( 'priority', value )}
                        list={pickerList}
                    />
                </CardSection>

                {/* <CardSection>
                    <SwitchInput label='Recurring'
                                 value={this.state.recurring}
                                 onValueChange={value=> this.onValueChange( 'recurring', value )}
                    />
                </CardSection> */}

                <CardSection>
                    <Button color={green} pressed={() => this.onSave()}>
                        Save chore
                    </Button>
                </CardSection>
            </Card>
        )
    }
}

export default connect( null, { createChore } )(CreateChore);