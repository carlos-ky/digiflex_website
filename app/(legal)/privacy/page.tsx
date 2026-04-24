// ============================================================
// FICHIER : app/(legal)/privacy/page.tsx
// Politique de confidentialité — version stylée complète
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
  title: 'Politique de confidentialité · Digiflex',
  description:
    'Comment Digiflex protège vos données personnelles. Politique conforme à la législation burkinabé et au RGPD.',
  robots: { index: true, follow: true },
};

const sections = [
  { id: 'article-1', number: 'I', title: 'Préambule' },
  { id: 'article-2', number: 'II', title: 'Responsable de traitement' },
  { id: 'article-3', number: 'III', title: 'Données collectées' },
  { id: 'article-4', number: 'IV', title: 'Finalités' },
  { id: 'article-5', number: 'V', title: 'Bases légales' },
  { id: 'article-6', number: 'VI', title: 'Destinataires' },
  { id: 'article-7', number: 'VII', title: 'Durée de conservation' },
  { id: 'article-8', number: 'VIII', title: 'Vos droits' },
  { id: 'article-9', number: 'IX', title: 'Sécurité' },
  { id: 'article-10', number: 'X', title: 'Cookies' },
  { id: 'article-11', number: 'XI', title: 'Modifications' },
  { id: 'article-12', number: 'XII', title: 'Contact' },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Document I · Confidentialité"
      title="Politique de confidentialité"
      subtitle="Protection de vos données personnelles, en toute transparence."
      version="Version 1.0"
      effectiveDate="23 avril 2026"
      sections={sections}
    >
      <Article id="article-1" number="I" title="Préambule">
        <P>
          La présente Politique de confidentialité décrit la manière dont{' '}
          <Strong>DIGIFLEX SARL</Strong>, société à responsabilité limitée de droit
          burkinabé immatriculée au Registre du Commerce et du Crédit Mobilier de
          Ouagadougou sous le numéro BF-OUA-01-2025-B12-02317 (ci-après « Digiflex »),
          collecte, utilise, stocke et protège les données personnelles des utilisateurs
          de ses services et des visiteurs de son site internet digiflex-burkina.com.
        </P>

        <P>
          Digiflex s'engage à traiter les données personnelles avec le plus grand soin
          et dans le respect des législations applicables, notamment la loi burkinabé
          relative à la protection des données à caractère personnel (loi n°010-2004/AN
          du 20 avril 2004) et, lorsque applicable, le Règlement général sur la
          protection des données (RGPD) de l'Union européenne.
        </P>

        <Callout label="Important">
          En utilisant les services Digiflex ou en visitant le site digiflex-burkina.com,
          vous acceptez les termes de la présente Politique de confidentialité. Si vous
          n'êtes pas d'accord avec ces termes, merci de ne pas utiliser nos services.
        </Callout>
      </Article>

      <Article id="article-2" number="II" title="Identité du responsable de traitement">
        <P>Le responsable du traitement des données personnelles est :</P>

        <InfoBlock
          rows={[
            { label: 'Raison sociale', value: <>DIGIFLEX SARL — Société à responsabilité limitée</> },
            { label: 'Siège social', value: <>Secteur 14, Lot 08, Parcelle 05,<br/>09 BP 1654 Ouagadougou 09, Burkina Faso</> },
            { label: 'Capital social', value: '1 000 000 FCFA' },
            { label: 'RCCM', value: 'BF-OUA-01-2025-B12-02317 — Tribunal de Commerce de Ouagadougou' },
            { label: 'Représentée par', value: 'Monsieur Carlos KY, Gérant' },
            { label: 'Email', value: <LinkInline href="mailto:contact@digiflex-burkina.com">contact@digiflex-burkina.com</LinkInline> },
            { label: 'Téléphone', value: '+226 54 71 48 40' },
          ]}
        />

        <Section number="2.1" title="Délégué à la protection des données (DPO)">
          <P>
            Pour toute question relative à la protection de vos données personnelles,
            vous pouvez contacter notre Délégué à la protection des données :
          </P>
          <InfoBlock
            rows={[
              { label: 'Nom', value: 'Monsieur Carlos KY — Gérant de Digiflex SARL' },
              { label: 'Email', value: <LinkInline href="mailto:contact@digiflex-burkina.com">contact@digiflex-burkina.com</LinkInline> },
              { label: 'Courrier postal', value: '09 BP 1654 Ouagadougou 09, Burkina Faso' },
            ]}
          />
        </Section>
      </Article>

      <Article id="article-3" number="III" title="Données personnelles collectées">
        <P>
          Digiflex collecte différentes catégories de données selon le contexte de la
          relation avec la personne concernée. Les données sont toujours collectées de
          manière loyale, transparente et dans un objectif défini et légitime.
        </P>

        <Section number="3.1" title="Données collectées sur le site digiflex-burkina.com">
          <P>
            Lorsque vous visitez le site digiflex-burkina.com, Digiflex peut collecter
            automatiquement les données suivantes :
          </P>
          <DashList
            items={[
              <><Strong>Données de navigation</Strong> : adresse IP, type et version de navigateur, système d'exploitation, pages consultées, date et heure de visite, durée de session, source de trafic (moteur de recherche, réseau social, site référent).</>,
              <><Strong>Données de formulaires</Strong> : lorsque vous remplissez un formulaire de contact ou de demande de devis, nous collectons les informations que vous nous fournissez (nom, prénom, email, téléphone, nom de votre entreprise, nature de votre projet, message).</>,
              <><Strong>Données de préférences</Strong> : si vous acceptez les cookies, des identifiants permettent de mémoriser vos choix et de personnaliser votre expérience.</>,
            ]}
          />
        </Section>

        <Section number="3.2" title="Données collectées dans le cadre des prestations">
          <P>
            Lorsqu'un client contracte avec Digiflex pour des prestations de marketing,
            de communication, de création de site web ou de gestion de présence
            digitale, nous collectons et traitons les données suivantes :
          </P>
          <DashList
            items={[
              <><Strong>Données d'identification du client</Strong> : raison sociale, forme juridique, adresse, numéro d'immatriculation, représentants légaux, contacts opérationnels.</>,
              <><Strong>Données de projet</Strong> : briefs, documents de travail, actifs créatifs, historique des échanges.</>,
              <><Strong>Données financières</Strong> : montants facturés, modes de règlement, historique de paiement.</>,
            ]}
          />
        </Section>

        <Section number="3.3" title="Données collectées via JARVIS">
          <P>
            JARVIS est le système propriétaire de Digiflex qui permet de gérer de manière
            intégrée la présence digitale de nos clients. Son fonctionnement repose sur
            l'accès <Strong>autorisé et explicite</Strong> aux comptes de nos clients sur
            les plateformes tierces telles que Meta (Facebook, Instagram), TikTok,
            LinkedIn, Google (Analytics, Search Console, My Business).
          </P>
          <P>
            Pour chaque client qui autorise l'usage de JARVIS via un processus
            d'authentification officiel (OAuth) ou par accord contractuel écrit, nous
            collectons :
          </P>
          <DashList
            items={[
              <><Strong>Données d'identification des comptes connectés</Strong> : identifiant de page, nom du compte, type de compte, permissions accordées.</>,
              <><Strong>Jetons d'accès (tokens)</Strong> : délivrés par les plateformes tierces et stockés de manière chiffrée. Ces jetons permettent à JARVIS d'agir au nom du client dans les limites strictes de l'autorisation donnée.</>,
              <><Strong>Contenus publiés</Strong> : textes des publications, images, vidéos, et métadonnées associées.</>,
              <><Strong>Métriques de performance</Strong> : portée, impressions, engagement, clics, conversions, données démographiques agrégées et anonymisées de l'audience.</>,
              <><Strong>Interactions reçues</Strong> : commentaires, messages privés, mentions reçus sur les comptes des clients.</>,
              <><Strong>Données de trafic web</Strong> (pour les clients en Web Management) : visites, sources, comportement sur les pages, parcours de conversion.</>,
            ]}
          />
          <Callout label="Point clé">
            JARVIS ne collecte que les données nécessaires à l'exécution des missions
            confiées par nos clients. Les données collectées via les plateformes tierces
            restent la propriété des clients concernés. Digiflex agit uniquement en
            qualité de sous-traitant au sens des réglementations applicables.
          </Callout>
        </Section>
      </Article>

      <Article id="article-4" number="IV" title="Finalités du traitement">
        <P>
          Les données personnelles collectées par Digiflex sont traitées pour les
          finalités suivantes, et uniquement pour celles-ci :
        </P>
        <Section number="4.1" title="Exécution des prestations contractuelles">
          <P>
            Utilisation des données clients et prospects pour réaliser les missions
            confiées : création et mise à jour de contenus, publication programmée,
            gestion de campagnes, reporting, facturation.
          </P>
        </Section>
        <Section number="4.2" title="Relation commerciale et communication">
          <P>
            Réponse aux demandes de contact, envoi de devis, suivi de la relation
            client, envoi d'informations commerciales à des prospects ayant manifesté un
            intérêt (avec possibilité de désinscription à tout moment).
          </P>
        </Section>
        <Section number="4.3" title="Amélioration des services">
          <P>
            Analyse anonymisée et agrégée des données d'usage pour améliorer la qualité
            des prestations, identifier des tendances sectorielles et affiner les
            recommandations stratégiques proposées aux clients.
          </P>
        </Section>
        <Section number="4.4" title="Sécurité et conformité">
          <P>
            Traçabilité des actions effectuées par JARVIS pour des raisons d'audit,
            détection de fraudes ou d'usages anormaux, conformité aux obligations
            légales et réglementaires.
          </P>
        </Section>
        <Section number="4.5" title="Obligations légales">
          <P>
            Conservation de certaines données pour répondre à des obligations
            comptables, fiscales ou réglementaires imposées par la loi burkinabé ou
            toute autre législation applicable.
          </P>
        </Section>
      </Article>

      <Article id="article-5" number="V" title="Bases légales du traitement">
        <P>
          Chaque traitement de données personnelles par Digiflex repose sur l'une des
          bases légales suivantes :
        </P>
        <DashList
          items={[
            <><Strong>Exécution d'un contrat</Strong> : lorsque le traitement est nécessaire pour exécuter les prestations que vous nous avez confiées ou pour prendre des mesures précontractuelles à votre demande.</>,
            <><Strong>Consentement</Strong> : lorsque vous avez donné votre accord explicite, par exemple pour l'utilisation de cookies non essentiels, l'envoi de communications commerciales, ou l'autorisation d'accès OAuth à vos comptes sociaux.</>,
            <><Strong>Intérêt légitime</Strong> : lorsque Digiflex a un intérêt légitime à traiter les données (par exemple, prévention de la fraude, sécurité informatique, amélioration des services), dans le respect de vos droits et libertés.</>,
            <><Strong>Obligation légale</Strong> : lorsque le traitement est imposé par une disposition légale ou réglementaire.</>,
          ]}
        />
      </Article>

      <Article id="article-6" number="VI" title="Destinataires des données">
        <P>
          Les données personnelles collectées par Digiflex ne sont jamais vendues à des
          tiers. Elles peuvent être partagées uniquement dans les cas suivants :
        </P>
        <Section number="6.1" title="Personnel de Digiflex">
          <P>
            Seuls les collaborateurs de Digiflex ayant besoin d'accéder aux données dans
            le cadre de leurs missions y ont accès. Chaque collaborateur est soumis à
            une obligation stricte de confidentialité.
          </P>
        </Section>
        <Section number="6.2" title="Sous-traitants techniques">
          <P>
            Digiflex fait appel à des prestataires techniques qualifiés, soumis à des
            obligations contractuelles de confidentialité et de sécurité, notamment :
          </P>
          <DashList
            items={[
              <><Strong>Hébergement des applications</Strong> : Vercel Inc. (États-Unis) — certifié SOC 2 Type II.</>,
              <><Strong>Base de données et authentification</Strong> : Supabase Inc. (États-Unis) — chiffrement AES-256 au repos.</>,
              <><Strong>Plateformes tierces autorisées</Strong> : Meta Platforms, Inc. (Facebook, Instagram), TikTok, LinkedIn, Google (pour les intégrations OAuth et API officielles).</>,
              <><Strong>Services de monitoring et d'analyse</Strong> : Sentry, Vercel Analytics.</>,
            ]}
          />
        </Section>
        <Section number="6.3" title="Autorités compétentes">
          <P>
            Digiflex peut être amenée à communiquer des données personnelles aux
            autorités judiciaires, administratives ou de régulation, uniquement sur
            demande motivée et dans le cadre strict prévu par la loi.
          </P>
        </Section>
        <Section number="6.4" title="Transferts hors du Burkina Faso">
          <P>
            Certains sous-traitants techniques étant situés hors du Burkina Faso
            (principalement aux États-Unis et en Europe), des transferts de données
            peuvent avoir lieu. Digiflex s'assure que ces transferts s'effectuent vers
            des pays offrant un niveau de protection adéquat, ou sont encadrés par des
            garanties contractuelles appropriées.
          </P>
        </Section>
      </Article>

      <Article id="article-7" number="VII" title="Durée de conservation">
        <P>
          Les données personnelles sont conservées pour la durée strictement nécessaire
          aux finalités pour lesquelles elles ont été collectées, puis archivées ou
          supprimées selon les règles suivantes :
        </P>
        <DashList
          items={[
            <><Strong>Données de prospects</Strong> : 3 ans à compter du dernier contact, sauf demande de suppression anticipée.</>,
            <><Strong>Données clients</Strong> : pendant toute la durée de la relation contractuelle, puis 5 ans à compter de la fin pour répondre aux obligations légales.</>,
            <><Strong>Données collectées via JARVIS</Strong> : pendant toute la durée de l'autorisation OAuth active et jusqu'à 90 jours après sa révocation. Les tokens sont supprimés immédiatement à la révocation.</>,
            <><Strong>Données de navigation et cookies</Strong> : 13 mois maximum.</>,
            <><Strong>Logs de sécurité et d'audit</Strong> : 12 mois glissants.</>,
          ]}
        />
      </Article>

      <Article id="article-8" number="VIII" title="Vos droits sur vos données">
        <P>
          Conformément aux législations applicables en matière de protection des
          données, vous disposez des droits suivants sur vos données personnelles :
        </P>

        <Section number="8.1" title="Droit d'accès">
          <P>
            Vous pouvez à tout moment demander à Digiflex de vous communiquer les
            données personnelles que nous détenons à votre sujet, ainsi que des
            informations sur les traitements effectués.
          </P>
        </Section>
        <Section number="8.2" title="Droit de rectification">
          <P>
            Si les données que nous détenons sont inexactes ou incomplètes, vous pouvez
            demander leur correction ou leur complètement.
          </P>
        </Section>
        <Section number="8.3" title="Droit à l'effacement (droit à l'oubli)">
          <P>
            Vous pouvez demander la suppression de vos données personnelles lorsque leur
            conservation n'est plus justifiée, sous réserve des obligations légales de
            conservation qui s'imposeraient à Digiflex.
          </P>
        </Section>
        <Section number="8.4" title="Droit à la limitation du traitement">
          <P>
            Vous pouvez demander la suspension temporaire du traitement de vos données
            en cas de contestation de leur exactitude, de traitement jugé illicite, ou
            lorsque vous vous opposez au traitement.
          </P>
        </Section>
        <Section number="8.5" title="Droit à la portabilité">
          <P>
            Vous pouvez demander la restitution de vos données dans un format structuré,
            couramment utilisé et lisible par machine (par exemple JSON ou CSV), afin de
            les transférer à un autre prestataire de votre choix.
          </P>
        </Section>
        <Section number="8.6" title="Droit d'opposition">
          <P>
            Vous pouvez vous opposer à tout moment au traitement de vos données pour des
            motifs légitimes tenant à votre situation particulière.
          </P>
        </Section>
        <Section number="8.7" title="Droit de retrait du consentement">
          <P>
            Lorsque le traitement repose sur votre consentement, vous pouvez le retirer
            à tout moment, sans que cela remette en cause la licéité des traitements
            effectués avant ce retrait.
          </P>
        </Section>
        <Section number="8.8" title="Modalités d'exercice">
          <P>Pour exercer l'un de ces droits, vous pouvez nous écrire :</P>
          <InfoBlock
            rows={[
              { label: 'Par email', value: <LinkInline href="mailto:contact@digiflex-burkina.com">contact@digiflex-burkina.com</LinkInline> },
              { label: 'Par courrier', value: <>DIGIFLEX SARL — Délégué à la protection des données<br/>09 BP 1654 Ouagadougou 09, Burkina Faso</> },
            ]}
          />
          <P>
            Nous nous engageons à répondre à votre demande dans un délai d'un mois à
            compter de sa réception. Ce délai peut être prolongé de deux mois si la
            complexité ou le volume des demandes le justifie, auquel cas nous vous en
            informerons dans le premier mois.
          </P>
          <Callout>
            Pour des raisons de sécurité, nous pouvons être amenés à vérifier votre
            identité avant de donner suite à votre demande. Nous vous remercions de
            votre compréhension.
          </Callout>
        </Section>
        <Section number="8.9" title="Droit de recours">
          <P>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas
            respectés, vous pouvez introduire une réclamation auprès de l'autorité de
            protection des données compétente au Burkina Faso : la Commission de
            l'Informatique et des Libertés (CIL).
          </P>
        </Section>
      </Article>

      <Article id="article-9" number="IX" title="Sécurité des données">
        <P>
          Digiflex met en œuvre des mesures techniques et organisationnelles appropriées
          pour protéger les données personnelles contre la perte, l'accès non autorisé,
          la divulgation, la modification ou la destruction.
        </P>
        <Section number="9.1" title="Mesures techniques">
          <DashList
            items={[
              'Chiffrement des données sensibles au repos (AES-256) et en transit (TLS 1.3).',
              'Chiffrement systématique des tokens d\'accès OAuth via Supabase Vault.',
              'Contrôle d\'accès strict basé sur les rôles (Row Level Security).',
              'Authentification à deux facteurs obligatoire pour les comptes administrateurs.',
              'Journalisation et audit des actions sensibles.',
              'Sauvegardes régulières et testées.',
            ]}
          />
        </Section>
        <Section number="9.2" title="Mesures organisationnelles">
          <DashList
            items={[
              'Formation des collaborateurs aux bonnes pratiques de sécurité et de confidentialité.',
              'Clauses de confidentialité dans les contrats de travail et de sous-traitance.',
              'Procédure documentée de gestion des incidents de sécurité.',
              'Revue périodique des accès et des permissions.',
            ]}
          />
        </Section>
        <Section number="9.3" title="Notification des violations">
          <P>
            En cas de violation de données personnelles susceptible d'engendrer un
            risque pour vos droits et libertés, Digiflex s'engage à vous en informer
            dans les meilleurs délais, ainsi qu'à notifier l'autorité de contrôle
            compétente conformément aux obligations légales.
          </P>
        </Section>
      </Article>

      <Article id="article-10" number="X" title="Cookies et traceurs">
        <P>
          Le site digiflex-burkina.com utilise des cookies et technologies similaires
          pour améliorer votre expérience de navigation, analyser l'utilisation du site
          et, avec votre consentement, personnaliser certains contenus.
        </P>
        <Section number="10.1" title="Types de cookies utilisés">
          <DashList
            items={[
              <><Strong>Cookies strictement nécessaires</Strong> : indispensables au fonctionnement du site (session, sécurité). Ils ne nécessitent pas votre consentement.</>,
              <><Strong>Cookies de mesure d'audience</Strong> : pour comprendre comment le site est utilisé et l'améliorer. Utilisés uniquement après votre consentement explicite.</>,
              <><Strong>Cookies fonctionnels</Strong> : pour mémoriser vos préférences (langue, zone géographique). Optionnels.</>,
            ]}
          />
        </Section>
        <Section number="10.2" title="Gestion des cookies">
          <P>
            Lors de votre première visite, un bandeau de consentement vous permet
            d'accepter, refuser ou personnaliser l'usage des cookies. Vous pouvez
            modifier vos choix à tout moment via le lien « Gérer les cookies » présent
            en pied de page.
          </P>
        </Section>
      </Article>

      <Article id="article-11" number="XI" title="Modifications de la Politique">
        <P>
          Digiflex peut être amenée à modifier la présente Politique de confidentialité
          pour tenir compte des évolutions légales, réglementaires, jurisprudentielles
          ou techniques.
        </P>
        <P>
          Les modifications prennent effet dès leur publication sur digiflex-burkina.com.
          La date de dernière mise à jour figure en tête du présent document. Nous vous
          invitons à consulter régulièrement cette page.
        </P>
        <P>
          En cas de modification substantielle ayant un impact sur le traitement de vos
          données, nous vous en informerons par tout moyen approprié (email, notification
          sur le site) avant l'entrée en vigueur.
        </P>
      </Article>

      <Article id="article-12" number="XII" title="Nous contacter">
        <P>
          Pour toute question relative à la présente Politique de confidentialité ou au
          traitement de vos données personnelles, vous pouvez nous contacter :
        </P>

        <FeatureBlock
          label="Email principal"
          value="contact@digiflex-burkina.com"
          href="mailto:contact@digiflex-burkina.com"
        />

        <InfoBlock
          rows={[
            { label: 'Téléphone', value: '+226 54 71 48 40' },
            { label: 'Courrier', value: <>DIGIFLEX SARL<br/>09 BP 1654 Ouagadougou 09<br/>Burkina Faso</> },
          ]}
        />
      </Article>
    </LegalPage>
  );
}
