"use strict";

// put your own value below!
const apiKey = "wveHBixTLgnXr8GvVPJfX9QIOG5d26TS4o6IgTaR";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(
        (key) => `${encodeURIComponent(key)}=${encodeURI(params[key])}`
    );
    return queryItems.join("&");
}

function displayResults(responseJson, maxResults) {
    // if there are previous results, remove them
    console.log(responseJson);
    $("#results-list").empty();
    // iterate through the data array
    for (let i = 0; i < responseJson.data.length; i++) {
        $("#results-list")
            .append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].url}</p>
        </li>`);
    }
    //display the results section
    $("#results").removeClass("hidden");
}

function getParks(query, maxResults) {
    const params = {
        stateCode: query,
        limit: maxResults,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryString;

    console.log(url);

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then((responseJson) => displayResults(responseJson, maxResults))
        .catch((err) => {
            $("#error-message").text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $("form").submit((event) => {
        event.preventDefault();
        const searchState = $("#search-state").val();
        const maxResults = $("#max-results").val();
        getParks(searchState, maxResults);
    });
}

$(watchForm);