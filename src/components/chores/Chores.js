import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '../common';
import ChoreList from './ChoreList';

class Chores extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <View>
                { this.props.user.manager
                    ? <Button>
                        Add new Chore
                      </Button>
                    : null
                }
                <ChoreList choreList={this.props.choreList}
                           from={'chores'}
                />
            </View>
        )
    }
}

function mapStateToProps( state ) {
    const { user } = state.user
    
    const choreList = _.map( state.chores.chores, ( val, uid ) => {
        return { ...val, uid}
    } )

    return {
        user,
        choreList
    };
}

export default connect( mapStateToProps, {} )(Chores);