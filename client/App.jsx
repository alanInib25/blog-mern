//react-router-dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//context
import { UserProvider } from "./src/context/userContext";
import PostProvider from "./src/context/postContext";

//pages (components)
import Layout from "./src/components/Layout";
import ErrorPage from "./src/pages/errorPage/ErrorPage";
import Home from "./src/pages/Home";
import Dashboard from "./src/pages/dashboard/Dashboard";
import PostDetail from "./src/pages/postDetail/PostDetail";
import Register from "./src/pages/register/Register";
import Login from "./src/pages/login/Login";
import UserProfile from "./src/pages/userProfile/UserProfile";
import Authors from "./src/pages/authors/Authors";
import CreatePost from "./src/pages/createPost/CreatePost";
import CategoryPost from "./src/pages/categoryPost/CategoryPost";
import AuthorPost from "./src/pages/authorPost/AuthorPost";
import EditPost from "./src/pages/editPost/EditPost";
import Logout from "./src/pages/Logout";
import DeletePost from "./src/pages/DeletePost";

//routing
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <PostProvider>
          <Layout />
        </PostProvider>
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <Authors /> },
      { path: "create", element: <CreatePost /> },
      { path: "mypost/:id", element: <Dashboard /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "posts/users/:id", element: <AuthorPost /> },
      { path: "posts/categories/:category", element: <CategoryPost /> },
      { path: "logout", element: <Logout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
