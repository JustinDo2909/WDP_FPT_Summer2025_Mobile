declare global {
  type QuizQuestion = {
    id: string;
    event_id: string;
    content: string;
    image_url: string;
    questionOptions: IAnswerOptions[];
  };

  interface IAnswerOptions {
    content: string;
    is_correct: boolean;
  }

  type EventReward = {
    id: string;
    event_id: string;
    min_correct: number;
    discount_value: number;
    type: "AMOUNT" | "PERCENT";
  };
}

export type { EventReward, QuizQuestion };
