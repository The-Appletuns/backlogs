import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { LogIn } from "./components/LogIn";
import { SearchGame } from "./components/SearchGame";
import { SignUp } from "./components/SignUp";
import { Testing } from "./components/Testing";
import { UserList } from "./components/UserList";
import { UserProfile } from "./components/UserProfile";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  // {
  //   path: '/counter',
  //   element: <Counter />
  // },
  // {
  //   path: '/fetch-data',
  //   element: <FetchData />
  // },
  // {
  //   path: '/testing',
  //   element: <Testing />
  // },
  {
    path: '/profile',
    element: <UserProfile />
  },
  {
    path: '/search-game',
    element: <SearchGame />
  },
  // {
  //   path: '/user-list',
  //   element: <UserList />
  // },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
];

export default AppRoutes;
