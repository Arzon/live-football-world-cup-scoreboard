import { IMatch } from "../interfaces/match";
import {ScoreUpdate } from "../types/team-score-pair";

export class Collection {
    private matches: IMatch[] = [];

    public create(match: IMatch): boolean {
        if (this.matches.some(m => m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam)) {
            return false;
        }

        this.matches.push(match);
        return true;
    }

    public update(scoreUpdate: ScoreUpdate): boolean {

        const [[homeTeam, homeScore], [awayTeam, awayScore]] = scoreUpdate;

        const match = this.matches.find(
            m => m.homeTeam === homeTeam && m.awayTeam === awayTeam
        );
      
        if (!match) {
            return false;
        }
      
        match.homeTeamScore = homeScore;
        match.awayTeamScore = awayScore;

        return true;
    }

    public delete(homeTeam: string, awayTeam: string): boolean {

        const index = this.matches.findIndex(m => (m.homeTeam === homeTeam && m.awayTeam === awayTeam))

        if (index === -1 ){
            return false;    
        }
        
        this.matches.splice(index, 1);
        return true;
    }

    public getAll(): IMatch[] {
        return this.matches;
    }
}