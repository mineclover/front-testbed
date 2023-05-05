import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import Home from './router/Home';
import Header from './router/Header';
import { indexRouteList, namedRouteList } from './AutoRouter';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Header />}>
        {...indexRouteList()}
        {...namedRouteList()}
      </Route>
      <Route path="/*" element={<Home />} />
    </Route>
  )
);

export { router };
