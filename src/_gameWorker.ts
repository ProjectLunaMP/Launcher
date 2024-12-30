import { existsSync } from 'fs'
import path from 'path'

import dllinjector from '../resources/dllinjector.node'
import { parentPort, workerData } from 'worker_threads';
import { execSync, spawn } from 'child_process';

try {
    const { gameExePath, dllPath, user } = workerData;
    console.log(gameExePath);
    const ShippingEAC = path.join(
        gameExePath,
        'FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping_BE.exe'
    );

    if (existsSync(ShippingEAC)) {
        const EACProcess = spawn(ShippingEAC);
        console.log(EACProcess.pid)
        dllinjector.freezeProcess(EACProcess.pid);
    }

    const ForniteLauncher = path.join(
        gameExePath,
        'FortniteGame\\Binaries\\Win64\\FortniteLauncher.exe'
    );

    if (existsSync(ForniteLauncher)) {
        const ForniteLauncherProcess = spawn(ForniteLauncher);
        dllinjector.freezeProcess(ForniteLauncherProcess.pid);
    }

    const gameExecutablePath = path.join(
        gameExePath,
        'FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe'
    );

    execSync('set OPENSSL_ia32cap=:~0x20000000')
    const gameProcess = spawn(
        gameExecutablePath,
        (
          '-epicapp=Fortnite -epicenv=Prod -epiclocale=en-us -epicportal -skippatchcheck -noeac -fromfl=be -fltoken=h1cdhchd10150221h130eB56 -frombe AUTH_TYPE=exchangecode -AUTH_LOGIN=unused -AUTH_PASSWORD=' +
          user.user?.AccessToken
        ).split(' '),
        { env: { OPENSSL_ia32cap: ':~0x20000000' } }
      )
    dllinjector.injectDll(gameProcess.pid, dllPath);

    parentPort?.postMessage({ status: 'success' });
} catch (error) {
    parentPort?.postMessage({ status: 'error', message: error });
}
