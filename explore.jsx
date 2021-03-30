async function loadExploreResults() {
    clearPage()
    let userDatabase = await loadProfiles();
    let user = grabCurrentUser(userDatabase)
    var userID = user.userID 

    let filterKey = document.getElementById('exploreDropdown').value
    let subDatabase = filterDatabase(userDatabase,'industry',filterKey)
    subDatabase[userID] = user
    let sortedDatabase = sortByProximity(subDatabase,userID)

    for (var i = 0; i < sortedDatabase.length; i++){
        let friend = sortedDatabase[i]
        if (userID != friend.userID) {
            reactRender(<SmallProfile src={friend.profileImageScr} name={friend.firstName+' '+friend.lastName} 
                     industry={friend.industry} school={friend.school} connectionScore={Math.round(friend.closenessScores[userID]*100)/100}/>)
        }
    }
}

loadExploreResults()