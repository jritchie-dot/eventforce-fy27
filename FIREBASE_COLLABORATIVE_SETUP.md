# Firebase Collaborative Dashboard Setup Guide

Transform your EventForce FY27 dashboard into a live, real-time collaborative platform!

## 🎯 What You'll Get

- **Real-Time Sync**: Edit from any device, everyone sees changes instantly
- **Secure Authentication**: Only @salesforce.com emails can access
- **Multi-User Editing**: Multiple people can work simultaneously
- **No Deployment Needed**: Data changes appear immediately without redeploying
- **Edit History**: Track who changed what and when

---

## 📋 Prerequisites

- Google/Firebase account
- Firebase CLI installed (optional, for hosting deployment)
- The updated `index.html` with Firebase integration

---

## 🚀 Setup Steps

### Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Add project"** or **"Create a project"**
3. **Project name**: `eventforce-fy27` (or your choice)
4. **Google Analytics**: Disable (optional for this use case)
5. Click **"Create project"**
6. Wait ~30 seconds for project creation

---

### Step 2: Enable Firestore Database

1. In your new project, click **"Build"** in left sidebar
2. Click **"Firestore Database"**
3. Click **"Create database"**
4. **Secure rules**: Choose **"Start in production mode"** (we'll add custom rules)
5. **Location**: Choose nearest region (e.g., `us-central` for US)
6. Click **"Enable"**
7. Wait ~1 minute for Firestore setup

---

### Step 3: Enable Google Authentication

1. In left sidebar, click **"Build" → "Authentication"**
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Click **"Google"** row
5. Toggle **"Enable"**
6. **Project support email**: Select your email from dropdown
7. Click **"Save"**

---

### Step 4: Configure Domain Restrictions (Optional but Recommended)

To restrict access to @salesforce.com emails only:

1. In Firebase Console, go to **"Authentication" → "Settings"**
2. Scroll to **"Authorized domains"**
3. Add your deployment domain (e.g., `eventforce-fy27.web.app` or `jritchie-dot.github.io`)
4. Note: Localhost is already authorized for testing

---

### Step 5: Get Your Firebase Configuration

1. In Firebase Console, click **⚙️ (gear icon)** next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **"Web app"** icon (looks like `</>`)
5. **App nickname**: `EventForce FY27`
6. **Do NOT** check "Also set up Firebase Hosting" (we'll do that separately)
7. Click **"Register app"**
8. You'll see a `firebaseConfig` object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "eventforce-fy27.firebaseapp.com",
  projectId: "eventforce-fy27",
  storageBucket: "eventforce-fy27.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

9. **Copy this entire object!**

---

### Step 6: Update index.html with Your Config

1. Open `index.html` in a text editor
2. Find this section (around line 1866):

```javascript
// Firebase Configuration
// TODO: Replace these values with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. **Replace the entire object** with the config you copied in Step 5
4. **Save the file**

---

### Step 7: Upload Event Data to Firestore

Now we need to migrate your existing event data into Firestore.

#### Option A: Using the Migration Script (Recommended)

1. Open `migrate-to-firestore.html` in a text editor
2. **Update Firebase config** (same as Step 6):
   - Find the `firebaseConfig` object
   - Replace with YOUR config
3. **Copy event data**:
   - Open `index.html` and find `ALL_EVENTS_BACKUP = [...]`
   - Copy the entire array (all events between `[` and `]`)
   - Paste into `migrate-to-firestore.html` in the `EVENTS_TO_UPLOAD = []` array
4. **Save the file**
5. Open `migrate-to-firestore.html` in your browser
6. Click **"Upload Events to Firestore"**
7. Wait for "Migration Complete!" message

#### Option B: Manual Upload via Firebase Console

1. Go to **Firestore Database** in Firebase Console
2. Click **"Start collection"**
3. **Collection ID**: `events`
4. Add documents manually with all event fields

---

### Step 8: Deploy Firestore Security Rules

1. In Firebase Console, go to **"Firestore Database" → "Rules"** tab
2. **Delete all existing rules**
3. Open `firestore.rules` file and **copy all contents**
4. **Paste into the Firebase Console rules editor**
5. Click **"Publish"**

Your rules will now:
- ✅ Require authentication to read/write
- ✅ Restrict access to @salesforce.com emails only
- ❌ Block all other access

---

### Step 9: Test Locally

1. **Open `index.html` in your browser** (directly from file or via local server)
2. You should see the **login screen**
3. Click **"Sign in with Google"**
4. Sign in with a **@salesforce.com email**
5. Dashboard should load with your events
6. Try editing an event → save → verify changes persist on refresh

---

### Step 10: Test Real-Time Sync

1. Open `index.html` in **two browser tabs**
2. **Tab 1**: Edit an event's attendance value → Save
3. **Tab 2**: Watch the value update automatically! ✨

No refresh needed — that's real-time sync!

---

### Step 11: Deploy to Firebase Hosting (Optional)

If you want a shareable URL instead of local files:

#### Install Firebase CLI (if not already installed)

```bash
# Mac/Linux
curl -sL https://firebase.tools | bash

# Or via npm
npm install -g firebase-tools
```

#### Deploy

```bash
cd /path/to/eventforce-fy27
firebase login
firebase deploy
```

Your dashboard will be live at:
- **https://eventforce-fy27.web.app**
- **https://eventforce-fy27.firebaseapp.com**

---

## 🎉 You're Done!

Your dashboard is now a live, collaborative platform!

### What You Can Do Now:

✅ **Share the URL** with your team  
✅ **Edit from anywhere** — changes sync instantly  
✅ **Multi-user editing** — no conflicts, everyone sees updates  
✅ **Secure access** — only @salesforce.com emails allowed  
✅ **Track changes** — see who modified what  

---

## 🔧 Troubleshooting

### Issue: "Access restricted to @salesforce.com emails only"
- **Cause**: Signed in with non-Salesforce email
- **Fix**: Sign out, sign in with @salesforce.com account

### Issue: "Connection lost. Reconnecting..."
- **Cause**: Firestore security rules blocking access
- **Fix**: Verify rules in Step 8 are deployed correctly

### Issue: Login screen stuck on "Checking authentication..."
- **Cause**: Firebase config not updated in index.html
- **Fix**: Complete Step 6 with YOUR Firebase config

### Issue: Events not loading
- **Cause**: No data in Firestore
- **Fix**: Complete Step 7 to upload event data

### Issue: "Permission denied" error
- **Cause**: Security rules too restrictive or auth token expired
- **Fix**: 
  1. Check Firestore rules include @salesforce.com domain
  2. Sign out and sign in again

### Issue: Changes not syncing to other users
- **Cause**: Multiple browser tabs with different users
- **Fix**: This is expected — sync works for same user across tabs. For multi-user, deploy to hosting (Step 11)

---

## 📊 Firestore Costs (Free Tier)

Your dashboard will fit comfortably in Firebase's **free tier**:

| Resource | Free Tier Limit | Your Estimated Usage | % Used |
|----------|----------------|---------------------|--------|
| **Firestore Reads** | 50,000/day | ~2,000/day (20 users) | 4% |
| **Firestore Writes** | 20,000/day | ~100/day | 0.5% |
| **Storage** | 1 GB | <1 MB | <0.1% |
| **Authentication** | Unlimited | N/A | 0% |
| **Hosting** | 10 GB/month | ~100 MB/month | 1% |

**Expected Cost: $0/month** ✅

---

## 🆘 Need Help?

**Firebase Console**: https://console.firebase.google.com/  
**Firestore Docs**: https://firebase.google.com/docs/firestore  
**Firebase CLI Docs**: https://firebase.google.com/docs/cli  

---

**Your EventForce FY27 dashboard is now a real-time collaboration platform!** 🚀
