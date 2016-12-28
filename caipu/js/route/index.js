/**
 * Created by apple on 16/12/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,Image,BackAndroid,
    Text,TouchableOpacity,ListView,
    View,Dimensions
} from 'react-native';

class Index extends Component {
    constructor(){
        super();
        this.state={
            hover1:true,
            hover2:false,
            hover3:false,
            hover4:false,
            dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            data:[],
            pageNow:1
        }
    }

    checkTab(id){
        switch(id){
            case 2:

                this.setState({
                    hover1:false,
                    hover2:true,
                    hover3:false,
                    hover4:false
                });
                break;
            case 3:
                this.setState({
                    hover1:false,
                    hover2:false,
                    hover3:true,
                    hover4:false
                });
                break;
            case 4:
                this.setState({
                    hover1:false,
                    hover2:false,
                    hover3:false,
                    hover4:true
                });
                break;
            default :
                this.setState({
                   hover1:true,
                   hover2:false,
                   hover3:false,
                   hover4:false
                });
        }
    }

    rowChange(){
        let that=this;
        fetch("http://172.16.12.226:8081/data/index.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                   that.setState({
                       dataSource:that.state.dataSource.cloneWithRows(data.data)
                   })
                });
            } else {
                alert('失败');
            }
        }, function(e) {
            alert("Error fetch!");
        });
    }

    _renderRow(rowData, sectionID){
        return (

                <TouchableOpacity style={styles.lists} key={sectionID} onPress={this.show.bind(this,rowData.id)}>
                    <Image style={styles.pic} source={{uri: rowData.albums[0]}}/>
                    <Text style={styles.title}>{rowData.title}</Text>
                </TouchableOpacity>

        )
    }

    show(id){
        this.props.navigator.push({
            name:'Show',
            params:{
                id:id
            }
        })
    }

    componentDidMount() {
        this.rowChange();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                <Text style={styles.search}>搜索食材或者菜名：如土豆" </Text>
                </View>
                <View style={styles.tab}>
                    <TouchableOpacity style={styles.tabTouch} onPress={this.checkTab.bind(this,1)}><Text style={[styles.tabText,this.state.hover1&&styles.hover]}>热门推荐</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.tabTouch} onPress={this.checkTab.bind(this,2)}><Text style={[styles.tabText,this.state.hover2&&styles.hover]}>家常菜</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.tabTouch} onPress={this.checkTab.bind(this,3)}><Text style={[styles.tabText,this.state.hover3&&styles.hover]}>川菜</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.tabTouch} onPress={this.checkTab.bind(this,4)}><Text style={[styles.tabText,this.state.hover4&&styles.hover]}>鲁菜</Text></TouchableOpacity>
                </View>

                <ListView contentContainerStyle={styles.listWrap} dataSource={this.state.dataSource}
                          initialListSize={4}
                          onEndReachedThreshold={10}
                          onEndReached={this.rowChange.bind(this)}
                          renderRow={this._renderRow.bind(this)} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:Dimensions.get('window').height,
        paddingBottom:20,
        backgroundColor: '#ccc'
    },
    top:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        paddingTop:10,
        paddingBottom:10
    },
    search:{
        width:280,
        height:40,
        lineHeight:30,
        textAlign:"center",
        borderRadius:6,
        backgroundColor:'#ccc'
    },
    tab:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        height:40,
        paddingTop:10,
        paddingBottom:10,
        borderTopWidth:1,
        borderTopColor:'#ccc'
    },
    hover:{
        color:'blue'
    },
    tabTouch:{
        flex:1,
    },
    tabText:{
        flex:1,
        height:40,
        textAlign:'center'
    },
    listWrap:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingTop:10,
        marginBottom:10,
        paddingLeft:15
    },
    lists:{
        padding:10,
        marginRight:10,
        borderRadius:6,
        backgroundColor:'#fff',
        width:160,
        height:220,
        marginBottom:10
    },
    pic:{
        width:140,
        height:160
    },
    title:{
        fontSize:14,
        lineHeight:40,
        textAlign:'center'
    }

});

export default Index;