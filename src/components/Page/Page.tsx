import React, { FC, HTMLAttributes } from 'react';
import type { BasePageProps } from '../../types/types';
import cn from 'classnames';

type Props = HTMLAttributes<HTMLDivElement> & BasePageProps;

export const Page: FC<Props> = (props) => {
  return <div {...props} className={cn(props.className, 'Page')} />;
};
