
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  type MenuProps,
  Tag,
  Card,
  Button,
  Drawer
} from "antd";
import "./AllProducts.less";
import useNavigation from "../../../hooks/useHistory";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";
import { useTranslate } from "../../../i18n/useTranslate";
import { useSyncLanguage } from "../../../i18n/useSyncLanguage";
import { useLanguage } from "../../../contexts/useLanguage";
import useProducts from "../../../hooks/products/useProducts";
import useProductFeatures from "../../../hooks/products/useProductFeatures";
import type { FeatureView } from "../../../models/views/productFeaturesView";
import ProductFilters from "../components/ProductFilters";
import ProductFiltersMobile from "../components/ProductFiltersMobile";
import { useLocation } from "react-router-dom";

import type {
  CollectionView,
  ProductView,
} from "../../../models/views/productView";
import useBrands from "../../../hooks/brand/useBrands";
import type BrandView from "../../../models/views/brandView";
import useIndex from "../../../hooks/index/useIndex";
import { useSearchParams, useParams } from "react-router-dom";
import type {
  IndexDataView,
  ProductCategoryView,
} from "../../../models/views/indexView";
import useCollections from "../../../hooks/collections/useCollections";
import LoadingSpin from "../../../components/Loading/LoadingSpin";
import backgroundHeader from "../../../assets/header/IMG_7071.jpg"
import usePageMetadata from "../../../hooks/usePageMetadata";

type MenuItem = Required<MenuProps>["items"][number];

const getParentKeys = (
  categories: ProductCategoryView[],
  id: number,
  parents: string[] = [],
): string[] => {
  for (const cat of categories) {
    if (cat.id === id) return parents;

    if (cat.children?.length) {
      const result = getParentKeys(cat.children, id, [...parents, String(cat.id)]);
      if (result.length) return result;
    }
  }
  return [];
};


