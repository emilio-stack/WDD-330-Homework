// Just some helper functions to make this class easier. 
import { qs, writeToLS, readFromLS, bindTouch } from "./helpers.js";

// A variable to hold the logs data while the webpage is live.
let liveLogs = null;

// A variable to hold the destination list of logs
let journal = document.getElementById('log-list')

/**********************************************************
 * ADD NEW LOG
 * A function to add a new log to the list of journal logs
 **********************************************************/
function addNewLog() {
    console.log('addNewLog')
    // Display the form
    let form = document.getElementById('input-form-noShow');
    form.id = "input-form-show";

    // Read the form on button click
    bindTouch('#create-log', createLog);
}

/**********************************************************
 * CREATE LOG
 * A function to create a new log on the page
 **********************************************************/
function createLog() {
    console.log('createLog')
    // Create a log object & read the form
    const newLog = {
        id: new Date(), 
        title : document.getElementById('title-input').value,
        date : document.getElementById('date-input').value,
        time : document.getElementById('time-input').value,
        fish : document.getElementById('fish-input').value,
        bait : document.getElementById('bait-input').value,
        address : document.getElementById('address-input').value,
        notes : document.getElementById('notes-input').value
    }

    // Clear the form
    document.getElementById('title-input').value = "";
    document.getElementById('date-input').value = "";
    document.getElementById('time-input').value = "";
    document.getElementById('fish-input').value = "";
    document.getElementById('bait-input').value = "";
    document.getElementById('address-input').value = "";
    document.getElementById('notes-input').value = "";

    // hide the form
    let form = document.getElementById('input-form-show');
    form.id = "input-form-noShow";

    // Save the journal
    liveLogs.push(newLog)
    writeToLS('journalKey', liveLogs);

    // Now display the log
    renderLogs(getlogs('journalKey'), journal);
}

/*****************************************************
* A function to get the current log journal
*****************************************************/ 
function getlogs(key) {
    console.log('getLogs')
    // First check if there are no live tasks.
    if (liveLogs === null) {
      // If so, we need to go read the list from the data store
      liveLogs = readFromLS('journalKey') || [];
    }
  
    return liveLogs ;
}

/*****************************************************
* A function to display the current logs
****************************************************/ 
function renderLogs(logList, listElement) { 
    console.log('renderLogs')  

    // Clear the list of logs 
    listElement.innerHTML = ""

    console.log(logList);
    logList.forEach(log => {

        // Create the new log elements
        let logDiv = document.createElement('div');
        let logTitle = document.createElement('h3');
        let logDate = document.createElement('p');
        let logTime = document.createElement('p');
        let fishType = document.createElement('h4');
        let baitUsed = document.createElement('p');
        let place = document.createElement('p');
        let comments = document.createElement('p');
        const li = document.createElement("li");
        let deleteButton = null;
        li.innerHTML = `<button>X</button>`;

        // Assign the new log elements the input values
        logTitle.textContent = log.title;
        logDate.textContent = log.date;
        logTime.textContent = log.time;
        fishType.textContent = log.fish;
        baitUsed.textContent = log.bait;
        place.textContent = log.address;
        comments.textContent = log.notes;
        

        // Assign the elements to the new log div
        logDiv.appendChild(logTitle);
        logDiv.appendChild(logDate);
        logDiv.appendChild(logTime);
        logDiv.appendChild(fishType);
        logDiv.appendChild(baitUsed);
        logDiv.appendChild(place);
        logDiv.appendChild(comments);
        logDiv.appendChild(li);

        // Listen for a change in the delete button.
        deleteButton = li.childNodes[0];
        deleteButton.addEventListener("click", () => {

            // If the delete button is clicked, remove the log.
            deleteLog(log.id);
        });

        // Append the log div to the log-list
        journal.appendChild(logDiv);
    });
}

/**********************************************************
 * DELETE LOG
 * A function to delete a log from the journal of logs
 **********************************************************/
 function deleteLog(id) {
    console.log('delete')
    liveLogs.forEach(log => {
        if (log.id === id)
        {
            console.log('true!')
            liveLogs.pop(log);
        }
    })
    writeToLS('journalKey', liveLogs);
    renderLogs(getlogs('journalKey'), journal);
}

/**********************************************************
 * SEARCH FISH SPECIES
 * A function to search for details and info on a specific
 * fish species
 **********************************************************/
async function searchFishSpecies() 
{
    // First get the species from the input
    const species = document.getElementById('fish-species-input').value;

    // Next make build the api call url
    const baseURL = 'https://www.fishwatch.gov/api/species';
    const url = baseURL ;

    // Now make the call to the url
    let response = await fetch(url, {mode: 'no-cors'})
    let data = response.json()
    data.then(json => { console.log(json)});
}

// Read the existing logs from local storage and display the logs 
renderLogs(getlogs('journalKey'), journal);

// Listen for a new log
bindTouch('#new-log-button', addNewLog);

// Listen for a fish species search
bindTouch('#fish-species-search', searchFishSpecies);
