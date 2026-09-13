import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell.js";
import { pageRoutes } from "./pages/index.js";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/executive-overview" replace />} />
        {pageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
