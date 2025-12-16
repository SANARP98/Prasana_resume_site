import fs from 'fs';
import path from 'path';

export interface CVFile {
  name: string;        // Display name (from filename)
  fileName: string;    // Original filename
  path: string;        // Download path
  extension: string;   // File extension (.pdf or .docx)
}

// Cache configuration
let cachedCVFiles: CVFile[] | null = null;
let lastCVScan = 0;
const CV_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

/**
 * Get all CV files from the public/cv directory
 * This runs server-side only with caching
 */
export function getCVFiles(): CVFile[] {
  // Check if cache is valid
  const now = Date.now();
  if (cachedCVFiles && (now - lastCVScan) < CV_CACHE_DURATION) {
    return cachedCVFiles;
  }

  try {
    const cvDir = path.join(process.cwd(), 'public', 'cv');

    // Check if directory exists
    if (!fs.existsSync(cvDir)) {
      console.warn('CV directory does not exist:', cvDir);
      cachedCVFiles = [];
      lastCVScan = now;
      return [];
    }

    // Read all files from the directory
    const files = fs.readdirSync(cvDir);

    // Filter for PDF and DOCX files only
    const cvFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.pdf' || ext === '.docx';
      })
      .map(file => {
        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);

        // Convert filename to display name (replace underscores with spaces)
        const displayName = nameWithoutExt.replace(/_/g, ' ');

        return {
          name: displayName,
          fileName: file,
          path: `/cv/${file}`,
          extension: ext.toLowerCase()
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    // Update cache
    cachedCVFiles = cvFiles;
    lastCVScan = now;

    return cvFiles;
  } catch (error) {
    console.error('Error reading CV files:', error);
    cachedCVFiles = [];
    lastCVScan = now;
    return [];
  }
}

/**
 * Get CV files for client-side components
 * Returns a simplified structure that can be serialized
 * Uses cached data for performance
 */
export function getCVFilesForClient(): Omit<CVFile, 'fileName'>[] {
  return getCVFiles().map(({ name, path, extension }) => ({
    name,
    path,
    extension
  }));
}

/**
 * Clear the CV files cache
 * Useful for development or when files are updated
 */
export function clearCVCache(): void {
  cachedCVFiles = null;
  lastCVScan = 0;
}
