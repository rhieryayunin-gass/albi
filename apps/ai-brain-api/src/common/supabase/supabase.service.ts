import { Injectable } from '@nestjs/common';

import { supabase } from './supabase.provider';

@Injectable()
export class SupabaseService {
  client = supabase;
}