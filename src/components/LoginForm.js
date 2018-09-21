import React, { Component } from 'react';
import { View, Text, StatusBar, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { emailChanged, passwordChanged, loginUser } from '../redux/actions/actionIndex';
import { Card, CardSection, Input, Button, Spinner } from './common/index';

import { green } from './colors';

class LoginForm extends Component {

    onEmailChange( text ) {
        this.props.emailChanged( text )
    }

    onPasswordChange( text ) {
        this.props.passwordChanged( text )
    }

    onButtonPress() {
        const { email, password } = this.props

        Keyboard.dismiss()
        this.props.loginUser( { email, password } )
    }

    renderError() {
        if( this.props.error ) {
            return (
                <View style={{backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton() {
        if( this.props.loading )
            return <Spinner size={'large'} />

        return (
            <Button color={green} pressed={() => this.onButtonPress()}>
                Login
            </Button>
        )
    }

    render() {
        return (
            <Card>
                <StatusBar hidden={true} />

                <StatusBar hidden={true} />
                <CardSection>
                    <Input label={'Email'}
                        placeholder={'user@email.com'}
                        onChangeText={(e) => this.onEmailChange(e)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input label={'Password'}
                        placeholder={'password'}
                        onChangeText={(e) => this.onPasswordChange(e)}
                        value={this.props.password}
                        secure={true}
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

function mapStateToProps( state ) {
    const { email, password, error, loading } = state.auth;

    return {
        email,
        password,
        error,
        loading
    };
}

export default connect( mapStateToProps,
    { emailChanged, passwordChanged, loginUser }
)(LoginForm);