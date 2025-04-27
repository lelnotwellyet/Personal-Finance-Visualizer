import './globals.css';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <main className="p-4 md:p-8 max-w-4xl mx-auto">
          {children}
          <Toaster position="top-right" richColors />
        </main>
      </body>
    </html>
  );
}