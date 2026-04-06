import { getPayload } from 'payload'
import Link from 'next/link'
import config from '@/payload.config'

export default async function Navigation() {
  const payload = await getPayload({ config })

  try {
    const navigation = await payload.findGlobal({
      slug: 'navigation',
    })

    if (!navigation?.menuItems || navigation.menuItems.length === 0) {
      return null
    }

    // Sort by order field
    const sortedItems = [...navigation.menuItems].sort((a, b) => (a.order || 0) - (b.order || 0))

    return (
      <nav style={{ 
        display: 'flex', 
        gap: '2rem', 
        padding: '1rem 2rem',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#ffffff'
      }}>
        {sortedItems.map((item: any) => {
          const href = item.page?.slug ? `/${item.page.slug}` : item.externalUrl

          if (!href) return null

          return (
            <Link
              key={item.id || item.label}
              href={href}
              style={{
                color: '#0066cc',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    )
  } catch (error) {
    console.error('Error loading navigation:', error)
    return null
  }
}

