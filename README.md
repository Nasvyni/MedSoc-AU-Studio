# MedSoc-AU-Studio
Are you an AU/fic Author? so many apps to choose but they're all pay2use? // An open source website to relieve you of all your AU-app findin duties!
---

## Use the generator

1. Open the GitHub Pages site for this repo (Settings > Pages > Deploy from branch `main`, folder `/root`).
2. Pick a platform in the top bar and edit the fields. The preview updates as you type.
3. Upload a profile picture or attached image by dropping it on the upload box. It is previewed locally and never leaves your browser.
4. Copy the **AO3 HTML** and **Work Skin CSS** from the two boxes at the bottom.

## Apply it on AO3 (Tumblr import coming soon!)

1. On AO3 go to **Dashboard > Skins > Create Work Skin**. Give it a title, paste the contents of `ao3-workskin.css` into the CSS box, and submit
2. Edit your work. Under **Associations > Select Work Skin**, choose the skin you made
3. In the chapter editor, switch to **HTML**, and paste the generated markup where the mockup should appear
4. Images: AO3 does not accept uploads or Base64 data. Host each image elsewhere and replace every `https://YOUR-IMAGE-URL` in the HTML with the real link
5. Use **Preview** before posting. The generated HTML is one line with no inline styles or scripts, so AO3 does not insert stray line breaks

## Penpot

See [`penpot/README.md`](penpot/README.md) for the design kit and how to import it (if you want to expand on my UI)

---

That's it! Have fun writing and may you never get too much writer's block!
