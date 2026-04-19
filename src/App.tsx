// Top-level app shell: routes + language toggle. No global state yet.
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LanguageToggle } from '@/components/LanguageToggle'
import { Invitation } from '@/pages/Invitation'
import { Admin } from '@/pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <LanguageToggle />
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
