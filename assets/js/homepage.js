var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl)
    .then(function (response) {
        if(response.ok) {   // if it was a successful request .ok if it 200 - true
            response.json().then(function(data) {
                displayRepos(data, user);
              });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function (error) {
        // notice this ".catch()" getting chained onto the end of the '.then()' method 
        alert("Unable to connect to GitHub");
    });
};

// lets create function formSubmitHandler
var formSubmitHandler = function (event) {
    event.preventDefault(); // The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
    // It stops the browser from performing the default action the event wants it to do. In the case of submitting a form, it prevents the browser from sending the form's input data to a URL, as we'll handle what happens with the form input data ourselves in JavaScript.

    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username); //push to the function a proper username
        nameInputEl.value = ""; // clean the form
    } else {
        alert("Please enter a GitHub username"); // if no username was input
    }


};

var displayRepos = function (repos, searchTerm){

    console.log(repos); // display whole object of repo
    console.log("searchTerm " + searchTerm);    // display username
 
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // clear old content
    repoContainerEl.textContent = ''; // changes repocontainer text to empty string
    repoSearchTerm.textContent = searchTerm; // assign usermane to reposearchTerm

    // loop over repos
    for (var i = 0; i< repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // looking for a local file like you are looking for them from html index file.
        repoEl.setAttribute("href", "./single-repo.html");

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement('span');
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        // to check with if statement how many issues the repository has. if more than 0 we will display a red cross and number of issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // append to container 
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};


// getUserRepos('elfsvet');
// getUserRepos('facebook');
// getUserRepos('microsoft');
userFormEl.addEventListener("submit", formSubmitHandler);