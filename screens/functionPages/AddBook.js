import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'

export default class AddBook extends React.Component {

    state= {
        title: "",
        author: "",
        addBookResponse: {},
        message: "init"
    }

    sendAddBookRequest = () => {
        const {title, author} = this.state

        fetch('http://10.0.2.2:3000/users/' + global.user.id + "/books", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book: {
                    title: this.state.title,
                    author: this.state.author,
                    publisher: "",
                    translator: "",
                    edition: 0,
                    language: ""
                }
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                addBookResponse: responseJson,
                message: responseJson.message
            })
            
            if(this.state.addBookResponse.status == "SUCCESS"){
                this.props.navigation.goBack()
            }
            else{
                this.setState({
                    message: this.state.addBookResponse.message
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
            <View style={styles.container}>
                <Text style={{ margin: 20 }}>
                    Add A New Book - {this.state.message}
                </Text>

                <View>
                    <TextInput style={styles.input}
                    placeholder="Title"
                    onChangeText={ title => this.setState({ title }) }
                    value={ this.state.title }
                    />
                </View>
                
                <View>
                    <TextInput style={styles.input}
                    placeholder="Author"
                    onChangeText={ author => this.setState({ author }) }
                    value={ this.state.author }
                    />
                </View>

                <TouchableOpacity style={{margin: 20}}
                onPress={()=>this.sendAddBookRequest()}
                >
                    <Text>
                        Add
                    </Text>
                </TouchableOpacity>

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