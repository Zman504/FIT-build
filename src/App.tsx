import { PublicLandingPage } from './pages/PublicLandingPage';

// Sandbox wrapper. The production app mounts PublicLandingPage behind a router
// alongside auth/dashboard routes; here we render it directly so contractors
// can work on the page in isolation. No backend, auth, or payment code is wired in.
export default function App() {
  return <PublicLandingPage />;
}
