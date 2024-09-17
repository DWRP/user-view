/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly PUBLIC_API_UR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
