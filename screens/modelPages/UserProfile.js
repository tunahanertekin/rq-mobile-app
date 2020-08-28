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


export default class UserProfileOffline extends React.Component {

    state = {
        user: this.props.navigation.state.params.user,
        booksResponse: {}
    }


    componentDidMount(){
        fetch('https://rq-api.herokuapp.com/users/'+this.state.user.id+"/booksdetail")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                booksResponse: responseJson,
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

    sendGetBooksRequest = () => {
        fetch('https://rq-api.herokuapp.com/users/'+this.state.user.id+"/booksdetail")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                booksResponse: responseJson,
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
                                style={{ margin: 10, width: '100%', height: undefined, aspectRatio: 1, backgroundColor:'rgba(255,255,255,0.4)', borderRadius: 40  }}
                                source={require("../../images/default.png")}
                            />
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={{ flex: 2, alignItems: "center", justifyContent: "flex-end" }}>
                                <Text style={styles.username}>
                                    {this.state.user.username}
                                </Text>
                            </View>
                            <View style={{ flex: 3, alignItems: "center", justifyContent: "flex-start"}}>
                                <Text style={styles.pinned}>
                                    {this.state.user.pinned}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor:'rgba(255,255,255,0.4)', width: "30%", alignItems: "center", borderTopEndRadius: 20, borderTopStartRadius: 20 }}>
                        <Text style={{ fontSize: 20, color: "green", marginBottom: 20, marginTop: 10, fontWeight: "bold" }}>
                            Books({ this.state.booksResponse.booknum })
                        </Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: "row", backgroundColor:'rgba(255,255,255,0.3)', borderRadius: 40 }}>
                        <FlatList
                            data={this.state.booksResponse.data}
                            renderItem={({item}) =>
                                <View style={{ flexDirection: "row", margin: 10 }}>
                                    <TouchableOpacity 
                                    style={{ flex: 3 }}
                                    onPress={ () => this.props.navigation.navigate("BookProfile", { book: item.book, user: this.state.user }) }
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: 15 }}>
                                                {item.book.title}
                                            </Text>  
                                        </View>
                                        
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    style={{ flex: 4 }}
                                    onPress={ () => this.props.navigation.navigate("BookProfile", { book: item.book, user: this.state.user }) }
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: 15 }}>
                                                {item.book.author}
                                            </Text>  
                                        </View>
                                        
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    style={{ flex: 1 }}
                                    onPress={ () => this.props.navigation.navigate("BookProfile", { book: item.book, user: this.state.user }) }
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ fontSize: 15 }}>
                                                {item.quoteNum}
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
            color: "purple",
        },
        pinned: {
            fontSize: 20,
            fontStyle: "italic"
        }
    }
)