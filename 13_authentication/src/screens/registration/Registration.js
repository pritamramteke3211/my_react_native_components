import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import styles from '../../styling/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {rspH, scrn_height} from '../../theme/responsive';
import BackButton from '../../components/BackButton';
import FormInput from '../../components/FormInput';
import MyButton from '../../components/MyButton';
import navgationStrings from '../../navigation/navgationStrings';
import {openDatabase} from 'react-native-sqlite-storage';
import {useFocusEffect} from '@react-navigation/native';

let db = openDatabase({name: 'UserDatabase.db'});

const Registration = ({navigation}) => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [btnPress, setbtnPress] = useState(false);
  const [register_err, setregister_err] = useState(false);

  const checkUser = async () => {
    db.transaction(txn => {
      console.log('her2');
      txn.executeSql(
        'SELECT * FROM table_user where email=?',
        [email],
        async (tx, res) => {
          console.log('check res', res.rows);
          if (res.rows.length > 0) {
            Alert.alert(
              'User Already Exist!',
              'This email already exist in database, Please choose another email.',
            );
          } else {
            saveData();
          }
        },
        error => {
          console.log('checkUser err', err);
        },
      );
    });
  };

  const saveData = () => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTo table_user(name,email,password) VALUES (?,?,?)',
        [name, email, password],
        (tex, res) => {
          console.log('res', res);
          if (res.rowsAffected == 1) {
            Alert.alert(
              'Congratulation',
              'You Registered Successfully, Please Login.',
            );
            navigation.goBack();
          } else {
            console.log('in res', res);
          }
        },
        error => {
          console.log('saveData err', err);
        },
      );
    });
  };

  useEffect(() => {
    setregister_err(false);
  }, [password, confirmPassword]);

  useFocusEffect(
    React.useCallback(() => {
      // Perform any actions you want when the screen gains focus
      console.log('Screen focused');
      setname('');
      setemail('');
      setpassword('');
      setconfirmPassword('');
      setregister_err(false);
      setbtnPress('');
      // Clean-up function (optional)
      return () => {
        // Perform any clean-up or unsubscribe here if needed
        console.log('Screen unfocused');
      };
    }, []), // Empty dependency array to run effect only once on mount and unmount
  );

  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView
      enableOnAndroid={true}
       extraHeight={rspH(40)}
       extraScrollHeight={-rspH(20)}
      >
        <BackButton />
        <View style={[{marginTop: rspH(8)}, styles.cont]}>
          <Text style={styles.mainTitle}>Register</Text>
          <Text style={styles.subTitle}>Create to you new account</Text>
          <View style={styles.inputCont}>
            <FormInput
              inp={name}
              setinp={setname}
              width={80}
              placeholder="Name"
              iconname="user"
              err={btnPress && name == ''}
            />

            <FormInput
              inp={email}
              setinp={setemail}
              width={80}
              placeholder="Email"
              iconname="envelope"
              err={btnPress && email == ''}
            />

            <FormInput
              inp={password}
              setinp={setpassword}
              width={80}
              inptype="password"
              placeholder="Password"
              iconname="lock"
              rightIcon={'eye'}
              err={register_err || (btnPress && password == '')}
            />

            <FormInput
              inp={confirmPassword}
              setinp={setconfirmPassword}
              width={80}
              placeholder="Confirm Password"
              inptype="password"
              iconname="lock"
              rightIcon={'eye'}
              err={register_err || (btnPress && confirmPassword == '')}
            />

            <MyButton
              title="Sign Up"
              onPress={() => {
                setbtnPress(true);
                if (name && email && password && password == confirmPassword) {
                  console.log('success');
                  checkUser();
                } else if (password !== confirmPassword) {
                  setregister_err(true);
                } else {
                  console.log('Invalid');
                }
              }}
            />

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text style={styles.subTitle}>Have account ? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(navgationStrings.LOGIN);
                }}>
                <Text style={styles.linkTxt}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default Registration;
