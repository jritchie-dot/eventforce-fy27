# EventForce FY27 - Quick Start Guide

Your dashboard is now ready for real-time collaboration! 🚀

## 🎯 What's New?

Your static dashboard has been transformed into a **live, collaborative platform** with:

- ✅ **Google Sign-In** authentication
- ✅ **Real-time sync** across all users
- ✅ **@salesforce.com** domain restriction
- ✅ **Instant updates** — no refresh needed
- ✅ **Multi-user editing** — everyone sees changes live

---

## ⚡ Quick Setup (15 minutes)

### 1. Create Firebase Project
- Go to https://console.firebase.google.com/
- Create project: `eventforce-fy27`
- Enable **Firestore Database** (production mode)
- Enable **Google Authentication**

### 2. Get Your Config
- Firebase Console → Project Settings → Your apps
- Click Web icon `</>`
- Copy the `firebaseConfig` object

### 3. Update index.html
- Find line ~1866: `const firebaseConfig = { ... }`
- Replace with YOUR config
- Save file

### 4. Upload Events
- Open `migrate-to-firestore.html` in text editor
- Update Firebase config (same as step 3)
- Copy `ALL_EVENTS_BACKUP` from `index.html` → paste into `EVENTS_TO_UPLOAD`
- Open `migrate-to-firestore.html` in browser
- Click "Upload Events to Firestore"

### 5. Deploy Security Rules
- Firebase Console → Firestore Database → Rules tab
- Copy contents of `firestore.rules`
- Paste into console
- Click "Publish"

### 6. Test It!
- Open `index.html` in browser
- Sign in with @salesforce.com email
- Edit an event → save
- Open in second tab → watch it update automatically! ✨

---

## 📁 Files You Need

| File | Purpose |
|------|---------|
| `index.html` | Your dashboard (updated with Firebase) |
| `migrate-to-firestore.html` | One-time data upload script |
| `firestore.rules` | Security rules (copy to Firebase Console) |
| `FIREBASE_COLLABORATIVE_SETUP.md` | Detailed step-by-step guide |

---

## 🚀 Deploy to Web (Optional)

```bash
firebase login
firebase deploy
```

Get live URL: `https://eventforce-fy27.web.app`

---

## 💡 How It Works

### Before (Static)
```
index.html
  ├─ Hardcoded event data
  ├─ Edits stay in browser
  └─ No sync across users
```

### After (Real-Time)
```
index.html
  ├─ Google Sign-In login
  ├─ Firestore real-time listener
  ├─ Edit → Save to Firestore
  └─ All users see changes instantly! ✨
```

---

## 🆘 Troubleshooting

**Login stuck?** → Update Firebase config in `index.html`  
**No events?** → Run migration script  
**"Access denied"?** → Sign in with @salesforce.com email  
**Not syncing?** → Check security rules are deployed  

---

## 📖 Need More Help?

See **FIREBASE_COLLABORATIVE_SETUP.md** for detailed instructions!

---

**Your dashboard is ready for real-time collaboration!** 🎉
