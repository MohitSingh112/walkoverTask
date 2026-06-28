import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreenFC from '../screen/LoginScreenFC';
import HomeScreen from '../screen/HomeScreen';
import LoginScreenCC from '../screen/LoginScreenCC';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreenFC} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;