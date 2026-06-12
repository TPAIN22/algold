# Al Gold — How to Launch Your Store

> Follow these steps in order. Each section builds on the previous one.
> Total time: about 30–45 minutes if you're doing this for the first time.

---

## What You'll Need Before Starting

- A computer with internet access
- A free account on [supabase.com](https://supabase.com) (your database)
- A free account on [vercel.com](https://vercel.com) (your website host)
- A free account on [github.com](https://github.com) (to store your code)
- [Node.js](https://nodejs.org) installed on your computer (download the LTS version)

---

## Step 1 — Set Up Your Database (Supabase)

Supabase is where your products, categories, and admin login will be stored. It's free.

### 1.1 — Create a Supabase Account and Project

1. Go to [supabase.com](https://supabase.com) and click **Start your project** (sign up for free)
2. Once logged in, click **New Project**
3. Fill in:
   - **Name:** `algold` (or anything you like)
   - **Database Password:** create a strong password and **save it somewhere safe**
   - **Region:** pick the one closest to Saudi Arabia (e.g. `Singapore` or `Frankfurt`)
4. Click **Create new project** and wait about 1–2 minutes for it to finish

### 1.2 — Create Your Database Tables

This step sets up all the tables your store needs (products, categories, etc.)

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `supabase/migrations/001_schema.sql` on your computer (in the project folder)
4. Copy **everything** in that file and paste it into the SQL Editor
5. Click the green **Run** button
6. You should see a success message at the bottom — if you see an error, make sure you copied the entire file

### 1.3 — Add Sample Products (Optional but Recommended)

This adds some example products so your store isn't empty from the start.

1. Click **New query** again in the SQL Editor
2. Open `supabase/migrations/002_seed.sql` on your computer
3. Copy everything and paste it into the SQL Editor
4. Click **Run**

### 1.4 — Create Your Admin Login

This is the email and password you'll use to log in to your store's admin panel.

1. In Supabase, click **Authentication** in the left sidebar
2. Click **Users** at the top
3. Click **Add user** → **Create new user**
4. Enter:
   - **Email:** your email address (e.g. `admin@algold.com`)
   - **Password:** a strong password (save it!)
5. Click **Create user**

> ⚠️ Keep this email and password private. Anyone with it can manage your store.

### 1.5 — Get Your API Keys

These are secret codes that connect your website to your database.

> **Note:** Supabase updated their key naming in 2025. The keys are now called **publishable** and **secret** instead of "anon" and "service_role". Both the old and new keys work the same way — just use whatever your dashboard shows.

1. In Supabase, click **Settings** (gear icon) in the left sidebar
2. Click **API Keys**
3. You'll see these values — copy them all and save them somewhere safe:

   | What it's called | What it looks like | What it's for |
   |---|---|---|
   | **Project URL** | `https://abcdefgh.supabase.co` | Your project's address |
   | **Publishable key** *(previously "anon" key)* | starts with `sb_publishable_...` | Safe to use in the browser |
   | **Secret key** *(previously "service_role" key)* | starts with `sb_secret_...` | Only used on the server |

> ⚠️ The **secret key** gives full access to your database bypassing all security rules. Never share it, never put it in your frontend code, and never commit it to GitHub.

### 1.6 — Check the Storage Bucket

The SQL migration should have created a storage bucket for product images automatically. Let's verify.

1. Click **Storage** in the Supabase left sidebar
2. You should see a bucket called **products**
3. If it's not there:
   - Click **New bucket**
   - Name: `products`
   - Toggle **Public bucket** to ON
   - Click **Save**

---

## Step 2 — Run the Website on Your Computer (Optional)

You can preview the website on your own computer before putting it online. Skip to Step 3 if you just want to go live.

### 2.1 — Create the Environment File

Your website needs to know your Supabase keys. We store them in a hidden file.

1. In the project folder on your computer, find the file called `.env.local.example`
2. Make a copy of it and rename the copy to `.env.local`
3. Open `.env.local` with a text editor (Notepad, VS Code, etc.)
4. Replace the placeholder values with your real keys from Step 1.5:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_actual_key_here
SUPABASE_SECRET_KEY=sb_secret_your_actual_key_here
```

> The variable names must match exactly as written above — the code looks for these specific names.

5. Save the file

### 2.2 — Start the Website

Open a terminal (Command Prompt or PowerShell) in the project folder and run:

```
npm run dev
```

Then open your browser and go to: **http://localhost:3000**

You should see your Al Gold store! To stop it, press `Ctrl + C` in the terminal.

---

## Step 3 — Put Your Code on GitHub

Vercel (your host) needs to read your code from GitHub. Think of GitHub as a cloud backup for your code.

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** button (top right) → **New repository**
3. Name it `algold`
4. Leave it as **Private** (so your code stays private)
5. Click **Create repository**
6. GitHub will show you some commands — follow the **"push an existing repository"** section

If you're not comfortable with Git commands, download [GitHub Desktop](https://desktop.github.com) — it has a visual interface.

---

## Step 4 — Deploy to Vercel (Put Your Store Online)

### 4.1 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (you can sign up with your GitHub account — recommended)
2. Click **Add New…** → **Project**
3. Find your `algold` repository in the list and click **Import**

### 4.2 — Add Your Secret Keys to Vercel

Before clicking Deploy, you need to add your Supabase keys so the live website can connect to your database.

1. On the Vercel import screen, look for the **Environment Variables** section
2. Add each of these one by one (click **Add** after each):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your publishable key (`sb_publishable_...`) |
   | `SUPABASE_SECRET_KEY` | Your secret key (`sb_secret_...`) |

3. Click **Deploy**
4. Wait 1–2 minutes while Vercel builds your website
5. When it's done, you'll get a link like `algold.vercel.app` — that's your live store! 🎉

---

## Step 5 — Log In and Add Your Products

### 5.1 — Access the Admin Panel

Open your browser and go to:

```
https://your-store.vercel.app/admin/login
```

(Replace `your-store` with your actual Vercel domain)

Log in with the email and password you created in Step 1.4.

### 5.2 — Add Categories First

Categories help you organize products (e.g. "Traditional Thobes", "Abayas", "Accessories").

1. Click **Categories** in the left sidebar
2. Click **Add Category**
3. Type the category name — the slug fills in automatically
4. Click **Create Category**
5. Repeat for each category you want

### 5.3 — Add Your Products

1. Click **Products** in the left sidebar
2. Click **Add Product**
3. Fill in:
   - **Product Name** — e.g. "Embroidered Gold Thobe"
   - **Price** — in Saudi Riyals (SAR)
   - **Category** — pick from the list
   - **Description** — describe the product, fabric, size, etc.
   - **Image** — click "Upload Image" and choose a photo from your computer
   - **In Stock** — check this if the item is available
   - **Featured** — check this to show the product on the homepage
4. Click **Create Product**

### 5.4 — View Your Store

Go to `https://your-store.vercel.app` to see your store with your products.

Customers can browse products and click **Order via WhatsApp** to send you a message directly.

---

## Step 6 — Change the WhatsApp Number (If Needed)

The store currently sends orders to **+966563963954**. To change it:

1. Open the file `lib/utils.ts` in the project folder
2. Find this line:
   ```
   const phone = "966563963954";
   ```
3. Replace `966563963954` with your WhatsApp number (country code + number, no + sign or spaces)
   - Example for a Saudi number: `966501234567`
   - Example for a UAE number: `971501234567`
4. Save the file
5. Push the change to GitHub — Vercel will automatically redeploy

---

## Final Checklist ✅

Go through this list to make sure everything is working:

- [ ] Supabase tables were created (Step 1.2)
- [ ] Admin login was created (Step 1.4)
- [ ] Environment variables were added to Vercel (Step 4.2)
- [ ] You can log in at `/admin/login`
- [ ] You added at least 1 category
- [ ] You added at least 1 product with a photo
- [ ] The product appears on the homepage (if marked as Featured)
- [ ] The WhatsApp button opens the correct chat
- [ ] The store looks good on your phone

---

## Something Went Wrong?

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Products don't show up | Supabase not connected | Check that your 3 env vars in Vercel match exactly what's in `.env.local.example` |
| Images don't load | Storage bucket missing | Re-check Step 1.6 |
| Can't log in to admin | Wrong email/password | Reset it in Supabase → Authentication → Users |
| Changes don't appear on live site | Vercel didn't redeploy | Push your changes to GitHub again |
| "Error" when adding product | Database tables not created | Re-run the SQL from Step 1.2 |
| Keys copied from old Supabase docs don't work | Old "anon"/"service_role" keys deprecated | Go to Settings → **API Keys** and copy the new `sb_publishable_...` and `sb_secret_...` keys |
