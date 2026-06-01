import * as React from 'react';

// Create a simple custom event setup for routing updates so any listener knows when navigation occurs.
const ROUTE_CHANGE_EVENT = 'next_compat_route_change';

let currentPathname = '/';

if (typeof window !== 'undefined') {
  currentPathname = window.location.hash ? window.location.hash.slice(1) : '/';
  if (!currentPathname) currentPathname = '/';
}

export function usePathname() {
  const [path, setPath] = React.useState(currentPathname);

  React.useEffect(() => {
    const handleRouteChange = (e: CustomEvent<string>) => {
      setPath(e.detail);
    };

    window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange as EventListener);
    
    // Support browser hash change triggers as well
    const handleHashChange = () => {
      let hashPath = window.location.hash ? window.location.hash.slice(1) : '/';
      if (!hashPath) hashPath = '/';
      if (hashPath !== currentPathname) {
        currentPathname = hashPath;
        window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: hashPath }));
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange as EventListener);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return path;
}

export function useRouter() {
  return {
    push: (href: string) => {
      console.log('Compat Router: push to', href);
      currentPathname = href;
      window.location.hash = href;
      window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: href }));
    },
    replace: (href: string) => {
      console.log('Compat Router: replace to', href);
      currentPathname = href;
      window.location.hash = href;
      window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: href }));
    },
    back: () => {
      console.log('Compat Router: back');
      window.history.back();
    },
    forward: () => {
      console.log('Compat Router: forward');
      window.history.forward();
    },
    prefetch: (href: string) => {
      // noop
    }
  };
}
