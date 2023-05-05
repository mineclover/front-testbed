import { paths } from '../AutoRouter';
import { Fragment } from 'react';

const home = () => {
  return (
    <div>
      <h2>바로가기</h2>
      {paths.map((data) => (
        <Fragment key={data.named + data.indexing}>
          <a href={`/${data.named}`}>{data.named} 바로가기</a>
          <span> or </span>
          <a href={`/${data.indexing}`}>{data.indexing} 바로가기</a>
          <br />
        </Fragment>
      ))}
    </div>
  );
};

export default home;
