import glob,os
import pandas as pd
import numpy as np

class Profile:
    def __init__(self,userID,firstName,lastName,industry,school,profileImageScr):
        self.userID = userID
        self.firstName = firstName
        self.lastName = lastName
        self.industry = industry
        self.school = school
        self.profileImageScr = profileImageScr

        self.closeFriends = []
        self.farFriends = []

        self.closenessScores = {}

    def addCloseFriend(self,profile):
        self.closeFriends.append(profile.userID)

    def addFarFriend(self,profile):
        self.farFriends.append(profile.userID)

    def addClosenessScores(self,dictionary):
        self.closenessScores = dictionary

    def summarize(self):
        return [self.userID,
                self.firstName,
                self.lastName,
                self.industry,
                self.school,
                self.profileImageScr,
                self.closeFriends,
                self.farFriends,
                self.closenessScores]

    def scoreCloseness(self,profile,areCloseFriends=10,areFarFriends=5,
                       sameSchool=5,sameCloseFriends=10,sameFarFriends=1,closeToFarFriends=3):
        #Takes another Profile object. Returns a score between 0-1 specifying the closeness between the profiles
        #A 1 indicates that these profiles are identical

        def scoreFriendLists(friendList1,friendList2):
            #Calculate similarity based on the Jaccard similarity coefficient, which ranges from 0 to 1
            friendList1,friendList2 = set(friendList1),set(friendList2)
            return float(len(friendList1.intersection(friendList2)))/float(len(friendList1.union(friendList2)))


        #Normalize the weights applied to going to the same school and having the same friends
        totalClosenessWeights = float(sameSchool+sameCloseFriends+sameFarFriends+closeToFarFriends+areFarFriends+areCloseFriends)
        sameSchool,sameCloseFriends,sameFarFriends,closeToFarFriends = (float(sameSchool)/totalClosenessWeights,
                                                    float(sameCloseFriends)/totalClosenessWeights,
                                                    float(sameFarFriends)/totalClosenessWeights,
                                                    float(closeToFarFriends)/totalClosenessWeights)
        areFarFriends,areCloseFriends = (float(areCloseFriends)/totalClosenessWeights,
                                         float(areFarFriends)/totalClosenessWeights)
       
        #Score the same school
        if self.school == profile.school:
            sameSchoolScore = 1.
        else:
            sameSchoolScore = 0.

        #Score if they are close or far friends
        if self.userID in profile.closeFriends+[profile.userID]:
            areCloseFriendScore = 1
        else:
            areCloseFriendScore = 0
        if self.userID in profile.farFriends+[profile.userID]:
            areFarFriendScore = 1
        else:
            areFarFriendScore = 0

        #Score closeness of friends
        sameCloseFriendScore = scoreFriendLists(self.closeFriends,profile.closeFriends)
        sameFarFriendScore = scoreFriendLists(self.farFriends,profile.farFriends)
        closeToFarFriendScore = scoreFriendLists(self.closeFriends+self.farFriends,profile.closeFriends+profile.farFriends)

        return (sameSchoolScore*sameSchool +
                sameCloseFriendScore*sameCloseFriends +
                sameFarFriendScore*sameFarFriends +
                closeToFarFriendScore*closeToFarFriends +
                areFarFriends*areFarFriendScore + 
                areCloseFriends*areCloseFriendScore)

def clean_up_series(series):
    lst = series.tolist()
    lst = [i for i in lst if type(i) == str]
    return lst

def randomDraw(lst):
    return lst[np.random.randint(len(lst))]

category_df = pd.read_csv('categories.csv')

firstNames = clean_up_series(category_df['first names']) #100 first names defines the number of profiles
lastNames = clean_up_series(category_df['last names'])
industries = clean_up_series(category_df['industries'])
schools = clean_up_series(category_df['schools'])
profileImageSrcs = glob.glob('profileImages/*')
profileImageSrcs = [i for i in profileImageSrcs if not '_thumbnail' in i]
profileImageSrcs = (profileImageSrcs*(int(len(firstNames)/len(profileImageSrcs))+1))[:len(firstNames)]

#Generate 100 random profiles
profiles = []
for userID,name,profileImageSrc in zip(range(len(firstNames)),firstNames,profileImageSrcs):
    profiles.append(Profile(userID,name,randomDraw(lastNames),randomDraw(industries),randomDraw(schools),profileImageSrc))

#Randomly assign close and far friends
for profile in profiles:
    while len(profile.closeFriends) < 5:
        potentialFriends = [i for i in profiles if len(i.closeFriends) < 5]
        potentialFriends = [i for i in potentialFriends if profile.userID not in i.closeFriends]
        potentialFriends = [i for i in potentialFriends if not i.userID == profile.userID]

        #By friending those without friends first, we prevent anyone from being alone at the end
        minNumberOfFriends = min([len(i.closeFriends) for i in potentialFriends])
        potentialFriends = [i for i in potentialFriends if len(i.closeFriends) == minNumberOfFriends]

        newFriend = randomDraw(potentialFriends)
        profile.addCloseFriend(newFriend)
        newFriend.addCloseFriend(profile)
    while len(profile.farFriends) < 10:
        potentialFriends = [i for i in profiles if len(i.farFriends) < 10]
        potentialFriends = [i for i in potentialFriends if profile.userID not in i.farFriends]
        potentialFriends = [i for i in potentialFriends if not i.userID == profile.userID]

        #By friending those without friends first, we prevent anyone from being alone at the end
        minNumberOfFriends = min([len(i.farFriends) for i in potentialFriends])
        potentialFriends = [i for i in potentialFriends if len(i.farFriends) == minNumberOfFriends]

        newFriend = randomDraw(potentialFriends)
        profile.addFarFriend(newFriend)
        newFriend.addFarFriend(profile)


#############################
#Calculate Similarity Scores#
#############################
similarityScores = []
for profile1 in profiles:
    tmpSimilarityScores = []
    for profile2 in profiles:
        tmpSimilarityScores.append(profile1.scoreCloseness(profile2))
    similarityScores.append(tmpSimilarityScores)

# Cast as dataframe. index has to be strings for JSON compatibility
similarityScores = pd.DataFrame(similarityScores,
                                index=[str(i) for i in np.arange(0,len(similarityScores))],
                                columns=np.arange(0,len(similarityScores)))

for counter,profile in enumerate(profiles):
    similarities = similarityScores[counter].to_dict()
    profile.addClosenessScores(similarities)


############################
##Store Simulated Data Set##
############################
results = []
for profile in profiles:
    results.append(profile.summarize())
results = pd.DataFrame(results,
                       columns = ['userID',
                                  'firstName',
                                  'lastName',
                                  'industry',
                                  'school',
                                  'profileImageScr',
                                  'closeFriends',
                                  'farFriends',
                                  'closenessScores'])
results.to_csv('profiles.csv',index=False)

results.set_index('userID')
results = results.T
JSON = results.to_json()
if os.path.exists('profiles.json'):
    os.remove('profiles.json')
fil = open('profiles.json','w')
fil.write(JSON)
fil.close()