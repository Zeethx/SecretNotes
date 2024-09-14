import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - feedbacks.me',
  description: 'Authentication pages for feedbacks.me',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="auth-layout">
      {children}
    </div>
  )
}
