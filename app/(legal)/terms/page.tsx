// ============================================================
// FICHIER : app/(legal)/terms/page.tsx
// Conditions générales — version stylée complète
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
  title: 'Conditions générales · Digiflex',
  description:
    "Conditions générales d'utilisation et de vente des services Digiflex. Cadre juridique de nos prestations.",
  robots: { index: true, follow: true },
};

const sections = [
  { id: 'article-1', number: 'I', title: 'Objet et champ' },
  { id: 'article-2', number: 'II', title: 'Définitions' },
  { id: 'article-3', number: 'III', title: 'Services proposés' },
  { id: 'article-4', number: 'IV', title: 'Devis et commande' },
  { id: 'article-5', number: 'V', title: 'Prix et paiement' },
  { id: 'article-6', number: 'VI', title: 'Engagements Digiflex' },
  { id: 'article-7', number: 'VII', title: 'Engagements Client' },
  { id: 'article-8', number: 'VIII', title: 'Spécificités JARVIS' },
  { id: 'article-9', number: 'IX', title: 'Propriété intellectuelle' },
  { id: 'article-10', number: 'X', title: 'Confidentialité' },
  { id: 'article-11', number: 'XI', title: 'Durée et résiliation' },
  { id: 'article-12', number: 'XII', title: 'Responsabilité' },
  { id: 'article-13', number: 'XIII', title: 'Données personnelles' },
  { id: 'article-14', number: 'XIV', title: 'Litiges' },
  { id: 'article-15', number: 'XV', title: 'Dispositions finales' },
  { id: 'article-16', number: 'XVI', title: 'Contact' },
];

