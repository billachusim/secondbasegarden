import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  name: string;
  emoji: string | null;
  sort_order: number;
};

export type MenuItem = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  sold_out: boolean;
  tags: string[];
  sort_order: number;
};

export type Service = {
  id: string;
  title: string;
  description: string | null;
  emoji: string | null;
  sort_order: number;
};

export type Settings = {
  id: string;
  venue_name: string;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  hours: string | null;
  hero_image_url: string | null;
  map_embed: string | null;
  maps_link: string | null;
  review_link: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
};

export const useCategories = (refreshKey = 0) => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    supabase
      .from("categories")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setData((data as Category[]) || []);
        setLoading(false);
      });
  }, [refreshKey]);
  return { data, loading };
};

export const useMenuItems = (refreshKey = 0) => {
  const [data, setData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    supabase
      .from("menu_items")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setData((data as MenuItem[]) || []);
        setLoading(false);
      });
  }, [refreshKey]);
  return { data, loading };
};

export const useServices = (refreshKey = 0) => {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    supabase
      .from("services")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setData((data as Service[]) || []);
        setLoading(false);
      });
  }, [refreshKey]);
  return { data, loading };
};

export const useSettings = (refreshKey = 0) => {
  const [data, setData] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    supabase
      .from("settings")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setData((data as Settings) || null);
        setLoading(false);
      });
  }, [refreshKey]);
  return { data, loading };
};

export const formatNaira = (n: number) => "₦" + Number(n).toLocaleString("en-NG");
