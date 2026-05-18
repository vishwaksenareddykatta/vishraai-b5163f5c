
CREATE TABLE public.discovery_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  whatsapp_number TEXT,
  company_name TEXT NOT NULL,
  role TEXT NOT NULL,
  company_size TEXT NOT NULL,
  industry TEXT,
  workflows_to_automate TEXT NOT NULL,
  current_tech_stack TEXT,
  automation_goals TEXT NOT NULL,
  infrastructure_scale TEXT,
  operations_volume TEXT,
  preferred_contact_method TEXT[],
  additional_notes TEXT,
  user_country TEXT,
  payment_region TEXT NOT NULL,
  selected_pricing TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'initiated',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.discovery_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a discovery request"
ON public.discovery_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can view discovery requests"
ON public.discovery_requests
FOR SELECT
TO authenticated
USING (true);

CREATE INDEX idx_discovery_requests_submitted_at ON public.discovery_requests(submitted_at DESC);
