import { ScoreUpdate } from './types/team-score-pair'
import { Utils } from "./utils/utils";
import { IMatch } from './interfaces/match';
import { ISummary } from './interfaces/summary';
import { InternalModule } from './models/collection';

export class Scoreboard { 
    private collection: InternalModule.Collection;

    constructor() {
        this.collection = new InternalModule.Collection();
    }

    startMatch(homeTeam: string, awayTeam: string): void {
        if (homeTeam === awayTeam) {
            throw new Error("A match cannot have the same team playing against itself.");
        }

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

    updateScore(scoreUpdate: ScoreUpdate): void {
        const [[homeTeam, homeScore], [awayTeam, awayScore]] = scoreUpdate;

        if (homeScore < 0 || awayScore < 0) {
            throw new Error("Scores cannot be negative.");
        }

        const isUpdated = this.collection.update(homeTeam, awayTeam, homeScore, awayScore);
    
        if (!isUpdated) {
          throw new Error("Match not found.");
        }
    }

    finishMatch(homeTeam: string, awayTeam: string): void {
        const isDeleted = this.collection.delete(homeTeam, awayTeam);
    
        if (!isDeleted) {
          throw new Error("Match not found.");
        }
    }

    private getAllMatches(): IMatch[] {
        return this.collection.getAll();
    }

    getSummary(): ReadonlyArray<ISummary> { 
        const getAllMatches = Utils.orderScore(this.getAllMatches());
        return Object.freeze(
            getAllMatches
              .map(m => Object.freeze({
                homeTeam: m.homeTeam,
                awayTeam: m.awayTeam,
                homeTeamScore: m.homeTeamScore,
                awayTeamScore: m.awayTeamScore,
              }))
        );
    }
}