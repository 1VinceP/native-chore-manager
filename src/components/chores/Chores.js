import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import ChoreList from './ChoreList';

import { blue } from '../colors';

class Chores extends Component {

    onCreateChore() {
        Actions.createChore()
    }

    render() {
        return (
            <Card>
                { this.props.user.manager
                    ? <CardSection>
                        <Button color={blue} pressed={() => this.onCreateChore()}>
                            Add new Chore
                        </Button>
                      </CardSection>
                    : null
                }
                <CardSection style={{width: '100%'}}>
                    <ChoreList
                        choreList={this.props.choreList}
                        from={'chores'}
                    />
                </CardSection>

            </Card>
        )
    }
}

function mapStateToProps( state ) {
    const { user } = state.user
    const { chores } = state.chores

    if( _.isEmpty( chores ) )
        choreList = [{name: ''}]
    else {
        let unsortedChoreList = _.map( chores, ( val, uid ) => {
            return { ...val, uid }
        } )
        choreList = _.sortBy( unsortedChoreList, ['priority'] ).reverse()
    }

    return {
        user,
        choreList
    };
}

export default connect( mapStateToProps, {} )(Chores);