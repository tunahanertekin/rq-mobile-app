import React, {Component, useState} from 'react'
import {View,
        Text,
        StyleSheet,
        TouchableOpacity,
        FlatList,
        Alert,
        Modal,
        TouchableHighlight,
        TextInput
    } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'





const EditModal = ({page, body}) => {

    

    const [modalVisible, setModalVisible] = useState(false);
    const [tempPage, setTempPage] = useState("")
    const [tempBody, setTempBody] = useState("")

    
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                

                <TextInput style={styles.input}
                placeholder="Page"
                placeholderTextColor="yellow"
                onChangeText={ newPage => setTempPage(newPage)  }
                defaultValue={page}
                //value={ this.state.username }
                />

                <TextInput style={styles.bodyInput}
                placeholder="Body"
                placeholderTextColor="yellow"
                multiline={true}
                value={body}
                //onChangeText={ username => this.setState({ username }) }
                //value={ this.state.username }
                />
    
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>
                </View>
            </View>
        </Modal>

        
        <View style={{ margin: 10 }}>
            <TouchableOpacity
            onPress={() => {
                setModalVisible(true);
            }}
            >
                <Text>
                    <Icon name="edit" size={30} />
                </Text>
            </TouchableOpacity>
        </View>
  
        
      </View>
    );
  };








export default class MyQuotes extends React.Component {

    

    state = {
        book: this.props.navigation.state.params.book,
        quotesResponse: {},
        error: ""
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
    
    render() {
        return(
            <View style={styles.container}>
                <Text style={{ fontSize: 20, margin: 20 }}>
                   My Quotes - {this.state.book.title}
                </Text>

                <FlatList
                    data={this.state.quotesResponse.data}
                    renderItem={({ item }) => 
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                        onPress={ () => this.props.navigation.navigate("AllQuotePage", { quote: item }) }
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

                        
                        
                        <EditModal page={item.page.toString()} body={item.body} />


                        <View style={{ margin: 10 }}>
                            <TouchableOpacity>
                                <Text>
                                    <Icon name="trash-alt" size={30} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    }
                />
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
        centeredView: {
        },
        modalView: {
            
            alignItems: "center",
            backgroundColor: "black",
            padding: 30,
            alignSelf: "center",
            marginTop: 80,
            borderRadius: 20,
            opacity: 0.85,
            width: 300,
            height: 500,
            color: "white"
            
        },
        input: {
            borderBottomColor: "#8A8F9E",
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 40,
            color: "white",
            width: 200,
            margin: 20
        },
        bodyInput: {
            borderColor: "#8A8F9E",
            borderWidth: StyleSheet.hairlineWidth,
            height: 300,
            color: "white",
            width: 200,
            textAlignVertical: "top"
            
        }
    }
)