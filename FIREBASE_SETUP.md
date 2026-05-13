# Firebase Hosting Setup Guide

Your dashboard is ready for Firebase Hosting! Follow these steps:

## Prerequisites
- Google/Firebase account
- Firebase CLI installed

## Step-by-Step Deployment

### 1. Install Firebase CLI (if not already installed)

```bash
# Option A: Install via npm
npm install -g firebase-tools

# Option B: Install standalone (Mac)
curl -sL https://firebase.tools | bash

# Option C: Download from Firebase Console
# Visit: https://firebase.google.com/docs/cli
```

### 2. Login to Firebase

```bash
cd /Users/jritchie/.aisuite/notebook/2026-05-09/eventforce-fy27
firebase login
```

This will open a browser window to authenticate with Google.

### 3. Create Firebase Project

**Option A: Via Firebase Console (Recommended)**
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Project name: `eventforce-fy27` (or your choice)
4. Disable Google Analytics (optional for hosting-only)
5. Click "Create project"

**Option B: Via CLI**
```bash
firebase projects:create eventforce-fy27
```

### 4. Initialize Firebase Hosting

The configuration files are already created:
- ✅ `firebase.json` - Hosting configuration
- ✅ `.firebaserc` - Project association

If you used a different project name, update `.firebaserc`:
```json
{
  "projects": {
    "default": "YOUR-PROJECT-ID"
  }
}
```

### 5. Deploy to Firebase

```bash
firebase deploy
```

This will:
- Upload `index.html` to Firebase Hosting
- Configure caching and routing rules
- Provide you with a live URL: `https://eventforce-fy27.web.app`

### 6. View Your Dashboard

After deployment, your dashboard will be live at:
- **Primary URL**: `https://eventforce-fy27.web.app`
- **Secondary URL**: `https://eventforce-fy27.firebaseapp.com`

## Benefits of Firebase Hosting

✅ **Fast Global CDN** - Served from 180+ locations worldwide  
✅ **Free SSL Certificate** - Automatic HTTPS  
✅ **Zero Downtime Deploys** - Instant rollbacks  
✅ **Custom Domain Support** - Add your own domain  
✅ **Version History** - Rollback to any previous deploy  
✅ **Preview Channels** - Test before going live  

## Future Enhancements

Once on Firebase Hosting, you can easily add:
- **Firestore Database** - Replace hardcoded event data with real-time database
- **Firebase Authentication** - Secure edit access
- **Cloud Functions** - Server-side logic
- **Real-time Sync** - Multi-user collaboration

## Useful Commands

```bash
# Check deployment status
firebase hosting:channel:list

# Deploy to preview channel (test before production)
firebase hosting:channel:deploy preview

# View deployment history
firebase deploy:list

# Rollback to previous version
firebase hosting:rollback

# Add custom domain
firebase hosting:domain:add yourdomain.com
```

## Troubleshooting

**Issue: "firebase: command not found"**
- Reinstall Firebase CLI using one of the methods above
- Check PATH: `echo $PATH | grep firebase`

**Issue: "Project not found"**
- Verify project exists: `firebase projects:list`
- Update `.firebaserc` with correct project ID

**Issue: "Permission denied"**
- Run: `firebase login --reauth`
- Ensure you're logged in with correct Google account

## Next Steps

1. Run `firebase login`
2. Create project in Firebase Console
3. Run `firebase deploy`
4. Share your new URL: `https://eventforce-fy27.web.app`

---

**Your dashboard is ready to deploy!** 🚀
