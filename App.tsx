import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedStar from './AnimatedStar';

const initialRating = 3;
export default function App() {
  const [rating, setRating] = useState(initialRating);
  return (
    <View style={styles.container}>
      <AnimatedStar
        value={rating}
        numStars={5}
        size={40}
        onPress={(val) => setRating(val)}
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.9)',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 26,
        }}
      />
      <Text>Rating is {rating}</Text>
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
