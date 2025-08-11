'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: 'https://www.basic64school.com' },
    });
    if (error) setError(error.message); else setSent(true);
  }

  if (sent) return <main style={{padding:24}}><h1>Check your email for the sign-in link.</h1></main>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Sign in</h1>
      <form onSubmit={sendMagicLink}>
        <input type="email" required placeholder="you@example.com"
               value={email} onChange={(e) => setEmail(e.target.value)}
               style={{ padding: 12, width: 300 }} />
        <button type="submit" style={{ marginLeft: 8, padding: '12px 16px' }}>
          Send magic link
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}
