'use strict';

//导入主库
var React = require('react-native');

//罗列需要的组件
var {
	StyleSheet,
	View,
	Text,
	Component
} = React;

var styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
      container: {
        flex: 1,
    }
});

//声明DetailPage类

class DetailPage extends Component {

	render() {
		return (
			 <View  style={styles.container} >
		   	 <Text style={styles.instructions}>
             Detail Page
             </Text>
			 </View>
			);
	}
}


module.exports = DetailPage;