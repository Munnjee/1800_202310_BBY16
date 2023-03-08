function search() {
    // Get the user's search query
    var query = document.getElementById("search-bar").value;
  
    // Get the user's filter selections
    var indoorOutdoorFilter = document.getElementById(
      "indoor-outdoor-select"
    ).value;
    var compensationFilter = document.getElementById(
      "compensation-select"
    ).value;
    var imagesFilter = document.getElementById("images-checkbox").checked;
    var timeOfDayFilter =
      document.getElementById("time-of-day-select").value;
    var dateFilter = document.getElementById("date-input").value;
    var timeFilter = document.getElementById("time-input").value;
  
    // Filter the search results based on the user's selections
    // You can add your search function here
    console.log(
      "Showing results for '" + query + "' with the following filters:"
    );
    console.log("- Indoor/Outdoor: " + indoorOutdoorFilter);
    console.log("- Compensation: " + compensationFilter);
    console.log("- Includes Images: " + imagesFilter);
    console.log("- Time of Day: " + timeOfDayFilter);
    console.log("- Date of Service: " + dateFilter);
    console.log("- Approximate Time Needed: " + timeFilter + " hours");
  }