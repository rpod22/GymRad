import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { exercises } from '../exerciseDb';
import DraggableFlatList from 'react-native-draggable-flatlist';

const TrainingDetailsScreen = ({ route, navigation, plans, setPlans }) => {
    const { planId, trainingId } = route.params;
    const plan = plans.find(p => p.id === planId);
    const training = plan?.trainings?.find(t => t.id === trainingId);
    if(!training.exercises) training.exercises = [];

    // handling edge case as in PlanDetailsScreen
    React.useEffect(() => {
        if (!training) navigation.goBack();
    }, [training]);
    if (!training) return null;

    const [exerciseQuery, setExerciseQuery] = useState('');
    const [showList, setShowList] = useState(false);

    const getFilteredExercises = () => {
        if (exerciseQuery.length < 2) return [];
        const q = exerciseQuery.toLowerCase();
        return exercises.filter(ex => ex.name.toLowerCase().includes(q));
    };

    const filteredExercises = getFilteredExercises();

    //adding exercise to current training
    const addExerciseToTraining = (exercise) => {
        setPlans(prevPlans =>
            prevPlans.map(p =>
                p.id === planId
                    ? {
                        ...p,
                        trainings: p.trainings.map(t =>
                            t.id === trainingId
                                ? {
                                    ...t,
                                    exercises: [...(t.exercises || []), exercise]
                                }
                                : t
                        )
                    }
                    :p
            )
        );
        setExerciseQuery('');
        setShowList(false);
    }

    return (
        <LinearGradient 
            style={styles.gradient}
            colors={COLORS.gradient}
            locations={[0.4, 0.6, 1]}
            start={{x: 0, y: 0}}
            end={{x:1, y:1}}
        >
            <SafeAreaView style={styles.SafeAreaView} edges={['top', 'left', 'right']}>
                <View style={styles.headerRow}>
                    <TouchableOpacity 
                        style={styles.goBackArrow}
                        onPress={() => { navigation.goBack(); }}
                    >
                        <MaterialCommunityIcons name="keyboard-backspace" size={26} color={COLORS.accent}/>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Wpisz nazwę ćwiczenia i wciśnij +"
                        value={exerciseQuery}
                        onChangeText={text => {
                            setExerciseQuery(text);
                            setShowList(true);
                        }}
                        onFocus={() => setShowList(true)}
                    />
                    <TouchableOpacity 
                        style={[
                            styles.addButton,
                            !exercises.some(ex => ex.name === exerciseQuery) && { opacity: 0.4 }
                        ]} 
                        disabled={!exercises.some(ex => ex.name === exerciseQuery)}
                        onPress={() => {
                            const selectedExercise = exercises.find(ex => ex.name === exerciseQuery);
                            if (selectedExercise) {
                                addExerciseToTraining(selectedExercise);
                            }
                            setShowList(false);
                            Keyboard.dismiss();
                    }}>
                        <MaterialCommunityIcons name="plus-circle" size={42} color={COLORS.accent}/>
                    </TouchableOpacity>
                </View>
                {showList && filteredExercises.length > 0 && (
                    <FlatList
                        data={filteredExercises}
                        keyExtractor={item => item.id.toString()}
                        style={styles.exercisesList}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                setExerciseQuery(item.name);
                                setShowList(false);
                                Keyboard.dismiss();
                            }}>
                                <View style={{padding: 14, borderBottomWidth: 1, borderBottomColor: '#232634' }}>
                                    <Text style={{color: 'white', fontSize: 16}}>
                                        {item.name}
                                    </Text>
                                    <Text style={{color: '#bbb', fontSize: 13}} numberOfLines={2} ellipsizeMode='tail'>
                                        {item.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
                <View style={styles.titleContainer}>               
                    <Text style={styles.title}>{training.name}</Text>
                </View>
                {(training.exercises && training.exercises.length > 0) && (
                    <DraggableFlatList
                        style={{ marginTop: 15, marginHorizontal: 15 }}
                        data={training.exercises}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item, drag, isActive }) => (
                            <TouchableOpacity
                                style={[
                                    styles.exerciseCard,
                                    isActive && { opacity: 0.7 }
                                ]}
                                onLongPress={drag}
                            >   
                                <Image source={item.picture} style={styles.exerciseIcon}/>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ color: '#bbb', fontSize: 13 }}>
                                        {item.description}
                                    </Text>
                                </View>    
                            </TouchableOpacity>
                        )}
                        onDragEnd={({ data }) => {
                            //changing the order of exercises in training
                            setPlans(plans =>
                                plans.map(plan =>
                                    plan.id === planId
                                        ? {
                                            ...plan,
                                            trainings: plan.trainings.map(t =>
                                                t.id === trainingId
                                                    ? { ...t, exercises: data }
                                                    : t
                                            )
                                        }
                                        : plan
                                )
                            );
                        }}
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    SafeAreaView: { flex: 1 },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
        justifyContent: 'space-evenly',
    },
    exercisesList: {
        maxHeight: 300,
        marginHorizontal: 10,
        backgroundColor: '#161a21',
        borderRadius: 12,
        position: 'absolute',
        top: 125,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    exerciseCard: {
        backgroundColor: COLORS.secondaryBg,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    exerciseIcon: {
        width: 60,
        height: 60,
        marginRight: 5,
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
    titleContainer: {
        height: '5%',
        width: 'auto',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.accent,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 0}
    },
});

export default TrainingDetailsScreen;
