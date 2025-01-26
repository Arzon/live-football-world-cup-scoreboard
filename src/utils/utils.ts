import { IMatch } from "../interfaces/match";

export class Utils {

    public static orderScore(matches: IMatch[]): IMatch[] {

        return matches.sort((a, b) => {
            const overAllScoreA = a.homeTeamScore + a.awayTeamScore;
            const overAllScoreB = b.homeTeamScore + b.awayTeamScore;

            if (overAllScoreA !== overAllScoreB) {
                return overAllScoreB - overAllScoreA;
            }

            return b.matchStartTime - a.matchStartTime;
        });
    }
}