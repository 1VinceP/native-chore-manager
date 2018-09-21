import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { getStoreList } from '../../redux/actions/actionIndex';
import StoreListItem from './StoreListItem';

class StoreList extends Component {

    componentWillMount() {
        this.props.getStoreList()
        this.createDataSource( this.props.storeList )
    }

    componentWillReceiveProps( nextProps ) {
        this.createDataSource( nextProps.storeList )
    }

    createDataSource( storeList ) {

        const ds = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 != r2
        })

        this.dataSource = ds.cloneWithRows( storeList )
    }

    renderRow( storeItem ) {
        return <StoreListItem storeItem={storeItem} />
    }

    render() {
        return (
            <View style={{width: '100%'}}>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        )
    }
}

function mapStateToProps( state ) {

    const unorderedStoreList = _.map( state.storeItems.storeList, ( val, uid ) => {
        return { ...val, uid }
    } )
    const storeList = _.orderBy( unorderedStoreList, ['price'] )

    return {
        storeList
    };
}

export default connect( mapStateToProps, { getStoreList } )(StoreList);