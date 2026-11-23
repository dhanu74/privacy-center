# Privacy Center

A GitHub Pages website for hosting privacy policies for multiple apps.

## 1. Create the repository
Create a GitHub repository named `privacy-center` and upload all files in this folder.

## 2. Edit your developer details
Open `apps.json` and replace:
- `Your Developer Name`
- `your-email@example.com`
- app names, package IDs, descriptions and policy paths

## 3. Enable GitHub Pages
In your repository:
1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to the `main` branch. The workflow publishes the site automatically.

Your site will be:
`https://YOUR-USERNAME.github.io/privacy-center/`

## 4. Add another application
1. Create a folder such as `policies/my-new-app/`.
2. Copy one of the existing policy `index.html` files into it and edit the policy.
3. Add an entry to `apps.json`, including its `slug`, `name`, `packageId`, `description`, and `policyPath`.
4. Commit and push. The app appears on the homepage and its policy gets published.

## Important
This starter is a static public website. It does not contain a secure web-based editor or login system yet.
Do not put GitHub access tokens or passwords in HTML/JavaScript. A secure editor will need GitHub OAuth plus a server-side component (for example, Cloudflare Workers).
