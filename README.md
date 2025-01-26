# Live Football World Cup Scoreboard
A simple library that manages live football scores for all ongoing World Cup matches. It is implemented as a Node.js TypeScript/JavaScript library, designed primarily to run in a Node environment or be bundled by a build tool. While Node.js (server-side) usage is its main focus, it can also be transpiled for use in front-end frameworks like React or Vue, providing flexibility for a wide range of applications.

The Live Football World Cup Scoreboard library offers the following operation:
1. Start a New Match
    * Add a new match to the scoreboard with an initial score of 0–0.
    * Requires the following parameters:
        * Home team: The name of the home team.
        * Away team: The name of the away team.
2. Update Score
    * Update the score of an ongoing match with a pair of absolute values:
        * Home team score: The updated score for the home team.
        * Away team score: The updated score for the away team.
3. Finish Match
    * Remove a currently ongoing match from the scoreboard, marking it as finished.
4. Get Match Summary
    * Retrieve a summary of all ongoing matches, ordered by:
        1. Total score: Matches with the highest combined score (home + away) are listed first.
        2. Most recently started match: If two matches have the same total score, the match that started more recently is listed first.

## Features
* Matches are uniquely identified by their team names.
* No duplicate matches are allowed.
* In-Memory Store: Keeps track of all ongoing matches in an array (no external DB required).
* TypeScript: Provides static typing and compile-time checks.
* Easy to Integrate: Just import the Scoreboard class and start adding/updating matches.

## Installation

- It is better to use Node.js (v14.0.0 or higher).
- If the library is published, the following step is sufficient for installation:
```bash
    npm install live-football-world-cup-scoreboard
```

- To use the library locally, follow these steps:

Step 1: Build the Library
```bash
# Clone/download the repository
git clone https://github.com/Arzon/live-football-world-cup-scoreboard
cd live-football-world-cup-scoreboard

# Install npm 
npm install

# Run tests
npm test

# Build the library
npm run build
```

Step 2: Install the Library from a Local Folder.
In the application project, run: 
```bash
npm install --save ../path/to/live-football-world-cup-scoreboard
```

N.B: `npm link` can also be used to use the library locally. Check the [official documentation](https://docs.npmjs.com/cli/v8/commands/npm-link) for detailed instructions on how to use it.

## Usage
Here’s a minimal example of using the Scoreboard class:
```
import { Scoreboard } from "live-football-world-cup-scoreboard";

// create a Scoreboard Object
const scoreboard = new Scoreboard();

// Start a new match
scoreboard.startMatch("Mexico", "Canada");

// Update the scoreboard
scoreboard.updateScore([["Mexico", 3], ["Canada", 4]]);

// Get the summary
const summary = scoreboard.getSummary();
console.log(summary);

// Finish the match
scoreboard.finishMatch("Mexico", "Canada");
```

## Methods

1. ``` public startMatch(homeTeam: string, awayTeam: string): void ```
- Starts a new match with initial scores of 0–0.<br>
- Throws an error if a match between the specified teams is already in progress.

2. ``` public updateScore(scoreUpdate: ScoreUpdate): void ```
- Updates the match's home and away scores with an absolute pair of values: `ScoreUpdate: [[homeTeam, homeTeamScore], [awayTeam, awayTeamScore]].`
- Throws an error if the match is not found.

3. ``` public finishMatch(homeTeam: string, awayTeam: string): void ```
- Removes a currently ongoing match from the scoreboard.
- Throws an error if the specified match is not found.

4. ``` public getSummary(): IMatch[] ``` <br>
Returns an array of all ongoing matches, sorted as follows:
    - Descending by total score (homeScore + awayScore).
    - In case of a tie, the most recently started match appears first.

## Example Output
For example, if following matches are started in the specified order and their scores respectively updated:
1. Mexico 0 – Canada 5
2. Spain 10 – Brazil 2
3. Germany 2 – France 2
4. Uruguay 6 – Italy 6
5. Argentina 3 – Australia 1

The summary should be as follows:
1. Uruguay 6 – Italy 6
2. Spain 10 – Brazil 2
3. Mexico 0 – Canada 5
4. Argentina 3 – Australia 1
5. Germany 2 – France 2

## Assumptions and Notes
This library assumes that each match is uniquely identified by the combination of homeTeam and awayTeam. It also expects that scores provided are always non-negative integers. Matches are considered ongoing until explicitly finished using the finishMatch method. These assumptions simplify the logic and ensure clarity in identifying and managing matches.<br><br>
To keep the implementation lightweight and simple, the library uses an in-memory array to store match data. This approach avoids the complexity of persistent storage, making it easier to run and test the library. Sorting is implemented as per the requirements: matches are ordered by total score in descending order, and in the case of ties, the most recently started match is listed first. No additional sorting criteria were added, keeping the solution aligned with the problem statement.<br><br>
However, there are some limitations to this implementation. The library does not validate input data, such as valid team names. It also does not handle cases where the same teams are playing in reverse roles (e.g., A vs B and B vs A) uniquely. Additionally, the in-memory storage means that all match data is lost when the application is restarted, as there is no persistence mechanism.<br><br>
In the future, several enhancements could be made to improve the library. Persistent storage, such as a database, could be integrated to ensure data durability. Unique match identifiers could be introduced to avoid relying solely on team names for identification. Localization support for team names and additional match statistics could also be added to expand the library's functionality.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software with proper attribution.
