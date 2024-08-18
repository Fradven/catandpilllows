import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
  <li><Link href="/tracking">Tracking</Link></li>
  <li><Link href="/previous-months">Previous Months</Link></li>
  <li><Link href="/about-us">About Us</Link></li>
  </ul>
  </nav>
);
};

export default Navbar;