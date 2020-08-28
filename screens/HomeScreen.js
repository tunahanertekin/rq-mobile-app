import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ImageBackground
} from 'react-native'


export default class HomeScreen extends React.Component {
    render() {
        return(

                <ImageBackground
                source={require("../images/fist.jpg")}
                style={{width: '100%', height: '100%'}}
                >
                    <View style={styles.container}>
                        
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.appHeader}>
                                read&quote
                            </Text>
                            
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("FlowOffline")} 
                            style={styles.buttonsTop}
                            >
                                <Text style={styles.buttonTextTop}>
                                    &nbsp;Flow&nbsp;
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            onPress={ () => this.props.navigation.navigate("RandomOffline") }
                            style={styles.buttonsTop}>
                                <Text style={styles.buttonTextTop}>
                                    &nbsp;Random&nbsp;
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={styles.down}>

                                <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate("Login")} 
                                style={styles.buttons}
                                >
                                    <Text style={styles.buttonText}>
                                        Login
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={ () => this.props.navigation.navigate("Register") }
                                style={styles.buttons}>
                                    <Text style={styles.buttonText}>
                                        Register
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
            backgroundColor:'rgba(255,255,255,0.7)',
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
        down: {
            margin: 30,
            justifyContent: "center",
            flexDirection: "row"
        },
        appHeader: {
            fontSize: 50,
            fontFamily: "monospace",
            justifyContent: "flex-end"
        },
        buttonsTop: {
            margin: 10,
            borderWidth: 5,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#FFC30070",
            borderColor: "#11050490",
            marginTop: 20,
            justifyContent: "flex-end"
        },
        buttonTextTop: {
            fontFamily: "monospace",
            fontWeight: "bold",
            fontStyle: "italic"
        },
    }
)