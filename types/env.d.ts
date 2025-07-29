// types/env.d.ts
export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BASE?: string
    }
  }
}
