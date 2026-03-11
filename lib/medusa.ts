const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000'

export async function getMedusaProducts() {
  const res = await fetch(`${MEDUSA_URL}/store/products`, {
    headers: {
      'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_KEY || '',
    },
    cache: 'no-store',
  })
  const data = await res.json()
  return data.products || []
}

export async function createCart() {
  const res = await fetch(`${MEDUSA_URL}/store/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_KEY || '',
    },
  })
  const data = await res.json()
  return data.cart
}

export async function addToCart(cartId: string, variantId: string) {
  const res = await fetch(`${MEDUSA_URL}/store/carts/${cartId}/line-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_KEY || '',
    },
    body: JSON.stringify({ variant_id: variantId, quantity: 1 }),
  })
  const data = await res.json()
  return data.cart
}