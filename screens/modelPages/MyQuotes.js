import React, {Component, useState} from 'react'
import {View,
        Text,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Alert,
        Modal,
        TouchableHighlight,
        TextInput,
        ImageBackground
    } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default class MyQuotes extends React.Component {

    

    state = {
        book: this.props.navigation.state.params.book,
        quotesResponse: {},
        error: "",

        isModalVisible: false,
        tempQuote: { page: 0, body: "init0" },
        tempPage: 0,
        tempBody: "init1",
        editResponse: {message: "editresponseinit"},

        deleteResponse: {message: "deleteresponseinit"},

        isMessageModalVisible: false,
        isDeleteValidationModalVisible: false,
        messageModalText: "messagemodaltextinit",

        isAddingModalVisible: false,
        addResponse: {message: "addresponseinit"},


    }



    
    componentDidMount(){
        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books/" + this.state.book.id + "/quotes")
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
        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books/" + this.state.book.id + "/quotes")
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


    sendEditQuoteRequest = () => {

        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books/" + this.state.book.id + "/quotes/" + this.state.tempQuote.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "page": this.state.tempPage,
                "body": this.state.tempBody
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                editResponse: responseJson,
                messageModalText: responseJson.message
            })
        })
        .catch((error) => {
            this.setState({
                editResponse: {message: error.message}
            })
        })


    }


    sendDeleteQuoteRequest = () => {
        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books/" + this.state.book.id + "/quotes/" + this.state.tempQuote.id, {
            method: 'DELETE'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                deleteResponse: responseJson,
                messageModalText: responseJson.message,
            })
        })
        .catch((error) => {
            this.setState({
                deleteResponse: {message: error.message},
            })
        })
    }


    sendAddQuoteRequest = () => {
        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books/" + this.state.book.id + "/quotes", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "page": this.state.tempPage,
                "body": this.state.tempBody
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                addResponse: responseJson,
                messageModalText: responseJson.message
            })
        })
        .catch((error) => {
            this.setState({
                addResponse: {message: error.message}
            })
        })
    }
    
    render() {
        return(
            
            <ImageBackground
            source={require("../../images/picture.jpg")}
            style={{width: '100%', height: '100%'}}
            >
                <View style={styles.container}>

                    <TouchableOpacity
                    style={{ position: "absolute", top: 0, left: 0 }}
                    onPress={ () => this.props.navigation.navigate("MyBooks") }
                    >
                        <Text style={{ margin: 10 }}>
                            <Icon name="backward" size={30} />
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 20, margin: 20 }}>
                    My Quotes - {this.state.book.title}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                        onPress={ () => this.setState({ isAddingModalVisible: true }) }
                        >
                            <Text style={{ margin: 10 }}>
                                <Icon name="plus" size={30} />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={ () => this.sendGetQuotesRequest() }
                        >
                            <Text style={{ margin: 10 }}>
                                <Icon name="sync" size={30} />
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <FlatList
                        data={this.state.quotesResponse.data}
                        renderItem={({ item }) => 
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                            onPress={ () => this.props.navigation.navigate("AllQuotePage", { book: this.state.book, quote: item }) }
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 30, height: 60 }}>
                                        <Text style={{ fontSize: 20 }}>
                                            {item.page}
                                        </Text>
                                    </View>
                                    <View style={{ width: 250, height: 60 }}>
                                        <Text style={{ fontStyle: "italic" }}>
                                            {
                                                ((item.body).length > 120) ? 
                                                    (((item.body).substring(0,120-3)) + '...') : item.body 
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            
                            
                            <View style={{ margin: 5 }}>
                                <TouchableOpacity
                                onPress={ () => this.setState({ tempPage: item.page, tempBody: item.body, tempQuote: item, isModalVisible: true }) }
                                >
                                    <Text>
                                        <Icon name="edit" size={20} />
                                    </Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ margin: 5 }}>
                                <TouchableOpacity
                                onPress={ () => {
                                    this.setState({ tempQuote: item, isDeleteValidationModalVisible: true })
                                } }
                                >
                                    <Text>
                                        <Icon name="trash-alt" size={20} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        }
                    />


                    <Modal
                    //--------------------------------------EDIT MODAL---------------------------------------
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    >
                        <View style={styles.modalView}>

                            <View>
                                <Text style={{ fontSize: 30, color: "black" }}>
                                    Edit Quote
                                </Text>
                            </View>

                            <View>
                                <TextInput style={styles.input}
                                placeholder="Page"
                                onChangeText={ newPage => this.setState({ tempPage: newPage }) }
                                defaultValue={ this.state.tempQuote.page.toString() }
                                />
                            </View>

                            <View>
                                <TextInput style={styles.bodyInput}
                                placeholder="Body"
                                multiline={true}
                                onChangeText={ newBody => this.setState({ tempBody: newBody }) }
                                defaultValue={ this.state.tempQuote.body }
                                />
                            </View>

                            

                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={ () => {
                                    this.sendEditQuoteRequest()
                                    this.setState({ 
                                        isModalVisible: false, 
                                        tempQuote: {page:0, body:""},
                                        tempPage: 0,
                                        tempBody: "",
                                        isMessageModalVisible: true
                                    })
                                } }
                                >
                                    <Text style={{ color: "black" }}>
                                        Done
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={ () => this.setState({isModalVisible: false}) }
                                >
                                    <Text style={{ color: "black" }}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                    //------------------------------------MESSAGE MODAL--------------------------------------
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isMessageModalVisible}
                    >
                        <View style={styles.messageModalView}> 

                            <Text style={{ color: "white", fontSize: 20 }}>
                                {this.state.messageModalText}
                            </Text>

                            <TouchableOpacity
                            style={{ margin: 20 }}
                            onPress={ () => {
                                this.setState({ isMessageModalVisible: false })
                                this.sendGetQuotesRequest()
                            } }
                            >
                                <Text style={{ fontSize: 25, color: "yellow" }}>
                                    Okay
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>


                    <Modal
                    //------------------------------------DELETE VALIDATION MODAL--------------------------------------
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isDeleteValidationModalVisible}
                    >
                        <View style={styles.messageModalView}> 
                            <Text style={{ color: "white", fontSize: 20 }}>
                                Are you sure deleting this quote?
                            </Text>

                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={ () => {
                                    this.sendDeleteQuoteRequest()
                                    
                                    this.setState({ 
                                        isDeleteValidationModalVisible: false, 
                                        isMessageModalVisible: true, 
                                    })
                                } }
                                >
                                    <Text style={{ fontSize: 25, color: "yellow" }}>
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={ () => this.setState({ isDeleteValidationModalVisible: false }) }
                                >
                                    <Text style={{ fontSize: 25, color: "yellow" }}>
                                        No
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                    </Modal>


                    <Modal
                    //--------------------------------------ADD MODAL---------------------------------------
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isAddingModalVisible}
                    >
                        <View style={styles.modalView}>

                            <View>
                                <Text style={{ fontSize: 30, color: "black" }}>
                                    Add Quote
                                </Text>
                            </View>

                            <View>
                                <TextInput style={styles.input}
                                placeholder="Page"
                                onChangeText={ page => this.setState({ tempPage: page }) }
                                />
                            </View>

                            <View>
                                <TextInput style={styles.bodyInput}
                                placeholder="Body"
                                onChangeText={ body => this.setState({ tempBody: body }) }
                                />
                            </View>

                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={ () => {
                                    this.sendAddQuoteRequest()
                                    
                                    this.setState({ 
                                        isAddingModalVisible: false, 
                                        isMessageModalVisible: true, 
                                    })
                                } }
                                >
                                    <Text style={{ fontSize: 25, color: "black" }}>
                                        Add
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={ () => this.setState({ isAddingModalVisible: false }) }
                                >
                                    <Text style={{ fontSize: 25, color: "black" }}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </Modal>
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

        modalView: {
            
            alignItems: "center",
            backgroundColor: "#DAF7A6",
            padding: 30,
            alignSelf: "center",
            marginTop: 80,
            borderRadius: 20,
            opacity: 0.94,
            width: 300,
            height: 500,
            color: "black",
            borderWidth: 4,
            borderColor: "#C70039"
            
        },
        input: {
            borderBottomColor: "#8A8F9E",
            borderBottomWidth: 2,
            height: 40,
            color: "red",
            width: 200,
            margin: 20
        },
        bodyInput: {
            borderColor: "#8A8F9E",
            borderWidth: 2,
            height: 300,
            color: "black",
            width: 200,
            textAlignVertical: "top"
            
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