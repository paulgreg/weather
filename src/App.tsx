import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ConfigRoute from './routes/ConfigRoute'
import AddRoute from './routes/AddRoute'
import CitiesRoute from './routes/CitiesRoute'
import './i18n'
import CityRoute from './routes/CityRoute'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <CitiesRoute />,
        },
        {
            path: '/city/:label',
            element: <CityRoute />,
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
