import React, { FC, HTMLAttributes } from 'react';
import type { Quiz } from '../../types/objects/quiz';
import { Card, CardBody, CardMedia, CardContent, HeaderTitle, HeaderSubtitle } from '@sberdevices/ui';

interface Props extends HTMLAttributes<HTMLDivElement> {
  quiz: Quiz;
}

export const QuizCard: FC<Props> = ({ quiz, ...restProps }) => {
  return (
    <Card {...restProps} roundness={20}>
      <CardBody>
        <CardMedia src={quiz.image_url} ratio="1 / 1" />
        <CardContent>
          <HeaderTitle>
            {quiz.id}
          </HeaderTitle>
          <HeaderSubtitle>
            456
          </HeaderSubtitle>
        </CardContent>
      </CardBody>
    </Card>
  );
};
