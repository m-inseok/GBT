import { Injectable } from '@nestjs/common';

@Injectable()
export class PronunciationService {
    analyze(userText: string, targetText: string) {
        const similarity = this.calculateSimilarity(userText, targetText);
        const score = Math.round(similarity * 100);
        const feedback = this.generateFeedback(score);

        return {
            score,
            feedback,
            userText,
            targetText
        };
    }

    private calculateSimilarity(s1: string, s2: string): number {
        const longer = s1.length > s2.length ? s1 : s2;
        const shorter = s1.length > s2.length ? s2 : s1;
        const longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength.toString());
    }

    private editDistance(s1: string, s2: string): number {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        const costs = new Array();
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    private generateFeedback(score: number): string {
        if (score >= 90) {
            return "완벽해요! 원어민 수준의 발음입니다.";
        } else if (score >= 70) {
            return "아주 좋아요! 조금만 더 연습하면 완벽해질 거예요.";
        } else if (score >= 50) {
            return "좋아요. 하지만 발음이 조금 부정확한 부분이 있어요.";
        } else {
            return "아쉬워요. 다시 한 번 천천히 또박또박 읽어보세요.";
        }
    }
}
