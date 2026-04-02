import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Fetch all pages
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  })

  return (
    <div className="home">
      <div className="content">
        <h1>Welcome to Website Builder</h1>
        {user && <p>Logged in as: {user.email}</p>}
        
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Your Pages</h2>
          {pages.docs.length === 0 ? (
            <p>No pages yet. Create one in the admin panel!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {pages.docs.map((page: any) => (
                <li key={page.id} style={{ marginBottom: '1rem' }}>
                  <Link 
                    href={`/${page.slug}`}
                    style={{ fontSize: '1.2rem', color: '#0070f3' }}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
