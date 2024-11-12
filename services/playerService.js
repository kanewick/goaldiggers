import * as appwrite from "../lib/appwrite";

const playerService = {
  /**
   * Asynchronously fetches all user data.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
   */
  async getAllUsers() {
    return await appwrite.getAllUsers();
  },

  /**
   * Asynchronously fetch the user assigned to the ID.
   * @returns {Promise<Object>} A promise that resolves to an object of the user.
   */
  async getUser(id) {
    return await appwrite.getUser(id);
  },

  /**
   * Asynchronously fetches the logged-in user's ID.
   * @returns {Promise<String>} A promise that resolves to the ID of the currently logged-in user.
   */
  async getLoggedInId() {
    return await appwrite.getLoggedInId();
  },

  /**
   * ASYNC Create a new user in the system
   * @param {Object} form - The form data to create the user.
   * @returns {Promise<void>} Returns a promise that resolves once the user is created.
   */
  async createUser(form) {
    await appwrite.createUser(
      form.email,
      form.password,
      form.username,
      form.name,
      form.position,
      form.approved ?? false
    );
  },
};

export default playerService;
