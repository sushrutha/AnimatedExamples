import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const getRandomColor = () => {
  return `rgb(${getRandomNumber(100, 144)}, ${getRandomNumber(
    10,
    200,
  )}, ${getRandomNumber(200, 244)})`;
};

const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

const Heart: React.FC = () => (
  <View style={styles.heart}>
    <AntDesign name='heart' size={35} color={getRandomColor()} />
  </View>
);

const HeartContainer: React.FC = () => {
  const [position] = useState(new Animated.Value(0));
  let yAnimation;
  useEffect(() => {
    yAnimation = position.interpolate({
      inputRange: [negativeEndY, 0],
      outputRange: [animationEndY, 0],
    });
    Animated.timing(position, {
      toValue: negativeEndY,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  });
  const getHeartStyle = () => {
    return {
      transform: [
        {
          translateY: position,
        },
      ],
    };
  };
  return (
    <Animated.View
      style={[
        styles.heartContainer,
        { right: getRandomNumber(10, 50) },
        getHeartStyle(),
      ]}
    >
      <Heart />
    </Animated.View>
  );
};
const AnimatedHeart: React.FC<{
  numHearts?: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
}> = ({ numHearts = 5, size = 35, style }) => {
  const hearts = Array.from(Array(numHearts).keys());

  return (
    <View style={[style, styles.container]}>
      {hearts.map((i) => (
        <HeartContainer key={`${i}`} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  heartContainer: {
    backgroundColor: 'transparent',
  },
  heart: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedHeart;
