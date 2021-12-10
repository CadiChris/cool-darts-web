import * as Sentry from "@sentry/react";

export function initSentry() {
  Sentry.init({
    dsn: "https://de19bc121e2949579a171012cc4894e8@o379759.ingest.sentry.io/6103052",
  });
}
