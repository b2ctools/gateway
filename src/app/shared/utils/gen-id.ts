
import crypto from 'crypto';

/** tool to generate ramdom ids. */
export const genId = () => {
    return crypto.randomBytes(16).toString('hex');
}