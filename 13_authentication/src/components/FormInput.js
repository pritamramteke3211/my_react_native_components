import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {rspF, rspH, rspW} from '../theme/responsive';
import FA6 from 'react-native-vector-icons/FontAwesome6';
import colors from '../theme/colors';
import IOIcon from 'react-native-vector-icons/Ionicons';

const FormInput = ({
  inp,
  setinp,
  placeholder,
  width,
  iconname = 'user',
  inptype = 'emailAddress',
  err = false,
  rightIcon = '',
  maxLength = 30,
}) => {
  const [visible, setvisible] = useState(false);
  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{...styles.inpCon, width: rspW(width)}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FA6
          solid
          name={iconname}
          color={colors.green}
          size={rspH(2.4)}
          style={{marginRight: rspW(2)}}
        />

        <TextInput
          value={inp}
          placeholder={placeholder}
          placeholderTextColor={colors.green}
          onChangeText={val => {
            setinp(val);
          }}
          // maxLength={maxLength}
          autoCapitalize={'none'}
          autoCorrect={false}
          secureTextEntry={inptype == 'password' ? !visible : false}
          textContentType={inptype}
          style={styles.inpTxt}
        />
      </View>
      {(rightIcon != '' || err) && (
        <>
          {err ? (
            <IOIcon
              solid
              name={'warning'}
              size={rspH(2.5)}
              color={colors.error}
            />
          ) : (
            <>
              {rightIcon && (
                <TouchableOpacity
                  onPress={() => {
                    setvisible(!visible);
                  }}>
                  <IOIcon
                    solid
                    name={visible ? 'eye' : 'eye-off'}
                    size={rspH(2.8)}
                    color={colors.green}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inpCon: {
    height: rspH(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: rspW(2),
    backgroundColor: colors.grayGreen,
    paddingHorizontal: rspW(4),
    marginBottom: rspH(3),
  },
  iconCon: {
    color: colors.green,
  },
  inpTxt: {
    width: rspW(60),
    color: colors.green,
    fontSize: rspF(4),
  },
});
