import axios from 'axios';
import fs from 'fs'; // Node.js module untuk menulis file
import path from 'path'; // Node.js module untuk path

async function generateSitemap() {
  try {
    // 1. Fetch data dari API
    const response = await axios.get('https://nusaapi.vercel.app/api/v1/blogs');
    const blogs = response.data; // Asumsi data array

    // 2. Buat struktur sitemap XML
    let sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://teta-nikmat.vercel.app/</loc>
        <lastmod>2024-11-07</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
    `;

    blogs.forEach((blog) => {
      sitemap += `
      <url>
        <loc>https://teta-nikmat.vercel.app/blog/${blog._id}</loc>
        <lastmod>${blog.updatedAt}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      `;
    });

    sitemap += '</urlset>';

    // 3. Simpan sitemap ke folder `public` (Vite membaca file ini)
    const outputPath = path.resolve(__dirname, './public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap, 'utf8');

    console.log('Sitemap successfully generated at:', outputPath);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Jalankan fungsi
generateSitemap();
