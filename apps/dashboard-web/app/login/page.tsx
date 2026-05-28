'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { saveToken } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const text =
  await response.text();

console.log(text);

const data = JSON.parse(text);

      if (data.access_token) {
        saveToken(data.access_token);

        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-zinc-900 p-10 rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold">
          ALBI LOGIN
        </h1>

        <div className="mt-8 space-y-4">
          <input
            className="w-full bg-zinc-800 rounded-xl p-4"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            className="w-full bg-zinc-800 rounded-xl p-4"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value,
              )
            }
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black rounded-xl p-4 font-bold"
          >
            {loading
              ? 'Loading...'
              : 'Login'}
          </button>
        </div>
      </div>
    </main>
  );
}