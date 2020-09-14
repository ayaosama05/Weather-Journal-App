/* Global Variables */
const apiKey = '40dfa384227f31a794aab0553f57e67c';

//document.getElementById('generate').addEventListener('click',UseAPI);

document.getElementById('generate').addEventListener('click',performAction);

function performAction(){
  let ZipCode = document.getElementById('zip').value;
  let userFeeling = document.getElementById('feelings').value;
  //console.log(ZipCode);
  //console.log(userFeeling);
  GetWeather(ZipCode)
  .then(function(data){
console.log(data);
postData('http://127.0.0.1:8000/addUserComment', {City : data.name , temp : data.temp , feeling : userFeeling})
updateUI();
  })
}
//https://samples.openweathermap.org/data/2.5/find?q=London&units=imperial&appid=439d4b804bc8187953eb36d2a8c26a02
//&units=imperial , &units=metric
const GetWeather = async(zipcode) => {
  const BaseUrl =   `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=metric&appid=${apiKey}`;
  const result = await fetch(BaseUrl);

  try{
    const data = await result.json();
    //console.log(data);
    let temperature = data.main.temp;
    let cityName = data.name;
    //console.log(`city name : ${cityName} , temperature : ${temperature} Celsius `);
    let newData = {name : data.name , temp : data.main.temp};
    console.log(newData);
    return newData;
  }
  catch(exception){
    console.log(`an error has been occured => ${exception}`);
    alert("Please enter right zip code !!");
  }
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
/* Function to POST data */
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await JSON.parse(JSON.stringify(response));
      //response.json();
      console.log(newData);
      return newData;
    }
    catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
const updateUI = async() => {
  const request = await fetch('http://127.0.0.1:8000/all')
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = "Date : " + newDate;
    document.getElementById('temp').innerHTML = "Temperature : " +allData.temp + "°C";
    document.getElementById('content').innerHTML = "Your Feelings : " + allData.feeling;
  } catch(error){
    console.log( `error : ${error}`)
  }
}
// TODO-Call Function
/*
postData('/addUserComment',{name : "bird"})*/