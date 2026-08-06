import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, password, full_name, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Call Supabase auth signUp
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name || email.split('@')[0],
          role: role || 'admin'
        }
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Explicitly insert into public.users table to guarantee immediate listing
    if (data.user?.id) {
      await supabase.from('users').upsert({
        id: data.user.id,
        email: email,
        full_name: full_name || email.split('@')[0],
        role: role || 'admin'
      });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: data.user?.id,
        email,
        full_name,
        role: role || 'admin'
      } 
    });
  } catch (err: any) {
    console.error('Error creating user via API route:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
