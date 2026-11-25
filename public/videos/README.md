# Hero Videos

Coloca aquí los archivos `.mp4` finales para el carrusel de video del Hero en `/`:

- `public/videos/hero-1.mp4`
- `public/videos/hero-2.mp4`
- `public/videos/hero-3.mp4`

Recomendaciones de compresión para web:
- Formato: MP4 (H.264), sin pista de audio (o muteado)
- Resolución: 1920×1080 (1080p) o 1280×720 (720p)
- Duración: 7–10 segundos en loop limpio
- Peso ideal: < 4 MB por clip

Mientras los `.mp4` no estén presentes, `<HeroVideoCarousel />` muestra automáticamente las imágenes `poster` configuradas en `components/public/home/hero-videos.ts` sobre el gradiente `Deep Harbor → Venice Blue` sin errores en consola.
