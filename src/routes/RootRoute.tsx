import { Outlet } from 'react-router'
import Header from '../components/Header'

const RootRoute = () => (
    <>
        <Header />
        <Outlet />
    </>
)

export default RootRoute
