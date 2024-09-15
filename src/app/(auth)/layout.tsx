import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - SecretNotes',
  description: 'Authentication pages for SecretNotes',
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
