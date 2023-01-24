import React from 'react';

import './App.css';


function App() {
  const [weather, setWeather] = React.useState();
  const [time, setTime] = React.useState();
  const [icon, setIcon] = React.useState();
  const [code, setCode] = React.useState(1006);
  const [isDay, setIsDay] = React.useState(0);
  const [background, setBackground] = React.useState('sunny-day.png');
  var [date, setDate] = React.useState(new Date());
  const [day, setDay] = React.useState('Понедельник');
  console.log(code)
  console.log(background)
  React.useEffect(() => {
    setDay(new Date().toLocaleDateString('ru', { weekday: 'long' }));
  }, [])

  React.useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  });

  React.useEffect(() => {
    fetch('http://api.weatherapi.com/v1/current.json?key=eb9a14ce1f944c0594f40638231601&q=Almaty')
      .then((res) => res.json())
      .then((json) => {
        setWeather(json.current.temp_c);
        setTime(json.location.localtime);
        setIcon(json.current.condition.icon);
        setCode(json.current.condition.code);
        setIsDay(json.current.is_day);
        setBackground(() => {
          if (code == 1000) {
            if (isDay == 1) { return 'sunny-day.png'; }
            else { return 'sunny-night.png'; }
          }
          else if (code === 1003 || code === 1186) {
            if (isDay == 1) { return 'sunCloud-day.png'; }
            else { return 'sunCloud-night.png'; }
          }
          else if (code == 1006 || code === 1009) {
            if (isDay == 1) { return 'cloudy-day.png'; }
            else { return 'cloudy-night.png'; }
          }
          else if (code == 1030 || code === 1147 || code === 1135) {
            if (isDay == 1) { return 'foggy-day.png'; }
            else { return 'foggy-night.png'; }
          }
          else if (code == 1063 || code === 1150 || code === 1153 || code === 1168 || code === 1180 || code === 1183 || code === 1198 || code === 1172 || code === 1240) {
            if (isDay == 1) { return 'drizzle-day.png'; }
            else { return 'drizzle-night.png'; }
          }
          else if (code == 1255 || code === 1171 || code === 1249 || code === 1069 || code === 1210 || code === 1216) {
            if (isDay == 1) { return 'snow-day.png'; }
            else { return 'snow-night.png'; }
          }
          else if (code == 1087 || code === 1273 || code === 1276 || code === 1279 || code === 1282) {
            if (isDay == 1) { return 'storm-day.png'; }
            else { return 'storm-night.png'; }
          }
          else if (code == 1114 || code === 1207 || code === 1117 || code === 1222 || code === 1225 || code === 1252 || code === 1258) {
            if (isDay == 1) { return 'bigSnow-day.png'; }
            else { return 'bigSnow-night.png'; }
          }
          else if (code == 1189 || code === 1192 || code === 1195 || code === 1201 || code === 1243 || code === 1246) {
            if (isDay == 1) { return 'shower-day.png'; }
            else { return 'shower-night.png'; }
          }
          else if (code == 1237 || code === 1261 || code === 1264) {
            if (isDay == 1) { return 'hail-day.png'; }
            else { return 'hail-night.png'; }
          }
          else if (code == 1066 || code === 1204 || code === 1213 || code === 1219) {
            if (isDay == 1) { return 'blackCloud-day.png'; }
            else { return 'blackCloud-night.png'; }
          }
          else {
            return null
          }

        })
      })
      .catch((err) => {
        console.warn(err);
        alert("Could not to get data")
      });
  }, [weather]);


  return (
    <div className="App">
      <header
        className='header'
        style={code == null ?
          { backgroundImage: "none" }
          :
          { backgroundImage: `url(${background})` }}
      >
        <div className="date">
          <p>{day}</p>
          <b>
            {time == null ? '01' : time.substring(8, 10)}
          </b>
        </div>
        <div className="time">
          {icon == null ? '' : <img src={icon} alt="icon" />}
          {date.toLocaleTimeString('it-IT').substring(0, 5)}
        </div>
        <div className="weather">
          <p>Алматы</p>
          {weather == null ? <b>0&#176;</b> : <b>{weather}&#176;</b>}
        </div>
      </header>
    </div >
  );
}

export default App;


