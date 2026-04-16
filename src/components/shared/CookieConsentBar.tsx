"use client";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";

export const COOKIE_CONSENT_STORAGE_KEY = "home_central_cookie_consent";

type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
}

function pushConsentUpdate(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

type CookieConsentBarWithGaProps = {
  measurementId: string;
  privacyPolicyUrl: string;
};

function CookieConsentBarWithGa({
  measurementId,
  privacyPolicyUrl,
}: CookieConsentBarWithGaProps) {
  const [hydrated, setHydrated] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    setShowBar(readStoredConsent() === null);
    setHydrated(true);
  }, []);

  const saveChoice = useCallback((value: ConsentValue) => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
    setShowBar(false);
    pushConsentUpdate(value === "granted");
  }, []);

  const gaInlineInit = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
`;

  return (
    <>
      <Script id="cookie-consent-ga-init" strategy="afterInteractive">
        {gaInlineInit}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
          measurementId,
        )}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window.gtag !== "function") return;
          window.gtag("js", new Date());
          const stored = readStoredConsent();
          if (stored === "granted") {
            pushConsentUpdate(true);
          }
          window.gtag("config", measurementId);
        }}
      />

      {hydrated && showBar ? (
        <Paper
          component="aside"
          aria-label="Cookie notice"
          elevation={6}
          sx={(theme) => ({
            position: "fixed",
            insetInline: 16,
            bottom: 16,
            zIndex: theme.zIndex.snackbar,
            maxWidth: 560,
            mx: "auto",
            overflow: "hidden",
            borderRadius: "22px",
            border: "1px solid var(--Colors-Neutral-100, #eeedec)",
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--Primary-50, #ebd8d8) 82%, white) 0%, white 48%, color-mix(in srgb, var(--Secondary-50, #f1f1ff) 76%, white) 100%)",
            boxShadow:
              "0 24px 60px color-mix(in srgb, var(--Colors-Neutral-900, #23201f) 14%, transparent)",
            backdropFilter: "blur(12px)",
          })}
        >
          <Stack
            spacing={1.75}
            sx={{
              p: { xs: 1.75, sm: 2.1 },
            }}
          >
            <Stack spacing={1}>
              <Typography
                component="span"
                sx={{
                  alignSelf: "flex-start",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--secondary-500-main, #181464)",
                  opacity: 0.82,
                }}
              >
                Cookie preferences
              </Typography>
              <Stack spacing={0.75}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "var(--Colors-Neutral-900, #23201f)",
                  }}
                >
                  Your privacy matters to us
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.7,
                    color: "var(--Colors-Neutral-700, #66605c)",
                  }}
                >
                  We use essential cookies to keep the site secure and working
                  properly. With your permission, we also use analytics cookies
                  to understand how visitors use the site so we can keep
                  improving the experience.
                </Typography>
              </Stack>
            </Stack>
            <Paper
              elevation={0}
              sx={{
                p: 1.25,
                borderRadius: "16px",
                border: "1px solid var(--Colors-Neutral-100, #eeedec)",
                bgcolor:
                  "color-mix(in srgb, var(--Colors-Neutral-50, #f5f4f4) 82%, white)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.65,
                  color: "var(--Colors-Neutral-800, #433F3C)",
                }}
              >
                If you accept analytics, anonymous usage insights help us
                improve performance, navigation, and content. Essential only
                keeps analytics off while you browse normally.{" "}
                <Link
                  href={privacyPolicyUrl}
                  underline="hover"
                  sx={{
                    fontWeight: 600,
                    color: "var(--primary-500-main, #841618)",
                    textDecorationColor:
                      "color-mix(in srgb, var(--primary-500-main, #841618) 45%, white)",
                  }}
                >
                  Privacy policy
                </Link>
                .
              </Typography>
            </Paper>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="flex-end"
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Button
                  type="button"
                  variant="outline"
                  size="small"
                  sx={{
                    minWidth: { sm: 150 },
                    borderColor: "var(--Colors-Neutral-500, #a7a19d)",
                    color: "var(--Colors-Neutral-900, #23201f)",
                    bgcolor: "rgba(255,255,255,0.78)",
                    "&:hover": {
                      bgcolor:
                        "color-mix(in srgb, var(--Colors-Neutral-50, #f5f4f4) 86%, white)",
                      borderColor: "var(--secondary-500-main, #181464)",
                    },
                  }}
                  onClick={() => saveChoice("denied")}
                >
                  Essential only
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="small"
                  sx={{
                    minWidth: { sm: 150 },
                    boxShadow:
                      "0 14px 28px color-mix(in srgb, var(--primary-500-main, #841618) 24%, transparent)",
                  }}
                  onClick={() => saveChoice("granted")}
                >
                  Accept analytics
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      ) : null}
    </>
  );
}

/**
 * GA4 with Consent Mode: analytics_storage defaults to denied until the user
 * chooses Accept analytics. Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 */
export default function CookieConsentBar() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!measurementId) return null;

  const privacyPolicyUrl =
    process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim() ||
    "/policies?tab=privacy-policy";

  return (
    <CookieConsentBarWithGa
      measurementId={measurementId}
      privacyPolicyUrl={privacyPolicyUrl}
    />
  );
}
