import type { CollectionConfig } from 'payload';
import { triggerBuild } from '../hooks/triggerBuild';

export const ProductsMetadata: CollectionConfig = {
  slug: 'products-metadata',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'medusaProductHandle',
    defaultColumns: ['medusaProductHandle', 'origin', 'tasteProfile', 'updatedAt'],
  },
  hooks: {
    afterChange: [triggerBuild],
    afterDelete: [triggerBuild],
  },
  fields: [
    {
      name: 'medusaProductHandle',
      label: 'Handle du Produit Medusa',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Doit correspondre exactement au "handle" du produit dans MedusaJS (ex: miel-de-lavande)',
      },
    },
    {
      name: 'origin',
      label: 'Origine et Terroir',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'ex: Provence, France',
      },
    },
    {
      name: 'tasteProfile',
      label: 'Profil Gustatif',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'ex: Doux, fleuri, notes de vanille',
      },
    },
    {
      name: 'harvestPeriod',
      label: 'Période de Récolte',
      type: 'text',
      admin: {
        placeholder: 'ex: Juin - Juillet',
      },
    },
    {
      name: 'honeyColor',
      label: 'Couleur du Miel',
      type: 'text',
      admin: {
        placeholder: 'ex: Ambré clair, reflets dorés',
      },
    },
    {
      name: 'intensity',
      label: 'Intensité aromatique (1-5)',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Intensité en bouche, de 1 (très doux) à 5 (très corsé)',
      },
    },
    {
      name: 'benefits',
      label: 'Bienfaits & Vertus',
      type: 'textarea',
      admin: {
        placeholder: 'ex: Apaisant pour la gorge, facilite le sommeil...',
      },
    },
    {
      name: 'craftStory',
      label: 'L\'Histoire de sa récolte',
      type: 'richText',
    },
    {
      name: 'recipes',
      label: 'Idées de Recettes & Accords',
      type: 'richText',
    },
  ],
};
