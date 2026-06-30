import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/authActions';

import LoginScreenFC from '../screen/LoginScreenFC';
import HomeScreen from '../screen/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const dispatch = useDispatch();
    // Read the login state directly from Redux
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const value = await AsyncStorage.getItem('isLoggedIn');
                if (value === 'true') {
                    // Hydrate Redux state if user is already logged in
                    dispatch(loginSuccess());
                }
            } catch (error) {
                console.log("Error reading login state", error);
            } finally {
                setIsAppLoading(false);
            }
        };
        checkLoginStatus();
    }, [dispatch]);

    if (isAppLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="cyan" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {/* Navigation reacts automatically to Redux state changes */}
            <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
                <Stack.Screen name="Login" component={LoginScreenFC} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;