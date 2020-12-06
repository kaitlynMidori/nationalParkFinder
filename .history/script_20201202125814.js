const apiKey = 'IYShAM46mApEsrKKyFHWXmXOAnpqYYoPtAK3QJw1';
const searchURL = 'https://developer.nps.gov/api/v1';

function displayResults(responseJson) {
    //console.log('displayResults ran');
    //console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
            </li>`);
    }
    $('#results').removeClass('hidden');
}

function formatQuery(params) {
    //console.log('formatQuery ran')
    const queryItems = Object.keys(params)
        .map(query => `${query}=${params[query]}`);
    //console.log(queryItems);
    return queryItems.join('&');
}

function getParks(stateName, maxResults=10) {
    //console.log('getParks ran');
    const params = {
        stateCode: stateName,
        limit: maxResults,
        api_key: apiKey
    };
    const queryString = formatQuery(params);
    //console.log(queryString);
    const url = searchURL + '/parks?' + queryString;
    //console.log(url);
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#error-message').text('Something went wrong. Try again!')
    });
}

function watchForm() {
    //console.log('Waiting on user input')
    $('#state-park-form').submit(event => {
        event.preventDefault();
        //console.log('Taking in user submission...')
        const stateName = $('#state-name').val();
        const maxResults = $('#max-results').val();
        getParks(stateName, maxResults);
    })
}

$(watchForm);


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