// Init Github
const github = new Github();
// init UI
const ui = new UI();

// Search input
const searchUser = document.getElementById("searchUser");

// a debounce function will only call `callback` after `ms` milliseconds have
// passed since `callback` was previously called.
const debounce = (callback, ms) => {
  let timeout;
  return function() {
    const args = arguments;
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      callback.apply(context, args);
    }, ms);
  };
};

// a place to store previous searches
let previousInput;

// a debounced function that will only execute 750 milliseconds after it was
// previously called (so, 750ms after the user has stopped typing).
const handleSearch = debounce(function(e) {
  const currentInput = e.target.value;
  // make sure current input isn't blank
  if (currentInput !== "") {
    // Make HTTP call
    github.getUser(currentInput).then(data => {
      if (data.profile.message === "Not Found") {
        // Show alert
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        // Show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    // Clear
    ui.clearProfile();
  }
  // update previous input
  previousInput = currentInput;
}, 750);

// finally, attach the event to the search bar.
searchUser.addEventListener("keyup", handleSearch);
