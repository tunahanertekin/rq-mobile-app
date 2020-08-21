import React from 'react'
import {View,
        Text, 
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Modal,
        TextInput
    } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class MyBooks extends React.Component {

    state = {
        booksResponse: {},
        error: "",

        tempBook: {title: "", author: "", publisher: "", translator: "", edition: 0, language: ""},
        tempTitle: "tempTitle",
        tempAuthor: "tempAuthor",
        tempPublisher: "tempPublisher",
        tempTranslator: "tempTranslator",
        tempEdition: 0,
        tempLanguage: "tempLanguage",

        isEditModalVisible: false,
        editResponse: {message: "editresponseinit"},

        isDeleteValidationModalVisible: false,
        deleteResponse: {message: "deleteresponseinit"},
        
        isMessageModalVisible: false,
        messageModalText: "messagemodaltextinit"
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


    


    //handles logging out
    logout = () => {
        global.user = {}
        this.props.navigation.navigate("App")
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


    sendUpdateBookRequest = () => {
        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books/" + this.state.tempBook.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.tempTitle,
                author: this.state.tempAuthor,
                publisher: this.state.tempPublisher,
                translator: this.state.tempTranslator,
                edition: this.state.tempEdition,
                language: this.state.tempLanguage
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


    sendDeleteBookRequest = () => {
        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books/" + this.state.tempBook.id , {
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


    render() {
        return(
                <View style={styles.container}>

                    
                    

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
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                onPress={ () => this.props.navigation.navigate("MyQuotes", { book: item }) }
                                >
                                    <View style={{ flexDirection: "row"}}>
                                        <View style={{ width: 120, height: 60, justifyContent: "center" }}>
                                            <Text style={{ fontStyle: "italic" }}>
                                                {item.title}
                                            </Text>
                                        </View>

                                        <View style={{ width: 120, height: 60, justifyContent: "center" }}>
                                            <Text>
                                                {item.author}
                                            </Text>
                                        </View>

                                        
                                    </View>
                                </TouchableOpacity>

                                <View style={{ margin: 10 }}>
                                    <TouchableOpacity
                                    onPress={() => this.setState({ 
                                        isEditModalVisible: true ,
                                        tempBook: item,
                                        //do this mess
                                        tempTitle: item.title,
                                        tempAuthor: item.author,
                                        tempPublisher: item.publisher,
                                        tempTranslator: item.translator,
                                        tempEdition: item.edition,
                                        tempLanguage: item.language
                                    })}
                                    >
                                        <Text>
                                            <Icon name="edit" size={30} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ margin: 10 }}>
                                    <TouchableOpacity
                                    onPress={ () => this.setState({
                                        isDeleteValidationModalVisible: true,
                                        tempBook: item
                                    }) }
                                    >
                                        <Text>
                                            <Icon name="trash-alt" size={30} />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            }
                        />

                    </View>

                    <Modal
                    //--------------------------------------MESSAGE MODAL---------------------------------------
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
                            this.sendGetBooksRequest()
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
                                Are you sure deleting this book?
                            </Text>

                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                style={{ margin: 10 }}
                                onPress={ () => {
                                    this.sendDeleteBookRequest()
                                    
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
                    //--------------------------------------EDIT MODAL---------------------------------------
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isEditModalVisible}
                    >
                        <View style={styles.modalView}>


                                <View>
                                    <Text style={{ fontSize: 30, color: "yellow"  }}>
                                        Edit Book
                                    </Text>
                                </View>

                                <View>
                                    <TextInput style={styles.input}
                                    placeholder="title"
                                    placeholderTextColor="yellow"
                                    onChangeText={ title => this.setState({ tempTitle: title }) }
                                    defaultValue={this.state.tempBook.title}
                                    />
                                </View>

                                <View>
                                    <TextInput style={styles.input}
                                    placeholder="author"
                                    placeholderTextColor="yellow"
                                    onChangeText={ author => this.setState({ tempAuthor: author }) }
                                    defaultValue={this.state.tempBook.author}
                                    />
                                </View>

                                <View>
                                    <TextInput style={styles.input}
                                    placeholder="publisher"
                                    placeholderTextColor="yellow"
                                    onChangeText={ publisher => this.setState({ tempPublisher: publisher }) }
                                    defaultValue={ this.state.tempBook.publisher }
                                    />
                                </View>

                                <View>
                                    <TextInput style={styles.input}
                                    placeholder="translator"
                                    placeholderTextColor="yellow"
                                    onChangeText={ translator => this.setState({ tempTranslator: translator }) }
                                    defaultValue={ this.state.tempBook.translator }
                                    />
                                </View>

                                <View>
                                    <TextInput style={styles.input}
                                    placeholder="edition"
                                    placeholderTextColor="yellow"
                                    onChangeText={ edition => this.setState({ tempEdition: edition }) }
                                    defaultValue={ this.state.tempBook.edition.toString() }
                                    />
                                </View>

                                <View>
                                    <TextInput style={styles.input}
                                    placeholder="language"
                                    placeholderTextColor="yellow"
                                    onChangeText={ language => this.setState({ tempLanguage: language }) }
                                    defaultValue={ this.state.tempBook.language }
                                    />
                                </View>

                                <View style={{ flexDirection: "row" }}>

                                    <TouchableOpacity
                                    style={{ margin: 10 }}
                                    onPress={() => {
                                        this.sendUpdateBookRequest()
                                        this.setState({
                                            isEditModalVisible: false,
                                            isMessageModalVisible: true
                                        })
                                    }}
                                    >
                                        <Text style={{ color: "yellow" }}>
                                            Done
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                    style={{ margin: 10 }}
                                    onPress={() => this.setState({ isEditModalVisible: false })}
                                    >
                                        <Text style={{ color: "yellow" }}>
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                
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
        modalView: {
            
            alignItems: "center",
            backgroundColor: "black",
            padding: 10,
            alignSelf: "center",
            marginTop: 80,
            borderRadius: 20,
            opacity: 1,
            width: 300,
            height: 520,
            color: "white",
            justifyContent: "center"
            
        },

        input: {
            borderBottomColor: "#8A8F9E",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            color: "white",
            width: 200,
            margin: 10
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