import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useRef, useEffect } from 'react';

export const useRefetchOnFocus = (refetch: () => void) => {
  const hasRefetched = useRef(false);
  const isFocused = useIsFocused();

  useFocusEffect(() => {
    if (!hasRefetched.current) {
      refetch();
      hasRefetched.current = true;
    }
  });

  useEffect(() => {
    if (!isFocused) {
      hasRefetched.current = false;
    }
  }, [isFocused]);
};
