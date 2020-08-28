import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
    ImageBackground,
    RefreshControl
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'



export default class FlowOffline extends React.Component {

    state = {
        lastQuotesResponse: {},
        error: "",

        refreshing: false,
        listData: {}
    }

    componentDidMount(){
        this.sendGetLastQuotesRequest()
    }

    sendGetLastQuotesRequest = () => {
        fetch('http://10.0.2.2:3000/flow')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                lastQuotesResponse: responseJson,
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

    onRefresh = () => {
        this.setState({
            refreshing: true
        })

        this.sendGetLastQuotesRequest()

        this.setState({
            refreshing: false
        })
    }

    render() {
        
        return(
                <ImageBackground
                source={require("../images/fist.jpg")}
                style={{width: '100%', height: '100%'}}
                >

                    <View style={styles.container}>

                        <View style={{ position: "absolute", margin: 10, top: 0, left: 0 }}>
                            <TouchableOpacity>
                                <Text
                                onPress={ () => this.props.navigation.goBack() }
                                >
                                    <Icon name="backward" size={30} />
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={{ fontFamily: "courier", fontWeight: "bold", fontSize: 50, color: "purple" }}>
                                FLOW
                            </Text>
                        </View>

                        <FlatList
                            data={this.state.lastQuotesResponse.data}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                            renderItem={({ item }) => 
                            <View style={{ flexDirection: "row",borderBottomColor: "purple", borderBottomWidth: StyleSheet.hairlineWidth }}>
                                <View>
                                    
                                    <View style={{ flexDirection: "row", alignSelf: "flex-start", margin: 5 }}>
                                        <Text>
                                            saved by &nbsp;
                                        </Text>
                                        <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate("UserProfileOffline", { user: item.user }) }
                                        >
                                            <Text style={styles.userLink}>
                                                { item.user.username }
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate("QuoteProfileOffline", { quote: item.quote, book: item.book, user: item.user }) }
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
                                        onPress={ () => this.props.navigation.navigate("BookProfileOffline", {book: item.book, user: item.user} ) }
                                        >
                                            <Text style={styles.bookLink}>
                                                { item.book.title }, &nbsp;
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate("BookProfileOffline", {book: item.book, user: item.user} ) }
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
            backgroundColor:'rgba(255,255,255,0.7)'

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