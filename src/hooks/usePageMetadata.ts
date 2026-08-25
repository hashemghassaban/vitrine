import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMetadata } from "../config/routeMetadata";
import { mergeMetaTags, setMetaTags, updateClientMetaTags } from "../utils/metaTags";
import type { MetaTags } from "../utils/metaTags";

export const usePageMetadata = (customMetadata?: Partial<MetaTags>) => {
  const location = useLocation();
  const customMetadataKey = useMemo(
    () => (customMetadata ? JSON.stringify(customMetadata) : ""),
    [customMetadata],
  );

  useEffect(() => {
    const path = location.pathname.replace(/\/$/, "") || "/";
    const defaultMetadata = getRouteMetadata(path);
    const parsedCustom = customMetadataKey
      ? (JSON.parse(customMetadataKey) as Partial<MetaTags>)
      : undefined;
    const metadata = mergeMetaTags(defaultMetadata, parsedCustom);

    setMetaTags(metadata);

    if (typeof window !== "undefined") {
      updateClientMetaTags(metadata);
    }
  }, [location.pathname, customMetadataKey]);
};

export default usePageMetadata;
