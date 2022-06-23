import { StyleSheet, View, Text } from 'react-native';
import { SummarySection } from '../components/summary/SummarySection';


export const SummaryScreen = () => {
  return (
    <View style={styles.container}>
      <SummarySection />
      <SummarySection />
      <SummarySection />
      <SummarySection />
      <SummarySection />
      <SummarySection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-around'
  },
});
