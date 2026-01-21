-- Gelinlik AI Üretim Geçmişi Tablosu
CREATE TABLE IF NOT EXISTS public.generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dress_url TEXT NOT NULL,
    model_url TEXT NOT NULL,
    background_url TEXT,
    result_front_url TEXT,
    result_back_url TEXT,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Row Level Security) Ayarları
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Kullanıcıların sadece kendi verilerini görmesini sağlayan policy
CREATE POLICY "Users can view their own generations" 
ON public.generations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generations" 
ON public.generations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);
