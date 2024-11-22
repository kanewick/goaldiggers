// playersService.test.js
import playerService from "../playerService";
import * as appwrite from "../../lib/appwrite";
import { describe, it, expect, jest, afterEach } from "@jest/globals";

jest.mock("../../lib/appwrite"); // Mocking the appwrite library

describe("playerService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear any previous calls/mocks after each test
  });

  describe("getAllUsers", () => {
    it("should fetch all users", async () => {
      const mockUsers = [
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
      ];
      appwrite.getAllUsers.mockResolvedValue(mockUsers);

      const users = await playerService.getAllUsers();

      expect(appwrite.getAllUsers).toHaveBeenCalledTimes(1);
      expect(users).toEqual(mockUsers);
    });
  });

  describe("getUser", () => {
    it("should fetch a user by ID", async () => {
      const mockUser = { id: "1", name: "John Doe" };
      appwrite.getUser.mockResolvedValue(mockUser);

      const user = await playerService.getUser("1");

      expect(appwrite.getUser).toHaveBeenCalledWith("1");
      expect(user).toEqual(mockUser);
    });
  });

  describe("getLoggedInId", () => {
    it("should return the ID of the logged-in user", async () => {
      const mockId = "12345";
      appwrite.getLoggedInId.mockResolvedValue(mockId);

      const id = await playerService.getLoggedInId();

      expect(appwrite.getLoggedInId).toHaveBeenCalledTimes(1);
      expect(id).toBe(mockId);
    });
  });

  describe("createUser", () => {
    it("should create a new user with given form data", async () => {
      const form = {
        email: "test@example.com",
        password: "securePassword123",
        username: "testUser",
        name: "Test User",
        position: "Goalkeeper",
        approved: true,
      };

      await playerService.createUser(form);

      expect(appwrite.createUser).toHaveBeenCalledWith(
        form.email,
        form.password,
        form.username,
        form.name,
        form.position,
        form.approved
      );
    });

    it('should default "approved" to false if not provided', async () => {
      const form = {
        email: "test@example.com",
        password: "securePassword123",
        username: "testUser",
        name: "Test User",
        position: "Forward",
      };

      await playerService.createUser(form);

      expect(appwrite.createUser).toHaveBeenCalledWith(
        form.email,
        form.password,
        form.username,
        form.name,
        form.position,
        false // approved should default to false
      );
    });
  });
});
