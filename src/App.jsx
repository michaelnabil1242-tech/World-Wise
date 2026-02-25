import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import HomePage from "./pages/Homepage";
// import Product from "./pages/product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

import { CitiesProvider } from "./contexts/citiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectedRote from "./pages/ProtectedRote";

const HomePage = lazy(() => import(`./pages/HomePage`));
const Product = lazy(() => import(`./pages/Product`));
const Pricing = lazy(() => import(`./pages/Pricing`));
const Login = lazy(() => import(`./pages/Login`));
const AppLayout = lazy(() => import(`./pages/AppLayout`));
const PageNotFound = lazy(() => import(`./pages/PageNotFound`));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRote>
                    <AppLayout />
                  </ProtectedRote>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
