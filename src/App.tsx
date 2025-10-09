import { RouterProvider } from "react-router-dom";
import AppProviders from "./providers/AppProviders";
import { router } from "./routes";
// import "@/styles/tailwind.css";
// import "@/styles/globals.css";

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
