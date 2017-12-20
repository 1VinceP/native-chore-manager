import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input, SwitchInput } from './common';
import { createPerson } from '../redux/actions/actionIndex';

class AddPerson extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            password: '',
            manager: false
        }
    }

    handleInputChange( prop, value ) {
        this.setState({
            [prop]: value
        })
    }

    handleButton() {
        const { name, password, manager } = this.state

        this.props.createPerson( name, password, manager )
        Actions.dashboard({ reset: '' })
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input label={'Name'}
                           value={this.state.name}
                           onChangeText={(value) => this.handleInputChange('name', value)}
                           placeholder={'John'}
                    />
                </CardSection>

                <CardSection>
                    <Input label={'Password'}
                           value={this.state.password}
                           onChangeText={(value) => this.handleInputChange('password', value)}
                           placeholder={'Password'}
                    />
                </CardSection>

                <CardSection>
                   <SwitchInput label={'Manager'}
                                onValueChange={(value) => this.setState({ manager: value })}
                                value={this.state.manager}
                   />
                </CardSection>

                <CardSection>
                    <Button color='green' pressed={() => this.handleButton()} >
                        Add Person
                    </Button>
                </CardSection>
            </Card>
        )
    }
}

// function mapStateToProps( state ) {
//     const { var } = state;

//     return {
//         var
//     };
// }

export default connect( null, { createPerson } )(AddPerson);