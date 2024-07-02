import List from "./componets/List.jsx";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import AdminPanel from "./componets/AdminPanel.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <List/>,
    },
    {
        path: "/admin-panel",
        element: <AdminPanel/>,
    },
]);

function App() {

  return (
    <div className='bg-secondary min-h-screen py-10'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
