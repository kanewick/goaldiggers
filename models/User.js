/* eslint-disable no-unused-vars */
/**
 * @param {string} id
 * @param {string} username
 * @param {string} email
 */
export class User {
  constructor(player) {
    this.id = player.$id || ""; // Default to an empty string if no ID is provided
    this.username = player.username || ""; // Default to an empty string if no username is provided
    this.email = player.email || ""; // Default to an empty string if no email is provided
    this.avatar = player.avatar || ""; // Default to an empty string if no avatar is provided
    this.accountId = player.accountId || ""; // Default to an empty string if no accountId is provided
    this.name = player.name || ""; // Default to an empty string if no name is provided
    this.position = player.position || ""; // Default to an empty string if no position is provided
    this.goals = player.goals || 0; // Default to 0 if no goals are provided
    this.approved = player.approved !== undefined ? player.approved : false; // Default to false if not provided
    this.clean_sheets = player.clean_sheets || 0; // Default to 0 if no clean_sheets are provided
  }
}
