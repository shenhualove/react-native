/**
 * Created by apple on 16/12/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,Image,ScrollView,BackAndroid,
    Text,Dimensions,
    View
} from 'react-native';

class Show extends Component {
    constructor(){
        super();
        this.state={
            loading:true,
            content:null
        }
    }

    getData(){
        let that=this;
        fetch("http://172.16.12.226:8081/data/show.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                    let principal,auxiliary,steps;
                    //主材
                     principal=data.data[0].ingredients.split(';').map((val,key)=>{
                          return (
                              <View style={styles.item} key={key}>
                                   <Text style={styles.itemText}>{val.split(',')[0]}</Text>
                                   <Text style={styles.itemText}>{val.split(',')[1]}</Text>
                              </View>
                          )
                     });
                    //辅材
                    auxiliary=data.data[0].burden.split(';').map((val,key)=>{
                        return (
                            <View style={styles.item} key={key}>
                                <Text style={styles.itemText}>{val.split(',')[0]}</Text>
                                <Text style={styles.itemText}>{val.split(',')[1]}</Text>
                            </View>
                        )
                    });

                    //步骤
                    steps=data.data[0].steps.map((val,key)=>{
                        return (
                            <View style={styles.stepItem} key={key}>
                                <Image style={styles.stepImg} source={{uri: val.img}}/>
                                <Text style={styles.stepText}>{val.step}</Text>
                            </View>
                        )
                    });
                    that.setState({
                        loading:false,
                        content:<ScrollView contentContainerStyle={styles.showContent}>
                                   <Image style={styles.pic} source={{uri: data.data[0].albums[0]}}/>
                                   <Text style={styles.title}>{data.data[0].title}</Text>
                                   <View style={styles.desc}>
                                      <Text>{data.data[0].imtro}</Text>
                                   </View>

                                      <Text style={styles.smallTitle}>主料</Text>
                                      <View style={styles.smallWrap}>
                                          {principal}
                                      </View>


                                        <Text style={styles.smallTitle}>辅料</Text>
                                        <View style={styles.smallWrap}>
                                            {auxiliary}
                                        </View>

                                        <Text style={styles.smallTitle}>步骤</Text>
                                        <View style={styles.stepWrap}>
                                            {steps}
                                        </View>
                                </ScrollView>
                    })
                });
            } else {
                alert('失败');
            }
        }, function(e) {
            alert("Error fetch!");
        });
    }

    componentDidMount() {
        this.getData();
        BackAndroid.addEventListener('hardwareBackPress',()=> {
            this.props.navigator.pop();
            return true;
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading?<View style={styles.loading}><Text>加载中...</Text></View>:this.state.content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:Dimensions.get('window').height,
        paddingBottom:20,
        backgroundColor: '#fff',
    },
    loading:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    pic:{
        width:Dimensions.get('window').width,
        height:300
    },
    showContent:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        padding:10,
        fontSize:16,
        color:'#000'
    },
    desc:{
        paddingLeft:15,
        paddingRight:15
    },
    smallTitle:{
        padding:10,
        fontSize:14,
        color:'#000',
    },
    smallWrap:{
        width:Dimensions.get('window').width,
        borderTopWidth:1,
        borderTopColor:'#ccc'
    },
    item:{
        flexDirection:'row',
        justifyContent:'flex-start',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        marginLeft:30
    },
    itemText:{
        flex:1,
        padding:10
    },
    stepItem:{
        width:280,
    },
    stepImg:{
        width:280,
        height:200
    },
    stepText:{
        padding:10
    },
    stepWrap:{
        flexDirection:'column',
        alignItems:'center',
        width:Dimensions.get('window').width,
        borderTopWidth:1,
        borderTopColor:'#ccc',
        paddingTop:10,
    }


});

export default Show;