/* eslint-disable no-debugger */
import ratingService from "../ratingsService";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import * as appwrite from "../../lib/appwrite";
import playerService from "../playerService";

jest.mock("../../lib/appwrite");
jest.mock("../playerService");

const mockRatingsData = {
  documents: [
    {
      $id: "UNIQUEID",
      ratedByPlayerId: "2",
      ratedPlayerId: "1",
      rating: 5,
    },
    {
      $id: "UNIQUEID",
      ratedByPlayerId: "4",
      ratedPlayerId: "2",
      rating: 2,
    },
    {
      $id: "UNIQUEID",
      ratedByPlayerId: "1",
      ratedPlayerId: "2",
      rating: 3,
    },
    {
      $id: "UNIQUEID",
      ratedByPlayerId: "2",
      ratedPlayerId: "4",
      rating: 1.5,
    },
  ],
  total: 4,
};
const mockLoggedInId = "2";

const mockUsersData = [
  {
    $id: "1",
    accountId: "67274005003d0f7ff1f0",
    approved: true,
    assists: 0,
    clean_sheets: 3,
    email: "aphillips@goaldiggers.com",
    goals: 0,
    name: "Adam Phillips",
    played: 0,
    position: "CB",
    username: "aphillips",
  },
  {
    $id: "2",
    accountId: "67274005003d0f7ff1f0",
    approved: true,
    assists: 0,
    clean_sheets: 3,
    email: "knewick@goaldiggers.com",
    goals: 0,
    name: "Kallen Newick",
    played: 0,
    position: "CB",
    username: "knewick",
  },
];

describe("_mapPlayerRatings", () => {
  it("should return an empty array if ratingsData is undefined", () => {
    const result = ratingService._mapPlayerRatings(undefined);
    expect(result).toEqual([]);
  });

  it("should return an empty array if ratingsData.documents is undefined", () => {
    const result = ratingService._mapPlayerRatings({});
    expect(result).toEqual([]);
  });

  it("should map ratings to players correctly", () => {
    const ratingsData = {
      documents: [
        { ratedPlayerId: "1", rating: 5 },
        { ratedPlayerId: "1", rating: 3 },
        { ratedPlayerId: "2", rating: 4 },
      ],
    };
    const result = ratingService._mapPlayerRatings(ratingsData);
    expect(result).toEqual({
      1: { totalScore: 8, count: 2 },
      2: { totalScore: 4, count: 1 },
    });
  });
});

describe("calculateMappedPlayerRatingsAverages", () => {
  it("should calculate average ratings per player", () => {
    const ratingsData = {
      documents: [
        {
          $id: "672d9c7e002a639dd4f1",
          ratedByPlayerId: "672730f00001ef09bae8",
          ratedPlayerId: "6727400600315b20caa2",
          rating: 5,
        },
        {
          $id: "672d9c7e002a639dd4f2",
          ratedByPlayerId: "672730f00001ef09bae9",
          ratedPlayerId: "6727400600315b20caa2",
          rating: 2.5,
        },
      ],
    };

    const result =
      ratingService.calculateMappedPlayerRatingsAverages(ratingsData);
    expect(result).toEqual([
      { ratedPlayerId: "6727400600315b20caa2", averageRating: 3.75 },
    ]);
  });

  it("should return an empty array if _mapPlayerRatings doesnt return anything", () => {
    const ratingsData = {
      documents: [
        {
          $id: "672d9c7e002a639dd4f1",
          ratedByPlayerId: "672730f00001ef09bae8",
          ratedPlayerId: "6727400600315b20caa2",
          rating: 5,
        },
        {
          $id: "672d9c7e002a639dd4f2",
          ratedByPlayerId: "672730f00001ef09bae9",
          ratedPlayerId: "6727400600315b20caa2",
          rating: 2.5,
        },
      ],
    };

    jest.spyOn(ratingService, "_mapPlayerRatings").mockReturnValue({});

    const result =
      ratingService.calculateMappedPlayerRatingsAverages(ratingsData);
    expect(result).toEqual([]);
  });

  it("should return an empty array when no ratingsData is provided", () => {
    const result = ratingService.calculateMappedPlayerRatingsAverages();

    expect(result).toEqual([]);
  });
});

