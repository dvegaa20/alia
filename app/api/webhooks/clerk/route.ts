import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(',') || []
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Verify the webhook signature
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle user.created event
  if (evt.type === 'user.created') {
    const { id, email_addresses } = evt.data
    const primaryEmail = email_addresses.find((e) => e.id === evt.data.primary_email_address_id)
    const email = primaryEmail?.email_address

    console.log(`New user created: ${email}`)

    // Check if email is in allowlist
    if (!email || !ALLOWED_EMAILS.includes(email)) {
      console.log(`Email ${email} not in allowlist, deleting user...`)

      try {
        const client = await clerkClient()
        await client.users.deleteUser(id)
        console.log(`User ${id} deleted successfully`)
      } catch (error) {
        console.error('Error deleting user:', error)
      }

      return NextResponse.json({ message: 'User not allowed, deleted' })
    }

    console.log(`Email ${email} is allowed`)
  }

  return NextResponse.json({ message: 'Webhook processed' })
}
