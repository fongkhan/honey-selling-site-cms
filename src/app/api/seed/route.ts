import { getPayload } from 'payload';
import config from '../../../../payload.config';
import { NextResponse } from 'next/server';

function convertToLexical(elements: { type: 'p' | 'h2'; text: string }[]) {
  const children = elements.map((item) => {
    if (item.type === 'p') {
      return {
        type: 'paragraph',
        version: 1,
        children: [
          {
            type: 'text',
            text: item.text,
            version: 1,
            format: 0,
          },
        ],
      };
    } else {
      return {
        type: 'heading',
        tag: 'h2',
        version: 1,
        children: [
          {
            type: 'text',
            text: item.text,
            version: 1,
            format: 0,
          },
        ],
      };
    }
  });

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children,
    },
  };
}

export async function GET() {
  try {
    const payload = await getPayload({ config });

    console.log('--- Initialisation de Payload pour le seeding des pages et posts via API ---');

    // 1. Nettoyage des anciennes pages pour éviter les conflits
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

    // 2. Nettoyage des anciens posts pour éviter les conflits
    const existingPosts = await payload.find({
      collection: 'posts',
      limit: 100,
    });

    for (const post of existingPosts.docs) {
      if (
        post.slug === 'secrets-de-l-apiculture-biologique' ||
        post.slug === 'bienfaits-du-miel-de-lavande' ||
        post.slug === 'recette-pain-d-epices-moelleux-artisanal'
      ) {
        console.log(`Suppression du post existant : ${post.slug}`);
        await payload.delete({
          collection: 'posts',
          id: post.id,
        });
      }
    }

    // 3. Seeding de la page d'accueil (home)
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

    // 4. Seeding de la page Notre Histoire (histoire)
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

    // 5. Seeding des 3 posts de blog
    console.log('Création du post de blog 1...');
    await payload.create({
      collection: 'posts',
      data: {
        title: "Les Secrets de l'Apiculture Biologique",
        slug: 'secrets-de-l-apiculture-biologique',
        excerpt: "Comment nos apiculteurs prennent soin des colonies tout au long de l'année pour garantir un miel 100% naturel et pur.",
        publishedAt: '2026-05-10T10:00:00.000Z',
        content: convertToLexical([
          {
            type: 'p',
            text: "L'apiculture biologique ne se limite pas à placer des ruches dans la nature. C'est une philosophie de travail rigoureuse qui place le bien-être de l'abeille et l'équilibre écologique au-dessus de la productivité.",
          },
          {
            type: 'h2',
            text: '1. Des emplacements rigoureusement sélectionnés',
          },
          {
            type: 'p',
            text: 'Pour obtenir la certification biologique, nos ruches doivent être installées de telle sorte que, dans un rayon de 3 kilomètres autour du rucher, les sources de nectar et de pollen soient constituées essentiellement de cultures biologiques ou de flore sauvage spontanée.',
          },
          {
            type: 'h2',
            text: '2. Un habitat naturel pour nos abeilles',
          },
          {
            type: 'p',
            text: "Les ruches biologiques sont constituées de matériaux entièrement naturels (bois non traité, cire biologique). Les traitements contre les parasites comme le varroa se font uniquement avec des acides organiques naturels (acide oxalique ou formique), proscrivant tout pesticide de synthèse qui pourrait polluer la cire ou le miel.",
          },
          {
            type: 'h2',
            text: '3. Un respect du rythme et des réserves de la ruche',
          },
          {
            type: 'p',
            text: "Contrairement à l'apiculture intensive, nous ne récoltons que l'excédent de miel. À la fin de la saison, nous laissons à chaque colonie des réserves de miel et de pollen suffisantes pour qu'elles puissent hiverner en toute autonomie, sans aucun apport de sirop de sucre industriel.",
          },
        ]),
      },
    });

    console.log('Création du post de blog 2...');
    await payload.create({
      collection: 'posts',
      data: {
        title: "Le Miel de Lavande : Un Trésor pour le Sommeil",
        slug: 'bienfaits-du-miel-de-lavande',
        excerpt: "Découvrez comment les principes actifs des fleurs de lavande se retrouvent dans notre miel pour apaiser le corps et l'esprit.",
        publishedAt: '2026-05-15T08:30:00.000Z',
        content: convertToLexical([
          {
            type: 'p',
            text: "Récolté au cœur de la Provence pendant la floraison estivale, le miel de lavande est réputé dans le monde entier pour ses arômes délicats. Mais au-delà de son goût unique, c'est un véritable remède naturel aux multiples vertus thérapeutiques.",
          },
          {
            type: 'h2',
            text: "Un sédatif naturel d'exception",
          },
          {
            type: 'p',
            text: "La lavande du plateau de Valensole contient des substances actives reconnues pour leurs propriétés relaxantes (linalol et acétate de linalyle). Lors du butinage, les abeilles concentrent ces précieux composés. Consommer une cuillère de miel de lavande dans une infusion tiède de camomille ou de verveine une demi-heure avant le coucher favorise l'endormissement et améliore la qualité du sommeil profond.",
          },
          {
            type: 'h2',
            text: 'Un antiseptique et cicatrisant cutané',
          },
          {
            type: 'p',
            text: "Traditionnellement, le miel de lavande est également utilisé pour soigner les petites brûlures, blessures légères ou piqûres d'insectes. Ses propriétés antibactériennes naturelles empêchent la prolifération des germes tandis que sa texture riche protège la barrière cutanée et accélère la reconstruction cellulaire.",
          },
        ]),
      },
    });

    console.log('Création du post de blog 3...');
    await payload.create({
      collection: 'posts',
      data: {
        title: "Recette : Le Pain d'Épices Moelleux à l'Ancienne",
        slug: 'recette-pain-d-epices-moelleux-artisanal',
        excerpt: "Une recette traditionnelle inratable sublimée par notre Miel de Châtaignier d'Ardèche pour un goûter réconfortant.",
        publishedAt: '2026-05-18T14:00:00.000Z',
        content: convertToLexical([
          {
            type: 'p',
            text: "Le pain d'épices est le complice indissociable des après-midis d'automne et d'hiver. Aujourd'hui, nous vous partageons le secret de notre recette familiale, particulièrement moelleuse, qui fait la part belle à la puissance du miel de châtaignier.",
          },
          {
            type: 'h2',
            text: 'Les Ingrédients (Pour un grand moule à cake)',
          },
          {
            type: 'p',
            text: "• 250g de Miel de Châtaignier d'Ardèche\n• 100g de farine de seigle\n• 150g de farine de blé T65\n• 10cl de lait entier\n• 1 sachet de levure chimique\n• 1 cuillère à café de cannelle en poudre\n• 1 cuillère à café de gingembre en poudre\n• 1/2 cuillère à café d'anis vert moulu\n• 50g de beurre doux",
          },
          {
            type: 'h2',
            text: 'La Préparation',
          },
          {
            type: 'p',
            text: '1. Faites chauffer doucement le lait, le miel de châtaignier et le beurre dans une casserole afin que le tout soit parfaitement liquide.',
          },
          {
            type: 'p',
            text: "2. Dans un grand saladier, mélangez les farines, la levure et l'ensemble des épices.",
          },
          {
            type: 'p',
            text: '3. Versez le mélange chaud (lait/miel/beurre) sur les farines tout en fouettant énergiquement pour éviter les grumeaux.',
          },
          {
            type: 'p',
            text: '4. Versez la pâte dans un moule à cake préalablement beurré et fariné.',
          },
          {
            type: 'p',
            text: '5. Enfournez à 160°C pendant 45 à 50 minutes. Laissez refroidir complètement avant de trancher. Astuce : il est encore meilleur enveloppé dans un film étirable le lendemain !',
          },
        ]),
      },
    });

    console.log('Seeding des pages et posts terminé avec succès !');
    return NextResponse.json({ success: true, message: 'Seeding of pages and posts completed successfully!' });
  } catch (error: any) {
    console.error('Error during seeding API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
