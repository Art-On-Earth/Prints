# Production handoff

Separate confirmed printer requirements from working assumptions. The output conditions decide the settings; do not make “300 dpi, CMYK, 3 mm bleed” a universal recipe.

## Before calling a file final
Record trim dimensions and units, page count, sides, stock, printing process, finishing/binding, safe areas, required bleed, delivery as pages/spreads, accepted PDF standard, color profile/output intent, and whether marks are requested. Obtain supplied templates or dielines where relevant. Continue a visual proof if these are unknown, but label it provisional.

## Edges
Bleed extends edge artwork beyond the trim to accommodate cutting. A slug carries production information outside the artwork area. Setting a bleed value does not itself extend a placed background. Inspect the exported page boxes and actual artwork coverage. Use the printer's bleed, safe-area, and marks requirements; ensure marks do not intrude into needed bleed. Source: Adobe [bleed and slug](https://helpx.adobe.com/indesign/desktop/print/page-set-up-and-printer-marks/print-bleed-and-slug-areas.html).

## Images and detail
Evaluate effective resolution at the placed size: pixel width / placed width in inches gives horizontal PPI. A 2400-pixel image placed 8 inches wide is 300 PPI; at 16 inches it is 150 PPI. Suitability still depends on subject, process, and viewing distance. Do not confuse image PPI with printer DPI. Enlarging a file's pixel count does not recover missing detail. Keep fine rules, small reversed text, and transparent effects within the printer's capabilities.

## Color
An output intent identifies intended printing conditions; it does not prove those conditions have been met or that a display matches the print. Use the printer's supplied profile and conversion policy. Do not blindly convert every asset to an arbitrary CMYK space or apply conversions twice. Confirm spot colors, overprint, small black text, large black areas, and ink limits with the production workflow. Source: Adobe [output intents](https://helpx.adobe.com/acrobat/using/output-intents-pdfs-acrobat-pro.html).

## Export and inspection
Use a printer-approved PDF preset/standard and verify its settings. Inspect the exported file, not only the source document. Check dimensions, page order, fonts/embedding where permitted, image quality, color settings, transparency, bleed, and unwanted marks. InDesign's print-PDF export supports presets and explicit PDF/X selection; choosing one is not a guarantee against artwork errors. Source: Adobe [export for printing](https://helpx.adobe.com/ca/indesign/desktop/save-export-and-publish/save-and-export/export-pdfs-for-printing.html).

Report unresolved issues and obtain the required proof before release. Never label an RGB screenshot, mockup, or uninspected PDF “press-ready.” Source guidance consulted 2026-10-05; exact application UI may change. No printer certification or Adobe endorsement is implied.
