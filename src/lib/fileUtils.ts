import fs from 'fs';
import path from 'path';


const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);


export function readJSON<T>(name: string): T | null {
    const p = path.join(dataDir, name);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}


export function writeJSON(name: string, obj: any) {
    const p = path.join(dataDir, name);
    fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf8');
}