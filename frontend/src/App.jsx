import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import UserProvider from "./providers/UserProvider.jsx";
import PostsProvider from "./providers/PostsProvider.jsx";
import SearchPostsProvider from "./providers/SearchPostsProvider.jsx";

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
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/posts" element={<PostsPage />} />
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
