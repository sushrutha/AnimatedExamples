import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

type valueType = number;

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
  value: valueType;
  numStars: 5 | 10;
  onPress?: (newVal: number) => void;
  style?: StyleProp<ViewStyle>;
}> = ({ color = 'magenta', size = 32, value, numStars, onPress, style }) => {
  const stars = [];
  const [rating, setRating] = useState<valueType>(value);
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
          setRating(i);
          animate();
          if (onPress) {
            onPress(i);
          }
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
    <View style={style}>
      <View style={{ flexDirection: 'row' }}>{stars}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AnimatedRating;
