const API = "dfa47bd33e07e9f2b6419d08052782d7";
let api;
days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

months=[
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let input1=  document.querySelector("input"),
container=document.querySelector(".container"),
textError = document.querySelector(".error2"),
con=document.querySelector(".country");

//getting value from input
input1.addEventListener("keyup",(e)=>{
    if(e.key=="Enter" && input1.value!=""){
        
      
      requestapi(input1.value);

    }
    
})

//get location 
button1.addEventListener("click", () => {
  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(onSuccess);
     function onSuccess(position){
      console.log(position)
      latitude=  position.coords.latitude;
      longitude=  position.coords.longitude;
      api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API}`;
      fetchdata(api)
      }
  } else {
    alert("Your browser does not support geoloaction api");
  }
});

//api request for specific city
function requestapi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=dfa47bd33e07e9f2b6419d08052782d7`; 
    fetchdata(api)
   
}

//fetching data
function fetchdata(api)
{
    textError.innerText = "Geeting weather info. Please wait...";
    textError.classList.add("wait");
  
    fetch(api)
    .then((response)=>response.json())
    .then((result)=>weather(result));
    
}
//taking info from api and putting in respective position`
function weather(data){
    console.log(data);
    
textError.classList.replace("wait","error")
 if(data.cod=="404"){
    textError.innerText = `"${input1.value}" isn't a valid city`;
 }
 else{

   
   document.querySelector(".time-zone").innerText=data.name;
   document.querySelector(".country").innerText=data.sys.country;
   document.querySelector(".min-temp").innerText=data.main.temp_min;
   document.querySelector(".max-temp").innerText=data.main.temp_max;
   document.querySelector(".pressure").innerText=data.main.pressure;
   document.querySelector(".humidity").innerText=data.main.humidity;
   document.querySelector(".feellike").innerText=data.main.feels_like;
   document.querySelector(".temp").innerText=data.main.temp;
   document.querySelector(".description").innerText=data.weather[0].description;
   document.querySelector(".windspeed").innerText=data.wind.speed;
   document.querySelector(".visibility").innerText=data.visibility;
   let ic=document.querySelector(".iconimg");
   let img=document.createElement("img");
   ic.appendChild(img);
   let icon=data.weather[0].icon;
   img.src= `http://openweathermap.org/img/wn/${icon}@2x.png`;


   textError.classList.remove("error","wait");
   textError.innerText=" "
   container.classList.add("active");
   dispalyTime(data)

 }
} // time conversion
function dispalyTime(info) {
    let timezone=info.timezone;

    let utcHours = timezone / 360 / 10;
    // Getting time according to city timezone
    const d = new Date();
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;

    const utc = localTime + localOffset;
    const getTime = utc + utcHours;

    const getTimeNow = new Date(getTime);
    const hrs = getTimeNow.getHours();
    const min = getTimeNow.getMinutes();
    
    const month = getTimeNow.getMonth();
    const date = getTimeNow.getDate();
    const day = getTimeNow.getDay();

    document.querySelector(".day").innerHTML = days[day];
    document.querySelector(".month").innerHTML = months[month];
    document.querySelector(".date").innerHTML = date;

  
    if (min < 10) {
      document.querySelector(".minute").innerHTML = "0" + min;
    } else {
      document.querySelector(".minute").innerHTML = min;
    }

    if (hrs < 10) {
      document.querySelector(".hours").innerHTML = "0" + hrs;
    } else {
      document.querySelector(".hours").innerHTML = hrs;
    } 

    background(info);
} // background image

function background(info){
    let des=info.weather[0].description;
    console.log(des);
    switch(des){
        case "cloudy":
            document.body.style.background="url(earth.jpg)";
            document.body.style.backgroundRepeat="no-repeat";
            document.body.style.backgroundSize="cover";
            break;
           
        case "clear sky":
           document.body.style.background="url(weather-clear-sky.jpg)";
           document.body.style.backgroundRepeat="no-repeat";
           document.body.style.backgroundSize="cover";
           break;
           case "broken clouds":
            document.body.style.background = "url(weather-cloudy.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        
            break;
      
          case "rain":
            document.body.style.background = "url(weather-rain.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        
            break;
          case "shower rain" :
            document.body.style.background = "url(weather-rain.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
          case "thunderstrome":
            document.body.style.background = "url(weather-thunderstrome.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
          case "snow":
            document.body.style.background = "url(weather-snow.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
          case "mist":
            document.body.style.background = "url(weather-mist.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
          case "haze":
            document.body.style.background = "url(weather-mist.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
          case "overcast clouds":
            document.body.style.background = "url(overcastcloud.jpg)";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            break;
        default:
            document.body.style.background="url(earth.jpg)";
            document.body.style.backgroundSize="cover";
            document.body.style.backgroundRepeat="no-repeat";
            break;
    }
}
