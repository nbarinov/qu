import React, { FC, PropsWithChildren, ReactNode, Children, isValidElement } from 'react';
import type { BasePageProps } from '../../types/types';

interface Props {
  activePage: string;
}

export const PageRoot: FC<PropsWithChildren<Props>> = ({ activePage, children }) => {
  const page = Children.toArray(children)
    .filter((page: ReactNode) => isValidElement<BasePageProps>(page) && page.props.id === activePage)
    .pop();

  return (
    <div className="PageRoot">
      {page}
    </div>
  );
};
