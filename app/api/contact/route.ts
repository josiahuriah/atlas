import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Save to database if configured (optional — SQLite is unavailable on Vercel)
    let submissionId: number | null = null
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma')
        const submission = await prisma.contactSubmission.create({
          data: {
            name,
            email,
            phone: phone || null,
            service: service || null,
            message,
          },
        })
        submissionId = submission.id
      } catch (dbError) {
        // Log but don't fail — email notification is the primary channel
        console.error('DB save failed:', dbError)
      }
    }

    // Send email notification
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set — cannot deliver contact form email.')
      if (!submissionId) {
        return NextResponse.json(
          { error: 'Something went wrong. Please try again or contact us directly.' },
          { status: 500 }
        )
      }
    } else {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { error: sendError } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Atlas Brokerage <noreply@atlasbrokeragecompany.com>',
        to: process.env.CONTACT_EMAIL || 'info@atlasbrokeragecompany.com',
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #888; font-size: 12px;">
            ${submissionId ? `Submission ID: ${submissionId} | ` : ''}${new Date().toLocaleString()}
          </p>
        `,
      })

      if (sendError) {
        console.error('Resend API error:', sendError)
        if (!submissionId) {
          return NextResponse.json(
            { error: 'Something went wrong. Please try again or contact us directly.' },
            { status: 500 }
          )
        }
      }
    }

    return NextResponse.json({ success: true, id: submissionId }, { status: 201 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}
