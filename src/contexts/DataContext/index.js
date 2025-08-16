import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const isLoadingRef = useRef(false);
  
  const getData = useCallback(async () => {
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
      setError(null);
      const result = await api.loadData();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      isLoadingRef.current = false;
    }
  }, []);
  
  useEffect(() => {
    if (data || isLoadingRef.current) return;
    getData();
  }, [data, getData]);

  // Mémoisation de la valeur du contexte pour éviter les re-renders
  const contextValue = useMemo(() => ({
    data,
    error,
    isLoading: isLoadingRef.current,
  }), [data, error, isLoadingRef.current]);
  
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
