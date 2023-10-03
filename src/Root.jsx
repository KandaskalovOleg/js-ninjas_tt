import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { App } from './App';
import { Cards } from './components/shared/Cards/Cards';
import { SuperheroDetails } from './components/shared/SuperheroDetails/SuperheroDetails';

export const Root = () => (
  <Router>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Cards />} />
        
        <Route path="superheroes/:id" element={<SuperheroDetails />} />
      </Route>
    </Routes>
  </Router>
);