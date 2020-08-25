import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    FlatList,
    Icon
} from 'react-native'

export default class UserProfile extends React.Component {

    state = {
        user: this.props.navigation.state.params.user,
        booksResponse: {}
    }


    componentDidMount(){
        fetch('http://10.0.2.2:3000/users/'+this.state.user.id+"/booksdetail")
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
        fetch('http://10.0.2.2:3000/users/'+this.state.user.id+"/booksdetail")
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
            <View style={styles.container}>

                
                <View style={{ flex: 2, flexDirection: "row" }}>
                    <View style={{ flex: 2 }}>
                    <Image
                        style={{ margin: 10, width: '100%', height: undefined, aspectRatio: 1 }}
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
                <View>
                    <Text style={{ fontSize: 20, color: "green", marginBottom: 20 }}>
                        Books({ this.state.booksResponse.booknum })
                    </Text>
                </View>
                <View style={{ flex: 3, flexDirection: "row" }}>
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
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        username: {
            fontSize: 40,
            color: "purple"
        },
        pinned: {
            fontSize: 20,
            fontStyle: "italic"
        }
    }
)