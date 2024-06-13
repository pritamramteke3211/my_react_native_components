import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist';

const DragFlatlist = () => {

    const [data, setData] = useState([
        { key: '1', title: 'Item 1' },
        { key: '2', title: 'Item 2' },
        { key: '3', title: 'Item 3' }
      ]);

      const onDragEnd = ({ data }) => {
            console.log("drag")
            setData(data);
      };

      const renderItem = ({ item, drag, isActive }) => {
        return (
          <TouchableOpacity
            style={{
                height: 100,
                width: 100,
              backgroundColor: isActive ? 'blue' : '#d35252',
              padding: 20,
              marginVertical: 8,
            }}
            onLongPress={drag}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        );
      };

      return (
        <View style={{  backgroundColor:'yellow'}}>
        <DraggableFlatList
            // horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          onDragEnd={onDragEnd}
        //   contentContainerStyle={{ paddingTop: 50 }} 
          // Adjust the paddingTop value as needed
        />
     </View>

        // <DraggableFlatList
        //   data={data}
        //   renderItem={renderItem}
        //   keyExtractor={(item) => item.key}
        //   onDragEnd={onDragEnd}
        // />
      );
}

export default DragFlatlist

const styles = StyleSheet.create({})