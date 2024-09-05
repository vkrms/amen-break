import { Link, NavigateFunction } from "react-router-dom"
import { routes } from "../lib/routes"
import { useNavigate } from "react-router-dom"
import logo from '@/assets/brain copy.webp'
import { useStore } from "../lib/z-store"

function logout(navigate: NavigateFunction) {
    const { logout } = useStore.getState();
    logout();
    navigate('/');
}

export const Header: React.FC = () => {
    const navigate = useNavigate();

    const email = useStore(state => state.email)

    return (
        <header className="flex justify-center items-center mb-6">
            <Link to="/" className="mr-auto flex-none w-[40px]">
                <img src={logo} alt="logo" className="h-10"/>
            </Link>

            <div className="bob mr-auto">Logged in as: {email}</div>

            <div className='menu'>
                {routes.filter(route => !route.hidden).map((route) => (
                    <Link key={route.path} to={route.path} className="mx-2">{route.name}</Link>
                ))}

                <a href="#" onClick={() => logout(navigate)} className="mx-2">Logout</a>
            </div>
        </header>        
    )
}
