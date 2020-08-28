import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class BookProfileOffline extends React.Component {

    state = {
        book: this.props.navigation.state.params.book,
        user: this.props.navigation.state.params.user,
        quotesResponse: {}
    }


    componentDidMount(){
        fetch('https://rq-api.herokuapp.com/users/'+this.state.user.id+"/books/" + this.state.book.id + "/quotes")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                quotesResponse: responseJson,
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

    sendGetQuotesRequest = () => {
        fetch('https://rq-api.herokuapp.com/users/'+this.state.user.id+"/books/" + this.state.book.id + "/quotes")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                quotesResponse: responseJson,
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

    render() {
        return(

            <ImageBackground
            source={require("../../images/lsd.jpg")}
            style={{width: '100%', height: '100%'}}
            >
                <View style={styles.container}>

                    <TouchableOpacity style={{ alignSelf: "flex-start" }}>
                        <Text
                        style={{ marginTop: 10, marginHorizontal: 10 }}
                        onPress={ () => this.props.navigation.goBack() }
                        >
                            <Icon name="backward" size={30} />
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flex: 2, flexDirection: "row" }}>
                        <View style={{ flex: 2 }}>
                        <Image
                            style={{ margin: 10, width: '100%', height: undefined, aspectRatio: 1 }}
                            source={require("../../images/book.png")}
                        />
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={{ flex: 2, alignItems: "center", justifyContent: "flex-end" }}>
                                <Text style={styles.username}>
                                    {this.state.book.title}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start"}}>
                                <Text style={styles.pinned}>
                                    {this.state.book.author}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start"}}>
                                <Text style={styles.owner}>
                                    owned by {this.state.user.username}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor:'rgba(255,255,255,0.3)', borderTopEndRadius: 20 , borderTopStartRadius: 20, width: "30%", alignItems: "center"}}>
                        <Text style={{ fontSize: 20, color: "green", marginBottom: 20, fontWeight: "bold" }}>
                            Quotes
                        </Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: "row", backgroundColor:'rgba(255,255,255,0.3)', borderRadius: 40 }}>
                        
                        <FlatList
                            data={this.state.quotesResponse.data}
                            renderItem={({item}) =>
                                <View style={{ flexDirection: "row", margin: 10 }}>
                                    <TouchableOpacity 
                                    style={{ flex: 1 }}
                                    onPress={ () => this.props.navigation.navigate("QuoteProfileOffline", { quote: item, book: this.state.book, user: this.state.user }) }
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: 20 }}>
                                                {item.page}
                                            </Text>  
                                        </View>
                                        
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    style={{ flex: 5 }}
                                    onPress={ () => this.props.navigation.navigate("QuoteProfileOffline", { quote: item, book: this.state.book, user: this.state.user }) }
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: 15 }}>
                                                {item.body}
                                            </Text>  
                                        </View>
                                        
                                    </TouchableOpacity>
                                    
                                </View>
                                
                            }
                        />
                        

                    </View>

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
        username: {
            fontSize: 40,
            color: "#c70039"
        },
        pinned: {
            fontSize: 20,
            fontStyle: "italic"
        }
    }
)