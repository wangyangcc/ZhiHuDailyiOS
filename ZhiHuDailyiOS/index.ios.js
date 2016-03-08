/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

//引入首页
var homePage = require('./HomePage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

var ZhiHuDailyiOS = React.createClass({
  render: function() {
    return (
      <NavigatorIOS style={styles.container}
      initialRoute={{
        component: homePage,
        title: '今日热闻',
      }}/>
    );
  }
});

AppRegistry.registerComponent('ZhiHuDailyiOS', () => ZhiHuDailyiOS);
