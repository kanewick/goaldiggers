/* eslint-disable no-debugger */
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
      return [];
    }

    if (!ratingsData.documents) {
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
    if (!ratingsData) {
      return [];
    }
    const ratingMap = this._mapPlayerRatings(ratingsData);
    if (!ratingMap) {
      return [];
    }

    return this.calculateRatingAverages(ratingMap);
  },

  calculateRatingAverages(ratingMap) {
    if (!ratingMap) {
      return [];
    }

    return Object.entries(ratingMap).map(
      ([ratedPlayerId, { totalScore, count }]) => ({
        ratedPlayerId,
        averageRating: totalScore / count,
      })
    );
  },

  /**
   * Finds a player object based on the rated player's ID.
   * @param {Array<Object>} users - An array of all user objects.
   * @param {String} ratedPlayerId - The ID of the rated player.
   * @returns {Object|null} The player object if found, otherwise null.
   */
  getUserByRatedPlayerId(users, ratedPlayerId) {
    return users.find((player) => player.$id === ratedPlayerId) || null;
  },

  /**
   * Finds the rating for a specific user based on their ID.
   * @param {Array<Object>} ratings - An array of rating objects.
   * @param {String} id - The ID of the player to find the rating for.
   * @returns {Object|undefined} The rating object for the specified user, or undefined if no rating is found.
   */
  getRatingByUserId(ratings, id) {
    if (!ratings) {
      return 0;
    }

    if (!id) {
      return 0;
    }
    return ratings.find((doc) => doc.ratedPlayerId === id);
  },

  // Helper function to filter ratings by logged-in user
  getLoggedInUsersRatings(ratings, loggedInId) {
    return ratings.filter((rating) => rating.ratedByPlayerId === loggedInId);
  },

  // Helper function to extract rated player IDs
  getRatedPlayerIds(loggedInUsersRatings) {
    return loggedInUsersRatings.map((rating) => rating.ratedPlayerId);
  },

  // Helper function to filter out rated players and logged-in user
  filterPlayers(users, ratedPlayerIds, loggedInId) {
    return users
      .filter((player) => !ratedPlayerIds.includes(player.$id))
      .filter((player) => player.accountId !== loggedInId);
  },

  // ASYNC FUNCTIONS
  async filterPlayersWithRating() {
    try {
      const loggedInId = await this.getLoggedInId();
      const users = await this.getUsers();
      const ratings = await this.getAllRatings();
      // Early returns for missing values
      if (
        !loggedInId ||
        !users ||
        !Array.isArray(users) ||
        !ratings ||
        !ratings.documents ||
        ratings.documents.length === 0
      ) {
        return [];
      }

      const loggedInUsersRatings = this.getLoggedInUsersRatings(
        ratings.documents,
        loggedInId
      );

      const ratedPlayerIds = this.getRatedPlayerIds(loggedInUsersRatings);

      // Filter players based on ratings and exclude the logged-in user
      const filteredPlayers = this.filterPlayers(
        users,
        ratedPlayerIds,
        loggedInId
      );

      return filteredPlayers;
    } catch (error) {
      console.error("Error in filterPlayersWithRating:", error);
      throw new Error("Failed to filter players with ratings.");
    }
  },

  async getLoggedInId() {
    const loggedInId = await playerService.getLoggedInId();
    return loggedInId;
  },

  async getUsers() {
    const users = await playerService.getAllUsers();
    return users;
  },

  // Helper function to get ratings
  /**
   * ASYNC Retrieves all ratings.
   * @returns {Promise<Object>} A promise that resolves to the object containing all ratings.
   */
  async getAllRatings() {
    return await appwrite.getAllRatings();
  },

  /**
   * ASYNC Creates a new rating for a player.
   * @param {Number} rating - The rating score.
   * @param {String} ratedPlayerId - The ID of the player being rated.
   * @returns {Promise<Object>} A promise that resolves to the created rating document.
   */
  async createRating(rating, ratedPlayerId) {
    if (!rating) throw new Error("Rating is undefined, cannot update.");
    if (!ratedPlayerId)
      throw new Error("ratedPlayerId is undefined, cannot update.");
    return await appwrite.createRating(
      await playerService.getLoggedInId(),
      rating,
      ratedPlayerId
    );
  },

  /**
   * ASYNC fetches all ratings for the logged-in user.
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
    if (!rating) throw new Error("Rating is undefined, cannot update.");
    if (!id) throw new Error("id is undefined, cannot update.");
    return await appwrite.updateRating(id, rating);
  },
};

export default ratingService;
