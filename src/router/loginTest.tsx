import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Database } from '../types/supabase'
import '@picocss/pico/css/pico.min.css'

function App() {
  const [countries, setCountries] = useState<Database['public']['Tables']['method']['Row'][]>([])
  const [permission, setPermission] = useState<Database['public']['Tables']['profiles']['Row'][]>([])
  const [session, setSession] = useState(null)
  console.log('countries', countries)
  console.log('permission', permission)

  useEffect(() => {
    //@ts-ignore
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    const {
      data: { subscription },
      //@ts-ignore
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    getCountries()
  }, [session])

  async function getCountries() {
    const { data, error } = await supabase.from('method').select()

    data && setCountries(data)
    console.log('anon data', error)
    const { data: data2, error: error2 } = await supabase.from('profiles').select()
    data2 && setPermission(data2)
    console.log('Permission data', error2)
  }

  return (
    <ul>
      {session === null ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
      ) : (
        <button
          onClick={() => {
            supabase.auth.signOut()
            setCountries([])
            setPermission([])
            setSession(null)
          }}
        >
          Sign Out
        </button>
      )}
      <h1>로그인으로 개별 권한을 줄 수 있는지 테스트</h1>
      <p>mineclover@naver.com, 111111</p>
      <p>clover@example.com, 222222</p>
      <p>clover@example.com으로 로그인 할 때엔 아래에 추가 메세지를 띄우지 않는다</p>

      <button onClick={getCountries}>Get Countries</button>
      {countries.map((country) => (
        <li key={country.id}>
          {country.method}
          {country.description}
          {country.link}
          {country.created_at}
          {country.parents}
          {country.keyword}
        </li>
      ))}
      <h2>{permission[0] && permission[0].created_at}</h2>
      <h1>{permission[1] && permission[1].username}</h1>
    </ul>
  )
}

export default App
