
import { Route, Routes } from 'react-router-dom';
import './App.css';
import router from './router/Router';
function App() {




  return (
    <>
      <Routes>

        {router.map((e, i) => {
          return (
            <Route key={i} path={e.path} element={<e.element />} />
          )

        })}





      </Routes>
    </>
  );
}

export default App;














