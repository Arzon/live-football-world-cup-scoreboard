
import { IMatch } from "../interfaces/match";
import { ScoreUpdate } from "../types/team-score-pair";

export interface ICollection {
    create(match: IMatch): boolean;
    update(scoreUpdate: ScoreUpdate): boolean;

}