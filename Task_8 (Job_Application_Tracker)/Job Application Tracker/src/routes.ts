import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AddJob } from './pages/AddJob';
import { JobDetails } from './pages/JobDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'add',
        Component: AddJob,
      },
      {
        path: 'job/:id',
        Component: JobDetails,
      },
    ],
  },
]);
