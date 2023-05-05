import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { AuthSession } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';

type Props = {
  session: AuthSession;
};

const Account = ({ session }: Props) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] =
    useState<Database['public']['Tables']['profiles']['Update']['username']>(
      ''
    );
  const [website, setWebsite] =
    useState<Database['public']['Tables']['profiles']['Update']['website']>('');
  const [avatar_url, setAvatarUrl] =
    useState<Database['public']['Tables']['profiles']['Update']['website']>('');

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        data.username && setUsername(data.username);
        data.website && setWebsite(data.website);
        data.avatar_url && setAvatarUrl(data.avatar_url);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  async function updateProfile(event: { preventDefault: () => void }) {
    event.preventDefault();

    setLoading(true);

    const updates = {
      id: 1,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </form>
  );
};

export default Account;