describe("calculateRatingAverages", () => {
  it("should calculate rating averages correctly", () => {
    const ratingMap = {
      1: { totalScore: 8, count: 2 },
      2: { totalScore: 4, count: 1 },
    };
    const result = ratingService.calculateRatingAverages(ratingMap);
    expect(result).toEqual([
      { ratedPlayerId: "1", averageRating: 4 },
      { ratedPlayerId: "2", averageRating: 4 },
    ]);
  });

  it("should return an empty array if no ratingMap is passed through", () => {
    const result = ratingService.calculateRatingAverages({});
    expect(result).toEqual([]);
  });
});

describe("getUserByRatedPlayerId", () => {
  const users = [
    {
      $id: "1",
      name: "kal",
    },
    {
      $id: "2",
      name: "ska",
    },
    {
      $id: "3",
      name: "bob",
    },
  ];

  it("should return the user object when a user with the ratedPlayerId exists", () => {
    const ratedPlayerId = "1";
    const user = ratingService.getUserByRatedPlayerId(users, ratedPlayerId);
    expect(user).toEqual({
      $id: "1",
      name: "kal",
    });
  });

  it("should return null when no user with the ratedPlayerId exists", () => {
    const ratedPlayerId = "5";
    const user = ratingService.getUserByRatedPlayerId(users, ratedPlayerId);
    expect(user).toBeNull();
  });

  it("should return null when the users array is empty", () => {
    const ratedPlayerId = "user1";
    const user = ratingService.getUserByRatedPlayerId([], ratedPlayerId);
    expect(user).toBeNull();
  });
});

describe("getRatingByUserId", () => {
  it("should return the rating if the user ID matches", () => {
    const ratings = [{ ratedPlayerId: "1" }];
    const result = ratingService.getRatingByUserId(ratings, "1");
    expect(result).toEqual({ ratedPlayerId: "1" });
  });

  it("should return undefined if the user ID does not match", () => {
    const ratings = [{ ratedPlayerId: "1" }];
    const result = ratingService.getRatingByUserId(ratings, "2");
    expect(result).toBeUndefined();
  });

  it("should return a 0 if ratings is undefined", () => {
    const result = ratingService.getRatingByUserId(undefined, "1");
    expect(result).toBe(0);
  });

  it("should return a 0 if id is undefined", () => {
    const result = ratingService.getRatingByUserId([], undefined);
    expect(result).toBe(0);
  });
});

describe("getLoggedInUsersRatings", () => {
  it("should return only the ratings created by the logged-in user", () => {
    // Act
    const result = ratingService.getLoggedInUsersRatings(
      mockRatingsData.documents,
      mockLoggedInId
    );

    expect(result).toHaveLength(2);
    expect(result).toStrictEqual([
      { $id: "UNIQUEID", ratedByPlayerId: "2", ratedPlayerId: "1", rating: 5 },
      {
        $id: "UNIQUEID",
        ratedByPlayerId: "2",
        ratedPlayerId: "4",
        rating: 1.5,
      },
    ]);
  });
});

describe("getRatedPlayerIds", () => {
  it("should return the ratedPlayerIds", () => {
    const loggedInUserRatings = ratingService.getLoggedInUsersRatings(
      mockRatingsData.documents,
      mockLoggedInId
    );

    const ratedPlayerIds = ratingService.getRatedPlayerIds(loggedInUserRatings);

    expect(ratedPlayerIds).toStrictEqual(["1", "4"]);
    console.log(ratedPlayerIds);
  });
});

describe("filterPlayers", () => {
  it("should return the filteredPlayers", () => {
    const loggedInUserRatings = ratingService.getLoggedInUsersRatings(
      mockRatingsData.documents,
      mockLoggedInId
    );

    const ratedPlayerIds = ratingService.getRatedPlayerIds(loggedInUserRatings);
    expect(ratedPlayerIds).toStrictEqual(["1", "4"]);

    const filteredUsers = ratingService.filterPlayers(
      mockUsersData,
      ratedPlayerIds,
      mockLoggedInId
    );

    expect(filteredUsers[0]).toStrictEqual(mockUsersData[1]);
  });
});

