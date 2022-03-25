import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Touchable,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import CustomButton from '../utils/CustomButton';
import {setTask} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks, setTaskID} from '../redux/actions';
import PushNotification from 'react-native-push-notification';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFS from 'react-native-fs';

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [color, setColor] = useState('white');
  const [showBellModal, setShowBellModal] = useState(false);
  const [bellTime, setBellTime] = useState('1');
  const [image, setImage] = useState('');

  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTask();
    });
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);
      setImage(Task.Image);
    }
  };

  const setTask = () => {
    if (title.length != 0) {
      if (desc.length != 0) {
        try {
          var Task = {
            ID: taskID,
            Title: title,
            Desc: desc,
            Done: done,
            Color: color,
            Image: image,
          };
          const index = tasks.findIndex(task => task.ID === taskID);
          let newTasks = [];

          if (index > -1) {
            newTasks = [...tasks];
            newTasks[index] = Task;
          } else {
            newTasks = [...tasks, Task];
          }

          AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
            .then(() => {
              dispatch(setTasks(newTasks));
              Alert.alert('Success!', 'Task saved successfully!');
              navigation.goBack();
            })
            .catch(err => console.error(err));
        } catch (err) {
          console.error(err);
        }
      } else {
        Alert.alert('Warning', 'Please write task description');
      }
    } else {
      Alert.alert('Warning', 'Please write task name');
    }
  };

  const setTaskAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: title,
      message: desc,
      date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
      allowWhileIdle: true,
    });
  };

  const deleteImage = () => {
    RNFS.unlink(image)
      .then(() => {
        const index = tasks.findIndex(t => t.ID === taskID);
        if (index > -1) {
          let newTasks = [...tasks];
          newTasks[index].Image = '';
          AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
            .then(() => {
              dispatch(setTasks(newTasks));
              getTask();
              Alert.alert('Success!', 'Photo has been removed!');
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <Modal
          visible={showBellModal}
          transparent
          onRequestClose={() => setShowBellModal(false)}
          animationType="slide"
          hardwareAccelerated>
          <View style={styles.centered_view}>
            <View style={styles.bell_modal}>
              <View style={styles.bell_body}>
                <Text style={styles.text}>Remind me After</Text>
                <TextInput
                  style={styles.bell_input}
                  keyboardType="numeric"
                  value={bellTime}
                  onChangeText={value => setBellTime(value)}
                />
                <Text style={styles.text}>minute(s)</Text>
              </View>
              <View style={styles.bell_buttons}>
                <TouchableOpacity
                  style={styles.bell_cancel_button}
                  onPress={() => {
                    setShowBellModal(false);
                  }}>
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bell_ok_button}
                  onPress={() => {
                    setShowBellModal(false);
                    setTaskAlarm();
                  }}>
                  <Text style={styles.text}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Text style={styles.text}>Add a new task</Text>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Title"
          onChangeText={value => setTitle(value)}
        />
        <TextInput
          value={desc}
          style={styles.input}
          placeholder="Description"
          multiline
          onChangeText={value => setDesc(value)}
        />
        <View style={styles.color_bar}>
          <TouchableOpacity
            style={styles.color_white}
            onPress={() => setColor('white')}>
            {color === 'white' && <FontAwesome5 name="check" size={25} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_red}
            onPress={() => setColor('red')}>
            {color === 'red' && <FontAwesome5 name="check" size={25} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_blue}
            onPress={() => setColor('blue')}>
            {color === 'blue' && <FontAwesome5 name="check" size={25} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.color_green}
            onPress={() => setColor('green')}>
            {color === 'green' && <FontAwesome5 name="check" size={25} />}
          </TouchableOpacity>
        </View>

        <View style={styles.extra_row}>
          <TouchableOpacity
            style={styles.extra_button}
            onPress={() => setShowBellModal(true)}>
            <FontAwesome5 name="bell" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.extra_button}
            onPress={() => navigation.navigate('Camera', {id: taskID})}>
            <FontAwesome5 name="camera" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        {image ? (
          <View>
            <Image style={styles.image} source={{uri: image}} />
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                deleteImage();
              }}>
              <FontAwesome5 name="trash" size={25} color="#ff3636" />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.checkbox}>
          <CheckBox value={done} onValueChange={value => setDone(value)} />
          <Text style={styles.text}>Is done?</Text>
        </View>
        <CustomButton
          title="Save"
          color="#1eb900"
          pressHandler={setTask}
          style={{width: '100%'}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#555',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'left',
    fontSize: 20,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  checkbox: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  color_bar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555',
    marginVertical: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  color_red: {
    flex: 1,
    backgroundColor: '#f28b82',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: '#ccff90',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  extra_row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  extra_button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_modal: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  bell_body: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_buttons: {
    flexDirection: 'row',
    height: 50,
  },
  bell_input: {
    width: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  bell_cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#ffffff80',
    margin: 10,
    borderRadius: 5,
  },
});
