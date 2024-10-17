// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the onboarding page
  redirect('/settings/editAccount');
  return null; // This return is just to satisfy the return type
}
