import { ICollection } from "./interfaces/collection";
import { Collection } from './models/collection';
import { ScoreUpdate } from './types/team-score-pair'

export class Scoreboard  { 
    private collection: ICollection;

    constructor() {
        this.collection = new Collection();
    }

    public startMatch(homeTeam: string, awayTeam: string): void {

        const isCreated =  this.collection.create({
            homeTeam,
            awayTeam,
            homeTeamScore: 0,
            awayTeamScore: 0,
            matchStartTime: Number(process.hrtime.bigint())
        });
  
        if(!isCreated) {
          throw new Error("Match between these teams is already in progress.");
        }
    }

    public updateScore(scoreUpdate: ScoreUpdate): void {
        const isUpdated = this.collection.update(scoreUpdate);
    
        if (!isUpdated) {
          throw new Error("Match not found.");
        }
    }
}