import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'

type PageParams = {
  params: Promise<{ slug?: string }>
}

export default async function HomePage({ params }: PageParams) {
  const { slug = 'home' } = await params
  
  try {
    const payload = await getPayload({ config })

    console.log('Looking for page with slug:', slug)

    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    console.log('Found pages:', pages.docs.length)

    const page = pages.docs[0]

    if (!page) {
      console.log('No page found, returning 404')
      notFound()
    }

    return (
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{page.title}</h1>
        
        {page.layout?.map((block: any, index: number) => {
          if (block.blockType === 'hero') {
            return (
              <div key={index} style={{ marginBottom: '2rem', padding: '2rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '2rem' }}>{block.heading}</h2>
                {block.subheading && <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{block.subheading}</p>}
              </div>
            )
          }
          
          if (block.blockType === 'content') {
            return (
              <div key={index} style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                {block.richText ? (
                  <div style={{ fontSize: '1rem', color: '#333' }}>
                    {/* Render rich text content */}
                    {block.richText.root?.children?.map((node: any, i: number) => {
                      if (node.type === 'paragraph') {
                        return (
                          <p key={i} style={{ marginBottom: '1rem' }}>
                            {node.children?.map((child: any, j: number) => (
                              <span key={j}>{child.text}</span>
                            ))}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                ) : (
                  'No content'
                )}
              </div>
            )
          }
          
          return null
        })}
      </div>
    )
  } catch (error) {
    console.error('Error loading page:', error)
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Error</h1>
        <p>Failed to load page</p>
      </div>
    )
  }
}
