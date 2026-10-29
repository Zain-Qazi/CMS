# Mobile-Controlled Static Website (Zero-Cost Headless CMS)

A complete demonstration setup showing how a static website can be hosted for free (via GitHub Pages/Vercel) and updated dynamically using a Mobile App via the **GitHub REST API**.

---

## 📁 Repository Structure

- `index.html` — The fast, responsive static website. Automatically fetches data from `data.json`.
- `data.json` — The lightweight database file storing site content.
- `.github/workflows/deploy.yml` — (Optional) GitHub Actions workflow to auto-deploy or invalidate cache upon data updates.

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Create a Personal Access Token (PAT)
To allow the Mobile App to write/update `data.json` on GitHub:
1. Go to **GitHub Settings** -> **Developer Settings** -> **Personal Access Tokens** -> **Fine-grained tokens**.
2. Click **Generate new token**.
3. Set **Repository access** to `Only select repositories` and select this repository.
4. Set **Permissions**:
   - **Contents**: `Read & Write`
5. Generate and copy the token. *(Keep it safe! Use it in the Mobile App HTTP header).*

---

### Step 2: Enable GitHub Pages (Free Hosting)
1. Push this code to a GitHub repository.
2. Navigate to **Settings** -> **Pages** in your repository.
3. Under **Build and deployment**, select **Source** as `Deploy from a branch`.
4. Choose `main` (or `master`) branch and `/ (root)` folder.
5. Click **Save**. Your site will be live within 1–2 minutes!

---

### Step 3: Mobile App Integration (GitHub REST API)

To update content from C# / Flutter / React Native, execute a 2-step API call:

#### 1. Fetch current `sha` hash of `data.json`:
- **GET**: `https://api.github.com/repos/{owner}/{repo}/contents/data.json`
- **Header**: `Authorization: Bearer <YOUR_PAT_TOKEN>`

#### 2. Push updated JSON data:
- **PUT**: `https://api.github.com/repos/{owner}/{repo}/contents/data.json`
- **Headers**:
  - `Authorization: Bearer <YOUR_PAT_TOKEN>`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "message": "Content updated via Mobile App",
  "content": "<BASE64_ENCODED_JSON_STRING>",
  "sha": "<SHA_HASH_FROM_STEP_1>"
}
```

---

## 💡 Benefits for Business Clients
1. **Zero Monthly Fee**: Hosted 100% free on GitHub Pages.
2. **Lightning Fast**: Static HTML loads instantly.
3. **Data Ownership**: All data resides safely inside the client's GitHub ecosystem.
