# Birthday Website - Setup Instructions 🎂✨

## 📁 Required Files to Add

### 1. Photos for Gallery
Place your photos in `public/photos/` folder:
- `1.jpg` - Photo 1
- `2.jpg` - Photo 2
- `3.jpg` - Photo 3
- `4.jpg` - Photo 4
- `5.jpg` - Photo 5
- `6.jpg` - Photo 6
- `7.jpg` - Photo 7
- `8.jpg` - Photo 8
- `9.jpg` - Photo 9

### 2. Background Video
- `public/birthday-video.mp4` - Background video that responds to scroll

### 3. Music File (Optional)
- `public/our-song.mp3` - Your special song for the music player

### 4. 3D Photo Cube (Optional - requires installation)
If you want to use the 3D photo cube, install dependencies:
```bash
npm install three @react-three/fiber @react-three/drei
```
Then add photos:
- `public/photos/cube1.jpg`
- `public/photos/cube2.jpg`
- `public/photos/cube3.jpg`
- `public/photos/cube4.jpg`
- `public/photos/cube5.jpg`
- `public/photos/cube6.jpg`

## 🎨 Features Implemented

### ✅ Completed
1. **Custom Fonts** - Pacifico for headings, Caveat for handwriting style
2. **Expanded Cake Card** - Wider, more prominent cake cutting section
3. **Clearer Video Background** - Reduced overlay opacity for better visibility
4. **Photo Gallery** - Ready for your photos (paths: `/photos/1.jpg` to `/photos/9.jpg`)
5. **Mouse-Follow Confetti** - Diwali-style confetti that follows mouse movement
6. **Interactive Music Player** - Vintage vinyl-style player for your special song
7. **Countdown Timer** - Counts down to next birthday
8. **Draggable Scrapbook** - Interactive stickers you can drag and arrange
9. **Fortune Cookies** - Click to reveal sweet messages
10. **Polaroid Photo Booth** - Capture and download screenshots in polaroid frames
11. **Custom Heart Cursor** - Cute heart-shaped cursor throughout the site
12. **Ambient Particles** - Gentle floating hearts, stars, and emojis
13. **Page Transitions** - Smooth animations between sections
14. **Easter Eggs** - Konami code (↑↑↓↓←→←→BA) triggers special confetti explosion

### 🎯 Interactive Features

#### Mouse-Follow Confetti
- Move your mouse around the page
- Confetti particles follow your cursor
- Works like the Google Diwali feature

#### Cake Cutting
- Click and drag across the cake to cut it
- The cake splits into two pieces with animation
- Triggers confetti celebration

#### Fortune Cookies
- Click each cookie to reveal a message
- 9 special messages to discover

#### Scrapbook
- Click stickers from the palette
- Drag them anywhere on the page
- Create your own unique design

#### Polaroid Booth
- Captures the current page section
- Download as a polaroid-style photo

#### Konami Code
Try entering: ↑ ↑ ↓ ↓ ← → ← → B A
(Use arrow keys, then press 'b' and 'a' keys)

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 Customization Tips

### Update Birthday Date
Edit `src/components/Countdown.tsx`:
```typescript
nextBirthday.setMonth(10); // 0-indexed (10 = November)
nextBirthday.setDate(16);
```

### Add Your Own Messages
Edit `src/components/FortuneCookies.tsx` to customize the fortune messages.

### Customize Music Player
Replace `/our-song.mp3` with your special song.

### Adjust Confetti Settings
Edit `src/components/MouseFollowConfetti.tsx`:
- `throttleDelay` - How often confetti appears
- `particleCount` - Number of particles
- `colors` - Color palette

## 💝 Personal Touches

- All headings use the elegant "Pacifico" font
- Handwritten style text uses "Caveat" font
- Heart-shaped cursor for a romantic feel
- Gentle ambient particles create a dreamy atmosphere
- Smooth page transitions enhance the experience

## 🎁 What Makes This Special

This isn't just a birthday website - it's an interactive experience filled with:
- **10+ interactive sections** to explore
- **Custom animations** throughout
- **Surprise elements** (easter eggs, confetti)
- **Personal touches** (music, photos, messages)
- **Memories section** for your photos together

Enjoy creating something truly magical for her! 💖✨
