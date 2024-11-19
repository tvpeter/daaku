import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./routes/router.tsx"
import AuthProvider from "react-auth-kit"
import store from "./pages/auth/AuthStore.ts"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
