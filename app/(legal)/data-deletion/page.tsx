// ============================================================
// FICHIER : app/(legal)/data-deletion/page.tsx
// Instructions de suppression des données — version stylée
// ============================================================

import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import {
  Article,
  Section,
  P,
  Strong,
  DashList,
  Callout,
  InfoBlock,
  LinkInline,
  FeatureBlock,
} from '@/components/legal/LegalContent';

export const metadata: Metadata = {
  title: 'Suppression des données · Digiflex',
  description:
    'Comment demander la suppression de vos données personnelles détenues par Digiflex. Procédure claire et délais garantis.',
  robots: { index: true, follow: true },
};

const sections = [
  { id: 'article-1', number: 'I', title: 'Votre droit à la suppression' },
  { id: 'article-2', number: 'II', title: 'Données concernées' },
  { id: 'article-3', number: 'III', title: 'Comment demander' },
  { id: 'article-4', number: 'IV', title: 'Délais de traitement' },
  { id: 'article-5', number: 'V', title: 'Exceptions et limitations' },
  { id: 'article-6', number: 'VI', title: 'Processus concret' },
  { id: 'article-7', number: 'VII', title: 'Confirmation' },
  { id: 'article-8', number: 'VIII', title: 'En cas de désaccord' },
  { id: 'article-9', number: 'IX', title: 'Contact dédié' },
];

