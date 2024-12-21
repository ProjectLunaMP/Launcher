declare module 'dllinjector.node' {
  export function InjectDll(processId: number, dllPath: string): string
}
