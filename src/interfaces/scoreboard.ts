import { IMatch } from "../interfaces/match";
import { ScoreUpdate } from "../types/team-score-pair";

export interface IScoreboard {
    startMatch(homeTeam: string, awayTeam: string):void;
    updateScore(scoreUpdate: ScoreUpdate): void;
    finishMatch(homeTeam: string, awayTeam: string): void;
    getSummary(): IMatch[];
}