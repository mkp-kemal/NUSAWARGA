import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import axios from 'axios';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'generate-sitemap',
      configureServer(server) {
        server.middlewares.use('/sitemap.xml', async (req, res) => {
          try {
            // Fetch data dari API
            const response = await axios.get('https://nusaapi.vercel.app/api/v1/blogs');
            const blogs = response.data;

            // Buat sitemap XML
            let sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              <url>
                <loc>https://teta-nikmat.vercel.app/</loc>
                <lastmod>2024-11-07</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `;

            blogs.forEach((blog: any) => {
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

            // Kirim response sebagai XML
            res.setHeader('Content-Type', 'application/xml');
            res.end(sitemap);
          } catch {
            res.statusCode = 500;
            res.end('Error generating sitemap');
          }
        });
      },
    },
  ],
})
