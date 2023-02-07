import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Button, TextInput, FlatList, Modal, SectionList, Pressable, Alert } from "react-native";
import {useState} from 'react';

export default function App(props) {
  const {route} = props;
  const nameAbout = route.params.nameManager;
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [edit, setEdit] = useState(0);
  const [arr, setArr] = useState([]);
  const onClose = () => {
    setShow(false);
    setName("");
    setPrice(0);
    setEdit(0);
  };

  const onSave = () => {
    if(edit != 0){
      const newEdit = arr.map(item => {
        if (item.id == edit) {
          item.name = name;
          item.price = price;
        }
        return item;
      });
      setArr(newEdit);
      return onClose();
    };
    const newItem = {
      id: arr[arr.length - 1]?.id + 1||1,
      name: name,
      price: price
    };
    const newArr = [...arr, newItem];
    setArr(newArr);
    return onClose();
  };

  const onDelete = (itemId) => {
    const newArr = arr.filter((item)=>{return item.id != itemId});
    setArr(newArr);
  };
    
  const onEdit = (editId) => {
    setShow(true);
    const edItem = arr.find(item => item.id = editId);
    setName(edItem.name);
    setPrice(edItem.price);
    setEdit(editId);   
  };

  return (
      <View style={styles.container}>
        <StatusBar translucent={false}/>
        <Text style={{fontSize: 24,fontWeight: "600",margin: 5}}>{nameAbout}</Text>
          {show ? null:<Button style={{color: "red"}} title="add new obj" onPress={() => setShow(true)}/>}
        <Modal visible={show} animationType={"slide"}>
          <View style={{alignSelf: "center", marginTop: 150}}>
          <TextInput placeholder="Name" onChangeText={(text) => setName(text)} value={name} style={{borderRadius: 5, borderWidth: 1, width: 250, alignSelf: "center", padding: 10, marginTop: 10}}/>
          <TextInput placeholder="Price" keyboardType="numeric" onChangeText={(text) => setPrice(text)} value={price} style={{borderRadius: 5, borderWidth: 1, width: 250, alignSelf: "center", padding: 10, marginTop: 10}}/>
          <View style={{margin: 10, flexDirection: "row", justifyContent: "space-around", width: "100%"}}>
            <Text style={{marginLeft: 50, backgroundColor: "red", borderRadius:5, borderWidth: 1, padding: 5}} title="Cancel" onPress={() => onClose()}>Cancel</Text>
            <Text style={{marginLeft: 40, backgroundColor: "green", borderRadius:5, borderWidth: 1, padding: 5}} title="Save" onPress={() => onSave()}>Save</Text>
          </View>
        </View>
        </Modal>
        
        <View>
          <FlatList
            data={arr}
            renderItem={({item}) => 
            <View style={{margin: 0, flexDirection: "row", justifyContent: "space-around", width: "100%", borderWidth: 2, borderRadius: 10, borderColor: "red", padding: 5}}>
              <View>
              <Text style={{color: "black", fontSize: 20}}>{item.name}</Text>
              <Text style={{color: "black", fontSize: 18}}>{item.price}</Text>
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-around", marginVertical: 10, marginLeft: 100}}>
                <Pressable onPress={()=> onDelete(item.id)}>
                  <Text style={{color: "red", fontSize: 14, margin: 5}}>Xóa</Text>
              </Pressable>
              <Pressable onPress={()=> onEdit(item.id)}>
                  <Text style={{color: "green", fontSize: 14, margin: 5}}>Sửa</Text>
              </Pressable>
              </View>
            </View>}
            keyExtractor={(item) => item.id}/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    marginTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
    fontSize: 40,
  },
});
