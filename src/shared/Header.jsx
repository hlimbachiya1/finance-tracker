function Header() {
  return (
    <header style={{ 
            borderBottom: '2px solid #ccc', 
            paddingBottom: '10px', 
            marginBottom: '20px' }}>

      <h1>Finance-Tracker</h1>
      
      <nav style={{ marginTop: '10px' }}>
        <button style={{ marginRight: '10px' }}>Dashboard</button>
        <button style={{ marginRight: '10px' }}>Add Transaction</button>
        <button>About</button>
      </nav>
    </header>
  );
}

export default Header;