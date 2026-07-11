import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, company, city, contract, category, description, email, contactPhone, companyWebsite } = body;

    if (!title || !company || !email) {
      return NextResponse.json(
        { error: 'Les champs titre, entreprise et email sont requis.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Configuration Supabase manquante.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const now = Date.now();
    const jobId = now;

    function slugify(text: string): string {
      return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const slug = `${slugify(title)}-${slugify(company)}-${jobId}`;

    const { error } = await supabase.from('jobs').insert({
      id: jobId,
      title,
      company,
      city: city || 'Casablanca',
      contract: contract || 'CDI',
      time: 'Maintenant',
      is_new: true,
      description: description || `${title} chez ${company}. Poste disponible au Maroc.`,
      requirements: [],
      tasks: [],
      salary: '',
      email,
      contact_phone: contactPhone || '',
      url: '#',
      category: category || '',
      slug,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Erreur Supabase insert:', error);
      return NextResponse.json({ error: 'Erreur lors de la publication.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Erreur API post-job:', error);
    return NextResponse.json({ error: 'Une erreur interne est survenue.' }, { status: 500 });
  }
}
