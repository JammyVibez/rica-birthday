
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the birthday_customizations table
CREATE TABLE IF NOT EXISTS birthday_customizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_name TEXT NOT NULL DEFAULT 'Rica',
  author_name TEXT NOT NULL DEFAULT '[Your Name]',
  favorite_color TEXT DEFAULT '[Your favorite color]',
  favorite_flower TEXT DEFAULT '[Your favorite flower]',
  favorite_food TEXT DEFAULT '[Your favorite food]',
  favorite_song TEXT DEFAULT '[Your favorite song]',
  anime_reason TEXT DEFAULT '[Add your reason here]',
  timeline_entries JSON DEFAULT '[]'::json,
  gallery_items JSON DEFAULT '[]'::json,
  anime_playlist JSON DEFAULT '[]'::json,
  memory_entries JSON DEFAULT '[]'::json,
  hidden_messages JSON DEFAULT '[]'::json,
  favorite_things JSON DEFAULT '{"colors":[],"foods":[],"animes":[],"songs":[],"activities":[]}'::json,
  future_surprises JSON DEFAULT '[]'::json,
  letter_text TEXT,
  color_theme TEXT DEFAULT 'default',
  animation_theme TEXT DEFAULT 'default',
  audio_file TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default customization record
INSERT INTO birthday_customizations (
  id,
  recipient_name,
  author_name,
  favorite_color,
  favorite_flower,
  favorite_food,
  favorite_song,
  anime_reason,
  timeline_entries,
  gallery_items,
  anime_playlist,
  memory_entries,
  hidden_messages,
  favorite_things,
  future_surprises,
  letter_text,
  color_theme,
  animation_theme
) VALUES (
  'default',
  'Rica',
  '[Your Name]',
  '[Your favorite color]',
  '[Your favorite flower]',
  '[Your favorite food]',
  '[Your favorite song]',
  '[Add your reason here]',
  '["[Add your memory from day 1 here]","[Add your memory from day 2 here]","[Add your memory from day 3 here]","[Add your memory from day 4 here]","[Add your memory from day 5 here]","[Add your memory from day 6 here]","[Add your memory from day 7 here]","[Add your memory from day 8 here]","[Add your memory from day 9 here]","[Add your memory from day 10 here]","[Add your memory from day 11 here]","[Add your memory from day 12 here]","[Add your memory from day 13 here]","[Add your memory from day 14 here]","[Add your memory from day 15 here]","[Add your memory from day 16 here]"]'::json,
  '[]'::json,
  '[]'::json,
  '[]'::json,
  '[{"id":"welcome","title":"Welcome Message","message":"Rica, I hope this little digital book brings a smile to your face. Every page was made with care, thinking of you.","unlocked":false},{"id":"special","title":"Something Special","message":"You have this amazing way of making ordinary moments feel magical. Thank you for being you.","unlocked":false}]'::json,
  '{"colors":["Soft pastels","Sakura pink","Sky blue"],"foods":["[Add her favorites]","[Sweet treats]","[Comfort foods]"],"animes":["Angel Beats!","[Other favorites]","[To be discovered]"],"songs":["My Soul, Your Beats!","[Her playlist]","[Songs that remind me of her]"],"activities":["[Things she enjoys]","[Our shared interests]","[New adventures to try]"]}'::json,
  '[{"id":"1","title":"Monthly Letter","message":"Rica, it''s been another amazing month getting to know you better. Here''s what made me smile this month...","date":"' || CURRENT_DATE || '","revealed":false},{"id":"2","title":"Random Thoughts","message":"I was thinking about you today and realized how much brighter my days have become since we started talking. Thank you for being you! 💖","date":"' || CURRENT_DATE || '","revealed":false}]'::json,
  'Rica,

Happy Birthday. I don''t have a gift wrapped in a box, but I wrapped this website with care — every page is a small piece of how you make my days better.

We''ve only known each other a short while, but you''ve already become someone I think about often. Your smile, your laugh, and the things you love (like Kanade) tell me who you are — gentle, strong, and quietly beautiful.

I hope this little book makes you smile. I made it because I wanted you to know you matter — more than you might realize.

Always,
[Your Name]',
  'default',
  'default'
) ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('birthday-gallery', 'birthday-gallery', true);

-- Create policy for public read access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'birthday-gallery');

-- Create policy for authenticated insert/update
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'birthday-gallery');
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'birthday-gallery');
