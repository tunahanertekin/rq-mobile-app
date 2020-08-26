import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
    ImageBackground
} from 'react-native'
import { useHeaderHeight } from 'react-navigation-stack';

export default class QuoteList extends React.Component {

    state = {
        randomQuotesResponse: {},
        error: ""
    }

    componentDidMount(){
        fetch('http://10.0.2.2:3000/random')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                randomQuotesResponse: responseJson,
            })
            if(responseJson.status == "FAILURE"){
                this.setState({
                    error: responseJson.message
                })
            }
        })
        .catch((error) => {
            this.setState({
                error: error.message
            })
        });
    }

    sendGetRandomQuotesRequest = () => {
        fetch('http://10.0.2.2:3000/random')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                randomQuotesResponse: responseJson,
            })
            if(responseJson.status == "FAILURE"){
                this.setState({
                    error: responseJson.message
                })
            }
        })
        .catch((error) => {
            this.setState({
                error: error.message
            })
        });
    }

    //handles logging out
    logout = () => {
        global.user = {}
        this.props.navigation.navigate("App")
    }

    render() {
        return(
                <ImageBackground
                source={require("../../images/femme.jpg")}
                style={{width: '100%', height: '100%'}}
                >

                    <View style={styles.container}>

                        <View>
                            <Text style={{ fontFamily: "courier", fontWeight: "bold", fontSize: 50, color: "darkorange" }}>
                                RANDOM
                            </Text>
                        </View>

                        <FlatList
                            data={this.state.randomQuotesResponse.data}
                            renderItem={({ item }) => 
                            <View style={{ flexDirection: "row",borderBottomColor: "white", borderBottomWidth: StyleSheet.hairlineWidth, borderStyle: "dashed" }}>
                                <View>
                                    
                                    <View style={{ flexDirection: "row", alignSelf: "flex-start", margin: 5 }}>
                                        <Text>
                                            saved by &nbsp;
                                        </Text>
                                        <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate("UserProfile", { user: item.user }) }
                                        >
                                            <Text style={styles.userLink}>
                                                { item.user.username }
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate("QuoteProfile", { quote: item.quote, book: item.book, user: item.user }) }
                                        >
                                            <View style={{ flexDirection: "row" }}>
                                                
                                                <View style={{ marginHorizontal: 20, height: 60, alignItems: "center", justifyContent:"center" }}>
                                                    <Text style={{ fontFamily: "times new roman", fontStyle: "italic", fontWeight: "bold",  }}>
                                                        "
                                                        {
                                                            ((item.quote.body).length > 120) ? 
                                                                (((item.quote.body).substring(0,120-3)) + '...') : item.quote.body 
                                                        }
                                                        "
                                                    </Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: "row", alignSelf: "flex-end", margin: 5 }}>
                                        <Text>
                                            from &nbsp;
                                        </Text>
                                        <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate("BookProfile", {book: item.book, user: item.user} ) }
                                        >
                                            <Text style={styles.bookLink}>
                                                { item.book.title }, &nbsp;
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate("BookProfile", {book: item.book, user: item.user} ) }
                                        >
                                            <Text style={styles.bookLink}>
                                                { item.book.author }
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                            }
                        />


                    </View>

                </ImageBackground>
                
        )
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:'rgba(255,255,255,0.7)',
        },
        bookLink: {
            fontStyle: "italic",
            color: "blue"
        },
        userLink: {
            fontStyle: "italic",
            color: "green"
        }
    }
)