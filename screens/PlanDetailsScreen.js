import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../colors" 


const PlanDetailsScreen = ({ route, navigation, plans, setPlans }) => {
    const  { planId } = route.params;
    const plan = plans.find(p => p.id === planId);

    const [newTrainingName, setNewTrainingName] = useState('');

    //adding training
    const addTraining = (newTrainingName) => {
        // comments for personal needs
        setPlans(plans => // setPlans / creating new plans array
            plans.map(plan => //going threw all plans
                plan.id === planId //changing only the plan in which the training is being added
                    // if this is the correct plan, I copy it and create trainings array
                    // In this array there are all previous trainings and add new training with new id and name
                    ? { ...plan, trainings: [...plan.trainings, {id: Date.now(), name: newTrainingName}] } 
                    : plan
            )
        );
    };

    //removing training - analogically updating plans state
    const removeTraining = (trainingId) => {
        setPlans(plans =>
            plans.map(plan =>
                plan.id === planId
                    ? { ...plan, trainings: plan.trainings.filter(tr => tr.id !== trainingId) } 
                    : plan
            )
        )
    };

    return (
        <LinearGradient 
            style={styles.gradient}
            colors={['#152e4f', '#26344a', '#1fb582']}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}>
            <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
                <View style={styles.headerRow}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Wpisz nazwę treningu i wciśnij +"
                        value={newTrainingName}
                        onChangeText={setNewTrainingName}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        if(newTrainingName.trim === '') return;
                        addTraining(newTrainingName);
                        setNewTrainingName('');
                    }}>
                        <Text style={{fontSize: 32, color: COLORS.darkBlueCustom}}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleInfoRow}>
                    <Text style={styles.title}>{plan.name}</Text>
                    <Text style={styles.info}>Ilość treningów: {plan.trainings ? plan.trainings.length : 0}</Text>
                </View>
                <DraggableFlatList
                    data={plan.trainings}
                    keyExtractor={item => item.id.toString()}
                    style={{marginTop: 12, height: '100%'}}
                    onDragEnd={({ data }) => {
                        setPlans(plans =>
                            plans.map(p => 
                                p.id === planId
                                    ? {...p, trainings: data}
                                    : p
                            )
                        )
                    }}
                    renderItem={({ item, drag, isActive }) => (
                        <TouchableOpacity style={[styles.trainingCard, isActive && {opacity: 0.6}]}>
                            {/* DRAG HANDLE */}
                            <TouchableOpacity
                                onLongPress={drag}
                                delayLongPress={100}
                                style={{ padding: 10, marginRight: 10 }}
                            >
                                <MaterialCommunityIcons name="drag" size={28} color="#888" />
                            </TouchableOpacity>
                            <Text style={styles.trainingCardName}>{item.name}</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    Alert.alert(
                                        'Usuń trening',
                                        'Czy na pewno chcesz usunąć trening?',
                                        [
                                            { text: 'Anuluj', style: 'cancel' },
                                            { text: 'Usuń', style: 'destructive', onPress: () => removeTraining(item.id) }
                                        ]
                                    )
                                }
                            >
                                <MaterialCommunityIcons name="trash-can-outline" size={26} color="#ff5c5c" style={{}}/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                >
                </DraggableFlatList>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
        justifyContent: 'space-evenly'
    },
    titleInfoRow: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16, 
        width: '80%'
    },
    addButton: {
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
    title: {
        backgroundColor: COLORS.greenCustom,
        padding: 12,
        borderRadius: 10,
        fontSize: 12, 
        fontWeight: 'bold',
        color: COLORS.darkBlueCustom,
    },
    info: {
        fontSize: 16, 
        color: 'gray',
    },
    trainingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(21, 46, 79, 0.9)',
        padding: 16,
        marginBottom: 15,
        marginLeft: 20,
        borderRadius: 16,
        width: '90%',
        height: 120,
        justifyContent: 'space-between'
    },
    trainingCardName: {
        color: COLORS.greenCustom,
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 35
    },
});

export default PlanDetailsScreen;