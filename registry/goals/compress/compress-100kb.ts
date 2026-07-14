// DEAD CODE — not exported from index.ts (only generator.ts's ALL_COMPRESS_GOALS
// is exported), unreachable at runtime. Superseded by the registry-driven
// generateCompressGoal() in generator.ts, which produces the live
// 'compress-image-to-100kb' goal from registry/size-presets. The sandbox used
// to build this change could not delete tracked files (filesystem permission
// restriction) — please remove this file with
// `git rm registry/goals/compress/compress-100kb.ts`.
export {}
