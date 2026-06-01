/**
 * Safely resolves a static asset path, handling both local development 
 * and deployments to subfolders like GitHub Pages (e.g., /nobel/).
 *
 * @param path The relative asset path inside the public/ directory, e.g., 'imagens/logo.png'
 */
export function getImagePath(path: string): string {
  // Normalize leading slash from input if provided
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (typeof window === 'undefined') {
    return `/${cleanPath}`;
  }

  const { pathname, hostname } = window.location;

  // Specific check for 'nobel' repository subpath
  if (pathname.includes('/nobel')) {
    return `/nobel/${cleanPath}`;
  }

  // General fallback for any GitHub pages domain (e.g., username.github.io/repo-name/)
  if (hostname.endsWith('github.io')) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      const repoName = segments[0];
      return `/${repoName}/${cleanPath}`;
    }
  }

  // Standard root-indexed paths for local, Cloud Run, or custom domains
  return `/${cleanPath}`;
}
