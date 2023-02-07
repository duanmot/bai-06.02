import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';

export default function App(props) {
   const {route} = props;
   const nameAbout = route.params.nameAb;
   const idAbout = route.params.idAb;

  function showData(label = '', value ='') {
    return label + ': ' + value;
  }
  const arrowShowData = (label, value) => {
    return label + ': ' + value;
  }
  const arrowShortShowData = (label, value) => 
    (label + ':' + value)

  return (
    <View style={styles.container}>
      <StatusBar translucent={false}/>
      <Text style={styles.text}>{arrowShowData('Name',nameAbout)}</Text>
      <Text style={styles.text}>{arrowShortShowData('Id',idAbout)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    margin: 5
   },
});