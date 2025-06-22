import React from 'react';
import { COLORS } from '../colors';
import { View, Text, Button, TouchableOpacity ,StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
    return (
        <LinearGradient 
            colors={[ '#1fb582', '#26344a',]} 
            locations={[0,0.6]}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}
        >
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
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        height: 300,
        width: 300,
        borderRadius: 150,
        marginBottom: 40,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: COLORS.greenCustom,
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 50,
        elevation: 2,
        marginTop: 20
    },
    buttonText: {
        color: COLORS.darkBlueCustom,
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
});

export default WelcomeScreen;