import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default class AllQuotePage extends React.Component {

    state = {
        quote: this.props.navigation.state.params.quote
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    All Quote Page - {this.state.quote.body}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    }
)