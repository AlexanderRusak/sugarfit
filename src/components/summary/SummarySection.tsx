import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { IStore } from '../../store'


export const SummarySection = () => {

  const { color } = useSelector((store: IStore) => store.settingsParameter)



  return <TouchableOpacity style={{ ...styles.container, backgroundColor: color }}>
    <Text>Section</Text>
  </TouchableOpacity>
}


const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: '30%',
  }
})