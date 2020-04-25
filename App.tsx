import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedStar from './AnimatedStar';

export default function App() {
  return (
    <View style={styles.container}>
      <AnimatedStar value={1} numStars={5} size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
