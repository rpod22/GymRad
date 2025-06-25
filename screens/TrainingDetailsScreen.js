import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TrainingDetailsScreen = ({ route, navigation, plans, setPlans }) => {
    const { planId, trainingId } = route.params;
    const plan = plans.find(p => p.id === planId);
    const training = plan?.trainings?.find(t => t.id === trainingId);

    //handling edge case as in PlanDetailsScreen
    React.useEffect(() => {
        if (!training) navigation.goBack();
    }, [training])
    if (!training) return null;

    return (
        <LinearGradient 
            style={styles.gradient}
            colors={COLORS.gradient}
            locations={[0, 0.6, 1]}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}
        >
            <SafeAreaView style={styles.SafeAreaView} edges={['top', 'left', 'right']}>
                <View style={styles.headerRow}>
                    <TouchableOpacity 
                        style={styles.goBackArrow}
                        onPress={ () => {navigation.goBack();} }
                    >
                        <MaterialCommunityIcons name="keyboard-backspace" size={26} color={COLORS.accent}/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Wpisz nazwę ćwiczenia i wciśnij +"
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        
                    }}>
                        <MaterialCommunityIcons name="plus-circle" size={42} color={COLORS.accent}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{training.name}</Text>
                <Text style={styles.info}>Tutaj można dodać szczegóły treningu</Text>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    SafeAreaView: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
        justifyContent: 'space-evenly'
    },
    goBackArrow: {
        position: 'relative',
        top: 6,
        left: 3,
        marginRight: 5,
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16, 
        width: '70%'
    },
    addButton: {
        elevation: 4,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        color: 'lightgray',
    },
});

export default TrainingDetailsScreen;