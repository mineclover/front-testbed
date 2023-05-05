import { Route } from 'react-router-dom';
const modules: any = import.meta.glob('./router/**/index.tsx', {
  eager: true,
});

/**
 * 이 코드를 호출하는 폴더 기준으로 대상이 되는 폴더를 지정합니다.
 * glob안에서 변수를 사용할 수 없기 때문에, 직접 입력해야 합니다.
 *
 * @description 해당 폴더 내부의 모든 폴더를 검색하여 index.tsx 파일을 Route 컴포넌트에 import 합니다
 * @returns Route 컴포넌트들이 담긴 배열를 반환합니다.
 */

type RouteList = {
  path: string;
  component: any;
}[];

export const paths = Object.keys(modules).map((component, index) => {
  const path = './router/**/index.tsx';
  const text = path.split('**');
  const origin = component.replace(text[0], '').replace(text[1], '');

  return {
    named: `${origin}`,
    indexing: `${index}`,
  };
});

const named: RouteList = Object.keys(modules).map((component, index) => {
  const path = './router/**/index.tsx';
  const text = path.split('**');
  const origin = component.replace(text[0], '').replace(text[1], '');

  return {
    path: `/${origin}`,
    component: modules[component].default,
  };
});

const indexing: RouteList = Object.keys(modules).map((component, index) => {
  return {
    path: `/${index}`,
    component: modules[component].default,
  };
});

// 기본 형식 라우터를 입력 받아서 컴포넌트로 변환

export const routeList = (components: RouteList) => {
  return components.map(({ path, component: Component }) => {
    return <Route key={path} path={path} element={<Component />} />;
  });
};

// 이미 선언된 named를 입력 받아서 컴포넌트로 변환
export const namedRouteList = () => {
  const components = named;
  return components.map(({ path, component: Component }) => {
    return <Route key={path} path={path} element={<Component />} />;
  });
};

// 이미 선언된 indexing을 입력 받아서 컴포넌트로 변환
export const indexRouteList = () => {
  const components = indexing;
  return components.map(({ path, component: Component }) => {
    return <Route key={path} path={path} element={<Component />} />;
  });
};
