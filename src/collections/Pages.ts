import type { CollectionConfig } from 'payload';
import { triggerBuild } from '../hooks/triggerBuild';
import {
  HeroBlock,
  PageHeaderBlock,
  ValuesBlock,
  StoryBlock,
  EngagementsBlock,
  QuoteBlock,
  FeaturedProductsBlock,
  LatestPostsBlock,
} from '../blocks/LayoutBlocks';

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  hooks: {
    afterChange: [triggerBuild],
    afterDelete: [triggerBuild],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'showInNavbar',
      label: 'Afficher dans la barre de navigation',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'navbarOrder',
      label: 'Ordre d\'affichage dans la navigation',
      type: 'number',
      defaultValue: 0,
      admin: {
        condition: (data) => !!data?.showInNavbar,
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        PageHeaderBlock,
        ValuesBlock,
        StoryBlock,
        EngagementsBlock,
        QuoteBlock,
        FeaturedProductsBlock,
        LatestPostsBlock,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};
