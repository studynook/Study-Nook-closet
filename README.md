# Study Nook — Avatar Closet 🎀🌷

A standalone, beginner-friendly Avatar Closet built with plain HTML, CSS and JavaScript for **GitHub Pages → Google Sites Embed**. This project intentionally does not include Study Nook's dashboard, timer, calendar, study rooms, AI, resources, statistics, or an XP-earning system.

## 1. How it works

GitHub repository → GitHub Pages → embedded in Google Sites.

The main Study Nook owns XP. The Avatar Closet only receives XP, calculates which closet items are currently available, lets the student equip them, and saves/sends an avatar configuration.

## 2. Files

- `index.html` — page markup
- `style.css` — scrapbook UI and responsive layout
- `config.js` — editable item database, XP requirements, parent origin, development mode
- `storage.js` — local development persistence for avatar configuration
- `avatar.js` — layered avatar renderer
- `xp-integration.js` — secure-ish cross-window message interface; validates the expected parent origin
- `app.js` — closet UI, equip/save/reset/unlock logic
- `assets/avatars/...` — original local SVG avatar layers using one 320×420 coordinate system

## 3. Development mode

Open `config.js`:

```js
DEV_MODE: true,
DEV_XP: 480,
```

This is test XP only. Production XP must come from the main Study Nook. When integration is ready, set `DEV_MODE: false`.

## 4. Set the allowed Google Sites parent origin

In `config.js`, change:

```js
EXPECTED_PARENT_ORIGIN: "https://sites.google.com"
```

Use the exact origin that actually hosts/sends your parent integration messages. Incoming messages are ignored unless their `event.origin` matches the configured origin (development same-origin messages are also accepted while DEV_MODE is on).

## 5. XP message API

### Main Study Nook → Avatar Closet

```js
avatarFrame.contentWindow.postMessage({
  type: "STUDY_NOOK_XP_UPDATE",
  xp: currentXP
}, avatarOrigin);
```

Also supported: `SET_XP` with the same `xp` field.

On startup the closet sends:

```js
{ type: "REQUEST_XP" }
{ type: "REQUEST_AVATAR" }
```

### Set an existing avatar

```js
avatarFrame.contentWindow.postMessage({
  type: "SET_AVATAR",
  avatar: savedAvatarConfig
}, avatarOrigin);
```

### Avatar Closet → Main Study Nook

When the student clicks **Save Look ♡**:

```js
{
  type: "AVATAR_UPDATED",
  avatar: { /* JSON-compatible avatar configuration */ }
}
```

The image is not the source of truth. The configuration is.

## 6. Public JavaScript API

For standalone/same-window testing:

```js
StudyNookAvatar.getAvatarConfig()
StudyNookAvatar.setAvatarConfig(config)
StudyNookAvatar.getUnlockedItems()
StudyNookAvatar.getCurrentXP()
```

Inside a Google Sites iframe, use `postMessage` as the primary interface instead of assuming direct parent access.

## 7. Add a clothing/accessory item

1. Create an SVG/PNG using the same **320×420** canvas/coordinate system as the other avatar layers.
2. Put it in the matching `assets/avatars/...` folder.
3. Add one object to `StudyNookConfig.items` in `config.js`:

```js
{
  id: "new-cardigan",
  category: "tops",
  name: "New Cardigan",
  xpRequired: 800,
  asset: "assets/avatars/tops/new-cardigan.svg"
}
```

For stackable accessories, add `multi: true`.

## 8. Change an XP requirement

Edit only `xpRequired` in `config.js`. Unlock status is always recalculated from:

`current XP >= xpRequired`

The project does not permanently store “unlocked item X” as the source of truth.

## 9. GitHub Pages deployment

1. Create a GitHub repository.
2. Upload the contents of this project so `index.html` is at the repository root.
3. Open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save and wait for the GitHub Pages URL.
7. Open that URL and test the closet.

## 10. Embed in Google Sites

1. In Google Sites, edit your existing Study Nook page.
2. Choose **Insert → Embed → By URL**.
3. Paste the GitHub Pages URL.
4. Resize the embed so the closet has enough vertical space.
5. Publish and test on desktop and mobile.

Note: Google Sites can introduce iframe nesting/hosting constraints. The main Study Nook integration code must send messages to the actual Avatar Closet iframe window and use the exact Avatar Closet origin as the `targetOrigin`. Verify `event.origin` in browser developer tools during integration.

## 11. Production storage

This starter uses localStorage only for the avatar configuration during development. It is intentionally isolated behind `AvatarStorage`, so you can later replace that module with Firebase/shared account storage without rebuilding the closet UI. XP should still remain owned by the main Study Nook system.
