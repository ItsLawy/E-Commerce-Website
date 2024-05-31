"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductPage() {
  const router = useRouter();
 
  useEffect(() => {
    router.push('/shopall');
  }, []);
}