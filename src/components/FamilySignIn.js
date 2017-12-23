import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView, StatusBar, Modal, Alert, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import CustomMultiPicker from 'react-native-multiple-select-list';
import { Input, Button, Card, CardSection, InfoModal } from './common';
import { getFamily, createPerson, famPassChanged, updateUser, setUser, createChore, createStoreItem } from '../redux/actions/actionIndex';


class FamilySignIn extends Component {
    constructor() {
        super();

        this.state = {
            newUserInfoOpen: false,
            hasNewProps: false,
            firstTimeUser: false,
            list: [],
            username: ''
        }
    }

    componentWillMount() {
        this.props.getFamily()
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            list: nextProps.famList,
            hasNewProps: true
        })
    }

    createList( famList ) {
        let nameList = {}

        if( famList.length > 0 ) {
            for( let i = 0; i < famList.length; i++ ) {
                nameList[i] = famList[i].name
            }
        }
        else if( famList.length <= 0 && this.state.hasNewProps ) {
            this.setFirst()
        }

        return nameList
    }

    setFirst() {
        console.log( 'FIRST TIME USER' )

        this.props.createPerson( 'New User', '', true, 0 )
        this.createInitialChores()
        this.createInitialStoreItems()
        this.newUserMessage()
        this.setState({
            firstTimeUser: true
        })
    }

    createInitialChores() {
        this.props.createChore( 'Empty dishwasher', 0, 100, false )
        this.props.createChore( 'Load dishwasher', 0, 100, false )
        this.props.createChore( 'Cook dinner', 1,  400, false )
    }

    createInitialStoreItems() {
        this.props.createStoreItem( 'Large candy bar', 1500, '' )
        this.props.createStoreItem( '1 hour of video games', 750, '' )
        this.props.createStoreItem( '$5', 7000, '' )
    }

    newUserMessage() {
        this.setState({
            newUserInfoOpen: !this.state.newUserInfoOpen
        })
    }

    onPasswordChange( text ) {
        this.props.famPassChanged( text )
    }

    onSignIn( username, typedPassword ) {
        const { list } = this.state

        if( !username )
            Alert.alert( 'Please select a user' )

        if( !typedPassword )
            Alert.alert( 'Password cannot be empty' )
        for( let i = 0; i < list.length; i++ ) {
            const { name, password, manager, uid, chores, points } = list[i]
            if( name === username && typedPassword ) { // Check username
                if( this.state.firstTimeUser ) { // If firstTimeUser, typed password is now the users password, then sign in
                    this.props.updateUser( username, typedPassword, manager, uid )
                    this.completeLogin( username, typedPassword, manager, uid )
                }
                else if( password === typedPassword ) // Check password, then sign in
                    this.completeLogin( username, typedPassword, manager, uid, chores, points )
                else
                    Alert.alert( 'The Password does not match the password for the selected user' )
            }
        }
    }

    completeLogin( username, typedPassword, manager, uid, chores = [], points = 0 ) {
        Keyboard.dismiss()
        this.onPasswordChange( '' )
        this.props.setUser( username, typedPassword, manager, uid, chores, points )
        Actions.dashboard()
    }

    render() {

        let optionList = this.createList( this.state.list )

        return (
            <Card>
                <StatusBar hidden={true} />

                <CardSection>
                    <CustomMultiPicker options={optionList}
                                       search={false}
                                       multiple={false}
                                       scrollViewHeight={200}
                                       rowWidth={'90%'}
                                       callback={res => this.setState({ username: res })}
                                       iconColor={'#34ADE1'}
                                       iconSize={25}
                                       selectedIconName={'ios-checkmark-circle-outline'}
                                       unselectedIconName={'ios-radio-button-off-outline'}
                                       returnValue={'label'}
                    />
                </CardSection>
                <CardSection>
                    <Input label={'Password'}
                           placeholder={'Password'}
                           secure={true}
                           onChangeText={(e) => this.onPasswordChange(e)}
                           value={this.props.famPass}
                    />
                </CardSection>
                <CardSection>
                    <Button color='#00ff00' pressed={() => this.onSignIn( this.state.username.toString(), this.props.famPass )}>
                        Sign In
                    </Button>
                </CardSection>

                <InfoModal visible={this.state.newUserInfoOpen}
                           onButton={() => this.newUserMessage()}
                >
                    Thanks for using Chore Manager! Create a password to access your parent profile and get started.
                </InfoModal>
            </Card>
        )
    }
}

function mapStateToProps( state ) {
    const { famPass } = state.family;

    const famList = _.map( state.family.famList, ( val, uid ) => {
        return { ...val, uid }
    } )

    return {
        famPass,
        famList
    };
}

export default connect( mapStateToProps, { getFamily, createPerson, famPassChanged, updateUser, setUser, createChore, createStoreItem } )(FamilySignIn);