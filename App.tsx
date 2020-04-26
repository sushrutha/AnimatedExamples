import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedHeart from './AnimatedHeart';
import AnimatedStar from './AnimatedStar';

export default function App() {
  const [rating, setRating] = useState(3);
  const [showAnimatedHeart, setShowAnimatedHeart] = useState(false);
  return (
    <View style={styles.container}>
      <AnimatedStar
        value={rating}
        numStars={5}
        size={30}
        onPress={(val) => {
          setRating(val), setShowAnimatedHeart(true);
        }}
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.9)',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 26,
        }}
      />
      {showAnimatedHeart && (
        <AnimatedHeart
          style={{
            position: 'absolute',
            bottom: 30,
            left: 30,
            // backgroundColor: 'pink',
          }}
          done={() => setShowAnimatedHeart(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
