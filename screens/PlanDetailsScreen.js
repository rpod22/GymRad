import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../colors" 


const PlanDetailsScreen = ({ route, navigation, plans, setPlans }) => {
    const  { planId } = route.params;
    const plan = plans.find(p => p.id === planId);

    {/*
    this effect protects the app from crashing when:
    -user adds an empty plan
    -clicks on it
    -goes back and deletes the empty plan
    -if not for this, the app would crash because it tries to reach 'undefined.name' while deleting the plan
    */}
    React.useEffect(() => {
        if (!plan) {
            navigation.goBack();
        }
    }, [plan]);
    if (!plan) return null;

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
            colors={COLORS.gradient}
            locations={[0.4, 0.6, 1]}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}>
            <SafeAreaView style={styles.safeAreaView} edges={['top', 'left', 'right']}>
                <View style={styles.headerRow}>
                    <TouchableOpacity 
                        style={styles.goBackArrow}
                        onPress={ () => {navigation.goBack();} }
                    >
                        <MaterialCommunityIcons name="keyboard-backspace" size={26} color={COLORS.accent}/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Wpisz nazwę treningu i wciśnij +"
                        value={newTrainingName}
                        onChangeText={setNewTrainingName}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        if (newTrainingName.trim() === '') return;
                        addTraining(newTrainingName);
                        setNewTrainingName('');
                        Keyboard.dismiss();
                    }}>
                        <MaterialCommunityIcons name="plus-circle" size={42} color={COLORS.accent}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleInfoRow}>
                    <Text style={styles.title}>{plan.name}</Text>
                    <Text style={styles.info}>Ilość treningów: {plan.trainings ? plan.trainings.length : 0}</Text>
                </View>
                <DraggableFlatList
                    data={plan.trainings}
                    keyExtractor={item => item.id.toString()}
                    style={{marginTop: 12}}
                    contentContainerStyle={{ paddingBottom: 200}}
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
                        <TouchableOpacity style={[styles.trainingCard, isActive && {opacity: 0.6}]}
                            onPress={() => navigation.navigate('TrainingDetails', {
                                planId: plan.id,
                                trainingId: item.id
                            })}
                        >
                            {/* DRAG HANDLE */}
                            <TouchableOpacity
                                onLongPress={drag}
                                delayLongPress={100}
                                style={{ padding: 10, marginRight: 10 }}
                            >
                                <MaterialCommunityIcons name="drag" size={28} color="lightgray" />
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
    safeAreaView: {
        flex: 1,
    },  
    gradient: {
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
    titleInfoRow: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: 10,
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16, 
        width: '65%'
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
        backgroundColor: COLORS.accent,
        padding: 12,
        borderRadius: 10,
        fontSize: 12, 
        fontWeight: 'bold',
        color: COLORS.primaryBg,
    },
    info: {
        fontSize: 16, 
        color: 'lightgray',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    trainingCard: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(21, 46, 79, 1)',
        padding: 16,
        marginBottom: 10,
        marginLeft: 20,
        borderRadius: 16,
        width: '90%',
        height: 100,
        justifyContent: 'space-between',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    trainingCardName: {
        color: COLORS.accent,
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 35
    },
});

export default PlanDetailsScreen;