import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../redux/actions/userActions';
import { logout } from '../redux/actions/authActions';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Read users, loading, and error states directly from Redux
    const { users, loading: isLoading, error: isError } = useSelector(state => state.users);

    useEffect(() => {
        // Trigger the Saga to fetch users on mount
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    const logOut = () => {
        // Dispatch logout. Saga handles clearing AsyncStorage.
        dispatch(logout());
        navigation.replace('Login');
    };

    const renderUserItem = ({ item }) => {
        const fullName = `${item.name.first} ${item.name.last}`;
        return (
            <View style={style.card}>
                <Image source={{ uri: item.picture.medium }} style={style.avatar} />
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