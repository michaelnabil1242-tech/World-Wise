import { createContext, useContext, useEffect, useReducer } from "react";

// 1) create context
const CitiesContext = createContext();

const intialState = {
  cities: [],
  isLoading: false,
  error: null,
  currentCity: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "error/reset":
      return { ...state, error: null };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "error/happened":
      return { ...state, error: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    default:
      throw new Error("the action is unknown");
  }
}

// 2) create provider
function CitiesProvider({ children }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    intialState,
  );

  const URL = "http://localhost:8000";
  useEffect(function () {
    const controller = new AbortController();
    async function getCities() {
      dispatch({ type: "loading" });
      dispatch({ type: "error/reset" });
      try {
        const res = await fetch(`${URL}/cities`, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed To Fetch Cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "error/happened", payload: err.message });
        }
      }
    }
    getCities();
    return function () {
      controller.abort();
    };
  }, []);
  // current city function
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      dispatch({ type: "error/reset" });
      const res = await fetch(`${URL}/cities/${id}`);
      if (!res.ok) throw new Error("failed to fetch current City");
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "error/happened", payload: err.message });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      dispatch({ type: "error/reset" });
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      alert("there are errors");
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    dispatch({ type: "error/reset" });
    try {
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("failed to delete");
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "error/happened", payload: err.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
// 3) create custom hook
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("the context is used outside of the provider range");
  return context;
}

export { CitiesProvider, useCities };
