import React from 'react';

export const DMCAPolicy: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">DMCA / Politique de Droits d'Auteur</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dernière mise à jour : Juin 2026</p>
    </div>

    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100/50">
      <p className="text-sm text-slate-700 font-medium leading-relaxed">
        <strong>HireMe Maroc</strong> respecte les droits de propriété intellectuelle d'autrui et attend de ses utilisateurs qu'ils en fassent autant. Conformément au Digital Millennium Copyright Act (DMCA), nous répondrons rapidement aux réclamations de violation de droit d'auteur.
      </p>
    </div>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">1. Signaler une Violation de Droits d'Auteur</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Si vous estimez qu'un contenu sur notre plateforme porte atteinte à vos droits d'auteur, veuillez soumettre une notification écrite contenant les informations suivantes :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-pen text-indigo-500 mt-1"></i> <span>Une signature physique ou électronique du titulaire des droits d'auteur ou de son agent autorisé</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-pen text-indigo-500 mt-1"></i> <span>L'identification de l'œuvre protégée par le droit d'auteur censée avoir été violée</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-pen text-indigo-500 mt-1"></i> <span>L'identification du matériel censé être infraction et sa localisation sur notre plateforme</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-pen text-indigo-500 mt-1"></i> <span>Vos coordonnées (nom, adresse, téléphone, e-mail)</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-pen text-indigo-500 mt-1"></i> <span>Une déclaration selon laquelle vous avez de bonne raison de croire que l'utilisation n'est pas autorisée</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-pen text-indigo-500 mt-1"></i> <span>Une déclaration sous serment que les informations sont exactes</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">2. Comment Nous Traitons les Réclamations</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Après réception d'une notification DMCA valide, nous :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-search text-indigo-500 mt-1"></i> <span>Enquêterons promptement sur la réclamation dans les 24 à 48 heures</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-ban text-indigo-500 mt-1"></i> <span>Supprimerons ou désactiverons l'accès au contenu prétendument infraction</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-envelope text-indigo-500 mt-1"></i> <span>Informerons la partie ayant publié le contenu de la suppression</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">3. Contre-Notification</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Si vous estimez que votre contenu a été supprimé par erreur, vous pouvez soumettre une contre-notification contenant :
      </p>
      <ul className="space-y-3 text-sm text-slate-600">
        <li className="flex items-start gap-3"><i className="fa fa-undo text-indigo-500 mt-1"></i> <span>Votre signature physique ou électronique</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-undo text-indigo-500 mt-1"></i> <span>L'identification du contenu supprimé et son emplacement précédent</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-undo text-indigo-500 mt-1"></i> <span>Une déclaration sous serment selon laquelle la suppression était une erreur</span></li>
        <li className="flex items-start gap-3"><i className="fa fa-undo text-indigo-500 mt-1"></i> <span>Votre consentement à la juridiction du tribunal applicable</span></li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">4. Utilisateurs Récidivistes</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Nous pouvons résilier les comptes des utilisateurs qui sont trouvés en violation répétée des droits d'auteur.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-lg font-black text-slate-900">5. Contact</h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        Envoyez les notifications DMCA à notre agent des droits d'auteur désigné :
      </p>
      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
        <p><strong>E-mail :</strong> dmca@hirememaroc.online</p>
        <p><strong>Ligne d'objet :</strong> Demande de Retrait DMCA</p>
        <p><strong>Site web :</strong> hirememaroc.online</p>
      </div>
    </section>
  </div>
);
