# Security Guide

This document outlines the security headers and best practices for this project.

## Security Headers

Deployed apps include the following HTTP security headers (configured in `vercel.json`, `netlify.toml`, and `public/_headers`):

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Enforce HTTPS |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restrict browser features |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolate browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Restrict cross-origin reads |
| `Content-Security-Policy` | See below | Restrict resource loading |

### Content Security Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' static.cloudflareinsights.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self';
connect-src 'self' https: static.cloudflareinsights.com;
media-src 'none';
object-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

**Note**: `connect-src 'self' https: static.cloudflareinsights.com` allows connections to any HTTPS origin and Cloudflare Insights. For production, narrow this to your specific API domain(s):

```
connect-src 'self' https://api.yourdomain.com
```

### Source of Truth

The canonical CSP lives in `src/lib/constants/security-headers.ts`. Platform configs (`vercel.json`, `netlify.toml`, `wrangler.toml`, `public/_headers`) mirror it. Run `pnpm validate:csp` to verify they stay in sync.

## Production Checklist

Before deploying to production:

- [ ] Narrow CSP `connect-src` to your specific API domain
- [ ] Enable HSTS preload (submit to [hstspreload.org](https://hstspreload.org))
- [ ] Set up HTTPS with valid TLS certificate
- [ ] Run `pnpm audit` and address high/critical vulnerabilities
- [ ] Verify CSP headers with [CSP Evaluator](https://csp-evaluator.withgoogle.com)

## References

- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Scott Helme — Hardening HTTP Response Headers](https://scotthelme.co.uk/hardening-your-http-response-headers/)
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