export default function TermsPage() {
  return (
    <LegalPage
      label="Document II · Conditions générales"
      title="Conditions générales d'utilisation et de vente"
      subtitle="Le cadre juridique qui régit nos prestations et votre usage du site."
      version="Version 1.0"
      effectiveDate="23 avril 2026"
      sections={sections}
    >
      <Article id="article-1" number="I" title="Objet et champ d'application">
        <P>
          Les présentes Conditions générales d'utilisation et de vente (ci-après « CGU/CGV »
          ou « Conditions ») régissent l'utilisation du site internet digiflex-burkina.com
          (ci-après « le Site ») et l'ensemble des prestations de services proposées par{' '}
          <Strong>DIGIFLEX SARL</Strong>, société à responsabilité limitée immatriculée au
          Registre du Commerce et du Crédit Mobilier de Ouagadougou sous le numéro
          BF-OUA-01-2025-B12-02317 (ci-après « Digiflex » ou « le Prestataire »).
        </P>
        <P>
          Elles s'appliquent à toute personne physique ou morale qui visite le Site, qui
          manifeste son intérêt pour les services proposés, ou qui contracte avec Digiflex
          pour une prestation (ci-après « le Client » ou « l'Utilisateur »).
        </P>
        <P>
          En utilisant le Site ou en contractant avec Digiflex, l'Utilisateur reconnaît
          avoir pris connaissance des présentes Conditions et les accepter sans réserve.
          Les Conditions applicables sont celles en vigueur à la date de commande de la
          prestation.
        </P>
        <Callout label="À propos de Digiflex">
          Digiflex est une agence de branding, de marketing et de communication. Ses
          domaines d'intervention incluent : conseil stratégique, identité de marque,
          création et gestion de sites web, gestion de présence digitale et réseaux
          sociaux, production de contenus, accompagnement commercial.
        </Callout>
      </Article>

      <Article id="article-2" number="II" title="Définitions">
        <P>Dans les présentes Conditions, les termes suivants ont la signification indiquée :</P>
        <DashList
          items={[
            <><Strong>« Client »</Strong> : toute personne physique ou morale qui contracte avec Digiflex pour la réalisation d'une prestation.</>,
            <><Strong>« Prestation »</Strong> : tout service proposé et fourni par Digiflex, incluant mais non limité à : conseil stratégique, création graphique, développement web, gestion de réseaux sociaux, rédaction, production audiovisuelle, Web Management, accès à JARVIS.</>,
            <><Strong>« JARVIS »</Strong> : le système d'intelligence opérationnelle propriétaire de Digiflex, permettant la gestion intégrée de la présence digitale des Clients.</>,
            <><Strong>« Devis »</Strong> : document écrit précisant le périmètre, la durée et le prix d'une Prestation, remis au Client préalablement à la conclusion du contrat.</>,
            <><Strong>« Retainer »</Strong> : accord de prestation à exécution continue facturé mensuellement, généralement avec engagement minimum de trois (3) mois.</>,
            <><Strong>« Livrable »</Strong> : tout élément produit par Digiflex dans le cadre d'une Prestation et destiné à être remis au Client.</>,
          ]}
        />
      </Article>

      <Article id="article-3" number="III" title="Services proposés">
        <P>
          Digiflex propose les catégories de services suivants, dont le détail est précisé
          dans chaque Devis :
        </P>
        <Section number="3.1" title="Services aux entreprises">
          <DashList
            items={[
              'Stratégie et identité de marque : audits, positionnement, plateformes de marque, identités visuelles complètes.',
              'Création de sites web : conception et développement de sites en technologie no-code (Webflow, Wix Studio) ou code custom (Next.js).',
              'Web Management : gestion continue de sites web, incluant mise à jour des contenus, optimisation SEO, maintenance technique, reporting.',
              'Social Media Management : gestion des réseaux sociaux avec calendrier éditorial, création de contenus, publication, community management.',
              'Gestion des campagnes publicitaires sur plateformes sociales (commission de gestion distincte du budget publicitaire).',
              'Production de contenus : photo, vidéo, rédaction, design graphique.',
            ]}
          />
        </Section>
        <Section number="3.2" title="Services aux particuliers">
          <DashList
            items={[
              'Personal branding et accompagnement au rayonnement personnel.',
              'Production de contenus photo/vidéo pour usage professionnel ou personnel.',
            ]}
          />
        </Section>
      </Article>

      <Article id="article-4" number="IV" title="Devis, commande et conclusion du contrat">
        <Section number="4.1" title="Procédure préalable : diagnostic">
          <P>
            Conformément à l'approche « diagnostic-first » de Digiflex, toute demande de
            prestation fait l'objet d'une phase préalable de discovery, sous forme
            d'échange(s) avec le Client. Cette phase permet de définir avec précision le
            besoin, le contexte, les objectifs et le périmètre de la prestation envisagée.
          </P>
        </Section>
        <Section number="4.2" title="Établissement du Devis">
          <P>
            À l'issue de la phase de discovery, Digiflex établit un Devis écrit et
            détaillé, précisant notamment :
          </P>
          <DashList
            items={[
              'La description précise de la prestation et du périmètre couvert.',
              'Les livrables prévus et les délais associés.',
              'Le prix hors taxes et toutes taxes comprises.',
              'Les modalités et délais de paiement.',
              'La durée d\'engagement (pour les prestations en retainer).',
              'Les modalités de révision ou de modification.',
            ]}
          />
        </Section>
        <Section number="4.3" title="Validité du Devis">
          <P>
            Sauf mention contraire, les Devis émis par Digiflex sont valables pendant
            trente (30) jours à compter de leur date d'émission.
          </P>
        </Section>
        <Section number="4.4" title="Acceptation et formation du contrat">
          <P>
            Le contrat est formé à la date de signature du Devis par le Client (signature
            manuscrite ou électronique), combinée au versement de l'acompte prévu. La
            seule signature du Devis sans versement d'acompte ne constitue pas un
            engagement définitif.
          </P>
        </Section>
      </Article>

      <Article id="article-5" number="V" title="Prix et modalités de paiement">
        <Section number="5.1" title="Prix">
          <P>
            Les prix des prestations sont indiqués en Francs CFA (FCFA), hors taxes ou
            toutes taxes comprises selon ce qui est précisé dans le Devis. Digiflex se
            réserve le droit de modifier ses tarifs à tout moment, étant entendu que
            toute prestation commandée fait l'objet d'un prix fixe confirmé dans le Devis.
          </P>
        </Section>
        <Section number="5.2" title="Modalités de paiement">
          <P>Sauf stipulation contraire dans le Devis, les modalités de paiement sont les suivantes :</P>
          <DashList
            items={[
              <><Strong>Prestations ponctuelles</Strong> : acompte de cinquante pour cent (50%) à la signature du Devis, solde à la livraison.</>,
              <><Strong>Prestations en retainer</Strong> : paiement mensuel par avance, au plus tard le cinquième (5e) jour de chaque mois.</>,
              <>Les budgets publicitaires éventuels sont strictement séparés des honoraires de Digiflex et doivent être provisionnés distinctement par le Client.</>,
            ]}
          />
        </Section>
        <Section number="5.3" title="Moyens de paiement acceptés">
          <P>
            Digiflex accepte les règlements par virement bancaire, mobile money (Orange
            Money, Moov Money), ou tout autre moyen convenu entre les parties. Les
            espèces ne sont acceptées que pour les prestations inférieures à cent mille
            (100 000) FCFA, conformément aux bonnes pratiques comptables.
          </P>
        </Section>
        <Section number="5.4" title="Retard de paiement">
          <P>Tout retard de paiement entraîne de plein droit, sans mise en demeure préalable :</P>
          <DashList
            items={[
              'L\'application de pénalités de retard calculées sur la base du taux d\'intérêt légal en vigueur au Burkina Faso majoré de trois (3) points.',
              'La suspension immédiate des prestations en cours, notamment l\'arrêt des publications programmées, la suspension de l\'accès à JARVIS, et l\'interruption de la maintenance web.',
              'L\'exigibilité immédiate de toutes les sommes restant dues, même non échues.',
            ]}
          />
          <Callout label="Important">
            La suspension d'une prestation pour impayé ne dispense pas le Client du
            paiement des sommes dues. La reprise des prestations suppose la
            régularisation complète de la situation financière.
          </Callout>
        </Section>
      </Article>

      <Article id="article-6" number="VI" title="Engagements de Digiflex">
        <P>Digiflex s'engage à :</P>
        <DashList
          items={[
            'Exécuter les prestations avec soin, diligence et dans le respect des règles de l\'art applicables à son domaine d\'activité.',
            'Respecter les délais convenus dans le Devis, sous réserve du respect par le Client de ses propres obligations.',
            'Respecter la confidentialité des informations communiquées par le Client.',
            'Informer le Client de toute difficulté susceptible d\'affecter l\'exécution de la prestation.',
            'Respecter la législation applicable, notamment en matière de protection des données personnelles.',
          ]}
        />
        <P>
          Les obligations de Digiflex sont des <Strong>obligations de moyens</Strong>.
          Digiflex ne saurait garantir l'atteinte de résultats commerciaux spécifiques
          (volume de ventes, positionnement SEO, taux d'engagement précis), ceux-ci
          dépendant de facteurs externes nombreux et partiellement hors de son contrôle.
        </P>
      </Article>

      <Article id="article-7" number="VII" title="Engagements du Client">
        <P>Le Client s'engage à :</P>
        <DashList
          items={[
            'Fournir à Digiflex, dans les délais convenus, l\'ensemble des éléments nécessaires à l\'exécution de la prestation (accès, contenus, visuels, informations d\'entreprise, autorisations).',
            'Valider les livrables intermédiaires et finaux dans les délais prévus, étant entendu qu\'un retard de validation peut entraîner un report de la livraison finale.',
            'Payer les sommes dues aux échéances convenues.',
            'Respecter la propriété intellectuelle des livrables jusqu\'à leur transfert effectif.',
            'Ne pas utiliser les prestations de Digiflex à des fins illégales, trompeuses, diffamatoires ou contraires aux bonnes mœurs.',
            'Respecter la confidentialité des méthodologies propriétaires de Digiflex, y compris de JARVIS.',
          ]}
        />
        <Section number="7.1" title="Engagements spécifiques pour l'usage de JARVIS">
          <P>Lorsque la prestation inclut l'usage de JARVIS, le Client s'engage spécifiquement à :</P>
          <DashList
            items={[
              'Accorder à Digiflex les autorisations officielles (OAuth ou autres) nécessaires à l\'accès à ses comptes sur les plateformes tierces.',
              'Informer Digiflex de tout changement affectant ces autorisations (révocation, suspension de compte, changement de paramètres).',
              'Ne pas imposer à Digiflex des actions contraires aux conditions d\'utilisation des plateformes tierces (Meta, TikTok, LinkedIn, Google).',
              'Valider les contenus avant publication automatisée, selon le workflow défini.',
            ]}
          />
        </Section>
      </Article>

      <Article id="article-8" number="VIII" title="Dispositions spécifiques à JARVIS">
        <Section number="8.1" title="Nature de JARVIS">
          <P>
            JARVIS est un système d'intelligence opérationnelle propriétaire de Digiflex,
            utilisé pour la gestion intégrée de la présence digitale des Clients. Son
            accès et son usage sont réservés aux collaborateurs de Digiflex dans le
            cadre de l'exécution des prestations confiées par les Clients.
          </P>
        </Section>
        <Section number="8.2" title="Propriété intellectuelle de JARVIS">
          <P>
            JARVIS, ses composants, son code source, son design, sa méthodologie et tous
            les savoir-faire associés sont la propriété exclusive de Digiflex. Aucun
            Client ne peut revendiquer un droit de propriété, de licence ou d'accès au
            système au-delà des bénéfices qui lui sont fournis dans le cadre de sa
            prestation.
          </P>
        </Section>
        <Section number="8.3" title="Données traitées via JARVIS">
          <P>
            Les données du Client traitées via JARVIS restent la propriété pleine et
            entière du Client. Digiflex agit en qualité de sous-traitant au sens des
            législations de protection des données. Le traitement de ces données est régi
            par la <LinkInline href="/privacy">Politique de confidentialité</LinkInline> de
            Digiflex.
          </P>
        </Section>
        <Section number="8.4" title="Droit de révocation">
          <P>
            Le Client peut à tout moment révoquer les autorisations d'accès accordées à
            Digiflex, directement depuis les paramètres des plateformes concernées ou en
            notifiant Digiflex par écrit. La révocation met fin aux opérations
            automatiques de JARVIS pour ce Client.
          </P>
        </Section>
      </Article>

      <Article id="article-9" number="IX" title="Propriété intellectuelle des livrables">
        <Section number="9.1" title="Livrables créatifs">
          <P>
            La propriété intellectuelle des livrables créés par Digiflex (identités
            visuelles, contenus rédactionnels, photos, vidéos, sites web) est transférée
            au Client <Strong>à la condition expresse du paiement intégral</Strong> des
            sommes dues. Jusqu'au paiement intégral, Digiflex demeure titulaire des
            droits et le Client ne peut utiliser les livrables qu'à titre provisoire.
          </P>
        </Section>
        <Section number="9.2" title="Éléments préexistants">
          <P>
            Les éléments préexistants apportés par Digiflex (méthodologies, outils
            internes, templates, librairies de code, savoir-faire) demeurent la
            propriété de Digiflex et font l'objet d'une licence d'utilisation limitée au
            Client, dans le cadre exclusif de l'exploitation du livrable concerné.
          </P>
        </Section>
        <Section number="9.3" title="Références commerciales">
          <P>
            Digiflex se réserve le droit de mentionner le nom du Client et les livrables
            produits à titre de référence commerciale (portfolio, présentations,
            témoignages), sauf opposition écrite du Client manifestée au moment de la
            signature du Devis ou dans un délai raisonnable après la livraison.
          </P>
        </Section>
      </Article>

      <Article id="article-10" number="X" title="Confidentialité">
        <P>
          Chaque partie s'engage à traiter comme strictement confidentielles toutes les
          informations non publiques reçues de l'autre partie dans le cadre de la
          relation contractuelle, notamment :
        </P>
        <DashList
          items={[
            'Les stratégies commerciales et marketing.',
            'Les données financières.',
            'Les informations techniques et les savoir-faire.',
            'Les données clients et prospects.',
          ]}
        />
        <P>
          Cette obligation perdure pendant toute la durée du contrat et pendant une
          période de cinq (5) ans après son terme. Elle ne s'applique pas aux
          informations tombées dans le domaine public sans faute de la partie qui en a
          eu connaissance, ni aux informations dont la divulgation est requise par une
          obligation légale ou judiciaire.
        </P>
      </Article>

      <Article id="article-11" number="XI" title="Durée et résiliation">
        <Section number="11.1" title="Prestations ponctuelles">
          <P>
            Les prestations ponctuelles prennent fin à la livraison définitive du ou des
            livrables prévus, sous réserve du paiement intégral par le Client.
          </P>
        </Section>
        <Section number="11.2" title="Prestations en retainer">
          <P>
            Les prestations en retainer sont conclues pour une durée minimale de trois
            (3) mois, sauf accord contraire dans le Devis. À l'issue de cette période
            initiale, le contrat se renouvelle tacitement par périodes d'un (1) mois,
            sauf dénonciation par l'une des parties moyennant un préavis écrit de trente
            (30) jours avant la fin de la période en cours.
          </P>
        </Section>
        <Section number="11.3" title="Résiliation pour manquement">
          <P>
            En cas de manquement grave d'une partie à ses obligations, non réparé dans
            un délai de quinze (15) jours après mise en demeure écrite, l'autre partie
            peut résilier le contrat de plein droit, sans préjudice des dommages et
            intérêts qu'elle pourrait réclamer.
          </P>
        </Section>
        <Section number="11.4" title="Conséquences de la résiliation">
          <P>En cas de résiliation, quelle qu'en soit la cause :</P>
          <DashList
            items={[
              'Les prestations déjà exécutées restent dues.',
              'Digiflex restitue ou supprime, au choix du Client, les données et accès confiés.',
              'Chaque partie restitue ou détruit les informations confidentielles reçues de l\'autre.',
            ]}
          />
        </Section>
      </Article>

      <Article id="article-12" number="XII" title="Responsabilité">
        <Section number="12.1" title="Responsabilité de Digiflex">
          <P>
            La responsabilité de Digiflex ne peut être engagée qu'en cas de faute
            prouvée et directement imputable. Elle ne peut en aucun cas être engagée au
            titre des dommages indirects (perte de chiffre d'affaires, perte de
            clientèle, atteinte à l'image, préjudice commercial).
          </P>
          <P>
            En tout état de cause, le montant total de la responsabilité de Digiflex est
            strictement limité, toutes causes et tous préjudices confondus, au montant
            hors taxes effectivement perçu par Digiflex au titre de la prestation
            concernée au cours des douze (12) mois précédant la survenance du dommage.
          </P>
        </Section>
        <Section number="12.2" title="Force majeure">
          <P>
            Aucune des parties ne pourra être tenue responsable de tout manquement à ses
            obligations résultant d'un cas de force majeure au sens du droit applicable,
            notamment : catastrophes naturelles, guerres, grèves, coupures d'internet ou
            d'électricité prolongées, panne majeure d'un prestataire technique tiers
            (Meta, Google, Vercel, Supabase).
          </P>
        </Section>
        <Section number="12.3" title="Dépendances techniques tierces">
          <P>
            Le Client reconnaît que l'exécution de certaines prestations, notamment
            celles impliquant JARVIS, dépend du fonctionnement continu de plateformes
            tierces. Digiflex ne saurait être tenue responsable des interruptions,
            modifications unilatérales d'API, suspensions de comptes ou autres
            événements affectant ces plateformes.
          </P>
        </Section>
      </Article>

      <Article id="article-13" number="XIII" title="Protection des données personnelles">
        <P>
          Le traitement des données personnelles dans le cadre des prestations de
          Digiflex est régi par la{' '}
          <LinkInline href="/privacy">Politique de confidentialité</LinkInline> accessible
          à l'adresse digiflex-burkina.com/privacy, qui fait partie intégrante des
          présentes Conditions.
        </P>
        <P>
          Pour toute demande relative à la suppression des données personnelles, le
          Client peut se référer à la{' '}
          <LinkInline href="/data-deletion">procédure dédiée</LinkInline>.
        </P>
      </Article>

      <Article id="article-14" number="XIV" title="Litiges et juridiction compétente">
        <Section number="14.1" title="Tentative de résolution amiable">
          <P>
            Préalablement à toute action contentieuse, les parties s'engagent à
            rechercher une solution amiable en cas de différend relatif à
            l'interprétation ou à l'exécution des présentes Conditions.
          </P>
          <P>
            La partie souhaitant soulever un différend notifie l'autre partie par écrit
            (email ou courrier recommandé) en exposant clairement l'objet du litige et
            la solution proposée. Les parties disposent alors d'un délai de trente (30)
            jours pour parvenir à un accord amiable, éventuellement avec l'assistance
            d'un médiateur désigné d'un commun accord.
          </P>
          <Callout label="Résolution amiable">
            La tentative de résolution amiable est un préalable obligatoire à toute
            action judiciaire. Elle protège la relation commerciale et évite des
            procédures coûteuses.
          </Callout>
        </Section>
        <Section number="14.2" title="Droit applicable">
          <P>
            Les présentes Conditions sont régies par le droit burkinabé et, pour les
            aspects pertinents, par le droit uniforme OHADA (Organisation pour
            l'Harmonisation en Afrique du Droit des Affaires).
          </P>
        </Section>
        <Section number="14.3" title="Juridiction compétente">
          <P>
            En cas d'échec de la tentative de résolution amiable dans le délai de trente
            (30) jours, tout litige relatif aux présentes Conditions ou aux prestations
            de Digiflex sera soumis à la compétence exclusive des tribunaux compétents
            de Ouagadougou, Burkina Faso.
          </P>
        </Section>
      </Article>

      <Article id="article-15" number="XV" title="Dispositions finales">
        <Section number="15.1" title="Modification des Conditions">
          <P>
            Digiflex peut modifier les présentes Conditions à tout moment. Les
            modifications s'appliquent aux contrats conclus postérieurement à leur
            publication sur le Site. Pour les contrats en cours en retainer, Digiflex
            informe le Client des modifications substantielles trente (30) jours avant
            leur entrée en vigueur. Le Client peut résilier sans préavis si les
            modifications lui sont défavorables.
          </P>
        </Section>
        <Section number="15.2" title="Nullité partielle">
          <P>
            Si une clause des présentes Conditions était jugée nulle ou inapplicable par
            une autorité compétente, les autres clauses conserveraient leur plein effet.
          </P>
        </Section>
        <Section number="15.3" title="Non-renonciation">
          <P>
            Le fait pour l'une des parties de ne pas se prévaloir d'un manquement de
            l'autre à l'une de ses obligations ne saurait être interprété comme une
            renonciation à s'en prévaloir ultérieurement.
          </P>
        </Section>
        <Section number="15.4" title="Intégralité du contrat">
          <P>
            Les présentes Conditions, associées au Devis signé et à la Politique de
            confidentialité, constituent l'intégralité de l'accord entre les parties et
            remplacent tout accord antérieur relatif au même objet.
          </P>
        </Section>
        <Section number="15.5" title="Langue">
          <P>
            Les présentes Conditions sont rédigées en français. En cas de traduction, la
            version française fait foi.
          </P>
        </Section>
      </Article>

      <Article id="article-16" number="XVI" title="Contact">
        <P>
          Pour toute question relative aux présentes Conditions, l'Utilisateur peut
          contacter Digiflex :
        </P>

        <FeatureBlock
          label="Email"
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
