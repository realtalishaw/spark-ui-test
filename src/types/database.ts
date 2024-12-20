export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          company_name: string;
          current_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_name: string;
          current_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_name?: string;
          current_status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_answers: {
        Row: {
          id: string;
          project_id: string;
          question: string;
          answer: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          question: string;
          answer: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          question?: string;
          answer?: string;
          created_at?: string;
        };
      };
      project_deliverables: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          type: string;
          url: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          type: string;
          url: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          title?: string;
          type?: string;
          url?: string;
          description?: string;
          created_at?: string;
        };
      };
    };
  };
}