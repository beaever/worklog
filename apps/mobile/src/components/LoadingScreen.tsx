import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export function LoadingScreen() {
  // 로고 스케일 애니메이션
  const scaleAnim = useRef(new Animated.Value(1)).current;
  // 로고 회전 애니메이션
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // 로고 투명도 애니메이션
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // 스케일 펄스 애니메이션
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    // 투명도 애니메이션
    const opacityAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    // 회전 애니메이션 (미세하게)
    const rotateAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    scaleAnimation.start();
    opacityAnimation.start();
    rotateAnimation.start();

    return () => {
      scaleAnimation.stop();
      opacityAnimation.stop();
      rotateAnimation.stop();
    };
  }, [scaleAnim, opacityAnim, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-3deg', '3deg'],
  });

  return (
    <View style={styles.container}>
      {/* 로고 영역 */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }, { rotate }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.logoIcon}>
          <View style={styles.logoBar1} />
          <View style={styles.logoBar2} />
          <View style={styles.logoBar3} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  logoContainer: {},
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoBar1: {
    width: 8,
    height: 24,
    backgroundColor: '#3b82f6', // blue-500
    borderRadius: 4,
  },
  logoBar2: {
    width: 8,
    height: 36,
    backgroundColor: '#60a5fa', // blue-400
    borderRadius: 4,
  },
  logoBar3: {
    width: 8,
    height: 28,
    backgroundColor: '#93c5fd', // blue-300
    borderRadius: 4,
  },
});
