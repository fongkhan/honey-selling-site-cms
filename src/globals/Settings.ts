import type { GlobalConfig } from 'payload';
import { triggerBuild } from '../hooks/triggerBuild';

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Configuration',
  },
  hooks: {
    afterChange: [triggerBuild],
  },
  fields: [
    {
      name: 'siteName',
      label: 'Nom Principal du Site',
      type: 'text',
      required: true,
      defaultValue: 'La Miellerie Royale',
    },
    {
      name: 'slogan',
      label: 'Slogan / Sous-titre',
      type: 'text',
      defaultValue: 'Artisans Apiculteurs',
    },
    {
      name: 'favicon',
      label: 'Favicon du Site',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Sélectionnez une image carrée (format PNG, SVG ou ICO) pour l\'icône de l\'onglet.',
      },
    },
  ],
};
