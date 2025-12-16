import fs from 'fs';
import path from 'path';

export interface CVFile {
  name: string;        // Display name (from filename)
  fileName: string;    // Original filename
  path: string;        // Download path
  extension: string;   // File extension (.pdf or .docx)
}

/**
 * Get all CV files from the public/cv directory
 * This runs server-side only
 */
export function getCVFiles(): CVFile[] {
  try {
    const cvDir = path.join(process.cwd(), 'public', 'cv');

    // Check if directory exists
    if (!fs.existsSync(cvDir)) {
      console.warn('CV directory does not exist:', cvDir);
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

    return cvFiles;
  } catch (error) {
    console.error('Error reading CV files:', error);
    return [];
  }
}

/**
 * Get CV files for client-side components
 * Returns a simplified structure that can be serialized
 */
export function getCVFilesForClient(): Omit<CVFile, 'fileName'>[] {
  return getCVFiles().map(({ name, path, extension }) => ({
    name,
    path,
    extension
  }));
}
