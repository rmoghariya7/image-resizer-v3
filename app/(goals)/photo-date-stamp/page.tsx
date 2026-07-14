import { redirect } from "next/navigation";

// This route permanently moved to /add-name-and-date-on-photo — an exact-match
// URL to the query "add name and date to photo" that the top-ranking
// competitors for this tool (Pi7, WebUtility.io, Pixellize.io, Pokecut) all
// use. next.config.ts also has a 301 redirects() entry for this path; this
// page-level redirect is a defense-in-depth fallback in case that config
// redirect is ever bypassed (e.g. a stale cached route). The registry entry
// for the old `photo-date-stamp` key was removed, so this page can no longer
// import the old content/tool lookup — see
// app/(goals)/add-name-and-date-on-photo/ for the live page.
//
// DEAD FOLDER — this whole `app/(goals)/photo-date-stamp/` directory
// (this file, content.ts, opengraph-image.tsx, _components/PhotoDateStampSection.tsx)
// is now orphaned. The sandbox used to build this change could not delete
// tracked files (filesystem permission restriction) — please remove it with
// `git rm -r "app/(goals)/photo-date-stamp"`.
export default function PhotoDateStampPage() {
  redirect("/add-name-and-date-on-photo");
}
