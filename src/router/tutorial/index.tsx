import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { AuthSession } from '@supabase/supabase-js';
import Auth from './Auth';
import Account from './Account';

function App() {
  const [session, setSession] = useState<AuthSession>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      session && setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      session && setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}

export default App;
