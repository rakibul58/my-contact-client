import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddContact from "./components/AddContact";
import MyContacts from "./components/MyContacts";
import Main from "./layout/Main";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <MyContacts></MyContacts>
        },
        {
          path: '/addcontact',
          element: <AddContact></AddContact>
        }
      ]
    }
  ]);


  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
