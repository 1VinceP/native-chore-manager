import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView, StatusBar, Modal, Alert, Keyboard, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import CustomMultiPicker from 'react-native-multiple-select-list';
import { Input, Button, Card, CardSection, InfoModal } from './common';
import { getFamily, createPerson, famPassChanged, updateUser, setUser, createChore, createStoreItem } from '../redux/actions/actionIndex';

import { green } from './colors';

class FamilySignIn extends Component {
    constructor() {
        super();

        this.state = {
            newUserInfoOpen: false,
            hasNewProps: false,
            firstTimeUser: false,
            list: [],
            username: '',
            visibleHeightL: null
        }

        this.keyboardDidShow = this.keyboardDidShow.bind(this)
        this.keyboardDidHide = this.keyboardDidHide.bind(this)
    }

    componentWillMount() {
        this.setState({
            visibleHeight: Dimensions.get('window').height
        })

        this.props.getFamily()

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({
            list: nextProps.famList,
            hasNewProps: true
        })
    }

    keyboardDidShow(e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({
            visibleHeight: newSize
        })
        console.log( 'showing keyboard', newSize )
    }

    keyboardDidHide() {
        this.setState({
            visibleHeight: Dimensions.get('window').height
        })
        console.log( 'hiding keyboard', Dimensions.get('window').height )
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

        this.props.createPerson( 'New User', '', true, true, 0 )
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
            const { name, password, manager, admin, uid, chores, points } = list[i]
            if( name === username && typedPassword ) { // Check username
                if( this.state.firstTimeUser ) { // If firstTimeUser, typed password is now the users password, then sign in
                    this.props.updateUser( username, typedPassword, manager, admin, uid )
                    this.completeLogin( username, typedPassword, manager, admin, uid )
                }
                else if( password === typedPassword ) // Check password, then sign in
                    this.completeLogin( username, typedPassword, manager, admin, uid, chores, points )
                else
                    Alert.alert( 'The Password does not match the password for the selected user' )
            }
        }
    }

    completeLogin( username, typedPassword, manager, admin, uid, chores = [], points = 0 ) {
        Keyboard.dismiss()
        this.onPasswordChange( '' )
        this.props.setUser( username, typedPassword, manager, admin, uid, chores, points )
        Actions.dashboard()
    }

    render() {

        let optionList = this.createList( this.state.list )
        let listLength = Object.keys(optionList).length
        let pickerHeight

        listLength > 10 ? pickerHeight = 8 * 50 : pickerHeight = listLength * 50

        return (
            <Card height={this.state.visibleHeight}>
                <StatusBar hidden={true} />

                <CardSection>
                    <CustomMultiPicker
                        options={optionList}
                        search={false}
                        multiple={false}
                        scrollViewHeight={pickerHeight}
                        rowWidth={'100%'} // custom prop
                        callback={res => this.setState({ username: res })}
                        iconColor={'#34ADE1'}
                        iconSize={25}
                        selectedIconName={'ios-checkmark-circle-outline'}
                        unselectedIconName={'ios-radio-button-off-outline'}
                        returnValue={'label'}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label={'Password'}
                        placeholder={'Password'}
                        secure={true}
                        onChangeText={(e) => this.onPasswordChange(e)}
                        value={this.props.famPass}
                    />
                </CardSection>
                <CardSection>
                    <Button color={green} pressed={() => this.onSignIn( this.state.username.toString(), this.props.famPass )}>
                        Sign In
                    </Button>
                </CardSection>

                { this.state.keyboard
                    ? <View style={{height: 250, flex: 1}}></View>
                    : null
                }

                <InfoModal
                    visible={this.state.newUserInfoOpen}
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