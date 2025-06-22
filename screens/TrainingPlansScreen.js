import React from "react";
import { COLORS } from '../colors';
import { View, Text, Button, TouchableOpacity ,StyleSheet, Image } from 'react-native';
import { useState } from "react";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TrainingPlansScreen = ({ navigation }) => {

    const [plans, setPlans] = useState([
        {id: 1, name: "Push Pull Legs", workouts: 3},
        {id: 2, name: "FBW", workouts: 2},
        {id: 3, name: "Push Pull Legs Upper Lower", workouts: 5},
    ]);

    return (
        <LinearGradient 
            colors={['#152e4f', '#26344a', '#1fb582', 'white']}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}
            style={styles.gradient}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>MOJE PLANY TRENINGOWE</Text>
                <TouchableOpacity style={styles.addPlanButton} onPress={() => {}}>
                    <Text style={styles.addPlanButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={plans}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.planCard}>
                        <Text style={styles.planName}>{item.name}</Text>
                        <Text style={styles.planWorkouts}>Treningów: {item.workouts}</Text>
                    </View>
                )}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 0,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 32,
        width: '90%',
        alignSelf: 'center',
    },
    header: {
        color: COLORS.greenCustom,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginRight: 8,
        marginLeft: -8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    addPlanButton: {
        backgroundColor: COLORS.greenCustom,
        width: 40,
        height: 40,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // Android
        shadowColor: '#000', //IOS
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 4,
    },
    addPlanButtonText: {
        color: COLORS.darkBlueCustom,
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: -2,
        textAlign: 'center',
    },
    planCard: {
        backgroundColor: 'rgba(21, 46, 79, 1)',
        borderRadius: 20,
        marginBottom: 18,
        padding: 20,
        width: '90%',
        alignSelf: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        marginTop: 5
    },
    planName: {
        color: COLORS.greenCustom,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    planWorkouts: {
        color: COLORS.white,
        fontSize: 15,
        opacity: 0.8,
    },
})


export default TrainingPlansScreen;