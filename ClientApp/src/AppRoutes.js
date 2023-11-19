import { Home } from "./components/Home";
import { LogIn } from "./components/LogIn";
import { SearchGame } from "./components/SearchGame";
import { SearchUser } from "./components/SearchUser";
import { SignUp } from "./components/SignUp";
import UserProfile from "./components/UserProfile";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/profile',
    element: <UserProfile />
  },
  {
    path: '/profile/:userId',
    element: <UserProfile />
  },
  {
    path: '/search-game',
    element: <SearchGame />
  },
  {
    path: '/search-user',
    element: <SearchUser />
  },
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
