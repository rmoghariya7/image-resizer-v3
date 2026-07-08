"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

let hasInitialized = false;

export function MicrosoftClarity({ projectId }: { projectId: string }) {
  useEffect(() => {
    if (hasInitialized) return;
    hasInitialized = true;
    Clarity.init(projectId);
  }, [projectId]);

  return null;
}
