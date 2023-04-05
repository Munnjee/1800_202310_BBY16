function search() {
  const searchBar = document.getElementById("search-bar");
  const indoorOutdoorSelect = document.getElementById("indoor-outdoor-select");
  const compensationSelect = document.getElementById("compensation-select");
  const imagesCheckbox = document.getElementById("images-checkbox");
  const timeOfDaySelect = document.getElementById("time-of-day-select");
  const dateInput = document.getElementById("date-input");

  const gigListingGoHere = document.getElementById("giglisting-go-here");
  gigListingGoHere.innerHTML = ""; // Clear previous search results

  // Build Firestore query based on filter options
  let query = firebase.firestore().collection("giglisting");

  if (searchBar.value !== "") {
    const startValue = searchBar.value.toLowerCase();
    const endValue = startValue + "\uf8ff";
    query = query
      .where("jobTitle", ">=", startValue)
      .where("jobTitle", "<=", endValue)
      .orderBy("jobTitle");
  }
  if (indoorOutdoorSelect.value !== "all") {
    query = query.where("indooroutdoor", "==", indoorOutdoorSelect.value);
  }
  if (compensationSelect.value !== "all") {
    const [minCompensation, maxCompensation] =
      compensationSelect.value.split("-");
    const minCompensationValue = parseInt(minCompensation.slice(1));
    const maxCompensationValue =
      maxCompensation !== "$200+"
        ? parseInt(maxCompensation.slice(1))
        : Infinity;
    query = query
      .where("compensation", ">=", minCompensationValue)
      .where("compensation", "<=", maxCompensationValue);
  }
  if (imagesCheckbox.checked) {
    query = query.where("image", "!=", "");
  }
  if (timeOfDaySelect.value !== "all") {
    switch (timeOfDaySelect.value) {
      case "before-noon":
        query = query.where("time", "==", "AM To Noon");
        break;
      case "noon-to-4pm":
        query = query.where("time", "==", "Noon To 4PM");
        break;
      case "4pm-to-8pm":
        query = query.where("time", "==", "4pm to 8pm");
        break;
    }
  }
  if (dateInput.value !== "") {
    query = query.where("date", "==", dateInput.value);
  }

  // Execute query and display search results
  query
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        gigListingGoHere.innerHTML = "No results found.";
      } else {
        querySnapshot.forEach((doc) => {
          const gigCardTemplate = document.getElementById("gigCardTemplate");
          const gigCard = gigCardTemplate.content.cloneNode(true);
          var docID = doc.id;
          gigCard.querySelector(".title").textContent = doc.data().jobTitle;
          gigCard.querySelector(".compensation").textContent = `$${
            doc.data().compensation
          }`;
          gigCard.querySelector(".indooroutdoor").textContent =
            doc.data().indooroutdoor;
          gigCard.querySelector(".date").textContent = doc.data().date;
          gigCard.querySelector(".flexDate").textContent = doc.data().flexDate;
          gigCard.querySelector(".time").textContent = doc.data().time;
          gigCard.querySelector(".flexTime").textContent = doc.data().flexTime;
          gigCard.querySelector("a").href =
            "gigDescription.html?docID=" + docID;

          var img = gigCard.querySelector("#images-goes-here");
          var picUrl = doc.data().image; // assuming picUrl is defined
          if (picUrl !== undefined) {
            img.setAttribute("src", picUrl);
          }

          gigListingGoHere.appendChild(gigCard);
        });
      }
    })
    .catch((error) => {
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
  search();
}
