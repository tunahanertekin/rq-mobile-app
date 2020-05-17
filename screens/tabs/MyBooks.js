import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class MyBooks extends React.Component {

    state = {
        booksResponse: {},
        error: ""
    }

    componentDidMount(){
        fetch('http://10.0.2.2:3000/users/'+global.user.id+"/books")
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
        fetch('http://10.0.2.2:3000/users/'+global.user.id+"/books")
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

                        <Text style={{ fontSize: 20, margin: 10 }}>
                            Library - {this.state.booksResponse.message}
                        </Text>

                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate("AddBook")}
                            >
                                <Text style={{ fontSize: 20, margin: 10 }}>
                                    <Icon name="plus" size={30} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=>this.sendGetBooksRequest()}
                            >
                                <Text style={{ fontSize: 20, margin: 10 }}>
                                    <Icon name="sync" size={30} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        

                        <FlatList
                            data={this.state.booksResponse.data}
                            renderItem={({ item }) => 
                            <TouchableOpacity
                            onPress={ () => this.props.navigation.navigate("MyQuotes", { book: item }) }
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 200, height: 30 }}>
                                        <Text style={{ fontStyle: "italic" }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                    <View style={{ width: 200, height: 30 }}>
                                        <Text>
                                            {item.author}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
        }
    }
)