import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/Applayout"
import HomePage from "./pages/HomePage"

import PostDetailPage from "./pages/PostDetailPage"
import AssetPage from "./pages/AssetPage"
import AssetCreatedPage from "./pages/AssetCreatedPage"
import AssetList from "./features/asset/AssetList"
import PostCreated from "./features/post/PostCreated"
import AssetCreated from "./features/asset/AssetCreated"
import PostManagement from "./features/post/PostManagement"
import PostUpdateFormData from "./features/post/PostUpdateFormData"
import Search from "./features/search/Search"
import SignIn from "./features/auth/sign-in/SignInForm"
import SignUp from "./features/auth/sign-up/SignUp"

import FullPageSpinner from "./ui/FullPageSpinner"
import ProtectedRoute from "./ui/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import UserProfile from "./features/auth/UserProfile"
import UserProfileData from "./features/auth/UserProfileData"
import RealEstatePage from "./features/landingPage/RealEstatePage"

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
      <ReactQueryDevtools />
      <AuthProvider>
        <BrowserRouter >

          <Routes>
            <Route
              element={
                <AppLayout />
              }
            >
              <Route index element={<HomePage />} />
              <Route path="user/:userId" element={<RealEstatePage />} />
              <Route path="search" element={<Search />} />
              <Route path="post/:postId" element={<PostDetailPage />} />
              <Route path="asset/:assetId" element={<AssetPage />} />
              <Route path="asset" element={
                <ProtectedRoute>
                  <AssetList />
                </ProtectedRoute>} />

              <Route path="create-asset" element={
                <ProtectedRoute>
                  <AssetCreatedPage />
                </ProtectedRoute>} />
              <Route path="create-asset/draft/:draftId" element={
                <ProtectedRoute>
                  <AssetCreated />
                </ProtectedRoute>} />
              <Route path="asset/update/:assetId" element={<AssetCreated />} />
              <Route path="create-asset/new" element={<AssetCreated />} />
              <Route path="create-post" element={<ProtectedRoute>
                <PostCreated />
              </ProtectedRoute>} />
              <Route path="my-ads" element={<PostManagement />} />
              <Route path="my-ads/:status" element={<PostManagement />} />
              <Route path="my-ads/update/:postId" element={<PostUpdateFormData />} />
              <Route path="user/setting/" element={
                <ProtectedRoute>
                  <UserProfileData />
                </ProtectedRoute>
              } />

            </Route >
            <Route path="auth/login" element={<SignIn />} />

            <Route path="auth/register" element={<SignUp />} />
          </Routes >
        </BrowserRouter >
      </AuthProvider>
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          fontSize: "16px",
        },
      }} />

    </QueryClientProvider >
  )
}

export default App
