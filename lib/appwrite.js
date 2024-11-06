import {
  Client,
  Account,
  ID,
  Databases,
  Avatars,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.kalco.goaldiggers",
  projectId: "671e43de003ae89071e9",
  databaseId: "671e451f00258c88224b",
  userCollectionId: "671e4538001ebaecbbe1",
  ratingsCollectionId: "6727450200185576e188",
  storageId: "671e549a001a1e3f7910",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createAndSignInUser = async (
  email,
  password,
  username,
  name,
  position,
  approved
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
        name,
        position,
        approved,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createUser = async (
  email,
  password,
  username,
  name,
  position,
  approved
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    try {
      const avatarUrl = avatars.getInitials(username);

      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          username,
          avatar: avatarUrl,
          name: name,
          position: position,
          approved: approved,
        }
      );

      return newUser;
    } catch (error) {
      await account.deleteIdentity(newAccount.$id);
      throw Error(error);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves the current user from the Appwrite database based on the logged-in account.
 *
 * @async
 * @function getCurrentUser
 * @returns {Promise<Object>} The current user document if found.
 * @throws {Error} Throws an error if the account or user document cannot be retrieved.
 */
export const getCurrentUser = async () => {
  try {
    // Get loggedin user
    const loggedInUser = await account.get();

    if (!loggedInUser) throw Error;

    // Get User document based of logged in user
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", loggedInUser.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error();
  }
};

export const getLoggedInId = async () => {
  const loggedInUser = await account.get();

  if (!loggedInUser) throw Error;

  return loggedInUser.$id;
};

export async function getAllUsers() {
  try {
    const players = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );

    return players.documents.sort((a, b) =>
      a.username.localeCompare(b.username)
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUser(id) {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      id,
      []
    );
    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch player data");
  }
}

export async function updateUser(userId, accountId, form, statForm) {
  try {
    console.log(form);
    console.log(statForm);
    const currentUser = await account.get();

    if (currentUser.$id !== accountId) {
      console.log("user cannot be updated");
      throw Error("You cannot update another user");
    }

    await account.updateName(form.username);

    const updateData = {
      ...form,
      ...statForm,
    };

    // Update Player
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      updateData
    );

    return res;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export const createRating = async (ratedByPlayerId, rating, ratedPlayerId) => {
  try {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    console.log(ratedByPlayerId);
    console.log(rating);
    console.log(ratedPlayerId);
    const newRating = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ratingsCollectionId,
      ID.unique(),
      {
        ratedPlayerId: ratedPlayerId,
        ratedByPlayerId,
        rating,
        timestamp: formattedDate,
      }
    );

    return newRating;
  } catch (error) {
    throw Error(error);
  }
};

export async function getAllRatings() {
  try {
    const ratings = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ratingsCollectionId
    );

    return ratings;
  } catch (error) {
    throw new Error(error);
  }
}
