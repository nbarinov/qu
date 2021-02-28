export interface Quiz {
  id: number;
  title: string;
  image_url: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  is_yes: boolean;
  is_no: false;
  no_comment: string;
  yes_comment: string;
  image_url: string;
}
