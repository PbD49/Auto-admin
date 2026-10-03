import 'i18next';
import type { resource } from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'api';
    resources: (typeof resources)['ru'];
  }
}