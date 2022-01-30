import  React ,{useRef,useState,useCallback, useEffect} from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
const { width, height } = Dimensions.get('window');
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const timers = [...Array(200).keys()].map((i) => (i === 0 ? 1 : i+1));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

export default function App() {
  const scrollx=useRef(new Animated.Value(0)).current;
  const [duration,setDuration]=useState(timers[0]);
  const inputRef=useRef();
  const textInputAnimation=useRef(new Animated.Value(timers[0])).current;
  const buttonAnimation=useRef(new Animated.Value(0)).current;
  const timerAnimation=useRef(new Animated.Value(height)).current;
  useEffect(()=>{
    const listener=textInputAnimation.addListener(({value})=>{
      inputRef?.current?.setNativeProps({
        text:Math.ceil(value).toString()
      })
    })
    return()=>{
      textInputAnimation.removeListener(listener);
      textInputAnimation.removeAllListeners();
    }
  })



  const animation=useCallback(()=>{
    textInputAnimation.setValue(duration);
    Animated.sequence([
      Animated.timing(buttonAnimation,{
        toValue:1,
        duration:300,
        useNativeDriver:true
      }),

      Animated.timing(timerAnimation,{
        toValue:0,
        duration:300,
        useNativeDriver:true
      }),
      Animated.parallel([
        Animated.timing(textInputAnimation,{
          toValue:0,
          duration:duration*1000,
          useNativeDriver:true
        }),
        Animated.timing(timerAnimation,{
          toValue:height,
          duration:duration*1000,
          useNativeDriver:true
        })
      ]),
      Animated.delay(400)
    ]).start(()=>{
      Vibration.cancel();
      Vibration.vibrate();
      textInputAnimation.setValue(duration);
        Animated.timing(buttonAnimation,{
          toValue:0,
        duration:300,
        useNativeDriver:true
        }).start()
    })

  },[duration])
  const opacity=buttonAnimation.interpolate({
    inputRange:[0,1],
    outputRange:[1,0]
  })
  const translateY=buttonAnimation.interpolate({
    inputRange:[0,1],
    outputRange:[0,200]
  })
  const textOpacity=buttonAnimation.interpolate({
    inputRange:[0,1],
    outputRange:[0,1]
  })
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
      style={[StyleSheet.absoluteFillObject,
      {height,
      width,
      backgroundColor:colors.red,
      transform:[{
        translateY:timerAnimation
      }]
    }]}

      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
            transform:[{
              translateY
            }]
          },
        ]}>
        <TouchableOpacity
          onPress={animation}>
          <View
            style={styles.roundButton}
          />
        </TouchableOpacity>
      </Animated.View>
      <View
        style={{
          position: 'absolute',
          top: height / 3,
          left: 0,
          right: 0,
          flex: 1,
        }}>
          <Animated.View style={{
            position:'absolute',
            justifyContent:'center',
            alignSelf:'center',
            width:ITEM_SIZE,
            alignItems:'center',
            opacity:textOpacity
          }}>
            <TextInput
              ref={inputRef}
              style={styles.text}
              defaultValue={duration.toString()}
            />
          </Animated.View>
         <Animated.FlatList
            data={timers}
            keyExtractor={item => item.toString()}
            horizontal
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent:{contentOffset:{x:scrollx}}}],
              {useNativeDriver:true}
            )}
            onMomentumScrollEnd={ev=>{
              const index =Math.round(ev.nativeEvent.contentOffset.x/ITEM_SIZE);
              setDuration(timers[index]);
            }}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate="fast"
            style={{flexGrow:0,opacity}}
            contentContainerStyle={{
              paddingHorizontal:ITEM_SPACING
            }}
            renderItem={({item,index})=>{
              const inputRange=[
                (index-1)*ITEM_SIZE,
                index*ITEM_SIZE,
                (index+1)*ITEM_SIZE,
              ]
              const opacity=scrollx.interpolate({
                inputRange,
                outputRange:[.4,1,.4]
              })
              const scale=scrollx.interpolate({
                inputRange,
                outputRange:[.7,1,.7]
              })
              return <View style={{width:ITEM_SIZE,justifyContent:"center",alignItems:"center"}}>
                <Animated.Text style={[styles.text,{
                  opacity,
                  transform:[{
                    scale
                  }]
                }]}>{item}</Animated.Text>
                </View>
            }}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.6,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  }
});