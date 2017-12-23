import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { getUserItems } from '../../redux/actions/actionIndex';
import InventoryListItem from './InventoryListItem';

class InventoryList extends Component {
    constructor() {
        super();

        this.state = {
            
        }
    }

    componentWillMount() {
        if( !this.props.empty )
            this.createDataSource( this.props.inventory )
    }

    componentWillReceiveProps( nextProps ) {
        if( !this.props.empty )
            this.createDataSource( nextProps.inventory )
    }

    createDataSource( inventory ) {

        const ds = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 != r2
        })

        this.dataSource = ds.cloneWithRows( inventory )
    }

    renderRow( item ) {
        return <InventoryListItem item={item} />
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
    let inventory

    if( _.isEmpty(state.user.user.inventory) )
        inventory = [{name: ''}]
    else {
        inventory = _.map( state.user.user.inventory, ( val, uid ) => {
            return { ...val, uid }
        } )
    }
    

    return {
        inventory
    };
}

export default connect( mapStateToProps, { getUserItems } )(InventoryList);