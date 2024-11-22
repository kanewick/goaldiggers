/* eslint-disable no-undef */
import { describe, it, jest } from "@jest/globals";
import * as appwrite from "../appwrite"; // Your custom appwrite utility file
import { Databases } from "react-native-appwrite";

// Mock data for users
const usersMockData = {
  documents: [
    {
      $collectionId: "671e4538001ebaecbbe1",
      $createdAt: "2024-11-03T08:14:41.921+00:00",
      $databaseId: "671e451f00258c88224b",
      $id: "672730f10026d83ef1f6",
      accountId: "672730f00001ef09bae8",
      approved: true,
      assists: 2,
      avatar:
        "https://cloud.appwrite.io/v1/avatars/initials?name=knewick&project=671e43de003ae89071e9",
      clean_sheets: 10,
      email: "Kallennewick@hotmail.com",
      goals: 2,
      name: "Kallen newick",
      played: 10,
      position: "CB",
      username: "knewick",
    },
  ],
  total: 1,
};

jest.mock("react-native-appwrite", () => {
  const listDocumentsMock = jest.fn().mockResolvedValue(usersMockData);

  return {
    Client: jest.fn().mockImplementation(() => ({
      setEndpoint: jest.fn().mockReturnThis(),
      setProject: jest.fn().mockReturnThis(),
      setPlatform: jest.fn().mockReturnThis(),
    })),
    Account: jest.fn().mockImplementation(() => ({})),
    Avatars: jest.fn().mockImplementation(() => ({})),
    Databases: jest.fn().mockImplementation(() => ({
      listDocuments: listDocumentsMock, // Use the mock state here
    })),
  };
});

describe("getAllUsers", () => {
  it("should return sorted users mapped to User instances", async () => {
    // Create a new instance of Databases
    const databases = new Databases(); // This creates the mock instance

    const users = await appwrite.getAllUsers(); // Call your appwrite function

    // Add assertions to verify expected behavior
    expect(users).toHaveLength(1); // Check if one user is returned
    expect(users[0].username).toBe("knewick"); // Check if username is correct
    // Ensure listDocuments was called once
    expect(databases.listDocuments).toHaveBeenCalledTimes(1); // Check if listDocuments was called once
  });
});
