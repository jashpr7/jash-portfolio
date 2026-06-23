"use client";

import { useEffect } from "react";

export function AssetGuard() {
  useEffect(() => {
    const preventProtectedContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-protected-media]")) event.preventDefault();
    };

    const preventProtectedDrag = (event: DragEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-protected-media]")) event.preventDefault();
    };

    document.addEventListener("contextmenu", preventProtectedContextMenu);
    document.addEventListener("dragstart", preventProtectedDrag);
    return () => {
      document.removeEventListener("contextmenu", preventProtectedContextMenu);
      document.removeEventListener("dragstart", preventProtectedDrag);
    };
  }, []);

  return null;
}
