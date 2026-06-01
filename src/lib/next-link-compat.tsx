import * as React from 'react';
import { useRouter } from './next-navigation-compat';

export default function Link({ href, children, className, onClick, ...props }: any) {
  const router = useRouter();

  const handleNav = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <a href={href} className={className} onClick={handleNav} {...props}>
      {children}
    </a>
  );
}
