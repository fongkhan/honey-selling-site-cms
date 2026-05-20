import { getPayload } from 'payload';
import config from '../../payload.config';

async function seed() {
  console.log('--- Initialisation de Payload pour le seeding des pages ---');
  const payload = await getPayload({ config });

  // 1. Nettoyage des anciennes pages pour éviter les conflits d'unicité sur le slug
  console.log('Suppression des anciennes pages...');
  const existingPages = await payload.find({
    collection: 'pages',
    limit: 100,
  });

  for (const page of existingPages.docs) {
    if (page.slug === 'home' || page.slug === 'histoire') {
      console.log(`Suppression de la page existante : ${page.slug}`);
      await payload.delete({
        collection: 'pages',
        id: page.id,
      });
    }
  }

  // 2. Seeding de la page d'accueil (home)
  console.log('Création de la page d\'accueil (home)...');
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Accueil',
      slug: 'home',
      seo: {
        title: 'Miel Artisanal d\'Exception Direct Apiculteur',
        description: 'Chaque pot de notre collection est le fruit du travail méticuleux de nos abeilles au cœur des plus beaux terroirs français.',
      },
      layout: [
        {
          blockType: 'hero',
          badge: '✨ récolte artisanale française & biologique',
          title: 'Le goût pur de la ',
          titleColored: 'nature préservée',
          subtitle: 'Chaque pot de notre collection est le fruit du travail méticuleux de nos abeilles au cœur des plus beaux terroirs français. Non chauffé, non filtré, pour conserver tous ses bienfaits originels.',
          primaryCtaText: 'Découvrir notre Cave à Miels',
          primaryCtaLink: '/boutique',
          secondaryCtaText: 'Notre engagement apicole',
          secondaryCtaLink: '/histoire',
          showPot: true,
          potTitle: 'Cuvée Royale',
          potSubtitle: 'Édition Limitée',
          potBottomLeft: 'Miel de Printemps',
          potBottomRight: 'Bio',
        },
        {
          blockType: 'values',
          title: 'Un artisanat respectueux de la biodiversité',
          subtitle: 'Nous plaçons la santé de nos colonies et le respect du rythme naturel au cœur de notre métier d\'apiculteur.',
          items: [
            {
              emoji: '🌱',
              title: 'Éco-responsabilité',
              description: 'Ruchers installés exclusivement dans des parcs naturels préservés et des zones de flore biologique préservées de toute pollution chimique.',
            },
            {
              emoji: '🍯',
              title: 'Extraction à froid',
              description: 'Notre miel est désoperculé et extrait à froid par force centrifuge simple, préservant ainsi intacts les enzymes, minéraux et antioxydants.',
            },
            {
              emoji: '🤝',
              title: 'Direct Apiculteur',
              description: 'Un circuit 100% court sans intermédiaires. Du rucher à votre table de cuisine, pour une traçabilité totale et une rémunération juste.',
            },
          ],
        },
        {
          blockType: 'featuredProducts',
          title: 'Nos miels d\'exception',
          subtitle: 'Découvrez notre gamme de crus artisanaux récoltés avec soin.',
          ctaText: 'Tout le catalogue',
          ctaLink: '/boutique',
        },
        {
          blockType: 'latestPosts',
          title: 'Le journal de la miellerie',
          subtitle: 'Actualités de nos ruchers, vie des abeilles et idées de recettes gourmandes.',
        },
      ],
    },
  });

  // 3. Seeding de la page Notre Histoire (histoire)
  console.log('Création de la page Notre Histoire (histoire)...');
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Notre Histoire',
      slug: 'histoire',
      seo: {
        title: 'Notre Histoire & Nos Engagements Apicoles',
        description: 'Depuis trois générations, la famille apicole Royale veille sur ses ruches et partage les trésors des terroirs sauvages.',
      },
      layout: [
        {
          blockType: 'hero',
          badge: '👑 L\'amour du travail bien fait',
          title: 'L\'Histoire de notre Passion Apicole',
          titleColored: '',
          subtitle: 'Depuis trois générations, la famille apicole Royale veille sur ses ruches et partage les trésors des terroirs sauvages de France dans le respect absolu de la nature.',
          showPot: false,
        },
        {
          blockType: 'story',
          title: 'Une histoire de famille',
          paragraphs: [
            {
              text: 'Tout a commencé en 1954 dans les collines parfumées de Haute-Provence. Notre grand-père, Émile, passionné par la vie fascinante des abeilles, installa ses dix premières ruches de bois au milieu des champs de lavande sauvage.',
            },
            {
              text: 'Aujourd\'hui, nous perpétuons ce savoir-faire familial unique. Nous cultivons le goût des miels typés, purs et bruts, tels que l\'abeille les produit au sein de l\'alvéole de cire.',
            },
          ],
          emojis: '👵👴🍯',
        },
        {
          blockType: 'engagements',
          badge: '🐝🌿🌱',
          title: 'Nos engagements pour l\'avenir',
          subtitle: 'Protéger l\'abeille, c\'est préserver le vivant et la biodiversité de nos campagnes.',
          items: [
            {
              emoji: '🛡️',
              title: 'Protection des abeilles',
              description: 'Zéro pesticide chimique de synthèse dans nos ruchers. Nous luttons naturellement pour la santé des colonies et maintenons les prédateurs à distance de manière biologique.',
            },
            {
              emoji: '🌸',
              title: 'Préservation de la flore',
              description: 'Nos ruches sédentaires et de transhumance sont posées uniquement dans des zones sauvages et préservées, favorisant la pollinisation active des écosystèmes.',
            },
            {
              emoji: '📦',
              title: 'Emballages Éco-conçus',
              description: 'Pots en verre 100% recyclables, étiquettes imprimées avec des encres végétales sur papier recyclé et expéditions sans plastique.',
            },
            {
              emoji: '🔬',
              title: 'Analyse & Pureté',
              description: 'Chaque lot de miel récolté est analysé en laboratoire indépendant pour garantir son absence totale de résidus chimiques et attester de sa pureté florale unique.',
            },
          ],
        },
        {
          blockType: 'quote',
          quote: '"Le miel est le reflet poétique et gustatif du paysage à un instant précis de l\'année. Notre rôle d\'apiculteur est simplement de ne pas perturber cette magie."',
          author: 'Marie Royale, Apicultrice en chef',
        },
      ],
    },
  });

  console.log('Seeding des pages terminé avec succès !');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Erreur lors du seeding des pages :', err);
  process.exit(1);
});
