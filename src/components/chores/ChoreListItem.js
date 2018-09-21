import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import CustomMultiPicker from 'react-native-multiple-select-list';
import { CardSection, Button } from '../common';
import { selectChore, assignChoreToPerson, completeChore, deleteChore } from '../../redux/actions/actionIndex';

import { blue, red, green } from '../colors';

const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental(true)

class ChoreListItem extends Component {
    constructor() {
        super();

        this.state = {
            showModal: false,
            options: {},
            assignTo: []
        }
    }

    componentWillMount() {
        this.createList()
    }

    componentWillUpdate() {
        LayoutAnimation.spring()
    }

    createList() {
        const { famList } = this.props
        let options = {}

        for( let i = 0; i < famList.length; i++ ) {
            options[famList[i].uid] = famList[i].name
        }

        this.setState({
            options
        })
    }

    renderDescription() {
        const { expanded } = this.props
        const { priority, reward, uid } = this.props.chore

        if( expanded ) {
            return (
                <CardSection style={{ flexDirection: 'column', paddingLeft: 10 }}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
                        <Text style={styles.descStyle}>Priority: {priority}</Text>
                        <Text style={styles.descStyle}>Reward: {reward}</Text>
                    </View>
                    { this.props.from === 'chores'
                        ? !this.state.showModal
                            ? <View style={{flexDirection: "row"}}>
                                <Button color={blue} pressed={() => this.onAssign()}>Assign chore</Button>
                                <Button pressed={() => this.onDelete()}>Delete chore</Button>
                              </View>
                            : null
                        : <Button color={green} pressed={() => this.onComplete()}>Complete chore</Button>
                    }
                    { this.state.showModal
                        ? <View>
                            <CustomMultiPicker
                                options={this.state.options}
                                search={false}
                                multiple={true}
                                scrollViewHeight={300}
                                rowWidth={'100%'}
                                callback={res => this.setState({assignTo: res})}
                                iconColor={'#34ADE1'}
                                iconSize={25}
                                selectedIconName={'ios-checkmark-circle-outline'}
                                unselectedIconName={'ios-radio-button-off-outline'}
                                returnValue={'value'}
                            />
                            <View style={{flexDirection: "row"}}>
                                <Button color={blue} pressed={() => this.onModalButton()}>Confirm</Button>
                                <Button pressed={() => this.setState({ showModal: false })}>Cancel</Button>
                            </View>
                          </View>
                        : null
                    }

                </CardSection>
            )
        }
    }

    onAssign() {
        this.setState({
            showModal: true
        })
    }

    onDelete() {
        const { uid } = this.props.chore

        this.props.deleteChore( uid )
    }

    onComplete() {
        const { user, chore } = this.props
        const { name, priority, reward, recurring, uid } = this.props.chore

        this.props.completeChore( user.points, reward, chore.uid, user.uid )
    }

    onModalButton() {
        const { name, priority, reward, recurring } = this.props.chore
        const { uid } = this.props.user

        this.props.assignChoreToPerson( name, priority * 1, reward * 1, recurring, this.state.assignTo )

        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        const { titleStyle } = styles
        const { name, priority, uid } = this.props.chore
        let priorityStars = ''

        for( let i = 0; i < priority; i++ ) {
            priorityStars += '*'
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectChore(uid)}>
                <View>
                    <CardSection>
                        <Text style={titleStyle}>{name}{priorityStars}</Text>
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
        paddingLeft: 15,
    },
    descStyle: {
        paddingLeft: 15,
        paddingRight: 15,
    }
}

function mapStateToProps( state, ownProps ) {
    const { user } = state.user;
    const { selectedChore } = state.chores
    const expanded = selectedChore === ownProps.chore.uid

    const famList = _.map( state.family.famList, ( val, uid ) => {
        return { ...val, uid }
    } )

    return {
        user,
        expanded,
        famList
    };
}

export default connect( mapStateToProps, { selectChore, assignChoreToPerson, completeChore, deleteChore } )(ChoreListItem);