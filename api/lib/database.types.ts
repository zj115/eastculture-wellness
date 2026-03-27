// Minimal Supabase database type definitions for EastCulture
// Generated manually - matches our schema.sql

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          password_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          password_hash: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          password_hash?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          stripe_session_id: string | null;
          stripe_payment_intent: string | null;
          amount_nzd: number;
          currency: string;
          purchase_type: "video" | "course" | "membership";
          course_id: string | null;
          video_key: string | null;
          status: "pending" | "paid" | "failed" | "refunded";
          created_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_session_id?: string | null;
          stripe_payment_intent?: string | null;
          amount_nzd: number;
          currency?: string;
          purchase_type: "video" | "course" | "membership";
          course_id?: string | null;
          video_key?: string | null;
          status?: "pending" | "paid" | "failed" | "refunded";
          created_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_session_id?: string | null;
          stripe_payment_intent?: string | null;
          amount_nzd?: number;
          currency?: string;
          purchase_type?: "video" | "course" | "membership";
          course_id?: string | null;
          video_key?: string | null;
          status?: "pending" | "paid" | "failed" | "refunded";
          created_at?: string;
          paid_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_purchases: {
        Row: {
          id: string;
          user_id: string;
          order_id: string | null;
          purchase_type: "video" | "course" | "membership";
          course_id: string | null;
          video_key: string | null;
          status: "active" | "expired" | "cancelled";
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_id?: string | null;
          purchase_type: "video" | "course" | "membership";
          course_id?: string | null;
          video_key?: string | null;
          status?: "active" | "expired" | "cancelled";
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_id?: string | null;
          purchase_type?: "video" | "course" | "membership";
          course_id?: string | null;
          video_key?: string | null;
          status?: "active" | "expired" | "cancelled";
          expires_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_purchases_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_purchases_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