export default function DataDeletionPage() {
  return (
    <LegalPage
      label="Document III · Suppression des données"
      title="Suppression de vos données"
      subtitle="Un droit clair, une procédure simple, des délais garantis."
      version="Version 1.0"
      effectiveDate="23 avril 2026"
      sections={sections}
    >
      <Article id="article-1" number="I" title="Votre droit à la suppression">
        <P>
          Vous disposez à tout moment du droit de demander la suppression des données
          personnelles que <Strong>DIGIFLEX SARL</Strong> détient à votre sujet. Cette
          page vous explique précisément comment exercer ce droit et ce qui se passera
          concrètement après votre demande.
        </P>
        <P>
          Ce droit est garanti par la législation burkinabé sur la protection des
          données personnelles et, lorsque applicable, par le Règlement général sur la
          protection des données (RGPD) de l'Union européenne.
        </P>
        <Callout label="À qui s'adresse cette page">
          Si vous avez autorisé Digiflex à accéder à vos comptes sur Facebook,
          Instagram, TikTok, LinkedIn ou Google, cette page vous concerne directement.
        </Callout>
      </Article>

      <Article id="article-2" number="II" title="De quelles données parle-t-on ?">
        <P>
          Selon votre relation avec Digiflex, nous pouvons détenir différents types de
          données à votre sujet :
        </P>

        <Section number="2.1" title="Si vous êtes client de Digiflex">
          <DashList
            items={[
              'Vos données d\'identification (nom, prénom, email, téléphone, entreprise).',
              'Les contrats, devis, factures relatifs à nos prestations.',
              'Les échanges par email, WhatsApp, téléphone ou en réunion.',
              'Les briefs, documents de travail, feedbacks liés à vos projets.',
            ]}
          />
        </Section>

        <Section number="2.2" title="Si vous utilisez JARVIS via vos comptes sociaux">
          <P>
            Si vous avez autorisé Digiflex à accéder à vos comptes Facebook, Instagram,
            TikTok, LinkedIn, ou Google via un processus OAuth, nous détenons également :
          </P>
          <DashList
            items={[
              'Les jetons d\'accès (tokens) à vos comptes, stockés chiffrés.',
              'Les publications de vos comptes collectées pour analyse.',
              'Les métriques de performance (portée, engagement, démographie d\'audience).',
              'Les messages privés et commentaires reçus sur vos comptes.',
              'Les données de trafic web si vous bénéficiez du Web Management.',
            ]}
          />
        </Section>

        <Section number="2.3" title="Si vous avez visité notre site">
          <DashList
            items={[
              'Vos données de navigation (IP, navigateur, pages consultées).',
              'Les données de formulaires remplis.',
            ]}
          />
        </Section>
      </Article>

      <Article id="article-3" number="III" title="Comment demander la suppression">
        <P>
          Trois moyens sont à votre disposition pour demander la suppression de vos
          données. Choisissez celui qui vous convient le mieux.
        </P>

        <Section number="3.1" title="Par email (recommandé)">
          <P>Envoyez un email à :</P>

          <FeatureBlock
            label="Contact officiel"
            value="contact@digiflex-burkina.com"
            href="mailto:contact@digiflex-burkina.com?subject=Demande%20de%20suppression%20de%20mes%20donn%C3%A9es%20personnelles"
          />

          <P>
            Objet suggéré : <em>« Demande de suppression de mes données personnelles »</em>
          </P>

          <P>Dans votre email, merci d'inclure :</P>
          <DashList
            items={[
              'Votre nom et prénom.',
              'L\'email utilisé dans le cadre de votre relation avec Digiflex (ou l\'email associé à votre compte social autorisé).',
              'Si applicable, le nom de votre entreprise.',
              'La nature de votre demande (suppression totale ou partielle).',
              'Optionnel : la raison de votre demande (pour nous aider à améliorer nos services).',
            ]}
          />
        </Section>

        <Section number="3.2" title="Par courrier postal">
          <P>Adressez votre demande écrite et signée à :</P>
          <InfoBlock
            rows={[
              { label: 'Destinataire', value: <>DIGIFLEX SARL<br/>Délégué à la protection des données</> },
              { label: 'Adresse', value: <>09 BP 1654 Ouagadougou 09<br/>Burkina Faso</> },
            ]}
          />
        </Section>

        <Section number="3.3" title="Via les paramètres des plateformes sociales">
          <P>
            Si vous avez autorisé Digiflex à accéder à vos comptes sociaux, vous pouvez
            également révoquer cette autorisation directement depuis les paramètres des
            plateformes concernées :
          </P>
          <InfoBlock
            rows={[
              { label: 'Facebook', value: <>Paramètres › Sécurité et connexion › Applications et sites web › « JARVIS by Digiflex » › Supprimer</> },
              { label: 'Instagram', value: <>Paramètres › Sécurité › Applications et sites web › « JARVIS by Digiflex » › Supprimer</> },
              { label: 'TikTok', value: <>Paramètres › Confidentialité › Applications connectées</> },
              { label: 'LinkedIn', value: <>Paramètres › Confidentialité des données › Comptes tiers</> },
              { label: 'Google', value: <><LinkInline href="https://myaccount.google.com" external>myaccount.google.com</LinkInline> › Sécurité › Applications tierces ayant accès à votre compte</> },
            ]}
          />
          <P>
            La révocation via ces paramètres entraîne automatiquement l'arrêt de
            l'accès de JARVIS à vos données et le déclenchement de la procédure de
            suppression côté Digiflex.
          </P>
        </Section>
      </Article>

      <Article id="article-4" number="IV" title="Délais de traitement">
        <P>
          Digiflex s'engage à traiter votre demande de suppression dans les délais
          suivants :
        </P>
        <Section number="4.1" title="Accusé de réception">
          <P>
            Un accusé de réception vous est adressé dans les{' '}
            <Strong>soixante-douze (72) heures ouvrées</Strong> suivant la réception de
            votre demande par email ou courrier.
          </P>
        </Section>
        <Section number="4.2" title="Traitement effectif">
          <P>
            La suppression effective de vos données intervient dans un{' '}
            <Strong>délai maximum de trente (30) jours</Strong> à compter de la
            réception de votre demande. Dans des cas complexes (volume important,
            vérifications nécessaires), ce délai peut être prolongé de deux (2) mois.
            Vous en êtes alors informé dans le premier mois.
          </P>
        </Section>
        <Section number="4.3" title="Suppression immédiate des tokens">
          <P>
            Lorsque votre demande concerne la révocation d'un accès OAuth, les tokens
            d'accès correspondants sont supprimés <Strong>immédiatement</Strong> des
            systèmes de Digiflex, avant même le traitement complet du reste des
            données. L'accès de JARVIS à vos comptes cesse instantanément.
          </P>
        </Section>
      </Article>

      <Article id="article-5" number="V" title="Exceptions et limitations">
        <P>
          Dans certains cas limitativement énumérés par la loi, Digiflex peut être
          tenue de conserver tout ou partie de vos données malgré votre demande de
          suppression. Les principales exceptions sont :
        </P>
        <DashList
          items={[
            <><Strong>Obligations comptables et fiscales</Strong> : les factures et pièces comptables doivent être conservées pendant dix (10) ans conformément aux obligations du droit OHADA.</>,
            <><Strong>Obligations légales spécifiques</Strong> : certaines données peuvent être conservées si leur suppression contreviendrait à une obligation légale imposée à Digiflex.</>,
            <><Strong>Procédures contentieuses</Strong> : les données nécessaires à la constatation, l'exercice ou la défense d'un droit en justice peuvent être conservées jusqu'au règlement définitif du litige.</>,
            <><Strong>Archivage statistique anonymisé</Strong> : certaines données, une fois rendues totalement anonymes et dépourvues de tout lien avec votre identité, peuvent être conservées à des fins statistiques internes.</>,
          ]}
        />
        <P>
          Dans tous ces cas, Digiflex vous informe explicitement des motifs précis de
          la conservation partielle et des durées associées.
        </P>
      </Article>

      <Article id="article-6" number="VI" title="Ce qui se passe concrètement">
        <Section number="6.1" title="Côté Digiflex">
          <P>Votre demande déclenche la procédure suivante au sein de Digiflex :</P>
          <DashList
            items={[
              'Vérification de votre identité (nous pouvons vous demander des justificatifs).',
              'Identification de l\'ensemble des données vous concernant dans nos systèmes.',
              'Suppression effective des données de nos bases de production.',
              'Suppression des données de nos sauvegardes lors des prochains cycles de rotation (maximum 90 jours).',
              'Notification aux sous-traitants techniques concernés (Supabase, Vercel) pour suppression de leur côté.',
              'Confirmation écrite de la suppression, avec indication éventuelle des données conservées et des motifs.',
            ]}
          />
        </Section>
        <Section number="6.2" title="Côté plateformes tierces">
          <P>
            Digiflex ne peut pas supprimer les données que vous avez publiées
            vous-même sur Facebook, Instagram, TikTok, LinkedIn ou Google. Ces données
            restent sous le contrôle de ces plateformes et de vous-même. Pour les
            supprimer, vous devez utiliser les fonctionnalités de suppression natives
            de chaque plateforme.
          </P>
          <P>
            Digiflex supprime uniquement les copies de ces données que nous avons
            stockées dans nos propres systèmes pour les besoins de la prestation.
          </P>
        </Section>
      </Article>

      <Article id="article-7" number="VII" title="Confirmation de la suppression">
        <P>
          Une fois la suppression effective, vous recevez un email de confirmation à
          l'adresse que vous avez indiquée, précisant :
        </P>
        <DashList
          items={[
            'La date effective de la suppression.',
            'La liste des catégories de données supprimées.',
            'Le cas échéant, les données conservées et le motif légal de cette conservation.',
            'Les délais au terme desquels les données conservées seront à leur tour supprimées.',
          ]}
        />
      </Article>

      <Article id="article-8" number="VIII" title="En cas de désaccord">
        <P>
          Si vous estimez que votre demande n'a pas été traitée correctement, ou que
          les données de Digiflex vous concernant n'ont pas été intégralement
          supprimées, vous disposez des recours suivants :
        </P>
        <Section number="8.1" title="Contact direct">
          <P>
            Écrivez à{' '}
            <LinkInline href="mailto:contact@digiflex-burkina.com">
              contact@digiflex-burkina.com
            </LinkInline>{' '}
            en précisant le motif de votre contestation. Nous nous engageons à
            répondre dans les quinze (15) jours ouvrés.
          </P>
        </Section>
        <Section number="8.2" title="Saisie de l'autorité de contrôle">
          <P>
            Vous pouvez saisir la Commission de l'Informatique et des Libertés (CIL)
            du Burkina Faso, autorité nationale de protection des données
            personnelles.
          </P>
        </Section>
      </Article>

      <Article id="article-9" number="IX" title="Contact dédié">
        <P>Pour toute question relative à la suppression de vos données :</P>

        <FeatureBlock
          label="Votre contact"
          value="contact@digiflex-burkina.com"
          href="mailto:contact@digiflex-burkina.com"
        />

        <InfoBlock
          rows={[
            { label: 'Téléphone', value: '+226 54 71 48 40' },
            { label: 'Courrier', value: <>DIGIFLEX SARL<br/>Délégué à la protection des données<br/>09 BP 1654 Ouagadougou 09<br/>Burkina Faso</> },
          ]}
        />

        <Callout label="Engagement Digiflex">
          Votre vie privée est un droit, pas un privilège. Nous traitons chaque
          demande de suppression avec le sérieux et la rapidité qu'elle mérite.
        </Callout>
      </Article>
    </LegalPage>
  );
}
