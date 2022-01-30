import React, { Component} from 'react';
import { StyleSheet, Text, View , ScrollView, TouchableOpacity} from 'react-native';
import moment from 'moment';

  function Timer({interval,style}){
    const pad=(n)=>n<10?'0'+n:n;
    const duration=moment.duration(interval);
    const centiseconds=Math.floor(duration.milliseconds()/10);
    return (
      <View style={styles.timercontainer}>

          <Text style={style}>{pad(duration.minutes())}:</Text>
          <Text style={style}>{pad(duration.seconds())}:</Text>
          <Text style={style}>{pad(centiseconds)}</Text>
          
      </View>
       
    );
  }
  
  function RoundButton({title,color,background,onPress,disabled})
  {
    return (
      <TouchableOpacity 
      onPress={()=>!disabled && onPress()}
      style={[styles.button,{backgroundColor:background}]}
      activeOpacity={disabled?1.0:0.7}
      >
        <View style={styles.buttonborder}>
        <Text style={[styles.buttontitle,{color}]}>{title}</Text>
        </View>
        
      </TouchableOpacity>
    );
  }
  function ButtonRow({children})
  {
    return (
      <View style={styles.buttonrow}>{children}</View>
    );
  }
  function Lap({number,interval,fastest,slowest})
  {
    const lapstyle=[
      styles.laptext,
      fastest && styles.fastest,
      slowest && styles.slowest,
    ]
    return (
      <View style={styles.lap}>
        <Text style={lapstyle}>Lap {number}</Text>
        <Timer style={[lapstyle,styles.laptimer]} interval={interval}/>
      </View>
    );
  }
  function LapTable({laps,timer})
  {
    const finishedlaps=laps.slice(1);
    let min=Number.MAX_SAFE_INTEGER;
    let max=Number.MIN_SAFE_INTEGER;
    if(finishedlaps.length>=2)
    {
      finishedlaps.forEach(lap => {
         if(lap<min)
            min=lap;
        if(lap>max)
            max=lap;
      });
    }
    return (
      <ScrollView style={styles.scrollview}>
          {laps.map((lap,index)=>(
            <Lap 
            number={laps.length-index}
             key={laps.length-index} 
              interval={index==0?timer+lap:lap}
              fastest={lap==min}
              slowest={lap==max}
              />
          ))}
      </ScrollView>
    );
  }
  

  
  export default class App extends Component {
    
    constructor(props){
      super(props)
      this.state={
          start:0,
          now:0,
          laps:[ ],
      }
    }
    componentWillUnmount(){
      clearInterval(this.timer);
    }
    start=()=>{
        const now=new Date().getTime();
        this.setState({
          start:now,
          now,
          laps:[0]
        });
        this.timer=setInterval(() => {
          this.setState({now:new Date().getTime()})
        }, 100);
    }

    lap=()=>{
      const timestamp=new Date().getTime();
      const {laps,now,start}=this.state
      const [firstlap, ...other]=laps
      this.setState({
        laps:[0,firstlap+now-start,...other],
        start:timestamp,
        now:timestamp,
      })

    }

    stop=()=>{
      clearInterval(this.timer);
      const {laps,now,start}=this.state
      const [firstlap, ...other]=laps
      this.setState({
        laps:[firstlap+now-start,...other],
        start:0,
        now:0,
      })

    }
    reset=()=>{
      
      this.setState({
        laps:[],
        now:0,
        start:0
      })
    }
    resume=()=>{
      const now=new Date().getTime();
      this.setState({
        now:now,
        start:now,
      })
      this.timer=setInterval(() => {
        this.setState({now:new Date().getTime()})
      }, 100);
    }

   render() {
    const {now,start,laps}=this.state;
    const timer=now-start;
  return (
    
    <View style={styles.container}>
     
      <Timer interval={laps.reduce((total,cur)=>total+cur,0)+timer}
       style={styles.timer}/>
      {laps.length==0&&(
              <ButtonRow>
              <RoundButton title='Lap'
               color='#888B90'
                background='#151515' 
                disabled
                />
              <RoundButton 
              title='Start' 
              color='#50D167' 
              background='#1B361F'
              onPress={this.start}
              />
              </ButtonRow>
      )}
      {start>0 && (
          
          <ButtonRow>
            
            <RoundButton title='Lap'
             color='#FFFFFF' 
             background='#3D3D3D'
             onPress={this.lap}
             />
            <RoundButton 
            title='Stop' 
            color='#E33935' 
            background='#1B361F'
            onPress={this.stop}
            />
          </ButtonRow>
      )}
      {laps.length>0&&start==0 && (
          <ButtonRow>
            <RoundButton title='Reset'
             color='#FFFFFF' 
             background='#3D3D3D'
             onPress={this.reset}
             />
            <RoundButton 
            title='Start' 
            color='#50D167' 
            background='#1B361F'
            onPress={this.resume}
            />
          </ButtonRow>
      )}
      
      <LapTable laps={laps} timer={timer}/>
      
    </View>
  );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    paddingTop:130,
    paddingHorizontal:20,
  },
  timer:{
    color:'#FFFFFF',
    fontSize: 60,
    fontWeight: '200',
    width:90,
  },
  timercontainer:{
    flexDirection:'row'
  },
  button:
  {
    width:80,
    height:80,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
  },
  buttontitle:
  {
    fontSize:18
  },
  buttonborder:
  {
    width:76,
    height:76,
    borderRadius:36,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonrow:
  {
    flexDirection:'row',
    alignSelf: 'stretch',
    justifyContent:'space-between',
    marginTop:80,
    marginBottom:30,
  },
  laptext:
  {
    color:'#FFFFFF',
    fontSize:18,
    
  },
  laptimer:{
    width:35
  },
  lap:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor:'#151515',
    borderTopWidth:1,
    paddingVertical:10,
  },
  scrollview:{
    alignSelf:'stretch'
  },
  fastest:
  {
    color:'#4BC05F',
  },
  slowest:
  {
    color:'#CC3531',
  },
  
    
});