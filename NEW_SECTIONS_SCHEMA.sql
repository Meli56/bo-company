-- ============================================
-- NOUVELLES TABLES POUR LES SECTIONS ADDITIONNELLES
-- ============================================

-- ============================================
-- 1. TABLE : company_sections
-- Stocke les 3 sections de contenu (Section 1, 2, 3)
-- ============================================
CREATE TABLE public.company_sections (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL,
  section_number integer NOT NULL CHECK (section_number IN (1, 2, 3)),
  title text,
  description text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT company_sections_pkey PRIMARY KEY (id),
  CONSTRAINT company_sections_company_id_fkey FOREIGN KEY (company_id) 
    REFERENCES public.companies(id) ON DELETE CASCADE,
  CONSTRAINT company_sections_unique UNIQUE (company_id, section_number)
);

-- ============================================
-- 2. TABLE : section_videos
-- Vidéos pour Section 1
-- ============================================
CREATE TABLE public.section_videos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL,
  video_url text NOT NULL,
  video_name text,
  display_order integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT section_videos_pkey PRIMARY KEY (id),
  CONSTRAINT section_videos_company_id_fkey FOREIGN KEY (company_id) 
    REFERENCES public.companies(id) ON DELETE CASCADE
);

CREATE INDEX idx_section_videos_company_id ON public.section_videos(company_id, display_order);

-- ============================================
-- 3. TABLE : section_photos
-- Photos pour Section 2
-- ============================================
CREATE TABLE public.section_photos (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL,
  photo_url text NOT NULL,
  photo_name text,
  display_order integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT section_photos_pkey PRIMARY KEY (id),
  CONSTRAINT section_photos_company_id_fkey FOREIGN KEY (company_id) 
    REFERENCES public.companies(id) ON DELETE CASCADE
);

CREATE INDEX idx_section_photos_company_id ON public.section_photos(company_id, display_order);

-- ============================================
-- 4. TABLE : company_advantages (Avantages)
-- Stocke les avantages avec catégories
-- ============================================
CREATE TABLE public.company_advantages (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL,
  category text NOT NULL, -- 'Rémunération', 'Confort', 'Vie d'entreprise', etc.
  advantage_text text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT company_advantages_pkey PRIMARY KEY (id),
  CONSTRAINT company_advantages_company_id_fkey FOREIGN KEY (company_id) 
    REFERENCES public.companies(id) ON DELETE CASCADE
);

CREATE INDEX idx_company_advantages_company_id ON public.company_advantages(company_id, display_order);

-- ============================================
-- 5. TABLE : recruitment_process
-- Étapes du processus de recrutement
-- ============================================
CREATE TABLE public.recruitment_process (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL,
  step_description text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT recruitment_process_pkey PRIMARY KEY (id),
  CONSTRAINT recruitment_process_company_id_fkey FOREIGN KEY (company_id) 
    REFERENCES public.companies(id) ON DELETE CASCADE
);

CREATE INDEX idx_recruitment_process_company_id ON public.recruitment_process(company_id, display_order);

-- ============================================
-- 6. TABLE : legal_info
-- Informations légales de l'entreprise
-- ============================================
CREATE TABLE public.legal_info (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid NOT NULL UNIQUE,
  raison_sociale text,
  code_naf text,
  siret text,
  siren text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT legal_info_pkey PRIMARY KEY (id),
  CONSTRAINT legal_info_company_id_fkey FOREIGN KEY (company_id) 
    REFERENCES public.companies(id) ON DELETE CASCADE
);

-- ============================================
-- TRIGGERS pour updated_at
-- ============================================
CREATE TRIGGER update_company_sections_updated_at 
  BEFORE UPDATE ON public.company_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_info_updated_at 
  BEFORE UPDATE ON public.legal_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INDEXES pour améliorer les performances
-- ============================================
CREATE INDEX idx_company_sections_company_id ON public.company_sections(company_id, section_number);

-- ============================================
-- EXEMPLE D'INSERTION
-- ============================================
-- Section 1 (avec vidéos)
INSERT INTO company_sections (company_id, section_number, title, description)
VALUES ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 1, 'Notre culture', 'Découvrez notre environnement de travail');

INSERT INTO section_videos (company_id, video_url, video_name, display_order)
VALUES 
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'https://example.com/video1.mp4', 'Nom_de_la_video.mp4', 0),
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'https://example.com/video2.mp4', 'Nom_de_la_video.mp4', 1);

-- Section 2 (avec photos)
INSERT INTO company_sections (company_id, section_number, title, description)
VALUES ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 2, 'Nos bureaux', 'Visitez nos locaux');

INSERT INTO section_photos (company_id, photo_url, photo_name, display_order)
VALUES 
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'https://example.com/photo1.jpg', 'Nom_du_fichier.jpg', 0),
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'https://example.com/photo2.jpg', 'Nom_du_fichier.jpg', 1);

-- Section 3
INSERT INTO company_sections (company_id, section_number, title, description)
VALUES ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 3, 'Raisons de nous rejoindre', 'Pourquoi choisir notre entreprise');

-- Avantages
INSERT INTO company_advantages (company_id, category, advantage_text, display_order)
VALUES 
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'Rémunération', 'Prime de participation aux bénéfices', 0),
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'Confort', '2 jours de télétravail par semaine', 1),
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'Vie d''entreprise', '2 team building par an', 2);

-- Processus de recrutement
INSERT INTO recruitment_process (company_id, step_description, display_order)
VALUES 
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'Échange téléphonique de 30 minutes avec un Talent Acquisition d''Hellowork group', 0),
  ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', '1er entretien en visio ou sur site avec notre Talent Acquisition et votre futur manager', 1);

-- Infos légales
INSERT INTO legal_info (company_id, raison_sociale, code_naf, siret, siren)
VALUES ('f1ef1c6f-aea7-4ded-a294-b08abe85f0a0', 'Hellowork SAS', '6201Z', '12345678901234', '123456789');
