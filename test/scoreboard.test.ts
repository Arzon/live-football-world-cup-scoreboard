import { IScoreboard } from "../src/interfaces/scoreboard";
import { Scoreboard } from "../src/scoreboard";

describe("Scoreboard", () => {
  let scoreboard: IScoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  test("should start a new match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    expect(scoreboard.getSummary()).toHaveLength(1);
  });

  test("should throw an error if the match is already in progress", () => {
    scoreboard.startMatch("Mexico", "Canada");
    expect(() => scoreboard.startMatch("Mexico", "Canada")).toThrow(
      "Match between these teams is already in progress."
    );
  });

  test("should successfully update the score for a match currently in progress", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore([["Mexico", 0],["Canada", 5]]);
    const summary = scoreboard.getSummary();
    expect(summary[0].homeTeamScore).toBe(0);
    expect(summary[0].awayTeamScore).toBe(5);
  });

  test("should throw an error if attempting to update a match that does not exist", () => {
    expect(() => scoreboard.updateScore([["Mexico",1],["Canada", 1]])).toThrow(
      "Match not found."
    );
  });

  test("should throw an error if attempting to delete a match that does not exist", () => {
    expect(() => scoreboard.finishMatch("Mexico", "Canada")).toThrow(
      "Match not found."
    );
  });

  test("should conclude an ongoing match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.finishMatch("Mexico", "Canada");
    expect(scoreboard.getSummary()).toHaveLength(0);
  });

  test("should provide matches ordered by total score and then by start time", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.startMatch("Germany", "France");
    scoreboard.startMatch("Uruguay", "Italy");
    scoreboard.startMatch("Argentina", "Australia");

    scoreboard.updateScore([["Mexico",0], ["Canada", 5]]);
    scoreboard.updateScore([["Spain",10], ["Brazil",2]]);
    scoreboard.updateScore([["Germany",2], ["France", 2]]);
    scoreboard.updateScore([["Uruguay",6], ["Italy", 6]]);
    scoreboard.updateScore([["Argentina",3], ["Australia", 1]]);

    const summary = scoreboard.getSummary();
    expect(summary.map(m => m.homeTeam)).toEqual(["Uruguay","Spain", "Mexico", "Argentina", "Germany"]);
  });
});
