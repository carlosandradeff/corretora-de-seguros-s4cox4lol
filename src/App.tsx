import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import About from '@/pages/About'
import Solutions from '@/pages/Solutions'
import InsuranceDetail from '@/pages/InsuranceDetail'
import Quote from '@/pages/Quote'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'
import { insurances } from '@/data/insurances'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/solucoes" element={<Solutions />} />
          <Route path="/seguros" element={<Solutions />} />
          {insurances.map((insurance) => (
            <Route
              key={insurance.slug}
              path={`/${insurance.slug}`}
              element={<InsuranceDetail slug={insurance.slug} />}
            />
          ))}
          <Route path="/seguros/:slug" element={<InsuranceDetail />} />
          <Route path="/cotacao" element={<Quote />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/politica-de-privacidade" element={<Privacy />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
