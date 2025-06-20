import { NavLink } from "react-router-dom";

function Header() {

  const navStyle = {
    color: '#007bff',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    margin: '0 5px',
    border: '1px solid transparent',
    transition: 'all 0.2s ease'
  };

    const activeNavStyle = {
    ...navStyle,
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #007bff'
  };

  return (
    <header style={{ 
            borderBottom: '2px solid #ccc', 
            paddingBottom: '10px', 
            marginBottom: '20px' }}>

      <h1>Finance-Tracker</h1>

      <nav>
        <NavLink
        to = "/"
        style={({isActive}) => isActive ? activeNavStyle : navStyle}
        >
          Dashboard
        </NavLink>

        <NavLink
        to = "/add"
        style={({isActive}) => isActive ? activeNavStyle : navStyle}
        >
          + Add Transaction
        </NavLink>

        <NavLink
        to = "/about"
        style={({isActive}) => isActive ? activeNavStyle : navStyle}
        >
          About
        </NavLink>
      </nav>
      
      {/* <nav style={{ marginTop: '10px' }}>
        <button style={{ marginRight: '10px' }}>Dashboard</button>
        <button style={{ marginRight: '10px' }}>Add Transaction</button>
        <button>About</button>
      </nav> */}
    </header>
  );
}

export default Header;