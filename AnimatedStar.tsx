import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Star: React.FC<{
  filled: boolean;
  color: string;
  size: number;
}> = ({ filled, color, size }) => (
  <FontAwesome
    name={filled ? 'star' : 'star-o'}
    color={color}
    size={size}
    style={{ marginHorizontal: 6 }}
  />
);

const AnimatedRating: React.FC<{
  color?: string;
  size?: number;
  value: 0 | 1 | 2 | 3 | 4 | 5;
  numStars: 5 | 10;
}> = ({ color = 'magenta', size = 32, value, numStars = 5 }) => {
  const stars = [];
  const [rating, setRating] = useState(value);
  const [animation] = useState(new Animated.Value(1));
  const animate = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(1);
    });
  };

  const animateScale = animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.5, 1],
  });

  const animateWobble = animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ['0deg', '-3deg', '3deg', '0deg'],
  });

  for (let i = 1; i <= numStars; i++) {
    stars.push(
      <TouchableWithoutFeedback
        key={i}
        onPress={() => {
          setRating(i), animate();
        }}
      >
        <Animated.View
          style={
            i <= rating
              ? {
                  opacity: animateOpacity,
                  transform: [
                    {
                      scale: animateScale,
                    },
                    {
                      rotate: animateWobble,
                    },
                  ],
                }
              : {}
          }
        >
          <Star filled={i <= rating} color={color} size={size} />
        </Animated.View>
      </TouchableWithoutFeedback>,
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>{stars}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedRating;
