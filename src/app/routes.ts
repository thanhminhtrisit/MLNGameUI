import { createBrowserRouter } from 'react-router';
import { MenuScreen } from './screens/MenuScreen';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen';
import { GameScreen } from './screens/GameScreen';
import { EndingScreen } from './screens/EndingScreen';
import { GuideScreen } from './screens/GuideScreen';
import { TheoryScreen } from './screens/TheoryScreen';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MenuScreen,
  },
  {
    path: '/character-select',
    Component: CharacterSelectionScreen,
  },
  {
    path: '/game',
    Component: GameScreen,
  },
  {
    path: '/ending',
    Component: EndingScreen,
  },
  {
    path: '/guide',
    Component: GuideScreen,
  },
  {
    path: '/theory',
    Component: TheoryScreen,
  },
  {
    path: '/admin',
    Component: AdminDashboardScreen,
  },
]);