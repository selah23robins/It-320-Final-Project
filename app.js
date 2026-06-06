import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏀 HoopTracker</Text>

      <Text style={styles.subtitle}>
        Plan your basketball training schedule
      </Text>

      <View style={styles.buttonSpace}>
        <Button
          title="Workout Planner"
          onPress={() => navigation.navigate('Workouts')}
        />
      </View>

      <Button
        title="Training Tips"
        onPress={() => navigation.navigate('Tips')}
      />
    </View>
  );
}

function WorkoutScreen() {
  const [workout, setWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = () => {
    if (workout.trim() === '' || duration.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    if (isNaN(duration) || Number(duration) <= 0) {
      Alert.alert('Error', 'Duration must be a positive number');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(),
      workout,
      duration,
    };

    setWorkouts([...workouts, newWorkout]);

    setWorkout('');
    setDuration('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Workout</Text>

      <TextInput
        placeholder="Workout Name"
        value={workout}
        onChangeText={setWorkout}
        style={styles.input}
      />

      <TextInput
        placeholder="Duration (minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
      />

      <Button title="Add Workout" onPress={addWorkout} />

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
              {item.workout} - {item.duration} min
            </Text>
          </View>
        )}
      />
    </View>
  );
}

function TipsScreen() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((response) => response.json())
      .then((data) => {
        const basketballTips = data.map((item) => ({
          id: item.id,
          title: [
            'Ball Handling Drills',
            'Free Throw Practice',
            'Layup Finishing',
            'Three Point Shooting',
            'Defensive Footwork',
            'Cone Dribbling',
            'Passing Accuracy',
            'Vertical Jump Training',
            'Conditioning Workout',
            'Game Speed Shooting',
          ][(item.id - 1) % 10],
        }));

        setTips(basketballTips);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Basketball Training Tips</Text>

      <FlatList
        data={tips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              Drill #{item.id}
            </Text>

            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Workouts"
          component={WorkoutScreen}
        />

        <Stack.Screen
          name="Tips"
          component={TipsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },

  subtitle: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },

  buttonSpace: {
    marginBottom: 10,
  },
});
