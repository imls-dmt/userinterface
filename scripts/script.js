// Global Variables
var verbose = true;
var startup_request = "https://esip-dev-02.edacnm.org/api/resources/";

// Search-related global variables
var search_string = "";
var search_facets = {};
var search_JSON = {};
var results = {};
var current_result_returned = 0;
var current_result_count = 0;

// Generated HTML content
var facets_html = "";
var results_html = "";



// utility functions
function vMessage(message, target = "console") {
    // target parameter options:
    //  console (default) = the javascript console
    //  message = a javascript alert box
    if (verbose) {
        if (target == "console") {
            console.log(message);
        }
        else if (target == "message") {
            alert(message);
        }
        else {
            console.log("Warming: an invalid output destination was specified: " + target + ". The message was: " + message);
        };
    }
}


// conversion functions
function facetsToHTML(results_json) {
    // generate a set of checkbox blocks for the sorted (desc) facet values
    // within an html form
    let facets_dict = results_json["facets"];
    let returnHTML = ""
    // sort the provided facets_json block
    let facets_sorted = {};
    $.each( facets_dict, function( key, value) {
        vMessage("Item: " + key);
        let entries = Object.entries(facets_dict[key]);
        let sorted = entries.sort((a, b) => b[1] - a[1]);
        facets_sorted[key] = sorted
    })

    // process the sorted array into the corresponding set of checkbox controls


    // return the generated HTML
    return returnHTML
}

function resultsToHTML(results_json) {
    //

}

// Search functions
function buildSearchJSON(search_string, limit=15, offset=0, sort_str="score desc", status="true") {
    vMessage("Building search JSON for submission to search API");
    post_content = {
        "search": [
        ]
    }
    if (search_string.len > 0) {
        post_content.search.push(
            {
                "group": "and",
                "and": [ {} ],
                "or": [
                    {"field": "keywords", "string": search_string, "type": "simple"},
                    {"field": "abstract_data", "string": search_string, "type": "simple"},
                    {"field": "title", "string": search_string, "type": "simple"},
                    {"field": "locator_data", "string": search_string, "type": "match"},
                    {"field": "authors.familyName", "string": search_string, "type": "simple"},
                    {"field": "authors.givenName", "string": search_string, "type": "simple"},
                    {"field": "target_audience", "string": search_string, "type": "simple"},
                    {"field": "author_org.name", "string": search_string, "type": "simple"}
                ]
            }
        )
    };
    if (status == "true" || status == "false" ) {
        // "true" (default) = published items
        // "false" = unpublished items
        // "" = all items (no status element added to the post JSON)
        post_content.search.push(
            {
                "group": "and",
                "and": [
                    {
                        "field": "status",
                        "string": status,
                        "type": "simple"
                    }
                ]
            }
        )
    };
    // add facet processing block here
    post_content.limit = limit;
    post_content.offset = offset;
    post_content.sort_str = sort_str
    vMessage(post_content);
    return post_content
}

function getResults(searchJSON) {
    vMessage("Starting search process");
}

function processResults(data) {
    vMessage("Successfully retrieved results from server - starting processing")
    results = data
    current_result_returned = results["hits-returned"];
    current_result_count = results["hits-total"];
    vMessage(results)
    vMessage("Returned records in the result set: " + current_result_returned)
    vMessage("Total number of records in result set: " + current_result_count);
    vMessage(results["facets"]);
}

// Document Ready code
$( document ).ready(function() {
    // initial data retrieval - get result set
    $.ajax({
        "dataType": "json",
        "url": startup_request,
        "data": {
            "limit": 0,
            "status": 1},
        "success": processResults,
        "error": function(){console.log("error")}
    });
})
