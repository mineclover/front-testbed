import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import Tutorial from './router/tutorial';
import LoginTest from './router/loginTest';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/01" element={<Tutorial />} />,
    <Route path="/02" element={<LoginTest />} />,
  ])
);

export { router };
