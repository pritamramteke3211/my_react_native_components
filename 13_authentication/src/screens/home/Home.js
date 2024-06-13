import {Alert, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from '../../styling/styles';
import {rspH} from '../../theme/responsive';
import MyButton from '../../components/MyButton';
import {useDispatch, useSelector} from 'react-redux';
import {setUserLogginedId} from '../../store/reducers/authentication/authentication';
import Geolocation from '@react-native-community/geolocation';
import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'UserDatabase.db'});

const Home = () => {
  const dispatch = useDispatch();

  const [punched, setpunched] = useState(false);
  const user_loggined_id = useSelector(
    state => state.authentication.user_loggined_id,
  );
  const [lat, setlat] = useState('');
  const [long, setlong] = useState('');

  const punchMe = (lat, long) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO user_attendance(user_id,latitude,longitude,time) VALUES (?,?,?,?)',
        [user_loggined_id, lat, long, String(new Date())],
        (tex, res) => {
          console.log('punch Me');
          console.log('res', res);
          if (res.rowsAffected == 1) {
            Alert.alert('Congratulation', 'You Punch Successfully');
            setpunched(true);
          } else {
            console.log('punchMe in res', res);
          }
        },
        error => {
          console.log('punchMe err', err);
        },
      );
    });
  };

  // Get latitude and longitude
  const getOneTimeLocation = async () => {
    console.log('here');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log('currentLongitude', currentLongitude);
        console.log('currentLatitude', currentLatitude);
        setlat(currentLatitude);
        setlong(currentLongitude);
        punchMe(currentLatitude, currentLongitude);
      },
      err => {
        console.log('geolocation err');
      },

      {
        enableHighAccuracy: true,
      },
    );
  };

  // To get Location Permission
  const getLocation = async () => {
    getOneTimeLocation();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useLayoutEffect(() => {
    requestLocationPermission();
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user_attendance'",
        [],
        function (tx, res) {
          console.log('item:', res.rows);
          if (res.rows.length == 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user_attendance(attendance_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id VARCHAR(200),latitude VARCHAR(50), longitude VARCHAR(50), time VARCHAR(50))',
              [],
            ),
              (tx, res) => {
                console.log('res', res);
              };
          } else {
            console.log('table already created');
            txn.executeSql(`SELECT * FROM user_attendance`, [], (tx, res) => {
              let temp = [];
              for (let i = 0; i < res.rows.length; i++) {
                temp.push(res.rows.item(i));
              }
              console.log('temp', temp);
            });
          }
        },
      );
    });
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.cont}>
        <View style={[{marginTop: rspH(3.8)}, styles.cont]}>
          <Text style={styles.mainTitle}>Dashboard</Text>
          <Text style={styles.subTitle}>Press Button For Attendance</Text>
          <View style={styles.inputCont}>
            <Text>
              Attendance : {lat}, {long}
            </Text>
            {punched ? (
              <MyButton
                title="Logout"
                onPress={() => dispatch(setUserLogginedId(''))}
              />
            ) : (
              <MyButton
                title="Punch"
                onPress={() => {
                  console.log('Punch');
                  getLocation();
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;
