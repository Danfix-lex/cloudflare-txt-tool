'use client';

import { useState } from 'react';
import './globals.css';

export default function Home() {
  const [recordName, setRecordName] = useState('');
  const [recordValue, setRecordValue] = useState('');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | { error: string }>('idle');

  async function handleCreate() {
    if (!recordName || !recordValue) {
      setStatus({ error: 'Record Name and Record Value are required' });
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/add-txt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: recordName, value: recordValue, domain: domain || undefined }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setStatus({ error: errorData.message || 'Unknown error' });
        return;
      }
      setStatus('success');
    } catch (err) {
      setStatus({ error: (err as Error).message });
    }
  }

  return (
      <main>
        <h1>Cloudflare TXT Record Creator</h1>
        <label>
          Record Name:
          <input
              type="text"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              placeholder="for example _acme-challenge"
          />
        </label>
        <label>
          Record Value:
          <input
              type="text"
              value={recordValue}
              onChange={(e) => setRecordValue(e.target.value)}
              placeholder="your-verification-value"
          />
        </label>
        <label>
          Domain (optional):
          <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
          />
        </label>
        <button onClick={handleCreate}>Create</button>
        <div
            className={`status ${
                status === 'loading' ? 'loading' : status === 'success' ? 'success' : typeof status === 'object' ? 'error' : ''
            }`}
        >
          {status === 'loading' && 'Loading…'}
          {status === 'success' && 'Success!'}
          {typeof status === 'object' && 'error' in status && `Error: ${status.error}`}
        </div>
      </main>
  );
}
