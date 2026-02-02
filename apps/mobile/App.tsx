import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { WebViewContainer } from './src/WebViewContainer';

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <WebViewContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#030712',
  },
});
