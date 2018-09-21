import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import PersonListItem from './PersonListItem';

class AdminList extends Component {
    constructor() {
        super();

        this.state = {
            selection: 'none'
        }
    }

    componentWillMount() {
        this.createDataSource( this.props.famList )
    }

    componentWillReceiveProps( nextProps ) {
        this.createDataSource( nextProps.famList )
    }

    createDataSource( famList ) {

        for( let i = 0; i < famList.length; i++ ) {
            if( this.props.user.uid === famList[i].uid )
                famList.splice( i, 1 )
        }

        const ds = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 != r2
        })

        this.dataSource = ds.cloneWithRows( famList )
    }

    renderRow( person ) {
        return <PersonListItem person={person} />
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        )
    }
}

function mapStateToProps( state ) {

    let unorderedFamList = _.map( state.family.famList, ( val, uid ) => {
        return { ...val, uid }
    } )
    let famList = _.sortBy( unorderedFamList, ['manager', 'admin'] )

    return {
        famList
    };
}

export default connect( mapStateToProps, {} )(AdminList);