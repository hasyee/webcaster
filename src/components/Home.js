import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/broadcast">broadcast</Link>
      <br />
      <Link to="/receive">receive</Link>
    </div>
  );
}

export default Home;
