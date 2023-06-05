import { createContext, useContext, useState } from 'react';

const FilteredIDsContext = createContext();

export const useFilteredIDs = () => useContext(FilteredIDsContext);

export const FilteredIDsProvider = ({ children }) => {
  const [filteredID, setFilteredIDs] = useState([]);

  return (
    <FilteredIDsContext.Provider value={{ filteredID, setFilteredIDs }}>
      {children}
    </FilteredIDsContext.Provider>
  );
};
