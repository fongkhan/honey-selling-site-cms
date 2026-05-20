import type { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Section Hero',
    plural: 'Sections Hero',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge (ex: ✨ récolte artisanale française & biologique)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre principal',
    },
    {
      name: 'titleColored',
      type: 'text',
      label: 'Partie du titre en dégradé ambré',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Sous-titre / Description',
    },
    {
      name: 'primaryCtaText',
      type: 'text',
      label: 'Texte bouton principal',
    },
    {
      name: 'primaryCtaLink',
      type: 'text',
      label: 'Lien bouton principal',
    },
    {
      name: 'secondaryCtaText',
      type: 'text',
      label: 'Texte bouton secondaire',
    },
    {
      name: 'secondaryCtaLink',
      type: 'text',
      label: 'Lien bouton secondaire',
    },
    {
      name: 'showPot',
      type: 'checkbox',
      label: 'Afficher le pot de miel 3D-like à droite ?',
      defaultValue: true,
    },
    {
      name: 'potTitle',
      type: 'text',
      label: 'Titre du pot (ex: Cuvée Royale)',
      admin: {
        condition: (_, siblingData) => siblingData?.showPot,
      },
    },
    {
      name: 'potSubtitle',
      type: 'text',
      label: 'Sous-titre du pot (ex: Édition Limitée)',
      admin: {
        condition: (_, siblingData) => siblingData?.showPot,
      },
    },
    {
      name: 'potBottomLeft',
      type: 'text',
      label: 'Texte en bas à gauche du pot (ex: Miel de Printemps)',
      admin: {
        condition: (_, siblingData) => siblingData?.showPot,
      },
    },
    {
      name: 'potBottomRight',
      type: 'text',
      label: 'Texte en bas à droite du pot (ex: Bio)',
      admin: {
        condition: (_, siblingData) => siblingData?.showPot,
      },
    },
  ],
};

export const PageHeaderBlock: Block = {
  slug: 'pageHeader',
  labels: {
    singular: 'En-tête de page',
    plural: 'En-têtes de page',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la page',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description sous le titre',
    },
  ],
};

export const ValuesBlock: Block = {
  slug: 'values',
  labels: {
    singular: 'Grille de valeurs',
    plural: 'Grilles de valeurs',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la section',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre / Description',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Valeurs',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'emoji',
          type: 'text',
          label: 'Emoji',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre de la valeur',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description de la valeur',
        },
      ],
    },
  ],
};

export const StoryBlock: Block = {
  slug: 'story',
  labels: {
    singular: 'Fiche Notre Histoire',
    plural: 'Fiches Notre Histoire',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la section',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Paragraphes',
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Texte du paragraphe',
        },
      ],
    },
    {
      name: 'emojis',
      type: 'text',
      label: 'Emojis illustratifs (ex: 👵👴🍯)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image illustrative alternative (optionnelle)',
    },
  ],
};

export const EngagementsBlock: Block = {
  slug: 'engagements',
  labels: {
    singular: 'Grille d\'engagements',
    plural: 'Grilles d\'engagements',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge en Emojis (ex: 🐝🌿🌱)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la section',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre / Description',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Engagements',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'emoji',
          type: 'text',
          label: 'Emoji',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre de l\'engagement',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description de l\'engagement',
        },
      ],
    },
  ],
};

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: 'Citation Apicole',
    plural: 'Citations Apicoles',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Citation',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Auteur / Signature',
    },
  ],
};

export const FeaturedProductsBlock: Block = {
  slug: 'featuredProducts',
  labels: {
    singular: 'Miels en vedette (Medusa)',
    plural: 'Miels en vedette (Medusa)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la section',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre / Description',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Texte bouton "Tout le catalogue"',
      defaultValue: 'Tout le catalogue',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'Lien du bouton',
      defaultValue: '/boutique',
    },
  ],
};

export const LatestPostsBlock: Block = {
  slug: 'latestPosts',
  labels: {
    singular: 'Journal de la Ruche (Blog)',
    plural: 'Journal de la Ruche (Blog)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la section',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sous-titre / Description',
    },
  ],
};
