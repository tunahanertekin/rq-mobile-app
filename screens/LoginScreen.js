import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    AsyncStorage,
    ImageBackground
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { sha512 } from 'react-native-sha512';

export default class LoginScreen extends React.Component {
    
    constructor(){
        super()
        global.user = {}
    }

    state = {
        username: "",
        password: "",
        hashedPassword: "",
        tempPassword: "",
        loginResponse: "inittt",
        warning: ""
    }

    async componentDidMount(){
        
        await this.readData()

        await sha512(this.state.password).then( hash => {
            this.setState({
                tempPassword: hash
            })
        })

        if(this.state.username != "" && this.state.password !=""){
            this.fastLogin()
        }

    }

    saveData = async () => {
        try {
            await AsyncStorage.setItem("username", this.state.username)
            await AsyncStorage.setItem("password", this.state.password)
        } catch (e) {
            this.setState({
                warning: e.message
            })
        }
    }

    readData = async () => {
        try {
            const usr = await AsyncStorage.getItem("username")
            const pass = await AsyncStorage.getItem("password")
        
            if (usr !== null ) {
                
                this.setState({
                    username: usr,
                    password: pass
                })
            }

        } catch (e) {
            this.setState({
                warning: e.message
            })
        }
    }

    updatePassword = () => {
        
    }

    fastLogin = () => {
        
        fetch('https://rq-api.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": this.state.username,
                "hashedPassword": this.state.tempPassword
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                loginResponse: responseJson.status
            })
            
            if(this.state.loginResponse == "SUCCESS"){
                //assign global user variable
                global.user = responseJson.data
                //redirect to UserList
                this.props.navigation.navigate("LoggedIn")
            }
            else{
                this.setState({
                    warning: responseJson.message
                })
            }
        })
        .catch((error) => {
            this.setState({
                loginResponse: error.message
            })
        })
    }

    sendLoginRequest = async() => {
        const {username, password} = this.state

        await sha512(this.state.password).then( hash => {
            this.setState({
                tempPassword: hash
            })
        })

        fetch('https://rq-api.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": this.state.username,
                "hashedPassword": this.state.tempPassword
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                loginResponse: responseJson.status
            })
            
            if(this.state.loginResponse == "SUCCESS"){
                this.saveData()
                //assign global user variable
                global.user = responseJson.data
                //redirect to UserList
                this.props.navigation.navigate("LoggedIn")
            }
            else{
                this.setState({
                    warning: responseJson.message
                })
            }
        })
        .catch((error) => {
            this.setState({
                loginResponse: error.message
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
                    <View style={{ position: "absolute", margin: 10, top: 0, left: 0 }}>
                        <TouchableOpacity>
                            <Text
                            onPress={ () => this.props.navigation.goBack() }
                            >
                                <Icon name="backward" size={30} />
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.appHeader}>
                            read&quote
                        </Text>
                    </View>

                    <View style={{ flex: 3, alignItems: "center" }}>
                        


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

                        <View style={styles.buttons}>
                            <TouchableOpacity 
                            style={ styles.buttonText }
                            onPress={ () => this.sendLoginRequest() } 
                            >
                                <Text>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
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
            width: 200,
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
            fontWeight: "bold",
        },
        appHeader: {
            fontSize: 50,
            fontFamily: "monospace",
            justifyContent: "flex-end"
        }
    }
)