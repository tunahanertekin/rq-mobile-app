import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

export default class LoginScreen extends React.Component {
    
    state = {
        username: "tunanzi",
        password: "123",
        loginResponse: "inittt",
        warning: ""
    }

    sendLoginRequest = () => {
        const {username, password} = this.state

        fetch('http://10.0.2.2:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": this.state.username,
                "hashedPassword": this.state.password
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                loginResponse: responseJson.status
            })
            
            if(this.state.loginResponse == "SUCCESS"){
                this.props.navigation.navigate("LoggedIn", {user: responseJson.data})//send user data to userlist
            }
            else{
                this.setState({
                    warning: responseJson.message
                })
            }
        })
        .catch((error) => {
            this.setState({
                loginResponse: "aaa"+error.message
            })
        })

        

        
    }

    render() {
        return(
                <View style={styles.container}>
                    <Text style={{ margin: 40 }}>
                        Login Screen
                    </Text>

                    <View>
                        <Text style={{ color: "red" }}>
                            {this.state.warning}
                        </Text>
                    </View>
                    
                    <View>
                        <TextInput style={styles.input}
                        placeholder="Username"
                        onChangeText={ username => this.setState({ username }) }
                        value={ this.state.username }
                        />
                    </View>
                    
                    <View>
                        <TextInput style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={ password => this.setState({ password }) }
                        value={ this.state.password }
                        />
                    </View>

                    <View style={{ margin: 40 }}>
                        <TouchableOpacity onPress={ () => this.sendLoginRequest() } >
                            <Text>
                                Login
                            </Text>
                        </TouchableOpacity>
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
        input: {
            borderBottomColor: "#8A8F9E",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            color: "black",
            width: 200
            
        }
    }
)