import { existsSync } from 'fs'
import path from 'path'

import dllinjector from '../resources/dllinjector.node'
import { parentPort, workerData } from 'worker_threads';
import { execSync, spawn } from 'child_process';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

try {
    console.log("3wh");
} catch (error) {
    parentPort?.postMessage({ status: 'error', message: error });
}
