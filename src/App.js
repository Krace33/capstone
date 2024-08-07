import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom';
import { HomePage, Navbar, SearchResults, ProductPage, Checkout, LoginPage } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />}></Route>
        <Route path='/search' element={<SearchResults />}></Route>
        <Route path='/product/:id' element={<ProductPage />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
