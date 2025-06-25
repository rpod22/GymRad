import React from "react";
import { COLORS } from '../colors';
import { View, Text, TextInput, TouchableOpacity ,StyleSheet, Keyboard, Alert, Pressable, FlatList} from 'react-native';
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const TrainingPlansScreen = ({ navigation, plans, setPlans }) => {
    
    const [newPlanName, setNewPlanName] = useState('');

    const handleDeletePlan = (id) => {
        Alert.alert(
            "Usuń plan",
            "Czy na pewno chcesz usunąć ten plan?",
            [
                {text: "Anuluj", style: "cancel"}, 
                {text: "Usuń", style: "destructive", onPress: () => {setPlans(plans.filter(plan => plan.id !== id))}}
            ]
        );
    }; //deleting chosen plan

    return (
        <LinearGradient 
            colors={COLORS.gradient}
            locations={[0, 0.6, 1]}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}
            style={styles.gradient}>
            <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>MOJE PLANY TRENINGOWE</Text>
                    <TouchableOpacity style={styles.addPlanButton} onPress={() => {
                        if (newPlanName.trim() === '') return;
                        setPlans([...plans, {id: Date.now(), name: newPlanName, trainings: []}]); //Date.now() is just the id for the new plan
                        setNewPlanName(''); // clearing input
                        Keyboard.dismiss();
                    }}>
                        <Text style={styles.addPlanButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Wpisz nazwę nowego planu i wciśnij +"
                        value={newPlanName}
                        onChangeText={setNewPlanName}
                    />
                </View>
                <FlatList
                    data={plans}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => navigation.navigate('PlanDetails', { planId: item.id })}
                            style={({ pressed }) => [
                                styles.planCard,
                                pressed && {opacity: 0.7, backgroundColor: 'rgba(34, 139, 230, 0.14)'}
                            ]}   
                        >
                            <Text style={styles.planName}>{item.name}</Text>
                            <Text style={styles.planWorkouts}>Treningi: {item.trainings.length}</Text>
                            <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeletePlan(item.id)}>
                                <MaterialCommunityIcons name="trash-can-outline" size={26} color="#ff5c5c"/>
                            </TouchableOpacity>
                        </Pressable>
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 0,
    },
    safeAreaView: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
        width: '90%',
        alignSelf: 'center',
    },
    header: {
        color: COLORS.accent,
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
        backgroundColor: COLORS.accent,
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
        color: COLORS.primaryBg,
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: -2,
        textAlign: 'center',
    },
    planCard: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
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
        marginTop: 5,
    },
    planName: {
        color: COLORS.accent,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    planWorkouts: {
        color: COLORS.textMain,
        fontSize: 15,
        opacity: 0.8,
    },
    inputBox: {
        flex: 'row',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        fontsize: 16,
        color: COLORS.primaryBg,
        elevation: 1,
        width: '90%',
        textAlign: 'center',
        marginTop: -10
    },
    deleteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
    },

})


export default TrainingPlansScreen;