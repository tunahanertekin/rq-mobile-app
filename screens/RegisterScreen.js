import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput,
    ImageBackground,
    AsyncStorage
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { sha512 } from 'react-native-sha512';



export default class RegisterScreen extends React.Component {

    state= {
        username: "",
        email: "",
        password: "",
        tempPassword: "",

        registerResponse: {},
        message: ""
    }

    sendRegisterRequest = async() => {
        const {username, email, password} = this.state

        await sha512(this.state.password).then( hash => {
            this.setState({
                tempPassword: hash
            })
        })

        //no fast login
        await AsyncStorage.clear()

        fetch('http://10.0.2.2:3000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    email: this.state.email,
                    hashedPassword: this.state.tempPassword
                }
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                registerResponse: responseJson,
                message: responseJson.message
            })
            
            if(this.state.registerResponse.status == "SUCCESS"){
                this.props.navigation.navigate("Login")
            }
            else{
                this.setState({
                    message: this.state.registerResponse.message
                })
            }
        })
        .catch((error) => {
            this.setState({
                message: error.message
            })
        })
    }

    render() {
        return(

            <ImageBackground
            source={require("../images/fist.jpg")}
            style={{width: '100%', height: '100%'}}
            >

                <View style={styles.container}>
                    <TouchableOpacity
                    style={{ position: "absolute", top: 0, left: 0 }}
                    onPress={ () => this.props.navigation.goBack() }
                    >
                        <Text style={{ margin: 10 }}>
                            <Icon name="backward" size={30} />
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.appHeader}>
                            read&quote
                        </Text>
                    </View>

                    <View style={{ flex: 4, alignItems: "center" }}>
                        <Text style={{ margin: 20 }}>
                            {this.state.message}
                        </Text>

                        
                        <View>
                            <TextInput style={styles.input}
                            placeholder="Username"
                            onChangeText={ username => this.setState({ username }) }
                            value={ this.state.username }
                            />
                        </View>
                        
                        <View>
                            <TextInput style={styles.input}
                            placeholder="Email"
                            onChangeText={ email => this.setState({ email }) }
                            value={ this.state.email }
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

                        <TouchableOpacity style={{margin: 20}}
                        onPress={()=>this.sendRegisterRequest()}
                        style={styles.buttons}
                        >
                            <Text style={ styles.buttonText }>
                                Register
                            </Text>
                        </TouchableOpacity>
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
        input: {
            borderBottomColor: "#8A8F9E",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            color: "black",
            width: 200
        },
        buttons: {
            margin: 10,
            borderWidth: 5,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#f1948a80",
            borderColor: "#11050490"
        },
        buttonText: {
            fontFamily: "monospace",
            fontWeight: "bold"
        },
        appHeader: {
            fontSize: 50,
            fontFamily: "monospace",
            justifyContent: "flex-end"
        }
    }
)