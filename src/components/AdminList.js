import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class AdminList extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentWillMount() {
        this.createDataSource( this.props.famList )
    }

    componentWillReceiveProps( nextProps ) {
        this.createDataSource( nextProps.famList )
    }

    createDataSource( famList ) {
        console.log( 'dataSource:', famList )

        // for( let i = 0; i < famList.length; i++ ) {
        //     if( this.props.user.uid === famList[i].uid )
        //         famList.splice( i, 1 )
        // }

        const ds = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 != r2
        })

        this.dataSource = ds.cloneWithRows( famList )
    }

    renderRow( person ) {
        console.log( 'person:', person )

        return <ListItem person={person}
                         selectChild={this.selectChild}
               />
    }
    selectChild( uid ) {

    }

    render() {
        return (
            <View>
                <ListView dataSource={this.dataSource}
                          renderRow={this.renderRow}
                />
            </View>
        )
    }
}

function mapStateToProps( state ) {

    const famList = _.map( state.family.famList, ( val, uid ) => {
        return { ...val, uid }
    } )

    return {
        famList
    };
}

export default connect( mapStateToProps, {} )(AdminList);