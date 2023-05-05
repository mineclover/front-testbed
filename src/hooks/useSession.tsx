import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { AuthSession } from '@supabase/supabase-js';

const useSession = () => {
  const [user, setUser] = useState<AuthSession>();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      session && setUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      session && setUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return { user, setUser };
};

export default useSession;
