import * as fs from 'fs';
import * as path from 'path';

const componentsDir = path.join(process.cwd(), 'app', 'components', 'ui');

// Read all .tsx files in the components/ui directory
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    process.exit(1);
  }

  const tsxFiles = files.filter(file => file.endsWith('.tsx'));
  
  // Process each file
  tsxFiles.forEach(file => {
    const filePath = path.join(componentsDir, file);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}:`, err);
        return;
      }

      // Replace the import path
      const newData = data.replace(
        /import\s+\{\s*cn\s*\}\s+from\s+["']@\/lib\/utils["']/g,
        'import { cn } from "../../lib/utils"'
      );

      // Write the file back
      fs.writeFile(filePath, newData, 'utf8', err => {
        if (err) {
          console.error(`Error writing file ${file}:`, err);
          return;
        }
        console.log(`✅ Fixed import path in ${file}`);
      });
    });
  });
}); 