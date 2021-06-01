import axios from 'axios';
import React, {Component} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Button,
} from 'react-native';

export default class home extends Component {
  state = {
    weatherData: [],
    city: 'Lahore',
    modalState: false,
  };
  componentDidMount() {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=f169336fe4a54d3983d63148210106&q=${this.state.city.toUpperCase()}&days=10&aqi=no&alerts=no`,
      )
      .then(response => {
        // console.log(response.data.forecast.forecastday);
        this.setState({
          weatherData: response.data,
        });
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
  }
  onCityChange() {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=f169336fe4a54d3983d63148210106&q=${this.state.city.toUpperCase()}&days=10&aqi=no&alerts=no`,
      )
      .then(response => {
        // console.log(response.data.forecast.forecastday);
        this.setState({
          weatherData: response.data,
        });
      })
      .catch(error => {
        console.log('error');
        console.log(error);
      });
  }

  render() {
    setInterval(() => {
      this.onCityChange();
    }, 300000);
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          //   justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111b27',
        }}>
        <Modal
          isVisible={this.state.modalState}
          onBackdropPress={() => {
            this.setState({
              modalState: !this.state.modalState,
              //   weatherData: [],
            });
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              height: 300,
            }}>
            <Text style={{color: 'black', fontSize: 26}}>Enter City Name:</Text>
            <TextInput
              value={this.state.city}
              onChangeText={e => this.setState({city: e})}
              placeholder="City"
              //   placeholderTextColor="black"
              style={{
                width: '90%',
                borderWidth: 0.5,
                borderColor: 'black',

                marginTop: 20,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({modalState: !this.state.modalState});
                this.onCityChange();
              }}
              style={{
                width: '90%',
                height: 40,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: 'white'}}>DONE</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* -------------------------City name------------------------------------- */}
        <TouchableOpacity
          onPress={() => this.setState({modalState: !this.state.modalState})}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, marginTop: 20, color: 'white'}}>
              {typeof this.state.weatherData.location != 'undefined'
                ? this.state.weatherData.location.name
                : null}
            </Text>
            <Ionicon
              name="location-outline"
              size={22}
              style={{marginTop: 15}}
              color="white"
            />
          </View>
        </TouchableOpacity>

        {/* ---------------------------temprature---------------------------------- */}
        <View style={{marginBottom: 30, flexDirection: 'row', marginTop: 40}}>
          <Text style={{fontSize: 60, color: 'white'}}>
            {typeof this.state.weatherData.current != 'undefined'
              ? this.state.weatherData.current.temp_c
              : null}
          </Text>
          <Text style={{color: 'white', fontSize: 40}}>&deg;c</Text>
        </View>

        {/* -----------------------Daily Forcast */}
        {typeof this.state.weatherData.forecast != 'undefined'
          ? this.state.weatherData.forecast.forecastday.map(x => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Detail', x)}
                style={{
                  width: '100%',
                  height: 50,
                  paddingHorizontal: 10,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 5,
                  marginTop: 2,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* {console.log(
                      '--------------------------______________________------------------',
                    )} */}
                    {/* {console.log(x.day.condition.icon.split('//')[1])} */}
                    <Text style={{color: 'white'}}>{x.date}</Text>
                  </View>
                  <View style={{width: '10%'}}>
                    <Image
                      source={{
                        uri: 'http:' + x.day.condition.icon,
                        // uri: 'http://cdn.weatherapi.com/weather/64x64/night/176.png',
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
                    <Text style={{color: 'white'}}>
                      {x.day.maxtemp_c}/{x.day.mintemp_c}&deg;
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : null}

        {/* -------------------------HUmidity----------------------------- */}
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            width: '80%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              marginTop: 20,
            }}>
            Humidity{' '}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              marginTop: 10,
              marginBottom: 20,
            }}>
            {typeof this.state.weatherData.current != 'undefined'
              ? this.state.weatherData.current.humidity
              : null}
          </Text>
        </View>
        {/*--------------------Wind Speed--------------------------------- */}
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 30,
              marginTop: 20,
            }}>
            Windspeed{' '}
          </Text>
          <Text style={{color: 'white', fontSize: 30, marginTop: 10}}>
            {typeof this.state.weatherData.current != 'undefined'
              ? this.state.weatherData.current.wind_kph
              : null}{' '}
            kph
          </Text>
        </View>
      </ScrollView>
    );
  }
}
