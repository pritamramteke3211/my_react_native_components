import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import colors from '../theme/colors'
import { rspF, rspH, rspW } from '../theme/responsive'


const styles = StyleSheet.create({
    filterCon:{
      width: rspW(37),
      height: '100%',
      backgroundColor:colors.dimWhite
    },
    filterItm:{
        height: rspH(5.5),
        paddingHorizontal: rspW(5),
        justifyContent:'center',
    },
    filteTxt:{
        color: colors.black,
        fontSize: rspF(6), 
    },
    dataCont:{
        paddingVertical: rspH(2.2),
        paddingHorizontal: rspW(3.5),
        backgroundColor:colors.white,
        alignItems:'flex-start',
       width: rspW(63),

    },
    dataItem:{
        
        borderRadius: rspW(1),
        justifyContent:'center',   
        marginBottom: rspH(1.2),
        paddingVertical: rspH(0.5),
        paddingHorizontal: rspW(2.5),
    },
    dataItemTxt:{
       
        fontSize: rspF(7), 
        
    }
    
})

export default styles