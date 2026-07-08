import { GoogleAnalytics } from "@next/third-parties/google";
import { MicrosoftClarity } from "./microsoft-clarity";

// Both integrations only load in production, and only when their env
// variable is configured -- otherwise they render nothing.
export function Analytics() {
  const isProduction = process.env.NODE_ENV === "production";

  const gaId = isProduction
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    : undefined;
  const clarityProjectId = isProduction
    ? process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
    : undefined;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {clarityProjectId && <MicrosoftClarity projectId={clarityProjectId} />}
    </>
  );
}
