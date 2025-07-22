
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  return (
    <nav className="bg-blue-400 dark:bg-blue-900 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            Sentiment Analyzer
          </Link>
          <div className="flex items-center space-x-8">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
