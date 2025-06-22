import React from 'react';
import { View, Text, Button, TouchableOpacity ,StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logoImage}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('TrainingPlans')}
            >
                <Text style={styles.buttonText}>Rozpocznij</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#26344a'
    },
    logoImage: {
        height: 300,
        width: 300,
        borderRadius: 150,
        marginBottom: 40,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#1fb582',
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 50,
        elevation: 2,
        marginTop: 20
    },
    buttonText: {
        color: '#152e4f',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
});

export default WelcomeScreen;