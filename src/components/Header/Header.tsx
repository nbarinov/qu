import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { hasReactNode } from '../../utils/utils';
import cn from 'classnames';
import { Headline4, Footnote1 } from '@sberdevices/ui';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  header: ReactNode;
  caption?: ReactNode;
}

export const Header: FC<Props> = ({ className, header, caption, ...restProps }) => {
  const hasCaption = hasReactNode(caption);

  return (
    <header className={cn(className, 'Header')} {...restProps}>
      <div className="Header__content">
        <Headline4 className="Header__headline">{header}</Headline4>
        {hasCaption && <Footnote1 className="Header__footnote">{caption}</Footnote1>}
      </div>
    </header>
  );
};
