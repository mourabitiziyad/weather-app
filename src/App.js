import React from 'react';
import Titles from './components/Titles';
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "4944a74b55634ff3ff3f03f3bca87cdd"; // I know it's public, I don't care
const ID = "2538027";
class App extends React.Component{
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if(city && country){
  //  console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please Enter the values"
      });
    }
  }
  render() {
    return(
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather 
        temperature={this.state.temperature}
        city={this.state.country}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error} />
      </div>
    );
  }
}

export default App;
