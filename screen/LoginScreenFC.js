import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/actions/authActions';

const LoginScreenFC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
 
    const { loading, isLoggedIn } = useSelector(state => state.auth);

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorIconVisible, setErrorIconVisible] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            navigation.replace('Home');
        }
    }, [isLoggedIn, navigation]);

    const validateEmail = (inputEmail) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(inputEmail);
    };

    const onLoginClick = () => {
        if (email === "" || password === "") {
            setErrorIconVisible(true);
            setErrorText("Fields cannot be empty");
            return;
        }
        if (!validateEmail(email)) {
            setErrorIconVisible(true);
            setErrorText("Invalid Email");
            return;
        }

        dispatch(loginRequest(email, password));
    };

    const onEmailChangeText = (text) => {
        setEmail(text);
        setErrorIconVisible(false);
    };

    const onPasswordChangeText = (text) => {
        setPassword(text);
        setErrorIconVisible(false);
    };

    return (
        <View style={styles.container}>
        //header text
            <Text style={styles.headerText}>Login Screen using FC</Text>

            // input container
            <View style={styles.inputContainer}>

                //error
                {errorIconVisible && (
                    <View style={{ marginBottom: 3, flexDirection: "row", alignItems: 'center' }}>
                        <Icon name={'alert-circle-outline'} size={20} color="red" />
                        <Text style={{ marginStart: 3, color: 'red' }}>{errorText}</Text>
                    </View>
                )}

                // email input
                <TextInput
                    placeholder="Enter your email"
                    style={styles.input}
                    onChangeText={onEmailChangeText}
                    value={email}
                />

                // password input container
                <View style={styles.input}>
                    <TextInput
                        placeholder="Enter your password"
                        style={{ flex: 1, height: '100%', textColor: 'black' }}
                        onChangeText={onPasswordChangeText}
                        secureTextEntry={isPasswordHidden}
                        value={password}
                    />

                    // eye icon
                    <Pressable
                        style={{ marginRight: '4%', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                    >
                        <Icon
                            name={isPasswordHidden ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="black"
                        />
                    </Pressable>
                </View>

                // login button
                <Pressable style={styles.button} onPress={onLoginClick}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};


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
        paddingHorizontal: 10,
    },
    button: {
        height: 40,
        width: '100%',
        marginTop: 15,
        backgroundColor: 'cyan',
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
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

export default LoginScreenFC;