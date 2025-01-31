import { IMatch } from "../interfaces/match";
export namespace InternalModule {
    export class Collection {
        private matches: IMatch[] = [];

        create(match: IMatch): boolean {
            if (this.matches.some(m => m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam)) {
                return false;
            }

            this.matches.push(match);
            return true;
        }

        update(homeTeam:string, awayTeam:string, homeScore:number, awayScore: number): boolean {
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

        delete(homeTeam: string, awayTeam: string): boolean {

            const index = this.matches.findIndex(m => (m.homeTeam === homeTeam && m.awayTeam === awayTeam))

            if (index === -1 ){
                return false;    
            }
            
            this.matches.splice(index, 1);
            return true;
        }

        getAll(): IMatch[] {
            return this.matches;
        }
    }
}