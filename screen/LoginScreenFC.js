import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Pressable, 
    StyleSheet, 
    ActivityIndicator, 
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

    return (
        <SafeAreaView style={styles.safeArea}>
        ₹
            <ScrollView 
                contentContainerStyle={styles.scrollContainer} 
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Text */}
                <Text style={styles.headerText}>Login Screen using FC</Text>

                {/* Input Container */}
                <View style={styles.inputContainer}>

                    {/* Error message */}
                    {errorIconVisible && (
                        <View style={styles.errorContainer}>
                            <Icon name={'alert-circle-outline'} size={20} color="red" />
                            <Text style={{ marginStart: 3, color: 'red' }}>{errorText}</Text>
                        </View>
                    )}

                    {/* Email Input */}
                    <TextInput
                        placeholder="Enter your email"
                        style={styles.input}
                        onChangeText={(text) => { setEmail(text); setErrorIconVisible(false); }}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password Input Container */}
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Enter your password"
                            style={{ flex: 1, height: '100%', color: 'black' }}
                            onChangeText={(text) => { setPassword(text); setErrorIconVisible(false); }}
                            secureTextEntry={isPasswordHidden}
                            value={password}
                        />

                        {/* Eye Icon */}
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

                    {/* Login Button */}
                    <Pressable style={styles.button} onPress={onLoginClick}>
                        {loading ? (
                            <ActivityIndicator color="black" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    inputContainer: {
        width: '100%',
        marginTop: 30, 
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    errorContainer: {
        marginBottom: 8, 
        flexDirection: "row", 
        alignItems: 'center',
        width: '100%'
    },
    button: {
        height: 45,
        width: '100%',
        marginTop: 15,
        backgroundColor: 'cyan',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginScreenFC;