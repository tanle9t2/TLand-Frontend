import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./ui/Applayout"
import HomePage from "./pages/HomePage"

import PostDetailPage from "./pages/PostDetailPage"
import AssetPage from "./pages/AssetPage"
import AssetCreatedPage from "./pages/AssetCreatedPage"
import AssetList from "./features/asset/AssetList"
import PostCreated from "./features/post/PostCreated"
import AssetCreated from "./features/asset/AssetCreated"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  },
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AppLayout />
            }
          >
            <Route index element={<HomePage />} />

            <Route path="post/:postId" element={<PostDetailPage />} />
            <Route path="asset/:assetId" element={<AssetPage />} />
            <Route path="asset" element={<AssetList />} />
            <Route path="create-asset" element={<AssetCreatedPage />} />
            <Route path="create-asset/draft/:draftId" element={<AssetCreated />} />
            <Route path="create-asset/new" element={<AssetCreated />} />
            <Route path="create-post" element={<PostCreated />} />

          </Route >

        </Routes >
      </BrowserRouter >
      <Toaster position="top-right" autoClose={3000} />
    </QueryClientProvider >
  )
}

export default App
