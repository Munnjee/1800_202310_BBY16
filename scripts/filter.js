function search() {
  const searchBar = document.getElementById("search-bar");
  const indoorOutdoorSelect = document.getElementById("indoor-outdoor-select");
  const compensationSelect = document.getElementById("compensation-select");
  const imagesCheckbox = document.getElementById("images-checkbox");
  const timeOfDaySelect = document.getElementById("time-of-day-select");
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");
  
  const gigListingGoHere = document.getElementById("giglisting-go-here");
  gigListingGoHere.innerHTML = ""; // Clear previous search results
  
  // Build Firestore query based on filter options
  let query = firebase.firestore().collection("giglisting");
  if (searchBar.value !== "") {
    query = query.where("jobTitle", "==", searchBar.value);
  }
  if (indoorOutdoorSelect.value !== "all") {
    query = query.where("indooroutdoor", "==", indoorOutdoorSelect.value);
  }
  if (compensationSelect.value !== "all") {
    const [minCompensation, maxCompensation] = compensationSelect.value.split("-");
    query = query.where(parseInt("compensation"), ">=", parseInt(minCompensation.slice(1)));
    if (maxCompensation !== "$200+") {
      query = query.where(parseInt("compensation"), "<=", parseInt(maxCompensation.slice(1)));
    }
  }
  if (imagesCheckbox.checked) {
    query = query.where("file", "!=", "");
  }
  if (timeOfDaySelect.value !== "all") {
    switch (timeOfDaySelect.value) {
      case "before-noon":
        query = query.where("time", "==", "AM To Noon");
        break;
      case "noon-to-6pm":
        query = query.where("time", "==", "Noon To 4PM");
        break;
      case "6pm-to-9pm":
        query = query.where("time", "==", "4pm to 8pm");
        break;
    }
  }
  if (dateInput.value !== "") {
    query = query.where("flexDate", "==", dateInput.value);
  }
  if (timeInput.value !== "") {
    query = query.where("flexTime", ">=", parseFloat(timeInput.value));
  }
  
  // Execute query and display search results
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      gigListingGoHere.innerHTML = "No results found.";
    } else {
      querySnapshot.forEach((doc) => {
        const gigCardTemplate = document.getElementById("gigCardTemplate");
        const gigCard = gigCardTemplate.content.cloneNode(true);
        gigCard.querySelector(".title").textContent = doc.data().jobTitle;
        gigCard.querySelector(".compensation").textContent = `$${doc.data().compensation}`;
        gigCard.querySelector(".indooroutdoor").textContent = doc.data().indooroutdoor;
        gigCard.querySelector(".date").textContent = doc.data().flexDate;
        gigCard.querySelector(".flexDate").textContent = doc.data().flexDate;
        gigCard.querySelector(".time").textContent = doc.data().time;
        gigCard.querySelector(".flexTime").textContent = doc.data().flexTime;
        gigListingGoHere.appendChild(gigCard);
      });
    }
  }).catch((error) => {
    console.error("Error executing Firestore query: ", error);
  });
}

function clearFields() {
  document.getElementById("search-bar").value = "";
  document.getElementById("indoor-outdoor-select").value = "all";
  document.getElementById("compensation-select").value = "all";
  document.getElementById("images-checkbox").checked = false;
  document.getElementById("time-of-day-select").value = "all";
  document.getElementById("date-input").value = "";
  document.getElementById("time-input").value = "";

  search();
}
