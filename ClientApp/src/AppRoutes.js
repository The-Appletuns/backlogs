import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SearchGame } from "./components/SearchGame";
import { Testing } from "./components/Testing";
import { UserList } from "./components/UserList";
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
  },
  {
    path: '/search-game',
    element: <SearchGame />
  },
  {
    path: '/user-list',
    element: <UserList />
  }
];

export default AppRoutes;
