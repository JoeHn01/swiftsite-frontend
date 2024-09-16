'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Import useRouter for navigation
import styles from './SearchBar.module.css';

interface Template {
  _id: string;
  name: string;
  description: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Template[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();  // Initialize useRouter

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      try {
        const response = await axios.get<Template[]>(`http://localhost:3000/templates/search?q=${value}`);
        setResults(response.data);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching templates:', error);
      }
    } else {
      setShowResults(false);
    }
  };

  // Handle navigation to template page
  const handleResultClick = (id: string) => {
    router.push(`/templates/${id}`);  // Navigate to template's detail page
    setShowResults(false);  // Optionally hide the dropdown after navigation
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        type="text"
        placeholder="Search templates..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay to allow click on results
      />
      {showResults && (
        <div className={styles.resultsPopup}>
          {results.length > 0 ? (
            <ul className={styles.resultList}>
              {results.map((template) => (
                <li
                  key={template._id}
                  className={styles.resultItem}
                  onMouseDown={() => handleResultClick(template._id)}  // Use onMouseDown to avoid conflict with onBlur
                >
                  {template.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.searchBarPar}>No matches found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
