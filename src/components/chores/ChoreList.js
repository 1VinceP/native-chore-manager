import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import ChoreListItem from './ChoreListItem';

class ChoreList extends Component {

    componentWillMount() {
        this.createDataSource( this.props.choreList )
        this.setState({
            from: this.props.from
        })
    }

    componentWillReceiveProps( nextProps ) {
        this.createDataSource( nextProps.choreList )
    }

    createDataSource( choreList ) {

        const ds = new ListView.DataSource({
            rowHasChanged: ( r1, r2 ) => r1 != r2
        })

        this.dataSource = ds.cloneWithRows( choreList )
    }

    renderRow( chore, from ) {
        return <ChoreListItem chore={chore} from={from} />
    }

    render() {
        return (
            <View style={{width: '100%'}}>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={(chore) => this.renderRow(chore, this.state.from)}
                />
            </View>
        )
    }
}

export default ChoreList;