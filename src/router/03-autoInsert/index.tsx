import { supabase } from '../../supabaseClient';
import { useState } from 'react';
import useSession from '../../hooks/useSession';

const index = () => {
  const [loading, setLoading] = useState(false);
  // session을 가져오는 것은 자동화 했다 전역 변수로 끌어올 수도 있긴 하다
  const { user } = useSession();

  async function addData() {
    setLoading(true);
    user && console.log(user.user.id);

    if (!user) {
      alert('로그인을 해주세요');
      return;
    }
    const { data, error } = await supabase.from('search').insert([
      {
        id: '테스트',
        user_id: user.user.id,
        description: 'otherValue 아무 텍스트',
      },
    ]);
    console.log(data, error);
    setLoading(false);
  }

  return (
    <main>
      <h2>db에 데이터 추가하는 영역</h2>
      {loading ? <div>로딩중</div> : <div>로딩완료</div>}
      <button onClick={() => addData()}>데이터 추가</button>
    </main>
  );
};

export default index;
