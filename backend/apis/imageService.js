import path from 'path';
import fs from 'fs/promises';

export async function getImageByName({ name, type }) {
    const filename = `${name}.${type}`;
    const imagePath = path.resolve('backend/images', filename);

    const ext = `.${type.toLowerCase()}`;
    let mimeType = 'image/jpeg';
    if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.gif') mimeType = 'image/gif';

    try {
        const data = await fs.readFile(imagePath, 'base64');
        return { success: true, name: filename, mimeType, data };
    } catch (err) {
        return { success: false, error: `Image "${filename}" not found` };
    }
}