'use strict';

//导入主库
var React = require('react-native');

var DetailPage = require('./DetailPage');

var RefreshableListView = require('react-native-refreshable-listview')

var Swiper = require('./swiper_index');

//罗列需要的组件
var {
	StyleSheet,
	View,
	Text,
	Component,
	TouchableHighlight,
	NativeModules,
	ListView,
	Image
} = React;

var {
	WYNetworkBridgeModule
} = NativeModules;

var styles = StyleSheet.create({
  listview: {
    backgroundColor: '#FAFAFA',
  },

  textContainer: {
		padding: 30,
    marginTop: 64,
    alignItems: 'center'
  },
	storyTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  storyTitleRead: {
    flex: 1,
    fontSize: 16,
    color: '#777777',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 60,
    marginLeft: 10,
    width: 80,
  },
	//分割线
	separator: {
		marginLeft: 10,
    marginRight: 10,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
	slide: {
		flex: 1,


	},
	//轮播图图片
	slideImage: {
		flex: 1,
		alignItems: 'center',
	},
	//轮播图文字
	slideText: {
		top: 200,
		// color: '#FFFFFF',
		// fontSize: 16,
		// shadowColor: '#000000',
		// shadowOffset: '-1'
	},
	//轮播图页码样式
	paginationStyle: {
		bottom: 5,
		alignItems: 'center',
		backgroundColor: '#00000000',
		color: '#5A5A5A',
		tintColor: '#FFFFFF',
	}
});

var indicatorStylesheet = StyleSheet.create({
  wrapper: {
    backgroundColor: 'red',
    height: 60,
    marginTop: 10,
  },
  content: {
    backgroundColor: 'blue',
    marginTop: 10,
    height: 60,
  },
})

//声明HomePage类

 class HomePage extends Component {

  constructor(props) {
    super(props);
		var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});

			this.state = ({
				isLoading: false,
				dataSource: ds.cloneWithRows(['row 1', 'row 2']),
				swiperItems: [],
				dsState : ds
			});

console.log('dddddd', this.ds);
    this.reloadArticles();
  }

	_rowPressed(propertyGuid){

		// this.props.navigator.push({
		// 	name: 'A new screen',
  //         component: DetailPage
  //       });
	}

	renderRow(rowData, sectionID, rowID) {

	var imagePath = rowData['images'][0];

  return (
    <TouchableHighlight onPress={() => this._rowPressed(123)}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.row}>
				<Text style={styles.storyTitle}
							numberOfLines={3}>{rowData['title']}</Text>
          <Image style={styles.cellImage} source={{ uri: imagePath }} />
        </View>
				<View style={styles.separator} />
      </View>
    </TouchableHighlight>
  );
}
  renderHeader(){
		return (
			<Swiper showsButtons={false} height={240} paginationStyle={styles.paginationStyle}>
			 {this.state.swiperItems.map(function(item){
				 return (
					 <View style={item.css}>
					 <Image style={styles.slideImage} source={{uri: item.image}}>
					 <Text numberOfLines={1} style={styles.slideText}>{item.title}</Text>
					 </Image>
					 </View>
				 );
			 })}
			</Swiper>
		)
	}

	reloadArticles(){

		WYNetworkBridgeModule.getHomeListWithTimeString(null,function(errorResult){
			console.log('aaaaaa',errorResult);
		}, function(result){

			var listData = result['stories'];
			var swiperData = result['top_stories'];
			console.log('bbbbbb', swiperData);
			var swiperItemsT = [];
			swiperData.map(function (item) {
				swiperItemsT.push({ title: item['title'], image: item['image'], css: styles.slide});
			});
			console.log('ccccc', this.ds);
			this.setState({
				isLoading: true,
				dataSource: this.state.dsState.cloneWithRows( listData ),
				swiperItems: swiperItemsT,
			});


		}.bind(this));
	}

	//返回内容试图
  render() {
    	var content =
			this.state.isLoading == false ?
    	   <View style={styles.textContainer}>
           <Text>正在加载...</Text>
           </View>
					 :

			<RefreshableListView   marginTop={64}
        dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				// renderHeaderWrapper={this.renderHeader.bind(this)}
        loadData={this.reloadArticles.bind(this)}
        refreshDescription="Refreshing articles"
				refreshingIndictatorComponent={
    <RefreshableListView.RefreshingIndicator stylesheet={indicatorStylesheet} />}
      />

			return content;
	}
}

module.exports = HomePage;
