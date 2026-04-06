import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Example: How to fetch navigation data in any server component
 */
export async function getNavigationData() {
  const payload = await getPayload({ config })

  const navigation = await payload.findGlobal({
    slug: 'navigation',
  })

  return navigation?.menuItems || []
}

/**
 * Example: Use in a page component
 */
export default async function ExamplePage() {
  const menuItems = await getNavigationData()

  return (
    <div>
      <h1>Menu Items:</h1>
      <ul>
        {menuItems.map((item: any) => (
          <li key={item.id || item.label}>
            {item.label} - {item.page?.slug || item.externalUrl}
          </li>
        ))}
      </ul>
    </div>
  )
}

