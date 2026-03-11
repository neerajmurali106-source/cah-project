const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export async function getProducts() {
  const res = await fetch(`${PAYLOAD_URL}/api/products`, {
    cache: 'no-store',
  })
  const data = await res.json()
  return data.docs || []
}

export async function getProduct(slug: string) {
  const res = await fetch(
    `${PAYLOAD_URL}/api/products?where[slug][equals]=${slug}`,
    { cache: 'no-store' }
  )
  const data = await res.json()
  return data.docs?.[0] || null
}
