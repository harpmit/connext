async function testAsyncFunction() {
    let userDatabase = await loadProfiles();
    let user = grabCurrentUser(userDatabase)
    var userID = user.userID
    reactRender(<p className='header'>Friends</p>)
    for (var i = 0; i < user.closeFriends.length; i++){
        let friend = grabUser(userDatabase,user.closeFriends[i])
        reactRender(<SmallProfile src={friend.profileImageScr} name={friend.firstName+' '+friend.lastName} 
                     industry={friend.industry} school={friend.school} connectionScore={Math.round(friend.closenessScores[userID]*100)/100}/>)
    }
    reactRender(<p className='header'>Acquaintances</p>)
    for (var i = 0; i < user.farFriends.length; i++){
        let friend = grabUser(userDatabase,user.farFriends[i])
        reactRender(<SmallProfile src={friend.profileImageScr} name={friend.firstName+' '+friend.lastName} 
                     industry={friend.industry} school={friend.school} connectionScore={Math.round(friend.closenessScores[userID]*100)/100}/>)
    }
}

testAsyncFunction()