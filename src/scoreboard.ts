import { ICollection } from "./interfaces/collection";
import { Collection } from './models/collection';
import { ScoreUpdate } from './types/team-score-pair'
import { Utils } from "./utils/utils";
import { IMatch } from "./interfaces/match";

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

    public finishMatch(homeTeam: string, awayTeam: string): void {
        const isDeleted = this.collection.delete(homeTeam, awayTeam);
    
        if (!isDeleted) {
          throw new Error("Match not found.");
        }
    }

    public getSummary(): IMatch[] { 
        const getAllMatches = this.collection.getAll();
        return Utils.orderScore(getAllMatches);
    }

}