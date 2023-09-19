import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Testing } from "./components/Testing";
import { UserProfile } from "./components/UserProfile";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/testing',
    element: <Testing />
  },
  {
    path: '/user-profile',
    element: <UserProfile />
  }
];

export default AppRoutes;
