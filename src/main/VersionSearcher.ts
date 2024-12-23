import { openSync, read, readSync, statSync } from "fs";

function search(src: Buffer, pattern: Buffer): number[] {
    let indices = [];
    const maxSearchIndex = src.length - pattern.length;

    for (let i = 0; i <= maxSearchIndex; i++) {
        if (src[i] !== pattern[0]) continue;

        let found = true;
        for (let j = 1; j < pattern.length; j++) {
            if (src[i + j] !== pattern[j]) {
                found = false;
                break;
            }
        }

        if (found) {
            indices.push(i);
        }
    }

    return indices;
}

export async function getBuildVersion(exePath: string): Promise<string> {
    let result = '';
    const numThreads = require('os').cpus().length;
    let allMatchingPos: number[] = [];

    try {
        const fileSize = statSync(exePath).size;
        const chunkSize = Math.floor(fileSize / numThreads);
        const tasks = [];
        for (let i = 0; i < numThreads; i++) {
            const startPosition = i * chunkSize;
            const endPosition = i === numThreads - 1 ? fileSize : startPosition + chunkSize;

            const task = new Promise<void>((resolve, reject) => {
                const fd = openSync(exePath, 'r');
                const buffer = Buffer.alloc(endPosition - startPosition);

                read(fd, buffer, 0, buffer.length, startPosition, (err, bytesRead) => {
                    if (err) return reject(err);

                    const pattern = Buffer.from('++Fortnite+Release-', 'utf16le');
                    const matchingPositions = search(buffer, pattern);

                    allMatchingPos.push(...matchingPositions.map(pos => pos + startPosition));
                    resolve();
                });
            });

            tasks.push(task);
        }

        await Promise.all(tasks); 

        if (allMatchingPos.length !== 0) {
            for (const num of allMatchingPos) {
                const fd = openSync(exePath, 'r');
                const buffer = Buffer.alloc(100);

                readSync(fd, buffer, 0, buffer.length, num);
                const chunkText = buffer.toString('utf16le');
                const match = chunkText.match(/\+\+Fortnite\+Release-(\d+(\.\d+){0,2}|Live|Next|Cert)-CL-\d+/i);

                if (match) {
                    result = match[0];
                    break;
                }
            }
        }

        console.log("VersionSearcher->", result);
        return result || "ERROR";

    } catch (ex) {
        console.error(ex);
        return "ERROR";
    }
}