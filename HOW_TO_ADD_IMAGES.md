# How to Add Real Project Images

## Quick Guide

Your project cards now have working image sliders! Currently they're using placeholder images. Here's how to add your real project screenshots:

### Option 1: Add Images to Public Folder (Recommended)

1. Create a folder for project images:

   ```
   public/images/projects/
   ```

2. Add your screenshots there (e.g., `ketan-1.png`, `ketan-2.png`, etc.)

3. Update the `images` array in `Projects.tsx`:
   ```tsx
   {
     id: 1,
     title: "Ketan School Website",
     images: [
       "/images/projects/ketan-1.png",
       "/images/projects/ketan-2.png",
       "/images/projects/ketan-3.png",
     ],
   }
   ```

### Option 2: Use External URLs

If your images are hosted online, just use the full URLs:

```tsx
images: [
  "https://your-domain.com/screenshot1.png",
  "https://i.imgur.com/abc123.jpg",
];
```

### Image Recommendations

- **Size**: 600x400px (or maintain 3:2 aspect ratio)
- **Format**: PNG or JPG
- **Optimize**: Compress images to reduce file size
- **Quantity**: 2-4 images per project works best

### Features Included

✅ Smooth slide transitions with Framer Motion
✅ Previous/Next arrow buttons (appear on hover)
✅ Dot indicators showing current position
✅ Click dots to jump to specific images
✅ Keyboard accessible (aria-labels)
✅ Responsive and mobile-friendly

The slider will automatically hide if a project has no images!
