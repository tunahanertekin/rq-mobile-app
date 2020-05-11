import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default class QuoteList extends React.Component {

    //handles logging out
    logout = () => {
        global.user = {}
        this.props.navigation.navigate("App")
    }

    render() {
        return(
                <View style={styles.container}>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginRight: 40 }}>
                            <Text>
                                {global.user.lastLogin}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <Text>
                                {global.user.username} |
                            </Text>
                            <TouchableOpacity onPress={() => this.logout()}>
                                <Text>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.container}>
                        <Text>
                            Quote List Screen
                        </Text>
                    </View>
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