import { RouterProvider } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import { router } from "./routes/index";

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
