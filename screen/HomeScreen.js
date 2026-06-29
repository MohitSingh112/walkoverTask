import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();


    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);


    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setIsError(false);

            const response = await fetch('https://randomuser.me/api/?results=50&inc=name,email,picture');
            if (!response.ok) throw new Error("Failed to fetch random users");

            const data = await response.json();

            setUsers(data.results);
        } catch (error) {
            console.error("API Fetch Error:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            navigation.replace('Login');
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    const renderUserItem = ({ item }) => {

        const fullName = `${item.name.first} ${item.name.last}`;

        return (
            <View style={style.card}>

                <Image
                    source={{ uri: item.picture.medium }}
                    style={style.avatar}
                />

                <View style={style.userInfo}>
                    <Text style={style.userName}>{fullName}</Text>
                    <Text style={style.userEmail}>{item.email}</Text>
                </View>

                <Icon name="chevron-forward-outline" size={18} color="#CCC" />
            </View>
        );
    };

    return (
        <View style={style.container}>

            <View style={style.topContainer}>
                <Text style={style.topText}>RANDOM USERS</Text>
                <Pressable onPress={logOut} style={style.logoutButton}>
                    <Icon name='log-out-outline' size={24} color='black' />
                </Pressable>
            </View>

            {isLoading ? (
                <View style={style.center}>
                    <ActivityIndicator size="large" color="cyan" />
                </View>
            ) : isError ? (
                <View style={style.center}>
                    <Text style={style.errorText}>Failed to load users.</Text>
                    <Pressable style={style.retryButton} onPress={fetchUsers}>
                        <Text style={style.retryText}>Retry</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.email}
                    renderItem={renderUserItem}
                    contentContainerStyle={style.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    topContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
    },
    topText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#333',
        letterSpacing: 0.5,
    },
    logoutButton: {
        padding: 5,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: '#E1E4E8',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        textTransform: 'capitalize',
        marginBottom: 3,
    },
    userEmail: {
        fontSize: 13,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: 'cyan',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
    },
    retryText: {
        fontWeight: 'bold',
        color: 'black',
    }
});

export default HomeScreen;