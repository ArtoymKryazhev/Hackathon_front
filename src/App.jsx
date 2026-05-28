import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/AppShell/AppShell.jsx'

import { Home } from './pages/Home/Home.jsx'
import { Accounts } from './pages/Accounts/Accounts.jsx'
import { Transactions } from './pages/Transactions/Transactions.jsx'
import { TransactionStats } from './pages/Transactions/Stats/TransactionStats.jsx'
import { TransactionFilter } from './pages/Transactions/Filter/TransactionFilter.jsx'
import { Chat } from './pages/Chat/Chat.jsx'
import { Settings } from './pages/Settings/Settings.jsx'
import { Profile } from './pages/Profile/Profile.jsx'

function WithBottomNavLayout() {
  return <AppShell withBottomNav />
}

function NoBottomNavLayout() {
  return <AppShell withBottomNav={false} />
}

function App() {
  return (
    <Routes>
      <Route element={<WithBottomNavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/stats" element={<TransactionStats />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<NoBottomNavLayout />}>
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transactions/filter" element={<TransactionFilter />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
