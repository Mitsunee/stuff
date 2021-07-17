/// this lib is intended for nextjs using the new JSX import
/// if you are using some other framework with SSR adjust the imports if required
import { useState, useEffect, useLayoutEffect } from "react";

// use this hook if you want to do specific computation (like randomization) only in the client
export const useClientOnlyEffect = typeof window !== 'undefined' 
  ? useLayoutEffect // layout effects are not rendered in serverside rendering
  : useEffect;

// use this hook if you want a boolean to use in ternary operators
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  
  useClientOnlyEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}

// or use this component
export function NoSSR({ children }) {
  const isClient = useIsClient();
  
  return (
    <>
      {isClient ? children : null}
    </>     
  );
}
