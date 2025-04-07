const { CLOUDFLARE_ACCOUNT_ID, PROJECT_NAME, CLOUDFLARE_API_TOKEN } =
  process.env

assert.ok(CLOUDFLARE_ACCOUNT_ID, 'CLOUDFLARE_ACCOUNT_ID is required')
assert.ok(PROJECT_NAME, 'PROJECT_NAME is required')
assert.ok(CLOUDFLARE_API_TOKEN, 'CLOUDFLARE_API_TOKEN is required')

// API docs:
// https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/deployments/methods/create/
const res = await fetch(
  'https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  },
)

if (!res.ok) {
  console.error(
    `Failed to deploy: ${res.status} ${await res.text().catch((err) => err.message)}`,
  )
  process.exit(1)
}

const body = await res.json()
console.log('Response: %o', body)

if (!body.success) {
  console.error(`Failed to deploy: ${body.errors[0].message}`)
  process.exit(1)
}

console.log('Triggered a new deployment.')
console.log(
  `https://dash.cloudflare.com/${CLOUDFLARE_ACCOUNT_ID}/pages/view/${PROJECT_NAME}/${body.result.id}`,
)
