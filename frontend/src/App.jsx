import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import UserProvider from "./providers/UserProvider.jsx";
import PostsProvider from "./providers/PostsProvider.jsx";
import SearchPostsProvider from "./providers/SearchPostsProvider.jsx";
import { Toaster } from "react-hot-toast";
import NewPostDetails from "./components/NewPostDetails.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <PostsProvider>
            <SearchPostsProvider>
              <Toaster position="top-left" reverseOrder={false} />
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/create" element={<NewPostDetails />} />
                <Route path="/posts/:id" element={<DetailsPage />} />
              </Routes>
            </SearchPostsProvider>
          </PostsProvider>
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
