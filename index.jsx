async function testAsyncFunction() {
    let userDatabase = await loadProfiles();
    let user = grabCurrentUser(userDatabase)
    var userID = user.userID
    reactRender(<p className='header'>Profile</p>)
    reactRender(<LargeProfile src={user.profileImageScr} name={user.firstName+' '+user.lastName} industry={user.industry} school={user.school}/>)
    reactRender(<p className='header'>Top Connections</p>)


    let sortedConnections = sortByProximity(userDatabase,userID)
    let counter = 0
    for (let i = 0; counter < 5; i+= 1) {
        user = sortedConnections[i]
        if (userID != user.userID) {
            reactRender(<SmallProfile src={user.profileImageScr} name={user.firstName+' '+user.lastName} 
                         industry={user.industry} school={user.school} connectionScore={Math.round(user.closenessScores[userID]*100)/100}/>)
            counter += 1
        }
    }
}

testAsyncFunction()