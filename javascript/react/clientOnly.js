/// this lib is intended for nextjs using the new JSX import
/// if you are using some other framework with SSR adjust the imports if required
import { useState, useEffect, useLayoutEffect } from "react";

export const useClientOnlyEffect = typeof window !== 'undefined' 
  ? useLayoutEffect 
  : useEffect;

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useClientOnlyEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}

export function NoSSR({ children }) {
  const isClient = useIsClient();
  
  return (
    <>
      {isClient ? children : null}
    </>     
  );
}
