import * as appwrite from "../lib/appwrite";
import playerService from "./playerService";

const ratingService = {
  /**
   * Maps an array of ratings to a player, calculating the total score and count of ratings per player.
   * @param {Array<Object>} ratingsData - An array of rating objects.
   * @returns {Object} A map where keys are player IDs and values are objects containing total score and rating count.
   */
  _mapPlayerRatings(ratingsData) {
    const ratingMap = {};

    if (!ratingsData) {
      console.warn(
        "RatingService._mapPlayerRatings.ratingsData is undefined",
        ratingsData
      );
      return [];
    }

    if (!ratingsData.documents) {
      console.warn(
        "RatingService._mapPlayerRatings.ratingsData.documents is undefined",
        ratingsData.documents
      );
      return [];
    }

    ratingsData.documents.forEach((rating) => {
      const { ratedPlayerId, rating: ratingScore } = rating;

      if (!ratingMap[ratedPlayerId]) {
        ratingMap[ratedPlayerId] = { totalScore: 0, count: 0 };
      }

      ratingMap[ratedPlayerId].totalScore += ratingScore;
      ratingMap[ratedPlayerId].count += 1;
    });

    return ratingMap;
  },

  /**
   * Calculates the average rating for each player based on their ratings.
   * @param {Array<Object>} ratingsData - An array of rating objects.
   * @returns {Array<Object>} An array of objects containing the rated player's ID and their average rating.
   */
  calculateMappedPlayerRatingsAverages(ratingsData) {
    console.log("ratingsData", ratingsData);
    const ratingMap = this._mapPlayerRatings(ratingsData);

    if (!ratingMap) {
      console.warn(
        "RatingService.calculateMappedPlayerRatingsAverages.ratingMap is not defined!",
        ratingMap
      );
      return {};
    }

    const mappedTotalAverages = Object.entries(ratingMap).map(
      ([ratedPlayerId, { totalScore, count }]) => ({
        ratedPlayerId,
        averageRating: totalScore / count,
      })
    );

    console.log("mappedTotalAverages", mappedTotalAverages);

    return mappedTotalAverages;
  },

  /**
   * Finds a player object based on the rated player's ID.
   * @param {Array<Object>} users - An array of all user objects.
   * @param {String} ratedPlayerId - The ID of the rated player.
   * @returns {Object|null} The player object if found, otherwise null.
   */
  getPlayerFromRatedPlayerId(users, ratedPlayerId) {
    return users.find((player) => player.$id === ratedPlayerId) || null;
  },

  /**
   * Finds the rating for a specific user based on their ID.
   * @param {Array<Object>} ratings - An array of rating objects.
   * @param {String} id - The ID of the player to find the rating for.
   * @returns {Object|undefined} The rating object for the specified user, or undefined if no rating is found.
   */
  getRatingByUserId(ratings, id) {
    return ratings.find((doc) => doc.ratedPlayerId === id);
  },

  // ASYNC FUNCTIONS

  /**
   * Finds players who have not been rated yet by the logged-in user.
   * @returns {Array<Object>} A filtered array of players who do not have ratings assigned.
   */
  async filterPlayersWithRating() {
    const loggedInId = await playerService.getLoggedInId();
    const users = await playerService.getAllUsers();
    const ratings = await this.getAllRatings();

    // Get all ratings made by the logged-in user
    const loggedInUsersRatings = ratings.filter((rating) => {
      return rating.ratedByPlayerId === loggedInId;
    });

    // Extract the rated player IDs
    const ratedPlayerIds = loggedInUsersRatings.map(
      (rating) => rating.ratedPlayerId
    );

    // Filter out players who have already been rated
    const filteredPlayers = users.filter((player) => {
      return !ratedPlayerIds.includes(player.$id);
    });

    // Exclude the logged-in user from the list
    const filteredPlayersWithoutUs = filteredPlayers.filter((player) => {
      return player.accountId !== loggedInId;
    });

    return filteredPlayersWithoutUs;
  },

  /**
   * Retrieves all ratings.
   * @returns {Promise<Object>} A promise that resolves to the object containing all ratings.
   */
  async getAllRatings() {
    return await appwrite.getAllRatings();
  },

  /**
   * Creates a new rating for a player.
   * @param {Number} rating - The rating score.
   * @param {String} ratedPlayerId - The ID of the player being rated.
   * @returns {Promise<Object>} A promise that resolves to the created rating document.
   */
  async createRating(rating, ratedPlayerId) {
    return await appwrite.createRating(
      await playerService.getLoggedInId(),
      rating,
      ratedPlayerId
    );
  },

  /**
   * Asynchronously fetches all ratings for the logged-in user.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of rating objects for the logged-in user.
   */
  async getAllRatingsForLoggedInUser() {
    return await appwrite.getAllRatingsForLoggedInUser();
  },

  /**
   * ASYNC Update the rating for a player
   * @param {String} id - The ID of the rating to update.
   * @param {Number} rating - The new rating value to be assigned.
   * @returns {Object} Returns the updated rating data.
   */
  async updateRating(id, rating) {
    return await appwrite.updateRating(id, rating);
  },
};

export default ratingService;
