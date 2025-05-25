import path from 'path';
import fs from 'fs/promises';

export async function getImageByName({ name }) {
    const imagePath = path.resolve('backend/images', name);
    
    const ext = path.extname(name).toLowerCase();
    let mimeType = 'image/jpeg'; // default
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.gif') mimeType = 'image/gif';

    try {
        const data = await fs.readFile(imagePath, 'base64');
        return { success: true, name, mimeType, data };
    } catch (err) {
        return { success: false, error: `Image "${name}" not found` };
    }
}