import { permanentRedirect } from 'next/navigation'

// 308 permanent redirect: /goals → /tools
export default function GoalsListingRedirect() {
  permanentRedirect('/tools')
}
