import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tsconfig from './tsconfig.json'
const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const aliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, aliasPaths]) => {
    const key = alias.replace('/*', '');
    const value = path.join(SRC_PATH, aliasPaths[0].replace('/*', ''));
    aliases[key] = value;
  });

  return aliases;
};



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
})