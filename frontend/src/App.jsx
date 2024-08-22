import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import UserProvider from "./providers/UserProvider.jsx";
import PostsProvider from "./providers/PostsProvider.jsx";
import { Toaster } from "react-hot-toast";
import CreatePost from "./components/CreatePost.jsx";
import UpdatePost from "./components/UpdatePost.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import MyPostsPage from "./pages/MyPostsPage.jsx";
import PostDetails from "./components/PostDetails.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const clientId =
  "1045725479831-1tsk3tjksqs5kuf053cqqpdeof5qiifb.apps.googleusercontent.com";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PostsProvider>
          <UserProvider>
            <GoogleOAuthProvider clientId={clientId}>
              <Toaster position="top-right" reverseOrder={false} />
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/userPosts" element={<MyPostsPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/posts/create" element={<CreatePost />} />
                <Route path="/posts/update/:id" element={<UpdatePost />} />
              </Routes>
            </GoogleOAuthProvider>
          </UserProvider>
        </PostsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
