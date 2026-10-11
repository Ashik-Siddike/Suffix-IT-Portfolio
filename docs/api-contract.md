# Future contact integration

No backend, API request, authentication, CAPTCHA or persistence is implemented. `src/lib/contact.js` separates validation/email preparation from future delivery. `submitContact()` rejects explicitly until configured. Current forms prepare an email link and never simulate a successful server response.

An eventual approved endpoint could accept:

```http
POST /api/contact
Content-Type: application/json
```

```json
{
  "name": "Full name",
  "email": "person@example.com",
  "company": "Optional company",
  "interest": "Product or service name",
  "message": "Requirements",
  "sourcePath": "/contact"
}
```

Expected successful response: HTTP 202 with `{ "requestId": "opaque-id", "status": "accepted" }`. This means accepted for processing, not delivered. Errors: 400 field validation `{ "errors": { "email": "message" } }`; 429 rate limit with Retry-After; 5xx recoverable delivery failure. The frontend should prevent repeat submissions while pending, preserve values on failure, and distinguish acceptance from delivery. Server-side validation, spam protection, origin restrictions, rate limits, data retention and consent copy belong to the eventual service owner. No API secret may be placed in Vite client variables.
