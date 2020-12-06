"use strict";

// put your own value below!
const apiKey = "wveHBixTLgnXr8GvVPJfX9QIOG5d26TS4o6IgTaR";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function handleSubmit() {
    $('#user-input').submit(function(event){
      event.preventDefault()
      $('#search-results').empty()
      userState = $('#state-selector').val()
      states = userState.replace(",","&q=")
      states = states.replace(/\s/g, "")
      numSearch = $('#results-length').val()
      console.log(states);
      createURL(states, numSearch);
    })
    
  }

  function createURL(userState, num) {
    newUrl =`${baseUrl}?limit=${num}&q=${userState}&api_key=${apiKey}`
    console.log(newUrl)
    encodedUrl= encodeURIComponent(newUrl)
    console.log(encodedUrl)
    fetchURL(newUrl)
  }
  
  function fetchURL(URL) {
    fetch (URL)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson, numSearch))
  }
  
  function displayResults(result, searchNum) {
    console.log('displayResults Ran')
    for (i = 0; i < searchNum; i++) {
      $('#search-results').append(
        `<li class="result">
        <h2 class="name">${result.data[i].fullName}</h2>
        <p class="description">${result.data[i].description}</p>
        <a href "${result.data[i].url}">${result.data[i].url}</a>
        </li>`
      )
    }
  }
  
  $(handleSubmit)

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