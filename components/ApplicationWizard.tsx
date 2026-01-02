import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import emailjs from '@emailjs/browser';

interface ApplicationWizardProps {
  job: Job;
  onClose: () => void;
}

type Step = 'upload' | 'generate' | 'review' | 'send' | 'success';
type Language = 'en' | 'ar' | 'fr' | 'es' | 'it';

const LANGUAGE_OPTIONS: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export const ApplicationWizard: React.FC<ApplicationWizardProps> = ({ job, onClose }) => {
  const [step, setStep] = useState<Step>('upload');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvBase64, setCvBase64] = useState<string>('');
  const [language, setLanguage] = useState<Language>('fr');
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  // Load saved CV from localStorage on mount
  useEffect(() => {
    const savedCV = localStorage.getItem('hireme_cv');
    const savedCVName = localStorage.getItem('hireme_cv_name');
    const savedEmail = localStorage.getItem('hireme_user_email');
    
    if (savedCV && savedCVName) {
      setCvBase64(savedCV);
      // Create a virtual file object for display
      const blob = base64ToBlob(savedCV);
      const file = new File([blob], savedCVName, { type: 'application/pdf' });
      setCvFile(file);
    }
    
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const base64ToBlob = (base64: string): Blob => {
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

  const extractEmailFromCV = (fileName: string): string => {
    // Simple email pattern matching from filename or content
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = fileName.match(emailPattern);
    return matches ? matches[0] : '';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Veuillez télécharger un fichier PDF ou Word');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux (max 5MB)');
      return;
    }

    setCvFile(file);

    // Convert to base64 and save to localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setCvBase64(base64);
      localStorage.setItem('hireme_cv', base64);
      localStorage.setItem('hireme_cv_name', file.name);
    };
    reader.readAsDataURL(file);
  };

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    try {
      // Extract email from CV file name or content
      const extractedEmail = extractEmailFromCV(cvFile?.name || '');
      if (extractedEmail && !userEmail) {
        setUserEmail(extractedEmail);
        localStorage.setItem('hireme_user_email', extractedEmail);
      }

      // Extract text from CV (simplified - in production use proper PDF parser)
      const cvText = `CV for ${job.title} position`;

      // Different prompt styles for variety on refresh
      const promptStyles = [
        `You are a professional career advisor. Write a compelling cover letter in ${LANGUAGE_OPTIONS.find(l => l.code === language)?.name} for this job application.`,
        `You are an expert HR consultant. Create a persuasive cover letter in ${LANGUAGE_OPTIONS.find(l => l.code === language)?.name} that stands out.`,
        `You are a senior recruiter. Draft an impressive cover letter in ${LANGUAGE_OPTIONS.find(l => l.code === language)?.name} for this candidate.`,
      ];

      const styleIndex = refreshCount % promptStyles.length;
      const promptIntro = promptStyles[styleIndex];

      const prompt = `${promptIntro}

Job Title: ${job.title}
Company: ${job.company}
Job Description: ${job.description}

Write a professional, concise cover letter (max 200 words) that:
- Opens with a ${refreshCount === 0 ? 'strong introduction' : refreshCount === 1 ? 'compelling hook' : 'unique opening'}
- Highlights relevant skills matching the job
- Shows enthusiasm and cultural fit
- ${refreshCount === 0 ? 'Emphasizes technical competencies' : refreshCount === 1 ? 'Focuses on achievements and impact' : 'Demonstrates passion and motivation'}
- Ends with a call to action

IMPORTANT: Generate version ${refreshCount + 1} - make it unique and different from previous attempts.
Write ONLY the letter content in ${LANGUAGE_OPTIONS.find(l => l.code === language)?.name}, no subject line or extra formatting.`;

      // Try AI providers in order: OpenAI → Gemini → Z.AI → Flowith
      let generatedText = '';

      // Try OpenAI first
      try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (!apiKey) throw new Error('No OpenAI key');
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 400,
            temperature: 0.8 + (refreshCount * 0.1) // Increase randomness on each refresh
          })
        });

        if (response.ok) {
          const data = await response.json();
          generatedText = data.choices[0].message.content.trim();
        }
      } catch (error) {
        console.log('OpenAI failed, trying Gemini...');
      }

      // Try Gemini if OpenAI failed
      if (!generatedText) {
        try {
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          if (!apiKey) throw new Error('No Gemini key');
          
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.9 + (refreshCount * 0.05), // More variety on refresh
                maxOutputTokens: 400
              }
            })
          });

          if (response.ok) {
            const data = await response.json();
            generatedText = data.candidates[0].content.parts[0].text.trim();
          }
        } catch (error) {
          console.log('Gemini failed, trying Z.AI...');
        }
      }

      // Fallback: Simple template if all AI fails
      if (!generatedText) {
        generatedText = getTemplateCoverLetter(language);
      }

      setCoverLetter(generatedText);
      setStep('review');
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setCoverLetter(getTemplateCoverLetter(language));
      setStep('review');
    } finally {
      setIsGenerating(false);
    }
  };

  const getTemplateCoverLetter = (lang: Language): string => {
    const templates = {
      fr: `Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de ${job.title} au sein de ${job.company}.

Fort(e) d'une expérience significative dans ce domaine, je suis convaincu(e) que mon profil correspond parfaitement à vos attentes. Mon parcours m'a permis de développer les compétences techniques et relationnelles nécessaires pour exceller dans ce rôle.

Motivé(e) et dynamique, je serais ravi(e) de contribuer au succès de votre entreprise et de relever les défis que ce poste implique.

Je reste à votre disposition pour un entretien à votre convenance.

Cordialement.`,
      en: `Dear Hiring Manager,

I am writing to express my interest in the ${job.title} position at ${job.company}.

With relevant experience in this field, I am confident that my profile aligns perfectly with your requirements. My background has enabled me to develop the technical and interpersonal skills necessary to excel in this role.

Motivated and dynamic, I would be delighted to contribute to your company's success and take on the challenges this position entails.

I remain available for an interview at your convenience.

Best regards.`,
      ar: `سيدي/سيدتي المحترم/ة،

أتقدم بطلبي للحصول على منصب ${job.title} في ${job.company}.

بفضل خبرتي الواسعة في هذا المجال، أنا واثق من أن ملفي الشخصي يتوافق تمامًا مع متطلباتكم. لقد مكنتني مسيرتي من تطوير المهارات التقنية والشخصية اللازمة للتفوق في هذا الدور.

متحمس وديناميكي، سأكون سعيدًا بالمساهمة في نجاح شركتكم ومواجهة التحديات التي يتضمنها هذا المنصب.

أبقى تحت تصرفكم لإجراء مقابلة في الوقت الذي يناسبكم.

مع فائق الاحترام.`,
      es: `Estimado/a señor/a,

Me dirijo a usted para presentar mi candidatura para el puesto de ${job.title} en ${job.company}.

Con experiencia relevante en este campo, estoy convencido/a de que mi perfil se ajusta perfectamente a sus requisitos. Mi trayectoria me ha permitido desarrollar las habilidades técnicas e interpersonales necesarias para destacar en este rol.

Motivado/a y dinámico/a, estaré encantado/a de contribuir al éxito de su empresa y asumir los desafíos que implica este puesto.

Quedo a su disposición para una entrevista cuando le resulte conveniente.

Atentamente.`,
      it: `Gentile responsabile delle assunzioni,

Mi rivolgo a Lei per presentare la mia candidatura per la posizione di ${job.title} presso ${job.company}.

Con esperienza rilevante in questo campo, sono convinto/a che il mio profilo corrisponda perfettamente alle Vostre esigenze. Il mio percorso mi ha permesso di sviluppare le competenze tecniche e relazionali necessarie per eccellere in questo ruolo.

Motivato/a e dinamico/a, sarei felice di contribuire al successo della Vostra azienda e affrontare le sfide che questa posizione comporta.

Rimango a Vostra disposizione per un colloquio a Vostro piacimento.

Cordiali saluti.`
    };
    return templates[lang] || templates.fr;
  };

  const handleRefresh = () => {
    if (refreshCount < 3) {
      setRefreshCount(refreshCount + 1);
      setEmailConfirmed(false); // Reset email confirmation on refresh
      generateCoverLetter();
    }
  };

  const handleEmailConfirm = () => {
    if (userEmail && userEmail.includes('@')) {
      setEmailConfirmed(true);
      localStorage.setItem('hireme_user_email', userEmail);
    } else {
      alert('Veuillez entrer une adresse email valide');
    }
  };

  const handleSendApplication = async () => {
    if (!emailConfirmed) {
      alert('⚠️ Veuillez confirmer votre adresse email');
      return;
    }

    setIsSending(true);
    try {
      const targetEmail = job.company_email || job.email;
      
      if (!targetEmail) {
        alert('❌ Aucune adresse email disponible pour cette offre');
        setIsSending(false);
        return;
      }

      // Initialize EmailJS (use your own public key from emailjs.com)
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        alert(`❌ Configuration EmailJS manquante!\n\n` +
          `Veuillez configurer EmailJS:\n` +
          `${!publicKey ? '- VITE_EMAILJS_PUBLIC_KEY manquant\n' : ''}` +
          `${!serviceId ? '- VITE_EMAILJS_SERVICE_ID manquant\n' : ''}` +
          `${!templateId ? '- VITE_EMAILJS_TEMPLATE_ID manquant\n' : ''}` +
          `\nConsultez EMAILJS_SETUP.md pour les instructions`);
        setIsSending(false);
        return;
      }

      console.log('📧 Initializing EmailJS...');
      emailjs.init(publicKey);

      // Prepare email template parameters with CV attachment
      const templateParams = {
        to_email: targetEmail,
        to_name: job.company,
        from_name: userEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Format name from email
        from_email: userEmail,
        reply_to: userEmail,
        job_title: job.title,
        company_name: job.company,
        subject: `Candidature pour ${job.title} - ${job.company}`,
        message: coverLetter,
        // CV Attachment - EmailJS supports attachments
        attachments: [{
          name: cvFile?.name || 'CV.pdf',
          data: cvBase64.split(',')[1], // Remove data:application/pdf;base64, prefix
          contentType: cvFile?.type || 'application/pdf'
        }]
      };

      console.log('📤 Sending email with CV attachment to:', targetEmail);
      console.log('📎 CV file:', cvFile?.name, `(${(cvFile?.size || 0 / 1024).toFixed(0)} KB)`);
      
      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('✅ Email sent successfully:', response);

      if (response.status === 200) {
        // Success - move to confirmation step
        setStep('success');
        setTimeout(() => {
          onClose();
        }, 5000);
      } else {
        throw new Error(`Email sending failed with status: ${response.status}`);
      }
    } catch (error: any) {
      console.error('❌ Error sending application:', error);
      
      // Detailed error messages
      let errorMessage = '❌ Erreur lors de l\'envoi:\n\n';
      
      if (error.text) {
        errorMessage += `Détails: ${error.text}\n`;
      } else if (error.message) {
        errorMessage += `Détails: ${error.message}\n`;
      }
      
      // Common error scenarios
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage += '\n🌐 Problème de connexion internet';
      } else if (error.message?.includes('429') || error.text?.includes('limit')) {
        errorMessage += '\n⏱️ Limite d\'envoi atteinte (200 emails/mois gratuit)';
      } else if (error.message?.includes('401') || error.message?.includes('403')) {
        errorMessage += '\n🔑 Clés EmailJS invalides - Vérifiez votre configuration';
      } else if (error.message?.includes('400')) {
        errorMessage += '\n📝 Données invalides - Vérifiez le template EmailJS';
      } else {
        errorMessage += '\n💡 Vérifiez la console (F12) pour plus de détails';
      }
      
      errorMessage += '\n\n📖 Consultez EMAILJS_SETUP.md pour l\'aide';
      
      alert(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
      {(['upload', 'generate', 'review', 'send'] as Step[]).map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all ${
            step === s ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 
            ['upload', 'generate', 'review'].indexOf(step) > i ? 'bg-green-500 text-white' : 'bg-zinc-200 text-zinc-400'
          }`}>
            {['upload', 'generate', 'review'].indexOf(step) > i ? '✓' : i + 1}
          </div>
          {i < 3 && <div className={`w-8 sm:w-12 h-0.5 ${['upload', 'generate', 'review'].indexOf(step) > i ? 'bg-green-500' : 'bg-zinc-200'}`}></div>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-zinc-900/90 backdrop-blur-xl z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div 
        className="bg-white w-full sm:max-w-2xl lg:max-w-3xl h-[95vh] sm:h-auto sm:max-h-[92vh] rounded-t-[2rem] sm:rounded-[2rem] flex flex-col overflow-hidden shadow-3xl animate-in slide-in-from-bottom-10 sm:fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0"></div>

        {/* Header */}
        <div className="h-16 sm:h-20 flex items-center justify-between px-5 sm:px-8 border-b border-zinc-100 shrink-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-2xl font-black text-zinc-900 truncate">Postuler en ligne</h3>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-bold truncate">{job.title} • {job.company}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-100 rounded-xl sm:rounded-xl flex items-center justify-center hover:bg-zinc-200 transition-colors active:scale-90 shrink-0 ml-3">
            <i className="fa fa-times text-zinc-400 text-sm"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 overscroll-contain">
          {renderStepIndicator()}

          {/* Step 1: Upload CV */}
          {step === 'upload' && (
            <div className="space-y-5 sm:space-y-6">
              <div className="text-center">
                <i className="fa fa-file-pdf text-5xl sm:text-6xl text-indigo-600 mb-3 sm:mb-4"></i>
                <h4 className="text-lg sm:text-xl font-black text-zinc-900 mb-1 sm:mb-2">Téléchargez votre CV</h4>
                <p className="text-xs sm:text-sm text-zinc-500">PDF ou Word • Max 5MB</p>
              </div>

              <label className="block cursor-pointer">
                <div className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center transition-all active:scale-[0.98] ${
                  cvFile ? 'border-green-500 bg-green-50' : 'border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50/30 active:bg-indigo-50/50'
                }`}>
                  {cvFile ? (
                    <div className="space-y-2 sm:space-y-3">
                      <i className="fa fa-check-circle text-3xl sm:text-4xl text-green-600"></i>
                      <p className="font-black text-zinc-900 text-sm sm:text-base break-all px-2">{cvFile.name}</p>
                      <p className="text-xs text-zinc-500">{(cvFile.size / 1024).toFixed(0)} KB</p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      <i className="fa fa-cloud-upload text-3xl sm:text-4xl text-zinc-300"></i>
                      <p className="font-bold text-zinc-600 text-sm sm:text-base px-2">Cliquez pour sélectionner votre CV</p>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setStep('generate')}
                disabled={!cvFile}
                className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all active:scale-95 ${
                  cvFile 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' 
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Continuer <i className="fa fa-arrow-right ml-2 text-sm"></i>
              </button>
            </div>
          )}

          {/* Step 2: Generate Cover Letter */}
          {step === 'generate' && (
            <div className="space-y-5 sm:space-y-6">
              <div className="text-center">
                <i className="fa fa-robot text-5xl sm:text-6xl text-indigo-600 mb-3 sm:mb-4"></i>
                <h4 className="text-lg sm:text-xl font-black text-zinc-900 mb-1 sm:mb-2">Lettre de motivation IA</h4>
                <p className="text-xs sm:text-sm text-zinc-500">Choisissez la langue et générez votre lettre</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-black text-zinc-700 mb-3">Langue</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                  {LANGUAGE_OPTIONS.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all active:scale-95 ${
                        language === lang.code 
                          ? 'border-indigo-600 bg-indigo-50 shadow-md' 
                          : 'border-zinc-200 hover:border-indigo-300 active:border-indigo-400'
                      }`}
                    >
                      <div className="text-2xl sm:text-3xl mb-1">{lang.flag}</div>
                      <div className="text-[10px] sm:text-xs font-bold text-zinc-700 leading-tight">{lang.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateCoverLetter}
                disabled={isGenerating}
                className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <i className="fa fa-spinner fa-spin mr-2"></i>
                    Génération...
                  </>
                ) : (
                  <>
                    <i className="fa fa-magic mr-2"></i>
                    Générer la lettre
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setCustomMode(true);
                  setCoverLetter('');
                  setStep('review');
                }}
                className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm border-2 border-zinc-200 text-zinc-600 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95"
              >
                Écrire ma propre lettre
              </button>
            </div>
          )}

          {/* Step 3: Review & Edit */}
          {step === 'review' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <i className="fa fa-edit text-5xl sm:text-6xl text-indigo-600 mb-3 sm:mb-4"></i>
                <h4 className="text-lg sm:text-xl font-black text-zinc-900 mb-1 sm:mb-2">
                  {customMode ? 'Votre lettre de motivation' : 'Vérifiez et personnalisez'}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-500">
                  {customMode ? 'Rédigez votre lettre' : `${3 - refreshCount} régénérations restantes`}
                </p>
              </div>

              {/* Email Verification */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all ${
                emailConfirmed ? 'border-green-500 bg-green-50' : 'border-yellow-400 bg-yellow-50'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <i className={`fa ${emailConfirmed ? 'fa-check-circle text-green-600' : 'fa-envelope text-yellow-600'} text-base sm:text-lg`}></i>
                  <label className="text-xs sm:text-sm font-black text-zinc-700">Votre adresse email</label>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                      setEmailConfirmed(false);
                    }}
                    placeholder="votre.email@example.com"
                    disabled={emailConfirmed}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 focus:outline-none text-xs sm:text-sm font-medium ${
                      emailConfirmed 
                        ? 'border-green-500 bg-white text-green-800 cursor-not-allowed' 
                        : 'border-zinc-200 focus:border-indigo-400'
                    }`}
                  />
                  {!emailConfirmed ? (
                    <button
                      onClick={handleEmailConfirm}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                      <i className="fa fa-check mr-1 sm:mr-2"></i>
                      <span className="hidden sm:inline">Oui</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setEmailConfirmed(false)}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold border-2 border-green-500 text-green-700 hover:bg-green-50 active:scale-95 transition-all"
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                  )}
                </div>
                {emailConfirmed && (
                  <p className="text-[10px] sm:text-xs text-green-700 font-bold mt-2 flex items-center gap-2">
                    <i className="fa fa-shield-check"></i>
                    Email confirmé et enregistré
                  </p>
                )}
              </div>

              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full h-48 sm:h-64 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-zinc-200 focus:border-indigo-400 focus:outline-none text-xs sm:text-sm leading-relaxed resize-none"
                placeholder="Tapez votre lettre de motivation ici..."
              />

              <div className="flex gap-2 sm:gap-3">
                {!customMode && (
                  <button
                    onClick={handleRefresh}
                    disabled={refreshCount >= 3 || isGenerating}
                    className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <i className="fa fa-refresh mr-1 sm:mr-2"></i>
                    <span className="hidden sm:inline">Régénérer </span>({3 - refreshCount})
                  </button>
                )}
                <button
                  onClick={() => setStep('send')}
                  disabled={!coverLetter.trim() || !emailConfirmed}
                  className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                >
                  Continuer <i className="fa fa-arrow-right ml-1 sm:ml-2 text-xs"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Send Confirmation */}
          {step === 'send' && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className={`fa ${isSending ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-4xl sm:text-5xl text-indigo-600`}></i>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-zinc-900 mb-3">
                {isSending ? 'Envoi en cours...' : 'Prêt à envoyer'}
              </h4>
              
              <div className="bg-zinc-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 space-y-2 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <i className="fa fa-building text-indigo-600 text-lg sm:text-xl mt-0.5 shrink-0"></i>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase">À</p>
                    <p className="text-xs sm:text-sm font-black text-zinc-900 truncate">{job.company_email || job.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa fa-user text-green-600 text-lg sm:text-xl mt-0.5 shrink-0"></i>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase">De</p>
                    <p className="text-xs sm:text-sm font-black text-zinc-900 truncate">{userEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa fa-briefcase text-purple-600 text-lg sm:text-xl mt-0.5 shrink-0"></i>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase">Poste</p>
                    <p className="text-xs sm:text-sm font-black text-zinc-900 line-clamp-2">{job.title} - {job.company}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 max-h-32 sm:max-h-48 overflow-y-auto text-left max-w-md mx-auto">
                <p className="text-[10px] sm:text-xs text-zinc-500 font-bold mb-2 uppercase">Aperçu de la lettre:</p>
                <p className="text-xs sm:text-sm text-zinc-700 whitespace-pre-line leading-relaxed">{coverLetter.substring(0, 300)}...</p>
              </div>

              <button
                onClick={handleSendApplication}
                disabled={isSending}
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                {isSending ? (
                  <>
                    <i className="fa fa-spinner fa-spin mr-2"></i>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="fa fa-paper-plane mr-2"></i>
                    Envoyer la candidature
                  </>
                )}
              </button>

              {!isSending && (
                <button
                  onClick={() => setStep('review')}
                  className="mt-4 px-6 py-3 rounded-xl font-bold text-sm text-zinc-500 hover:text-zinc-700 transition-all active:scale-95"
                >
                  <i className="fa fa-arrow-left mr-2"></i>
                  Retour
                </button>
              )}
            </div>
          )}

          {/* Step 5: Success Confirmation */}
          {step === 'success' && (
            <div className="text-center py-12 sm:py-16 px-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
                <i className="fa fa-check-circle text-5xl sm:text-6xl text-green-600"></i>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-3 sm:mb-4">Candidature envoyée !</h4>
              <p className="text-sm sm:text-lg text-zinc-600 mb-2 px-4">
                Votre CV et lettre de motivation ont été envoyés avec succès à:
              </p>
              <p className="text-lg sm:text-xl font-black text-indigo-600 mb-6 sm:mb-8 px-4 break-all">{job.company}</p>
              
              <div className="bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-green-200">
                  <i className="fa fa-envelope-circle-check text-2xl sm:text-3xl text-green-600 shrink-0"></i>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-green-700 font-bold uppercase">Email envoyé de:</p>
                    <p className="text-xs sm:text-sm font-black text-green-800 truncate">{userEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa fa-building text-2xl sm:text-3xl text-green-600 shrink-0"></i>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-green-700 font-bold uppercase">Reçu par:</p>
                    <p className="text-xs sm:text-sm font-black text-green-800 truncate">{job.company_email || job.email}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-500 mb-6 px-4">
                <i className="fa fa-info-circle mr-2"></i>
                Vérifiez votre boîte mail pour la copie de confirmation
              </p>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