const AllProducts: React.FC = () => {
  useSyncLanguage();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys);
  };

  const [searchParams] = useSearchParams();
  const { categoryId, collectionId } = useParams<{ categoryId?: string; collectionId?: string }>();

  const [selectedCollection, setSelectedCollection] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryView | null>(null);
  const { currentLang } = useLanguage();
  const { getListProducts } = useProducts(currentLang);
  const [activeParentSlug, setActiveParentSlug] = useState<number | null>(null);
  const { t } = useTranslate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [productFeatures, setProductFeatures] = useState<FeatureView[]>([]);
  const { getProductFeatures } = useProductFeatures(currentLang);
  const [visibleCount, setVisibleCount] = useState(16);
  const [product, setProducts] = useState<ProductView[]>([]);
  const { getList } = useBrands(currentLang);
  const [brands, setBrands] = useState<BrandView[]>([]);
  const [collections, setCollections] = useState<CollectionView[]>([]);
  const { getCollection } = useCollections(currentLang);
  const filteredBrands = brands.filter((b) => b.title.includes(search));
  const { push } = useNavigation();
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const [openCollectionMenu, setOpenCollectionMenu] = useState(false);
  const [openBrandMenu, setOpenBrandMenu] = useState(false);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const { getIndex } = useIndex(currentLang);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const LANG_STORAGE_KEY = "app-language";
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isCategorySwitching, setIsCategorySwitching] = useState(false);
  const textMainCaption =
    currentLang === "fa" ? "ویترین گالری" : "Vitrine Gallery";

  let metaTitle = textMainCaption;
  let metaDescription = textMainCaption;
  let ogImage = backgroundHeader;

  if (selectedCategory) {
    metaTitle =
      selectedCategory.title +
      " | " +
      textMainCaption;

    metaDescription =
      selectedCategory.meta_description ||
      selectedCategory.title;

    ogImage = selectedCategory.image_link || backgroundHeader;
  }

  else if (collectionId) {
    const collection = collections.find(
      (c) => c.id === Number(collectionId)
    );

    if (collection) {
      metaTitle =
        (collection.title) +
        " | " +
        textMainCaption;

      metaDescription =
        collection.description ||
        collection.title;

      ogImage = collection.main_image || backgroundHeader;
    }
  }

  else {
    metaTitle =
      (currentLang === "fa"
        ? "محصولات"
        : "Products") +
      " | " +
      textMainCaption;

    metaDescription =
      currentLang === "fa"
        ? "مشاهده محصولات ویترین گالری"
        : "Browse Vitrine Gallery products";
  }

  const meta = {
    title: metaTitle,
    description: metaDescription,
    ogImage: ogImage,
    ogType: "product.group",
  };

  usePageMetadata(meta);

  /* ------------------------- URL SYNC FUNCTION --------------------------- */
  const updateURLWithFilters = () => {

    const params = new URLSearchParams();

    let finalCollection = selectedCollection;
    if (categoryId) {
      const catNum = Number(categoryId);
      const onlyCategoryAsCollection =
        selectedCollection.length === 1 && selectedCollection[0] === catNum;

      if (onlyCategoryAsCollection) {
        finalCollection = [];
      }
    }

    if (selected.length > 0) params.set("brand", selected.join(","));
    if (finalCollection.length > 0) params.set("collection", finalCollection.join(","));
    if (selectedFeature.length > 0) params.set("feature", selectedFeature.join(","));
    if (search.length > 0) params.set("search", search);

    const base = categoryId
      ? `/${currentLang}/products/category/${categoryId}`
      : `/${currentLang}/products`;

    const qs = params.toString();
    push(qs ? `${base}?${qs}` : base);
  };

  const buildMenuItems = (
    categories: ProductCategoryView[],
    openKeys: string[],
    onSelectCategory: (id: string) => void,
    setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>,
    activeParent: number | null,
    setActiveParent: React.Dispatch<React.SetStateAction<number | null>>,
  ): MenuItem[] => {
    return categories.map((cat) => ({
      key: String(cat.id),
      label: (
        <div
          className={`menu-label ${activeParent === cat.id ? "parent-selected" : ""}`}
        >
          {cat.children?.length > 0 && (
            <span
              className="iconArrow"
              onClick={(e) => {
                e.stopPropagation();

                setOpenKeys((prev) =>
                  prev.includes(String(cat.id))
                    ? prev.filter((k) => k !== String(cat.id))
                    : [...prev, String(cat.id)]
                );
              }}
            >
              {openKeys.includes(String(cat.id)) ? "↑" : "↓"}
            </span>
          )}

          <span
            onClick={(e) => {
              e.stopPropagation();

              // باز کردن منوی والد در صورت وجود بچه
              if (cat.children?.length) {
                setOpenKeys((prev) =>
                  prev.includes(String(cat.id)) ? prev : [...prev, String(cat.id)]
                );
              }

              setActiveParent(cat.id);
              onSelectCategory(String(cat.id));
            }}
          >
            {cat.title}
          </span>
        </div>
      ),
      children: cat.children?.length
        ? [
          { type: "divider" as const },
          ...buildMenuItems(
            cat.children,
            openKeys,
            onSelectCategory,
            setOpenKeys,
            activeParent,
            setActiveParent,
          ),
        ]
        : undefined,
    }));
  };


  const [selectedInfo, setSelectedInfo] = useState<
    | { type: "category"; data: ProductCategoryView }
    | { type: "collection"; data: CollectionView }
    | { type: "brand"; data: BrandView }
    | null
  >(null);

  const fetchIndex = async () => {
    const { success, data } = await getIndex();
    if (success && data) {
      setIndexData(data);
    }
  };

  const fetchBrands = async () => {
    const { success, data } = await getList();
    if (success && data) {
      setBrands(data);
    }
  };


  // در بالای کامپوننت
  const location = useLocation();

  // جایگزین اون useEffect مقداردهی اولیه قبلی با این:
  useEffect(() => {
    // وقتی URL تغییر کرد، فیلترها را متناسب با پارامترهای URL به‌روز کن
    const searchParams = new URLSearchParams(location.search);

    const brand = searchParams.get("brand");
    const collection = searchParams.get("collection");
    const feature = searchParams.get("feature");
    const searchQ = searchParams.get("search");

    setSelected(brand ? brand.split(",").map(Number) : []);
    setSelectedFeature(feature ? feature.split(",").map(Number) : []);
    setSearch(searchQ ?? "");

    if (categoryId) {
      setSelectedCollection(collection ? collection.split(",").map(Number) : []);
    } else {
      setSelectedCollection(collection ? collection.split(",").map(Number) : []);
    }

    setIsInitialLoad(false);
  }, [location.search, categoryId]);



  const fetchProducts = async () => {

    try {
      setLoading(true);

      // مقدار اولیه کالکشن
      let finalCollection = selectedCollection;

      // جلوگیری از ارسال collection = categoryId
      if (categoryId) {
        const catNum = Number(categoryId);

        const onlyCategoryAsCollection =
          selectedCollection.length === 1 &&
          selectedCollection[0] === catNum;

        if (onlyCategoryAsCollection) {
          finalCollection = []; // => این باعث می‌شود collection دیگر به API ارسال نشود
        }
      }

      const res = await getListProducts(
        20,
        categoryId ? Number(categoryId) : undefined,
        selected,            // برندها
        finalCollection,     // کالکشن اصلاح شده
        selectedFeature      // فیچرها
      );

      if (res.success) {
        setProducts([...res.data]);

      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // پایان لودینگ حتی اگر خطا رخ دهد
    }
  };



const fetchFeatures = async (categoryIdParam?: number) => {
  const { success, data } = await getProductFeatures(categoryIdParam);

  if (success && data) {
    setProductFeatures(data);
  } else {
    setProductFeatures([]);
  }
};

  const fetchCollection = async () => {
    const { success, data } = await getCollection();
    if (success && data) {
      setCollections(data);
    }
  };

  const findCollectionById = (
    collections: CollectionView[],
    id: number
  ): CollectionView | undefined => {
    return collections.find((c) => c.id === id);
  };

  /* ------------ Load filters from URL (ONLY ONCE) ---------------- */
  useEffect(() => {
    const brand = searchParams.get("brand");
    const collection = searchParams.get("collection");
    const feature = searchParams.get("feature");
    const searchQ = searchParams.get("search");

    if (brand) setSelected(brand.split(",").map(Number));
    if (feature) setSelectedFeature(feature.split(",").map(Number));
    if (searchQ) setSearch(searchQ);

    if (categoryId) {
      if (collection) {
        setSelectedCollection(collection.split(",").map(Number));
      } else {
        setSelectedCollection([]);
      }
    } else if (collection) {
      setSelectedCollection(collection.split(",").map(Number));
    }

    setIsInitialLoad(false);
  }, []);


  useEffect(() => {
    if (!collectionId) return;
    const col = findCollectionById(collections, Number(collectionId));
    if (!col) return;
    setSelectedCollection([col.id]);
    setSelectedCategory(null);
    setSelectedInfo(null);
  }, [collectionId, collections]);

  useEffect(() => {
    if (collectionId) {
      const id = Number(collectionId);
      setSelectedCollection(prev => prev.includes(id) ? prev : [id]);
      setSelectedCategory(null);
    }
  }, [collectionId]);

  /* ---------------- فراخوانی محصولات ------------------ */
  useEffect(() => {
    if (isInitialLoad) return;
    fetchProducts();
  }, [
    categoryId,
    selected,
    selectedCollection,
    selectedFeature,
    search,
    isInitialLoad
  ]);



  useEffect(() => {
    if (!data?.product_categories || !categoryId) return;
    const cat = findCategoryById(
      data.product_categories,
      categoryId
    );
    if (!cat) return;

    setSelectedCategory(cat);

    const parentKeys = getParentKeys(data.product_categories, cat.id);
    setOpenKeys([...parentKeys, String(cat.id)]);

    setActiveParentSlug(cat.id);
  }, [categoryId, data]);


useEffect(() => {
  setSelectedFeature([]);

  if (!categoryId) {
    fetchFeatures(); // بدون category_id
    return;
  }

  fetchFeatures(Number(categoryId)); // با category_id
}, [categoryId, currentLang]);


  useEffect(() => {
    const prevLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (prevLang === currentLang) return;
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    setSelected([]);
    setSelectedCollection([]);
    setSelectedFeature([]);
    setSearch("");
  }, [currentLang]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchBrands(),
        fetchIndex(),
        fetchCollection(),
      ]);
      setLoading(false);
    };
    fetchAll();
  }, [currentLang]);

  useEffect(() => {
    updateSelectedInfo();
  }, [selectedCategory]);

  /* ------------------ FETCH دوباره هنگام تغییر فیلترها ------------------ */
  useEffect(() => {
    if (isInitialLoad) return;
    if (isCategorySwitching) return; // ← جلوگیری از sync هنگام تغییر دسته

    updateURLWithFilters();
  }, [selected, selectedCollection, selectedFeature, search]);
  useEffect(() => {
    // وقتی categoryId عوض شد یعنی کار تغییر دسته تمام شد
    if (isCategorySwitching) {
      setIsCategorySwitching(false);
    }
  }, [categoryId]);




  const filteredCollections =
    selected.length > 0
      ? collections.filter((c) => selected.includes(Number(c.brand_id)))
      : collections;

  const items = [
    {
      key: "all-products",
      label: (
        <div
          className={`menu-label ${activeParentSlug === 0 ? "parent-selected" : ""}`}
          onClick={() => {
            setActiveParentSlug(0);
            handleMenuSelect({ key: "all-products" });
          }}>
          <span>{t("local_allProducts")}</span>
        </div>
      ),
    },
    ...buildMenuItems(
      data?.product_categories ?? [],
      openKeys,
      (id) => handleMenuSelect({ key: id }),
      setOpenKeys,
      activeParentSlug,
      setActiveParentSlug,
    ),
  ];

  const toggleBrand = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectCollection = (id: number) => {
    setSelectedCollection(prev =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const removeFilter = (id: number, type: "brand" | "collection" | "feature") => {
    if (type === "brand")
      setSelected(prev => prev.filter((i) => i !== id));
    else if (type === "collection")
      setSelectedCollection(prev => prev.filter((i) => i !== id));
    else if (type === "feature")
      setSelectedFeature(prev => prev.filter((i) => i !== id));
  };


  const selectFeature = (id: number) => {
    setSelectedFeature(prev =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const findCategoryById = (
    categories: ProductCategoryView[],
    id: string,
  ): ProductCategoryView | undefined => {
    for (const cat of categories) {
      if (String(cat.id) === id) return cat;
      if (cat.children) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const findCategoryBySlug = (
    categories: ProductCategoryView[],
    slug: string,
  ): ProductCategoryView | undefined => {
    for (const cat of categories) {
      if (cat.slug === slug) return cat;
      if (cat.children?.length) {
        const found = findCategoryBySlug(cat.children, slug);
        if (found) return found;
      }
    }
    return undefined;
  };

  const filteredProducts = product;

const shouldShowFeatureMenu = (
  selectedCategoryId: string | null | undefined,
  featureCategoryId: string | number
): boolean => {
  if (!selectedCategoryId) return true; // همه محصولات => همه فیچرها نمایش داده شوند
  return String(featureCategoryId) === selectedCategoryId;
};

  const truncateByWord = (text: string = "", limit = 200) => {
    if (text.length <= limit) return text;
    const sliced = text.slice(0, limit);
    const lastSpaceIndex = sliced.lastIndexOf(" ");
    return sliced.slice(0, lastSpaceIndex) + "...";
  };

  const descriptionText = (() => {
    if (!selectedInfo) return "";
    switch (selectedInfo.type) {
      case "category":
        return selectedInfo.data.meta_description ?? "";
      case "collection":
        return selectedInfo.data.description ?? "";
      case "brand":
        return selectedInfo.data.description ?? "";
      default:
        return "";
    }
  })();

  useEffect(() => {
    setIsExpanded(false);
  }, [selectedInfo]);

  const updateSelectedInfo = () => {
    if (selectedCategory) {
      setSelectedInfo({ type: "category", data: selectedCategory });
      return;
    }
    setSelectedInfo(null);
  };


  const resetFiltersOnCategoryChange = () => {
    setSelected([]);
    setSelectedCollection([]);
    setSelectedFeature([]);
    setSearch("");
  };

  const handleMenuSelect = ({ key }: { key: string }) => {

    if (key === "all-products") {
      setIsCategorySwitching(true);  // ← این
      resetFiltersOnCategoryChange();
      push(`/${currentLang}/products`);
      setSelectedCategory(null);
      setSelectedInfo(null);
      return;
    }

    const id = Number(key);
    const cat = findCategoryById(data?.product_categories ?? [], String(id));

    if (cat) {
      setIsCategorySwitching(true);  // ← مهم
      resetFiltersOnCategoryChange();
      push(`/${currentLang}/products/category/${cat.id}`);
      setSelectedInfo({ type: "category", data: cat });
    }
  };





  const getSelectedKeys = () => {
    if (!selectedCategory) return ["all-products"];
    return [String(selectedCategory.id)];
  };

  const loadMore = () => {
    const newItems = filteredProducts.slice(visibleCount, visibleCount + 4);
    setVisibleCount((prev) => prev + 4);
    setAnimatedItems((prev) => [...prev, ...newItems.map((i) => i.id)]);
  };

  return (
    <>
      <LoadingSpin loading={loading} />
      <AppHeader
        categoryBackground={selectedCategory?.image_link ? selectedCategory?.image_link : backgroundHeader}
        title={
          !!selectedCategory
            ? selectedCategory?.title
            : t("local_type_products")
        }
        text={`${t("local_home")} > ${t("local_type_products")} ${!!selectedCategory ? `> ${selectedCategory?.title}` : ""}`}
      />

      <div className="products-containers">
        <Drawer
          title={t("local_filter_products")}
          placement="right"
          onClose={() => setOpenFilter(false)}
          open={openFilter}
          width={'100%'}
        >
          <div className="filters-box-mobile">
            <ProductFiltersMobile
              items={items}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              getSelectedKeys={getSelectedKeys}
              handleMenuSelect={handleMenuSelect}
              selected={selected}
              brands={brands}
              toggleBrand={toggleBrand}
              removeFilter={removeFilter}
              filteredBrands={filteredBrands}
              search={search}
              setSearch={setSearch}
              filteredCollections={filteredCollections}
              selectedCollection={selectedCollection}
              selectCollection={selectCollection}
              setSelectedCollection={setSelectedCollection}
              openCollectionMenu={openCollectionMenu}
              setOpenCollectionMenu={setOpenCollectionMenu}
              openBrandMenu={openBrandMenu}
              setOpenBrandMenu={setOpenBrandMenu}
              openCategoryMenu={openCategoryMenu}
              setOpenCategoryMenu={setOpenCategoryMenu}
              selectedCategory={selectedCategory}
              productFeatures={productFeatures}
              shouldShowFeatureMenu={shouldShowFeatureMenu}
              selectedFeature={selectedFeature}
              selectFeature={selectFeature}
              onSelectCollectionRoute={(id: number) =>
                push(`/${currentLang}/products/collection/${id}`)
              }
              t={t as (key: string) => string}
            />
          </div>
          <button
            className="mobile-filter-btn apply"
            onClick={() => setOpenFilter(false)}
          >
            {t("local_apply_filter_products")}
          </button>
        </Drawer>

        <Row gutter={[0, 25]} style={{ justifyContent: "space-between" }}>
          <Col xs={0} lg={6}>
            <ProductFilters
              items={items}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              selected={selected}
              brands={brands}
              toggleBrand={toggleBrand}
              removeFilter={removeFilter}
              filteredBrands={filteredBrands}
              search={search}
              setSearch={setSearch}
              filteredCollections={filteredCollections}
              selectedCollection={selectedCollection}
              selectCollection={selectCollection}
              setSelectedCollection={setSelectedCollection}
              selectedCategory={selectedCategory}
              productFeatures={productFeatures}
              selectedFeature={selectedFeature}
              selectFeature={selectFeature}
              onSelectCollectionRoute={(id: number) =>
                push(`/${currentLang}/products/collection/${id}`)
              }
              t={t as (key: string) => string}
            />
          </Col>

          <Col xs={24} lg={17}>
            <div className="product-block">
              <p className="count">
                {filteredProducts.length} {t("local_productsFound")}
              </p>

              <button
                className="mobile-filter-btn"
                onClick={() => setOpenFilter(true)}
              >
                {t("local_filter_products")}
              </button>
            </div>

            <Row gutter={[20, 30]}>
              {[...filteredProducts]
                .reverse()
                .slice(0, visibleCount)
                .map((item) => (
                  <Col xs={12} md={3} sm={12} lg={6} key={item.id}>
                    <Card
                      hoverable
                      className={`showcase-card-product ${animatedItems.includes(item.id) ? "fade-in" : ""}`}
                      onClick={() =>
                        push(`/${currentLang}/products/${item.id}`)
                      }
                      cover={
                        <img
                          src={item?.image}
                          alt={item?.title}
                          className="img-card-product"
                        />
                      }
                    >
                      <div className="selected-tags-item">
                        {item?.collection && (
                          <Tag>
                            <div className="pulse-tag">
                              {item?.collection?.title}
                            </div>
                          </Tag>
                        )}
                      </div>

                      <h2 className="product-title-product">{item.title}</h2>
                    </Card>
                  </Col>
                ))}
            </Row>

            {visibleCount < filteredProducts.length && (
              <div className="load-more-box">
                <button className="load-more" onClick={loadMore}>
                  {t("local_viewMoreProducts")}
                </button>
              </div>
            )}
          </Col>
        </Row>

        {selectedInfo && (
          <Row className="dec-box" align="middle" gutter={[40, 30]}>
            <Col xs={12} sm={12} lg={10}>
              <img
                src={
                  selectedInfo.type === "category"
                    ? selectedInfo.data.image_link
                    : selectedInfo.type === "collection"
                      ? selectedInfo.data.main_image
                      : selectedInfo.data.image
                }
                alt="info"
                className="dec-img"
                style={{ width: "100%" }}
              />
            </Col>

            <Col xs={12} sm={12} lg={14}>
              <div>
                <h2 className="dec-title">{selectedInfo.data.title}</h2>
                <p
                  className="dec-text"
                  dangerouslySetInnerHTML={{
                    __html: isExpanded
                      ? (descriptionText ?? "")
                      : truncateByWord(descriptionText ?? "", 200),
                  }}
                ></p>

                {(descriptionText?.length ?? 0) > 200 && (
                  <Button
                    type="link"
                    className="btn-more-brand-products"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? t("local_less") : t("local_more")}
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        )}
      </div>
      <AppFooter />
    </>
  );
};

export default AllProducts;
