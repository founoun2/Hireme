import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`mailto:contact@hirememaroc.online?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom : ${formData.name}\nE-mail : ${formData.email}\n\n${formData.message}`)}`);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Contactez-Nous</h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nous serions ravis d'avoir de vos nouvelles</p>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100/50">
        <p className="text-sm text-slate-700 font-medium leading-relaxed">
          Que vous ayez une question, une suggestion ou besoin d'assistance, notre équipe est là pour vous aider. Nous nous engageons à répondre dans les 24 à 48 heures.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">À Propos de HireMe Maroc</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          HireMe Maroc est un moteur de recherche d'emploi intelligent pour le marché marocain. Nous collectons et organisons les offres d'emploi publiquement disponibles sur le web pour aider les chercheurs d'emploi à trouver des opportunités plus rapidement et plus facilement.
        </p>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-3"><i className="fa fa-globe text-indigo-500 mt-1"></i> <span><strong>Site web :</strong> hirememaroc.online</span></li>
          <li className="flex items-start gap-3"><i className="fa fa-envelope text-indigo-500 mt-1"></i> <span><strong>E-mail :</strong> contact@hirememaroc.online</span></li>
          <li className="flex items-start gap-3"><i className="fa fa-map-marker-alt text-indigo-500 mt-1"></i> <span><strong>Localisation :</strong> Casablanca, Maroc</span></li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">Envoyez-Nous un Message</h2>
        {submitted ? (
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
            <i className="fa fa-check-circle text-emerald-500 text-3xl mb-3"></i>
            <p className="text-sm font-bold text-emerald-700">Votre client e-mail a été ouvert. Merci de nous avoir contactés !</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 text-xs font-bold text-indigo-600 hover:underline">Envoyer un autre message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nom</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-mail</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300" placeholder="votre@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sujet</label>
              <input type="text" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300" placeholder="Comment pouvons-nous vous aider ?" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Message</label>
              <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 resize-none" placeholder="Dites-nous plus..." />
            </div>
            <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-wider hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95">
              <i className="fa fa-paper-plane mr-2"></i>Envoyer le Message
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
