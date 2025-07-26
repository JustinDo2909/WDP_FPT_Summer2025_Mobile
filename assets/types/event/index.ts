declare global {
  type IEvent = {
    id?: string;
    title?: string;
    description?: string;
    image_url?: string;
    start_time?: Date;
    end_time?: Date;
    type?: string;
    is_active?: boolean;
    created_at?: Date;
  };

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
