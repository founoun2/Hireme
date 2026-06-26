import React from 'react';

export const JobDisclaimer: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Avertissement Emploi</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Informations Importantes</p>
    </div>

    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
      <div className="flex items-start gap-3">
        <i className="fa fa-exclamation-triangle text-amber-500 text-xl mt-0.5"></i>
        <p className="text-sm text-amber-800 font-bold leading-relaxed">
          Veuillez lire attentivement cet avertissement avant d'utiliser HireMe Maroc ou de postuler à une offre d'emploi sur notre plateforme.
        </p>
      </div>
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">1. Pas une Agence de Recrutement</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        <strong>HireMe Maroc est une plateforme de recherche d'emploi qui agrège les offres d'emploi publiquement disponibles provenant de multiples sources. Nous ne sommes pas une agence de recrutement, un employeur, une société de placement ou une entreprise d'embauche.</strong> Nous n'employons personne directement et nous n'agissons pas en tant qu'intermédiaire entre les chercheurs d'emploi et les employeurs.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">2. Aucune Garantie de Disponibilité</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous ne garantissons pas l'exactitude, l'exhaustivité ou la véracité de toute offre d'emploi affichée sur notre plateforme. Les offres d'emploi peuvent être expirées, pourvues ou ne plus accepter de candidatures au moment où vous les consultez. Vérifiez toujours directement auprès de l'employeur.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">3. Aucune Garantie d'Emploi</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        L'utilisation de HireMe Maroc ne garantit pas que vous trouverez un emploi, recevrez une réponse de la part d'un employeur ou serez embauché pour un poste. Le processus d'embauche se fait entièrement entre le chercheur d'emploi et l'employeur.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">4. Exactitude du Contenu</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Bien que nous nous efforcions de fournir des informations exactes sur les emplois, les offres d'emploi sur notre plateforme sont collectées à partir de sources tierces et peuvent contenir des erreurs, des informations obsolètes ou des inexactitudes. Nous ne sommes pas responsables des inexactitudes dans les offres d'emploi.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">5. Votre Responsabilité</h2>
      <p className="text-sm text-slate-600 leading-relaxed">En tant qu'utilisateur de notre plateforme, vous êtes responsable de :</p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-check text-indigo-500 mt-1"></i> <span>Vérifier toutes les informations sur l'emploi directement auprès de l'employeur avant de postuler</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check text-indigo-500 mt-1"></i> <span>Vous assurer que vous remplissez les critères du poste avant de postuler</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check text-indigo-500 mt-1"></i> <span>Protéger vos informations personnelles lorsque vous communiquez avec les employeurs</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-check text-indigo-500 mt-1"></i> <span>Être prudent face aux arnaques ou aux offres frauduleuses potentielles</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">6. Limitation de Responsabilité</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        HireMe Maroc, ses propriétaires, opérateurs et affiliés ne sauraient être tenus responsables de toute perte, dommage ou inconvenience résultant de l'utilisation de notre plateforme, y compris mais sans s'y limiter, la confiance accordée aux informations sur les offres d'emploi, les interactions avec les employeurs ou les résultats d'embauche.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">7. Signaler un Problème</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Si vous rencontrez une offre d'emploi frauduleuse, inexacte ou expirée sur notre plateforme, veuillez la signaler immédiatement en nous contactant à <strong>report@hirememaroc.online</strong>. Nous prenons tous les signalements au sérieux et enquêterons dans les plus brefs délais.
      </p>
    </section>
  </div>
);
