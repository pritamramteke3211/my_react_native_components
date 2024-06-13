import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from '../../styling/styles';
import FormInput from '../../components/FormInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {rspH, scrn_height, scrn_width} from '../../theme/responsive';
import MyButton from '../../components/MyButton';
import {Users} from '../../assets';
import navgationStrings from '../../navigation/navgationStrings';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUserLogginedId} from '../../store/reducers/authentication/authentication';
import {useFocusEffect} from '@react-navigation/native';

let db = openDatabase({name: 'UserDatabase.db'});

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [btnPress, setbtnPress] = useState(false);
  const [login_err, setlogin_err] = useState(false);

  const dispatch = useDispatch();

  const checkUser = async () => {
    db.transaction(txn => {
      console.log('her2');
      txn.executeSql(
        'SELECT * FROM table_user where email=? AND password=?',
        [email, password],
        async (tx, res) => {
          console.log('check res', res.rows.length);
          if (res.rows.length == 1) {
            let loginUser = res.rows.item(0);
            console.log('loginUser', loginUser.user_id);
            dispatch(setUserLogginedId(loginUser.user_id));
            setlogin_err(false);
          } else {
            setlogin_err(true);
            Alert.alert(
              'Invalid User!',
              'Please Login with Correct Credential.',
            );
          }
        },
        error => {
          console.log('checkUser err', err);
        },
      );
    });
  };

  useEffect(() => {
    setlogin_err(false);
  }, [email, password]);

  useFocusEffect(
    React.useCallback(() => {
      // Perform any actions you want when the screen gains focus
      console.log('Screen focused');
      setemail('');
      setpassword('');
      setlogin_err('');
      setbtnPress('');
      // Clean-up function (optional)
      return () => {
        // Perform any clean-up or unsubscribe here if needed
        console.log('Screen unfocused');
      };
    }, []), // Empty dependency array to run effect only once on mount and unmount
  );

  useLayoutEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          // console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            // txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(200),email VARCHAR(200), password VARCHAR(10))',
              [],
            );
          } else {
            console.log('table already created');
            txn.executeSql(`SELECT * FROM table_user`, [], (tx, res) => {
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
    <ScreenWrapper padHor={0} padTop={0}>
      <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={rspH(40)}
      extraScrollHeight={-rspH(20)}
      >
        <View style={styles.cont}>
          <Image source={Users} style={{...styles.topImg}} resizeMode="cover" />

          <View style={[{marginTop: rspH(3.8)}, styles.cont]}>
            <Text style={styles.mainTitle}>Welcome back</Text>
            <Text style={styles.subTitle}>Login to your account</Text>
            <View style={styles.inputCont}>
              <FormInput
                inp={email}
                setinp={setemail}
                width={80}
                placeholder="Email"
                iconname="envelope"
                err={login_err || (btnPress && email == '')}
              />
              <FormInput
                inp={password}
                setinp={setpassword}
                width={80}
                inptype="password"
                placeholder="Password"
                iconname="lock"
                rightIcon={'eye'}
                err={login_err || (btnPress && password == '')}
              />

              <MyButton
                title="Sign In"
                onPress={() => {
                  setbtnPress(true);
                  if (email && password) {
                    console.log('Complete');
                    checkUser();
                  } else {
                    console.log('Incomplete');
                  }
                }}
              />

              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={styles.subTitle}>Don't have an account ? </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(navgationStrings.REGISTRATION);
                  }}>
                  <Text style={styles.linkTxt}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default Login;
