import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
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
                <ChoreList choreList={this.props.choreList}
                           from={'chores'}
                />
            </View>
        )
    }
}

function mapStateToProps( state ) {
    
    const choreList = _.map( state.chores.chores, ( val, uid ) => {
        return { ...val, uid}
    } )

    return {
        choreList
    };
}

export default connect( mapStateToProps, {} )(Chores);