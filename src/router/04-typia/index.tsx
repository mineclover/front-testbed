import { Fragment, useState } from 'react';

interface Insert {
  /**
   * @pattern [가-힣]{3}
   */
  id: string;
  /**
   * @minLength 10
   * @maxLength 100
   * @pattern ^[ㄱ-ㅎㅏ-ㅣ가-힣]*$
   */
  description: string;
}

const index = () => {
  const [data, setData] = useState<any[]>([]);
  return (
    <div>
      <button
        onClick={() => {
          setData([...data]);
        }}
      >
        버튼
      </button>
      {data.map((data) => {
        return (
          <Fragment key={data.id}>
            <div>{data.id}</div>
            <div>{data.description}</div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default index;