describe("filterPlayersWithRating", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array if the loggedInId is not found", async () => {
    jest.spyOn(ratingService, "getLoggedInId").mockReturnValue(null);

    const result = await ratingService.filterPlayersWithRating();

    expect(result).toStrictEqual([]);
  });

  it("should return an empty array if the users are not found", async () => {
    jest.spyOn(ratingService, "getUsers").mockReturnValue(null);

    const result = await ratingService.filterPlayersWithRating();

    expect(result).toStrictEqual([]);
  });

  it("should return an empty array if ratings are not found", async () => {
    jest.spyOn(ratingService, "getAllRatings").mockReturnValue(null);

    const result = await ratingService.filterPlayersWithRating();

    expect(result).toStrictEqual([]);
  });
});

describe("updateRating", () => {
  it("should update rating successfully with valid parameters", async () => {
    const id = "123";
    const rating = 4.5;

    // Mock the appwrite updateRating to return a successful response
    appwrite.updateRating.mockResolvedValue({ success: true });

    const result = await ratingService.updateRating(id, rating);

    // Assert that the updateRating method was called with correct parameters
    expect(appwrite.updateRating).toHaveBeenCalledWith(id, rating);

    // Check that the result is the expected value
    expect(result).toEqual({ success: true });
  });

  it("should throw an error when rating is undefined", async () => {
    const id = "123";

    await expect(ratingService.updateRating(id, undefined)).rejects.toThrow(
      "Rating is undefined, cannot update."
    );
  });

  it("should throw an error when id is undefined", async () => {
    const rating = 4.5;

    await expect(ratingService.updateRating(undefined, rating)).rejects.toThrow(
      "id is undefined, cannot update."
    );
  });

  it("should throw an error when appwrite.updateRating throws an error", async () => {
    const id = "123";
    const rating = 4.5;

    // Mock appwrite to throw an error
    appwrite.updateRating.mockRejectedValue(new Error("Something went wrong"));

    // Expect the error to be thrown
    await expect(ratingService.updateRating(id, rating)).rejects.toThrow(
      "Something went wrong"
    );
  });
});

describe("createRating", () => {
  it("should call appwrite.createRating", async () => {
    jest.spyOn(appwrite, "createRating");
    await ratingService.createRating(1, "1");
    expect(appwrite.createRating).toHaveBeenCalled();
  });

  it("should create a rating successfully with valid parameters", async () => {
    const rating = 4.5;
    const ratedPlayerId = "456";
    const loggedInId = "123";

    // Mock playerService.getLoggedInId to return a valid logged-in user ID
    playerService.getLoggedInId.mockResolvedValue(loggedInId);

    // Mock appwrite.createRating to return a successful response
    appwrite.createRating.mockResolvedValue({ success: true });

    const result = await ratingService.createRating(rating, ratedPlayerId);

    // Assert that the createRating method was called with the correct parameters
    expect(appwrite.createRating).toHaveBeenCalledWith(
      loggedInId,
      rating,
      ratedPlayerId
    );

    // Check that the result is the expected value
    expect(result).toEqual({ success: true });
  });

  it("should throw an error when rating is undefined", async () => {
    const ratedPlayerId = "456";

    await expect(
      ratingService.createRating(undefined, ratedPlayerId)
    ).rejects.toThrow("Rating is undefined, cannot update.");
  });

  it("should throw an error when ratedPlayerId is undefined", async () => {
    const rating = 4.5;

    await expect(ratingService.createRating(rating, undefined)).rejects.toThrow(
      "ratedPlayerId is undefined, cannot update."
    );
  });

  it("should throw an error when appwrite.createRating throws an error", async () => {
    const rating = 4.5;
    const ratedPlayerId = "456";
    const loggedInId = "123";

    // Mock playerService.getLoggedInId to return a valid logged-in user ID
    playerService.getLoggedInId.mockResolvedValue(loggedInId);

    // Mock appwrite.createRating to throw an error
    appwrite.createRating.mockRejectedValue(new Error("Something went wrong"));

    // Expect the error to be thrown
    await expect(
      ratingService.createRating(rating, ratedPlayerId)
    ).rejects.toThrow("Something went wrong");
  });
});
