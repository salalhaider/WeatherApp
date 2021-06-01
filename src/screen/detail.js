import React, {Component} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';

export default class detail extends Component {
  state = {
    weatherData: [],
  };
  componentDidMount() {
    this.setState({weatherData: this.props.route.params});
  }
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          backgroundColor: '#111b27',
        }}>
        <Text style={{color: 'white', fontSize: 26, marginVertical: 30}}>
          Hourly Forecast
        </Text>
        {typeof this.state.weatherData.hour != 'undefined'
          ? this.state.weatherData.hour.map(x => (
              <View
                style={{
                  paddingHorizontal: 10,
                  width: '100%',
                  height: 50,
                  borderWidth: 1,
                  borderColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 2,
                }}>
                <View
                  style={{
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{x.time.split(' ')[1]}</Text>
                </View>
                <View style={{width: '10%'}}>
                  <Image
                    source={{
                      uri: 'http:' + x.condition.icon,
                    }}
                    style={{width: 50, height: 50}}
                  />
                </View>
                <View
                  style={{
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white'}}>{x.temp_c}&deg;</Text>
                </View>
              </View>
            ))
          : null}
      </ScrollView>
    );
  }
}
