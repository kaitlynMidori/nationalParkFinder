'use strict';

const apiKey = 'VdCyQFO5ZWXEbAnkBBGELfSWzc7eZsTt7b4EO5U4';
const baseURL = 'https://developer.nps.gov/api/v1/parks?';

//This function accepts the parameters(an object) and converts them into a string.  
function formatQueryParams(params){
  //end url => stateCode=tx&stateCode=md&stateCode=az&api_key=dfgdfg
  //params.stateCode => "tx md az"
  const stateCodeArray = params.stateCode.split(' ');
  //stateCodeArray => ['tx', 'md', 'az']
  const queryItems= [];
  stateCodeArray.forEach(state =>{
    queryItems.push(`stateCode=${state}`);
    //['stateCode=tx', 'stateCode=md', 'stateCode=az']
  });
  queryItems.push(`limit=${params.maxResults}`);
  queryItems.push(`api_key=${apiKey}`);
  return queryItems.join('&');   


//parks?stateCode=tx&stateCode=md&stateCode=&
}

//This line is going to take the input recieved from getParks and add the neccesary sections to the html file. 
//Then dispaly those results.
function displayResults(responseJson){
  $('#results-list').empty();
  responseJson.data.forEach(park => {
    console.log(park.description);
    console.log(park.url);
    console.log(park.fullName)
    $('#results-list').append(
      `<li>
        <h3><a href="${park.url}">${park.fullName}</a></h3>
        <p>${park.description}</p>
      </li>`
    );
  });
  $('#results').removeClass('hidden');
}
//search through an object with an array of objects, each object representing a new park
//loop through responseJson.data(park => )
//display park.description, park.fullName, park.url



//This function is going to accept input paramaters from a user and turn it into a searchable url. 
//It then fetches the url based off the input params. it calls the function display results. 
function getParks(query, maxResults){
  const params = {
    apiKey,
    stateCode: query,
    maxResults
  };
  /*
  {
    apiKey,
    stateCode: "tx az md"
  }
  */

  const queryString = formatQueryParams(params);
  const url = baseURL + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

// /This function watches the submit button and then when a user clicks it runs the getParks function. 
function handleSubmit(){
  $('form').submit(event =>{
    event.preventDefault();
    console.log('Just got a submit!');
    const searchTerm = $('.js-search-state').val();
    let maxResults;
    if ($('.js-search-number').val()) {
      maxResults = $('.js-search-number').val();
    }
    else {
      maxResults = 10;
    }
    getParks(searchTerm,maxResults);    
  });

}

$(handleSubmit());

// "use strict";

// // put your own value below!
// const apiKey = "wveHBixTLgnXr8GvVPJfX9QIOG5d26TS4o6IgTaR";
// const searchURL = "https://developer.nps.gov/api/v1/parks";


// function formatQueryParams(params) {
//     const queryItems = Object.keys(params).map(
//         (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
//     );
//     return queryItems.join("&");
// }

// function displayResults(responseJson, maxResults) {
//     // if there are previous results, remove them
//     console.log(responseJson);
//     $("#results-list").empty();
//     // iterate through the data array
//     for (let i = 0; i < responseJson.data.length; i++) {
//         $("#results-list")
//             .append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
//         <p>${responseJson.data[i].description}</p>
//         <p>${responseJson.data[i].url}</p>
//         </li>`);
//     }
//     //display the results section
//     $("#results").removeClass("hidden");
// }

// function getParks(query, maxResults) {
//     const params = {
//         stateCode: query,
//         limit: maxResults,
//         api_key: apiKey,
//     };
//     const queryString = formatQueryParams(params);
//     const url = searchURL + "?" + queryString;

//     console.log(url);

//     fetch(url)
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error(response.statusText);
//         })
//         .then((responseJson) => displayResults(responseJson, maxResults))
//         .catch((err) => {
//             $("#error-message").text(`Something went wrong: ${err.message}`);
//         });
// }

// function watchForm() {
//     $("form").submit((event) => {
//         event.preventDefault();
//         const searchState = $("#search-state").val();
//         const maxResults = $("#max-results").val();
//         getParks(searchState, maxResults);
//     });
// }

// $(watchForm);