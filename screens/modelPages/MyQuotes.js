import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'

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
                    <TouchableOpacity
                    onPress={ () => this.props.navigation.navigate("AllQuotePage", { quote: item }) }
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: 30, height: 60 }}>
                                <Text style={{ fontSize: 20 }}>
                                    {item.page}
                                </Text>
                            </View>
                            <View style={{ width: 350, height: 60 }}>
                                <Text style={{ fontStyle: "italic" }}>
                                    {
                                        ((item.body).length > 160) ? 
                                            (((item.body).substring(0,160-3)) + '...') : item.body 
                                    }
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
        }
    }
)