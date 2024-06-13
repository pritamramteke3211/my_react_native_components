import React, { useEffect } from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MARGIN, getOrder, getPosition} from './utils';
import { Dimensions } from 'react-native';

const scr_width = Dimensions.get('window').width

const Draggable = ({children, positions, id}) => {

  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    newOrder => {
      const newPostions = getPosition(newOrder);
      translateX.value = withTiming(newPostions.x);
      translateY.value = withTiming(newPostions.y);
    },
  );

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      isGestureActive.value = true;
    },
    onActive: (evt, ctx) => {
      
      translateX.value = ctx.startX + evt.translationX;
      translateY.value = ctx.startY + evt.translationY;

     
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          key => positions.value[key] === newOrder,
        );
        if (idToSwap) {
       
          console.log("oldOrder",oldOrder)
          console.log("newOrder",newOrder)

          const newPostions = JSON.parse(JSON.stringify(positions.value));
          
          let exact_pos = newPostions[id]

          console.log("exact ", exact_pos)

          let new_pos_list = Object.entries(newPostions)
          let sort_lis0 =new_pos_list.sort((a,b)=>   a[1]- b[1])
    
          let sort_lis = sort_lis0.map((a,b)=> [b,a[0]])

          let swipe_pos = sort_lis.find(v => v[0]== exact_pos)

          if (newOrder > oldOrder) {
            console.log("ascending order")
            let rem_poses = sort_lis.slice(swipe_pos[0]+1,newOrder+1)
          let lst = []
            for (let j = 0; j < rem_poses.length; j++) {
              let ele = rem_poses[j] ;
              ele = [ele[0] - 1, ele[1]]
              lst.push(ele)
            }
  
            let r_lst = lst.map((a)=> [a[1],a[0]])
            let first_ele = [String(swipe_pos[1]),newOrder]
            r_lst.unshift(first_ele)
            if (swipe_pos[0] > 0) {
              let prev_list = new_pos_list.sort((a,b)=>   a[1]- b[1]).slice(0,swipe_pos[0])
              r_lst = prev_list.concat(r_lst)
            }
  
            let slice_rv = sort_lis0.slice(r_lst.length)
            let f_lista = r_lst.concat(slice_rv)
            let f_obj = {}
            
            for (const itm of f_lista) {
              f_obj[itm[0]] = itm[1]
            }

            positions.value = f_obj;
    
          }
          else{
            let rem_poses = sort_lis.slice(newOrder, exact_pos)
          
          let lst = []
            console.log("descending order")
        
            for (let j = 0; j < rem_poses.length; j++) {
              let ele = rem_poses[j] ;
              ele = [ele[0] + 1, ele[1]]
              lst.push(ele)
            }
            
            let r_lst = lst.map((a)=> [a[1],a[0]])
            let first_ele = [String(swipe_pos[1]),newOrder]

            r_lst.unshift(first_ele)
            if (newOrder > 0) {
              let prev_list = new_pos_list.sort((a,b)=>   a[1]- b[1]).slice(0,newOrder)
              r_lst = prev_list.concat(r_lst)
            }

            let slice_rv = sort_lis0.slice(r_lst.length)
            let f_lista = r_lst.concat(slice_rv)
            let f_obj = {}
            for (const itm of f_lista) {
              f_obj[itm[0]] = itm[1]
            }
            positions.value = f_obj;
          }}
      }
     

      
    },
    onEnd: () => {


     
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x);
      translateY.value = withTiming(destination.y);
    },
    onFinish: () => {
      isGestureActive.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 1000 : 1;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: 'absolute',
      margin: MARGIN * 2,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Draggable;
