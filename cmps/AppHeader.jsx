const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {

    const [menu, setMenu] = useState('menu-close')

    function toggleMenu() {
        setMenu(menu === 'menu-close' ? 'menu-open' : 'menu-close')
    }

    return <header className="app-header flex">
        <Link to="/">
            {/* <img src="/assets/img/appsus1.png" alt="logo" /> */}
        </Link>
        {menu === 'menu-open' && <div className="backdrop" onClick={() => setMenu('menu-close')}></div>}
        <nav className={`header-nav-btns ${menu}`}>
            <NavLink className="header-nav-btns-home" to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>

        <button class="toggle-menu-btn" onClick={() => toggleMenu('menu-open')} type="button">☰</button>
    </header >
}
