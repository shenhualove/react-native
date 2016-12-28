/**
 * Created by apple on 16/12/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Navigator
} from 'react-native';
import Index from './js/route/index';
import List from './js/route/list';
import Search from './js/route/search';
import Show from './js/route/show';

class caipu extends Component {

    getRoute(route, navigator){
         //if(route.name)
         switch (route.name){
             case "List":
                 return(
                     <List navigator={navigator} params={route.params} />
                 )
             case "Search":
                 return(
                     <Search navigator={navigator} />
                 )
             case "Show":
                 return(
                     <Show navigator={navigator} />
                 )
             default :
                 return(
                     <Index navigator={navigator} />
                 )
         }
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'Index'}}
                renderScene={this.getRoute}
                />
        );
    }
}


export default caipu;