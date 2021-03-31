////////////////////////////////////////
//Setup functions to load the database//
////////////////////////////////////////

// Use an async function to access the database like this:
// async function testAsyncFunction() {
//     let userDatabase = await loadProfiles();
//     //specific functionality for this fucntion
// }
// async function loadProfiles() {
//     let promise = d3.csv('/database/profiles.csv')
//     let frame = await promise

//     processedFrame = {}
//     let i=0;
//     for (i;i<frame.length;i+=1) {
//         let row = frame[i];
//         processedFrame[row['userID']] = {}
//         processedFrame[row['userID']]['firstName'] = row['firstName']
//         processedFrame[row['userID']]['lastName'] = row['lastName']
//         processedFrame[row['userID']]['industry'] = row['industry']
//         processedFrame[row['userID']]['school'] = row['school']
//         processedFrame[row['userID']]['profileImageScr'] = '/database/'+row['profileImageScr']

//         processedFrame[row['userID']]['closeFriends'] = JSON.parse(row['closeFriends'])
//         processedFrame[row['userID']]['farFriends'] = JSON.parse(row['farFriends'])
//         processedFrame[row['userID']]['closenessScores'] = JSON.parse(row['closenessScores'].replace(/'/g,"\""))
//     }
//     userDatabase = processedFrame;
//     return userDatabase
// }
async function loadProfiles() {
    let userDatabase = await fetch('database/profiles.json').then(response => response.json());
    for (var i in userDatabase) {
        userDatabase[i]['profileImageScr'] = 'database/'+userDatabase[i]['profileImageScr']
    }
    return userDatabase
}

////////////////////////////////////////////////
//Convenience functions to use within database//
////////////////////////////////////////////////

function grabUser(userDatabase,userID) {
    return {'userID':userID, 'firstName':userDatabase[userID]['firstName'],'lastName':userDatabase[userID]['lastName'],
            'industry':userDatabase[userID]['industry'],'school':userDatabase[userID]['school'],
            'profileImageScr':userDatabase[userID]['profileImageScr'],'closeFriends':userDatabase[userID]['closeFriends'],
            'farFriends':userDatabase[userID]['farFriends'],'closenessScores':userDatabase[userID]['closenessScores']}
}

function grabCurrentUser(userDatabase) {
    return grabUser(userDatabase,globalUserID)
}

function filterDatabase(userDatabase,key,value) {
    //returns a smaller database object where every entry of type "key" has value "value"
    //both key and value should be strings

    let newDatabase = {};
    for (userID in userDatabase) {
        if (userDatabase[userID][key] === value) {
            newDatabase[userID] = userDatabase[userID]
        }
    }
    return newDatabase
}

function __sortIndices(toSort) {
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort()
  toSort.reverse()
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = toSort[i][1];
  }
  return toSort
}

function sortByProximity(userDatabase,userID) {
    //returns database which is sorted by proximity to the user with userID specified
    // profiles are no longer indexed by their userID, but by their proximity to the given userID

    let result = [];
    let closenessScores = userDatabase[userID]['closenessScores'];
    let closenessArray = [];
    for (scoreID in closenessScores) {
        closenessArray.push(closenessScores[scoreID]);
    };

    let sortingIndices = __sortIndices(closenessArray);
    for (var i = 0; i < sortingIndices.length; i++) {
        if (typeof(userDatabase[sortingIndices[i]]) != 'undefined') {
            userDatabase[sortingIndices[i]].userID = sortingIndices[i]
            result.push(userDatabase[sortingIndices[i]])
        }
    }
    return result
}