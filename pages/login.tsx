import dynamic from 'next/dynamic';

const LoginClient = dynamic(() => import('../components/LoginClient'), {
  ssr: false,
  loading: () => <main style={{ padding: 24 }}><h1>Loading…</h1></main>,
});

// Ensure runtime rendering (no static prerender)
export async function getServerSideProps() {
  return { props: {} };
}

export default function Page() {
  return <LoginClient />;
}
