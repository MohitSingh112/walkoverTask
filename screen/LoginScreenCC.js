import { View, Text, Alert } from 'react-native';
import React, { Component } from 'react';
import { TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class LoginScreenCC extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPasswordHidden: true,
            email: "",
            password: "",
            errorIconVisible: false,
            errorText: ""
        }
    }

    isEmailPasswordValid = () => (this.state.email.toString().trim() == 'm@walkover.com' && this.state.password.toString().trim() == '1234')

    onLoginClick = () => {
        if (this.state.email === "" || this.state.password === "") {
            this.setState({ errorIconVisible: true, errorText: "Feilds cannot be empty" })
            return;
        }

        if (!this.validateEmail(this.state.email)) {
            this.setState({ errorIconVisible: true, errorText: "Invalid Email" })
            return;
        }

        const isValid = this.isEmailPasswordValid();
        if (isValid) {
            this.props.navigation.navigate('Home');
        }
        else {
            this.setState({ errorIconVisible: true, errorText: "Email or password is incorrect" })
        }
    }


    onEmailChangeText(text) {
        this.setState({ email: text })
        this.setState({ errorIconVisible: false })
    }

    onPasswordChangeText(text) {
        this.setState({ password: text })
        this.setState({ errorIconVisible: false })
    }

    validateEmail = (email) => {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    render() {
        return (
            // parent container
            <View style={styles.container}>

                // header text
                <Text style={styles.headerText}>Login Screen using CC</Text>


                // input container
                <View style={styles.inputContainer}>


                // error
                    {this.state.errorIconVisible &&
                        <View style={{ marginBottom: 3, flexDirection: "row" }}>
                            <Icon name={'alert-circle-outline'}
                                size={20}
                                color="red" />
                            <Text style={{ marginStart: 3, color: 'red' }}>{`${this.state.errorText}`} </Text>

                        </View>
                    }

                    // email input
                    <TextInput placeholder="Enter your email" style={styles.input}
                        onChangeText={(text) => this.onEmailChangeText(text)} />

                    // password input container
                    <View style={styles.input}>

                        // password input
                        <TextInput placeholder="Enter your password"
                            style={{ flex: 1, height: '100%' }}
                            onChangeText={(text) => this.onPasswordChangeText(text)}
                            secureTextEntry={this.state.isPasswordHidden} />

                        //eye Icon
                        <Pressable
                            style={{ marginRight: '4%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.setState({ isPasswordHidden: !this.state.isPasswordHidden })}>
                            <Icon name={this.state.isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color="black"
                            />
                        </Pressable>

                    </View>

                    // button
                    <Pressable
                        style={styles.button}
                        onPress={this.onLoginClick}>

                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        justifyContent: 'top',
        alignItems: 'center',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    button: {
        height: 40,
        marginTop: 15,
        backgroundColor: 'cyan',
        color: 'white',
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginTop: '50%',
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: '30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'start',
        paddingHorizontal: 20
    },
});

export default LoginScreenCC;