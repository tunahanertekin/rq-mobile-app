import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class QuoteProfile extends React.Component {

    state = {
        quote: this.props.navigation.state.params.quote,
        book: this.props.navigation.state.params.book,
        user: this.props.navigation.state.params.user,
    }


    render() {
        return(
            <View style={styles.container}>
                
                <TouchableOpacity>
                    <Text
                    style={{ margin: 10 }}
                    onPress={ () => this.props.navigation.goBack() }
                    >
                        <Icon name="backward" size={30} />
                    </Text>
                </TouchableOpacity>
                
                <ScrollView>
                    <View style={styles.quoteBody}>
                        <Text style={{ fontSize: 18 }}>
                            { this.state.quote.body }
                        </Text>
                    </View>
                    <View style={styles.quoteInfo}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 3 }}>
                                <Text style={{ fontSize: 16, fontStyle: "italic" }}>
                                    { this.state.book.title }(Page { this.state.quote.page })
                                </Text>
                            </View>
                            <View style={{ flex: 3, alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 16 }}>
                                    { this.state.book.author }
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 3 }}>
                                <Text style={{ fontSize: 16, fontStyle: "italic" }}>
                                    saved by { this.state.user.username }
                                </Text>
                            </View>
                            <View style={{ flex: 3 , alignItems: "flex-end" }}>
                                <Text style={{ fontSize: 16, fontStyle: "italic" }}>
                                    { this.state.quote.created_at.substring(0,10) }, { this.state.quote.created_at.substring(11,16) }
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            
        },
        quoteBody: {
            flex: 0,
            margin: 20,
            borderWidth: 2,
            height: "auto",
            borderColor: "red",
            borderRadius: 10,
            borderStyle: "dotted",
            padding: 10
        },
        quoteInfo: {
            flex: 0,
            marginBottom: 20,
            marginHorizontal: 20,
            borderWidth: 2,
            height: "auto",
            borderColor: "purple",
            borderRadius: 10,
            borderStyle: "dotted",
            padding: 10
        }
    }
)