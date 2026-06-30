import Link from 'next/link'

export default function GoalNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-indigo-500">404</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
        Tool not found
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        This tool doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Browse all tools
      </Link>
    </main>
  )
}
