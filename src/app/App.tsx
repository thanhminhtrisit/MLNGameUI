import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { GameProvider } from './context/GameContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </ThemeProvider>
  );
}
