import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ConfigRoute from './routes/ConfigRoute'
import AddRoute from './routes/AddRoute'
import CitiesRoute from './routes/CitiesRoute'
import './i18n'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <CitiesRoute />,
        },
        {
            path: '/add',
            element: <AddRoute />,
        },
        {
            path: '/config',
            element: <ConfigRoute />,
        },
    ],
    {
        basename: import.meta.env.PROD ? '/weather' : '',
    }
)
const App = () => <RouterProvider router={router} />

export default App
