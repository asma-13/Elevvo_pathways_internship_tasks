import { RouterProvider } from 'react-router';
import { JobProvider } from './context/JobContext';
import { router } from './routes';

export default function App() {
  return (
    <JobProvider>
      <RouterProvider router={router} />
    </JobProvider>
  );
}
