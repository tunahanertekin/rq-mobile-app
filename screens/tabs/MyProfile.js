import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'


export default class MyProfile extends React.Component {

    state= {
        editableProperty: 0,

        tempUsername: "usernameinit",
        tempEmail: "",
        tempPinned: "",
        tempGlobalUser: {username: "", email: "", pinned: ""},

        updateResponse: {message: "updateresponseinit"},

        isMessageModalVisible: false,
        messageModalText: "messagemodaltextinit"
    }

    //handles logging out
    logout = () => {
        global.user = {}
        this.props.navigation.navigate("App")
    }

    chooseEditableProperty = (p) => {
        this.setState({
            editableProperty: p
        })
    }

    sendUpdateUsername = () => {
        fetch('http://10.0.2.2:3000/users/' + global.user.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.tempUsername
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                updateResponse: responseJson,
            })
        })
        .catch((error) => {
            this.setState({
                updateResponse: {message: error.message}
            })
        })
        
        .then(() => {
            {
                this.chooseEditableProperty(0)
                delete global.user
                global.user = {
                    username: "heyu",
                    lastLogin: "sfdawref"
                }

            }
        })
    }


    sendUpdateEmail = () => {
        fetch('http://10.0.2.2:3000/users/' + global.user.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.tempEmail
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                updateResponse: responseJson,
            })
        })
        .catch((error) => {
            this.setState({
                updateResponse: {message: error.message}
            })
        })
        
    }


    sendUpdatePinned = () => {
        fetch('http://10.0.2.2:3000/users/' + global.user.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pinned: this.state.tempPinned
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                updateResponse: responseJson,
            })
        })
        .catch((error) => {
            this.setState({
                updateResponse: {message: error.message}
            })
        })
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
                    <View style={styles.properties}>

                    {
                        this.state.editableProperty == 1 ? 
                        <View style={{ flexDirection: "row" }}>
                            <TextInput style={styles.input}
                            placeholder="Username"
                            onChangeText={ username => this.setState({ tempUsername: username }) }
                            defaultValue={ global.user.username }
                            />
                            
                            <TouchableOpacity
                            style={{ marginHorizontal: 5 }}
                            onPress={ () => this.sendUpdateUsername() }
                            >
                                <Text>
                                    <Icon name="check" size={30} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{ marginHorizontal: 5 }}
                            onPress={ () => this.chooseEditableProperty(0) }
                            >
                                <Text>
                                    <Icon name="times" size={30} />
                                </Text>
                            </TouchableOpacity>

                            
                        </View>:
                        
                        <View style={{ flexDirection: "row" }}>

                            
                            <Text style={styles.editableText}>
                                {global.user.username}
                            </Text>

                            <TouchableOpacity
                            onPress={ () => this.chooseEditableProperty(1) }
                            >
                                <Text>
                                    <Icon name="edit" size={30} />
                                </Text>
                            </TouchableOpacity>

                        </View>
                    }
                    </View>

                    <View style={styles.properties}>

                    {
                        this.state.editableProperty == 2 ? 
                        <View style={{ flexDirection: "row" }}>
                            <TextInput style={styles.input}
                            placeholder="Email"
                            onChangeText={ email => this.setState({ tempEmail: email }) }
                            defaultValue={ global.user.email }
                            />
                            
                            <TouchableOpacity
                            style={{ marginHorizontal: 5 }}
                            onPress={ () => this.sendUpdateEmail() }
                            >
                                <Text>
                                    <Icon name="check" size={30} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{ marginHorizontal: 5 }}
                            onPress={ () => this.chooseEditableProperty(0) }
                            >
                                <Text>
                                    <Icon name="times" size={30} />
                                </Text>
                            </TouchableOpacity>

                            
                        </View>:
                        
                        <View style={{ flexDirection: "row" }}>
                            
                            <Text style={styles.editableText}>
                                {global.user.email}
                            </Text>

                            <TouchableOpacity
                            onPress={ () => this.chooseEditableProperty(2) }
                            >
                                <Text>
                                    <Icon name="edit" size={30} />
                                </Text>
                            </TouchableOpacity>

                        </View>
                    }
                    </View>

                    <View style={styles.properties}>

                    {
                        this.state.editableProperty == 3 ? 
                        <View style={{ flexDirection: "row" }}>
                            <TextInput style={styles.input}
                            placeholder="Bio"
                            multiline={true}
                            onChangeText={ bio => this.setState({ tempPinned: bio }) }
                            defaultValue={ global.user.pinned }
                            />
                            
                            <TouchableOpacity
                            style={{ marginHorizontal: 5 }}
                            onPress={ () => this.sendUpdatePinned() }
                            >
                                <Text>
                                    <Icon name="check" size={30} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={{ marginHorizontal: 5 }}
                            onPress={ () => this.chooseEditableProperty(0) }
                            >
                                <Text>
                                    <Icon name="times" size={30} />
                                </Text>
                            </TouchableOpacity>

                            
                        </View>:
                        
                        <View style={{ flexDirection: "row" }}>
                           
                            {
                                global.user.pinned == ""?
                                <Text style={styles.editableText}>
                                    Bio
                                </Text>:
                                <Text style={styles.editableText}>
                                    {global.user.pinned}
                                </Text>
                            }
                            

                            <TouchableOpacity
                            onPress={ () => this.chooseEditableProperty(3) }
                            >
                                <Text>
                                    <Icon name="edit" size={30} />
                                </Text>
                            </TouchableOpacity>

                        </View>
                    }
                    </View>
                </View>

                

                <View>
                    <Text>
                        {this.state.editableProperty}
                    </Text>
                </View>
                
                
                <Modal
                //--------------------------------------REDIRECT TO LOGIN MODAL---------------------------------------
                animationType="slide"
                transparent={true}
                visible={this.state.isMessageModalVisible}
                >
                    <View style={styles.messageModalView}>
                        <Text>
                            {this.state.messageModalText}
                        </Text>
                    </View>
                        
                </Modal>
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
        properties: {
            margin: 10
        },
        input: {
            borderBottomColor: "#8A8F9E",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            color: "black",
            width: 160
        },
        editableText: {
            height: 40,
            color: "black",
            width: 200
        },

        messageModalView: {
            
            alignItems: "center",
            backgroundColor: "green",
            padding: 30,
            alignSelf: "center",
            marginTop: 80,
            borderRadius: 20,
            opacity: 0.85,
            width: 300,
            height: 200,
            borderColor: "yellow",
            borderWidth: 2
            
        }
    }
)