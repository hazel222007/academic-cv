# Research Gallery Setup - Step by Step

The gallery is already added in the website. It currently uses clean placeholder SVG files so that the site does not break before you add the real images.

## 1. Open the website folder

After unzipping, open:

```text
academic-cv-10-10-final/
```

You will see:

```text
index.html
style.css
script.js
assets/
```

## 2. Go to the gallery image folders

Open:

```text
assets/gallery/
```

Inside this folder, images are arranged into categories:

```text
assets/gallery/laboratory/
assets/gallery/projects/
assets/gallery/conferences/
assets/gallery/awards/
assets/gallery/professional-activities/
```

## 3. Replace placeholder images with real images

The website already points to these image files:

### Laboratory Research

```text
assets/gallery/laboratory/oct-setup.svg
assets/gallery/laboratory/eye-tracking-setup.svg
```

Replace them with real images. The easiest method is:

1. Delete `oct-setup.svg`.
2. Add your real OCT image.
3. Rename the real image as `oct-setup.jpg` or `oct-setup.png`.
4. Update the image path in `index.html` from:

```html
assets/gallery/laboratory/oct-setup.svg
```

to:

```html
assets/gallery/laboratory/oct-setup.jpg
```

Do the same for eye tracking, posters, awards, and professional activity images.

## 4. Recommended image names

Use clear file names:

```text
oct-retinal-imaging-setup.jpg
eye-tracking-lab-setup.jpg
colour-cognition-stimuli.jpg
face-perception-task.jpg
chromotherapy-poster-2024.jpg
vss-2026-poster.jpg
laura-bassi-award-2025.jpg
dac-brain-health-activity.jpg
```

Avoid names like:

```text
IMG_20240601_233.jpg
WhatsApp Image Final.jpg
Screenshot (12).png
```

## 5. Update captions in `index.html`

Open `index.html` and search for:

```html
<section class="section gallery-section" id="research-gallery">
```

Each gallery item looks like this:

```html
<article class="gallery-item" data-category="laboratory">
  <img src="assets/gallery/laboratory/oct-setup.svg"
       alt="OCT retinal imaging setup"
       data-caption="OCT-based retinal imaging setup for retinal biomarker research." />
  <div class="gallery-caption">
    <h3>OCT Imaging Setup</h3>
    <p>Laboratory Research</p>
  </div>
</article>
```

Change three things:

1. `src` - image file path
2. `alt` - short accessibility description
3. `data-caption` - full caption shown in enlarged lightbox view

Example after adding a real image:

```html
<article class="gallery-item" data-category="laboratory">
  <img src="assets/gallery/laboratory/oct-retinal-imaging-setup.jpg"
       alt="OCT retinal imaging setup used in biomarker research"
       data-caption="OCT-based retinal imaging setup used for exploring retinal biomarkers associated with cognitive ageing." />
  <div class="gallery-caption">
    <h3>OCT Imaging Setup</h3>
    <p>Laboratory Research</p>
  </div>
</article>
```

## 6. Add a new gallery image

Copy one full gallery item and paste it inside:

```html
<div class="gallery-grid">
```

Example:

```html
<article class="gallery-item" data-category="conferences">
  <img src="assets/gallery/conferences/icvs-2026-talk.jpg"
       alt="ICVS 2026 oral presentation"
       data-caption="Oral presentation accepted for the International Colour Vision Society Meeting, Brighton, United Kingdom, August 2026." />
  <div class="gallery-caption">
    <h3>ICVS 2026 Talk</h3>
    <p>Conference Presentation</p>
  </div>
</article>
```

## 7. Use correct category names

The filter buttons work using `data-category`. Use only these values:

```text
laboratory
projects
conferences
awards
activities
```

If you write a different category name, the filter may not work properly.

## 8. Image privacy checklist

Before adding images, check:

- No patient face or identifying clinical data.
- No participant names or IDs.
- No private emails, phone numbers, addresses, QR codes, or application IDs.
- No copyrighted figures unless permission is clear.
- Award letters should hide private details.
- OCT or retinal images must be de-identified.
- Conference screenshots should not reveal private email threads.

## 9. Image size recommendation

For fast loading, use:

```text
Width: 1200 px maximum
File size: below 300-500 KB each if possible
Format: JPG for photos, PNG for screenshots, SVG for diagrams/placeholders
```

Free tools such as TinyPNG, Squoosh, or image export from PowerPoint/Canva can reduce file size.

## 10. Test the gallery

Open `index.html` in a browser and check:

1. Gallery images are visible.
2. Filter buttons work.
3. Clicking an image opens the enlarged lightbox.
4. Next and previous buttons work.
5. Escape key closes the image viewer.
6. Mobile view is not broken.

## 11. Contact form setup

The contact form is prepared for Web3Forms but needs an access key.

Steps:

1. Go to Web3Forms.
2. Create a free access key using the email `mehjabinshirin001@gmail.com`.
3. Open `index.html`.
4. Find this line:

```html
<input type="hidden" name="access_key" value="PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
```

5. Replace the placeholder value with the actual Web3Forms access key.
6. Upload the website.
7. Submit a test message.

Until the key is added, the clickable email link will still work.
