function lastUpdated() {
    
    var last_modified = document.lastModified ;
    document.querySelector("#Last-Updated").innerHTML = "Last Updated: " + last_modified ;
   
}

function displayCurrentYear() {
    var date = new Date() ;
    var year = date.getFullYear() ;

    document.getElementById("year").textContent = year
}
