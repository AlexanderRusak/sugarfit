import { StyleSheet, View, Text } from 'react-native';


export const SummaryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Summary Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
