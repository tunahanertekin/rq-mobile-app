import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default class HomeScreen extends React.Component {
    render() {
        return(
              <View style={styles.container}>
                  <TouchableOpacity style={styles.buttons}>
                      <Text>
                          Users
                      </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.buttons}>
                      <Text>
                          Quotes of Today
                      </Text>
                  </TouchableOpacity>


                  <View style={styles.down}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("LoggedIn")} style={styles.buttons}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttons}>
                        <Text>
                            Register
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
        buttons: {
            margin: 10
        },
        down: {
            margin: 30,
            justifyContent: "center",
            flexDirection: "row"
        }
    }
)