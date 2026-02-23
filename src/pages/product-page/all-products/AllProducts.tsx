import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Menu,
  type MenuProps,
  Checkbox,
  Tag,
  Input,
  Divider,
  Card,
  Button,
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
import type {
  CollectionView,
  ProductView,
} from "../../../models/views/productView";
import { CloseOutlined } from "@ant-design/icons";
import useBrands from "../../../hooks/brand/useBrands";
import type BrandView from "../../../models/views/brandView";
import useIndex from "../../../hooks/index/useIndex";
import { useParams, useSearchParams } from "react-router-dom";
import type {
  IndexDataView,
  ProductCategoryView,
} from "../../../models/views/indexView";
import useCollections from "../../../hooks/collections/useCollections";
import LoadingSpin from "../../../components/Loading/LoadingSpin";
import backgroundHeader from "../../../assets/header/IMG_7071.jpg"

type MenuItem = Required<MenuProps>["items"][number];

const buildMenuItems = (
  categories: ProductCategoryView[],
  openKeys: string[],
  onSelectCategory: (slug: string) => void,
  setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>,
  activeParentSlug: string | null,
  setActiveParentSlug: React.Dispatch<React.SetStateAction<string | null>>,
): MenuItem[] => {
  return categories.map((cat) => ({
    key: cat.slug,
    label: (
      <div
        className={`menu-label ${
          activeParentSlug === cat.slug ? "parent-selected" : ""
        }`}
        onClick={() => {
          if (cat.children?.length) {
            setOpenKeys((prev) =>
              prev.includes(cat.slug)
                ? prev.filter((k) => k !== cat.slug)
                : [...prev, cat.slug],
            );
          }
        }}
      >
        {cat.children?.length > 0 && (
          <span
            className="iconArrow"
            onClick={(e) => {
              e.stopPropagation();
              setOpenKeys((prev) =>
                prev.includes(cat.slug)
                  ? prev.filter((k) => k !== cat.slug)
                  : [...prev, cat.slug],
              );
            }}
          >
            {openKeys.includes(cat.slug) ? "↑" : "↓"}
          </span>
        )}

        <span
          onClick={(e) => {
            e.stopPropagation();
            setActiveParentSlug(cat.slug); // 👈 این خط جدید
            onSelectCategory(cat.slug);
          }}
        >
          {cat.title}
        </span>
      </div>
    ),
    children:
      cat.children && cat.children.length > 0
        ? [
            { type: "divider" as const },
            ...buildMenuItems(
              cat.children,
              openKeys,
              onSelectCategory,
              setOpenKeys,
              activeParentSlug,
              setActiveParentSlug,
            ),
          ]
        : undefined,
  }));
};







const getParentKeys = (
  categories: ProductCategoryView[],
  slug: string,
  parents: string[] = [],
): string[] => {
  for (const cat of categories) {
    if (cat.slug === slug) {
      return parents;
    }

    if (cat.children?.length) {
      const result = getParentKeys(cat.children, slug, [...parents, cat.slug]);
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

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<number[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryView | null>(null);
  const { currentLang } = useLanguage();
  const { getListProducts } = useProducts(currentLang);
  const [activeParentSlug, setActiveParentSlug] = useState<string | null>(null);

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
  const { getIndex } = useIndex(currentLang);
  const [searchParams, setSearchParams] = useSearchParams();

  const { categorySlug } = useParams();
  const collectionIdParam = searchParams.get("collection");
  const [loading, setLoading] = useState(true);
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

  const fetchProducts = async () => {
    const { success, data } = await getListProducts(20);
    if (success) {
      setProducts(data);
    }
  };
  const fetchFeatures = async () => {
    const { success, data } = await getProductFeatures();
    if (success && data) {
      setProductFeatures(data);
    }
  };
  const fetchCollection = async () => {
    const { success, data } = await getCollection();
    if (success && data) {
      setCollections(data);
    }
  };

  useEffect(() => {
  const fetchAll = async () => {
    setLoading(true);
    setProducts([]);
    setProductFeatures([]);
    setCollections([]);
    setIndexData(null)

    await Promise.all([
      fetchProducts(),
      fetchBrands(),
      fetchIndex(),
      fetchFeatures(),
      fetchCollection(),
    ]);

    setLoading(false);
  };

  fetchAll();
}, [currentLang]);

  useEffect(() => {
    if (categorySlug && data?.product_categories?.length) {
      const cat = findCategoryBySlug(data.product_categories, categorySlug);

      if (cat) {
        setSelectedCategory(cat);
      }
    }
  }, [categorySlug, data]);
  
  useEffect(() => {
    updateSelectedInfo();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCollection.length > 0) {
      const lastCollectionId =
        selectedCollection[selectedCollection.length - 1];
      const col = collections.find((c) => c.id === lastCollectionId);
      if (col) {
        setSelectedInfo({ type: "collection", data: col });
        return;
      }
    }

    if (selected.length > 0) {
      const lastBrandId = selected[selected.length - 1];
      const brand = brands.find((b) => b.id === lastBrandId);
      if (brand) {
        setSelectedInfo({ type: "brand", data: brand });
        return;
      }
    }

    if (selectedCategory) {
      setSelectedInfo({ type: "category", data: selectedCategory });
      return;
    }

    setSelectedInfo(null);
  }, [
    selectedCollection,
    selected,
    selectedCategory,
    collections,
    brands,
    selectedCategory,
  ]);

  useEffect(() => {
    if (!categorySlug || !data?.product_categories) return;

    const selectedCat = findCategoryBySlug(
      data.product_categories,
      categorySlug,
    );

    if (selectedCat) {
      setSelectedCategory(selectedCat);

      const parentKeys = getParentKeys(
        data.product_categories,
        selectedCat.slug,
      );
      setOpenKeys(parentKeys);
    }
  }, [categorySlug, data]);
  const filteredCollections =
    selected.length > 0
      ? collections.filter((c) => selected.includes(Number(c.brand_id)))
      : collections;
const items = [
  {
    key: "all-products",
    label: (
      <div
        className={`menu-label ${
          activeParentSlug === "all-products" ? "parent-selected" : ""
        }`}
        onClick={() => {
          setActiveParentSlug("all-products");
          handleMenuSelect({ key: "all-products" });
        }}
      >
        <span>{t("local_allProducts")}</span>
      </div>
    ),
  },
  ...buildMenuItems(
    data?.product_categories ?? [],
    openKeys,
    (slug) => handleMenuSelect({ key: slug }),
    setOpenKeys,
    activeParentSlug,
    setActiveParentSlug,
  ),
];






  const toggleBrand = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectCollection = (id: number) => {
    setSelectedCollection((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const removeFilter = (id: number) => {
    setSelected((prev) => prev.filter((i) => i !== id));
  };

useEffect(() => {
  if (!collectionIdParam || collections.length === 0) return;

 
  const collectionTitle = collectionIdParam.replace(/-/g, ' ');
  const col = collections.find((c) => c.title === collectionTitle);
  
  if (col) {
    setSelectedCollection([col.id]);
    setSelectedInfo({ type: "collection", data: col });
    setOpenCollectionMenu(true);
  }
}, [collectionIdParam, collections]);

  const selectFeature = (id: number) => {
    setSelectedFeature((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
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
  };

  const getFilteredProducts = (): ProductView[] => {
    return product.filter((p) => {
      const matchesBrand =
        selected.length === 0 || selected.includes(p.brand?.id);

      const matchesCollection =
        selectedCollection.length === 0 ||
        selectedCollection.includes(p.collection?.id);
      const matchesCategory =
        !selectedCategory || p?.category?.id == selectedCategory?.id;

      const matchesFeatures =
        selectedFeature.length === 0 ||
        selectedFeature.every((featureId) =>
          p.feature_values?.some((pf) => pf.id == featureId),
        );
      return (
        matchesBrand && matchesCollection && matchesCategory && matchesFeatures
      );
    });
  };
  const filteredProducts = getFilteredProducts();

  const shouldShowFeatureMenu = (
    selectedCategoryId: string | undefined | null,
    featureCategoryId: string,
  ): boolean => {
    if (!selectedCategoryId) return false;
    return selectedCategoryId == featureCategoryId;
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
    if (selectedCollection.length > 0) {
      const lastCollectionId =
        selectedCollection[selectedCollection.length - 1];
      const col = collections.find((c) => c.id === lastCollectionId);
      if (col) {
        setSelectedInfo({ type: "collection", data: col });
        return;
      }
    }

    if (selected.length > 0) {
      const lastBrandId = selected[selected.length - 1];
      const brand = brands.find((b) => b.id === lastBrandId);
      if (brand) {
        setSelectedInfo({ type: "brand", data: brand });
        return;
      }
    }

    if (selectedCategory) {
      setSelectedInfo({ type: "category", data: selectedCategory });
      return;
    }

    setSelectedInfo(null);
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    if (key === "all-products") {
      setSelectedCategory(null);
      setSelectedInfo(null);
    } else {
      const cat = findCategoryBySlug(data?.product_categories ?? [], key);

      if (cat) {
        setSelectedCategory(cat);
        setSelectedInfo({ type: "category", data: cat });
      }
    }
  };

  const getSelectedKeys = () => {
    if (!selectedCategory) {
      return ["all-products"];
    }
    return [selectedCategory.slug];
  };

  const loadMore = () => {
    const newItems = filteredProducts.slice(visibleCount, visibleCount + 4);
    setVisibleCount((prev) => prev + 4);
    setAnimatedItems((prev) => [...prev, ...newItems.map((i) => i.id)]);
  };

  useEffect(() => {
  const params = new URLSearchParams();

 
  if (selected.length > 0) {
    params.set("brand", selected.join(","));
  }

 
  if (selectedCollection.length > 0) {
    params.set("collection", selectedCollection.join(","));
  }

  
  if (selectedFeature.length > 0) {
    params.set("feature", selectedFeature.join(","));
  }


  setSearchParams(params);
}, [selected, selectedCollection, selectedFeature, selectedCategory]);
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
        <Row gutter={[0, 25]} style={{ justifyContent: "space-between" }}>
          <Col xs={24} lg={6}>
            <div className="filters-box">
              <h3 className="filter-title"> {t("local_category")}</h3>
              <div className="menu-scroll-container category-scroll">
                <Menu
                  className="menu-item-product"
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  expandIcon={null}
                  defaultSelectedKeys={["all-products"]}
                  selectedKeys={getSelectedKeys()}
                  defaultOpenKeys={["sub1"]}
                  onSelect={handleMenuSelect}
                  mode="inline"
                  items={items}
                />
              </div>
              <div className="filters-box">
                <h3 className="filter-title mt-30">{t("local_filters")} </h3>
                <div className="selected-tags">
                  {selected.map((id) => {
                    const b = brands.find((x) => x.id === id);
                    if (!b) return null;
                    return (
                      <Tag key={id} onClose={() => removeFilter(id)}>
                        <div className="pulse-tag">
                          {b.title}
                          <button
                            onClick={() => removeFilter(id)}
                            className="pulse-button"
                          >
                            <span className="plus-icon">+</span>
                          </button>
                        </div>
                      </Tag>
                    );
                  })}

                  {
                    selectedCollection.map((id) => {
                      const c = collections.find((x) => x.id === id);
                      if (!c) return null;

                      return (
                        <Tag key={`collection-${id}`}>
                          <div className="pulse-tag">
                            {c.title}
                            <button
                              onClick={() =>
                                setSelectedCollection((prev) =>
                                  prev.filter((i) => i !== id),
                                )
                              }
                              className="pulse-button"
                            >
                              <span className="plus-icon">+</span>
                            </button>
                          </div>
                        </Tag>
                      );
                    })
                  }
                </div>
              </div>

              <div className="menu-scroll-container">
                <div className="  filters-box-t">
                  <h3 className="filter-brand-title"> {t("local_brands")}</h3>
                  <Input
                    className="filter-brand-input"
                    placeholder={t("local_search")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    suffix={<CloseOutlined />}
                  />

                  <div className="brands-list">
                    <Menu className="menu-item-product-brand">
                      {filteredBrands.map((b, index) => (
                        <>
                          <Menu.Item className="brand-menu-item" key={b.id}>
                            <div className="item-menu-box">
                              <div className="item-menu-check-box">
                                <Checkbox
                                  className="item-menu-check"
                                  checked={selected.includes(b.id)}
                                  onChange={() => toggleBrand(b.id)}
                                >
                                  {b.title}
                                </Checkbox>
                              </div>
                            
                            </div>
                          </Menu.Item>
                          {index !== filteredBrands.length - 1 && (
                            <div className="divider-brand">
                              <Divider className="divider-brand" />
                            </div>
                          )}
                        </>
                      ))}
                    </Menu>
                  </div>
                </div>
              </div>
              {filteredCollections.length > 0 && (
                <div className=" menu-border ">
                  <Menu className="menu-item-product-col " mode="inline"
                    openKeys={openCollectionMenu ? ["collection-menu"] : []}
                    onOpenChange={(keys) =>
                      setOpenCollectionMenu(keys.includes("collection-menu"))
                    }>
                    <Menu.SubMenu
                      key="collection-menu"
                      title={
                        <div className="menu-label-filter ">
                          <span> {t("local_collections")} </span>
                          <span> &#8595;</span>
                        </div>
                      }
                    >
                      {filteredCollections.map((b, index) => (
                        <>
                          <Menu.Item className="brand-menu-item" key={b.id}>
                            <div className="item-menu-box">
                              <div className="item-menu-check-box">
                                <Checkbox
                                  className="item-menu-check"
                                  checked={selectedCollection.includes(b.id)}
                                  onChange={() => selectCollection(b.id)}
                                >
                                  {b.title}
                                </Checkbox>
                              </div>
                            </div>
                          </Menu.Item>
                          {index !== filteredCollections.length - 1 && (
                            <div className="divider-brand">
                              <Divider className="divider-brand" />
                            </div>
                          )}
                        </>
                      ))}
                    </Menu.SubMenu>
                  </Menu>
                </div>
              )}

              {selectedCategory && (
                <div className=" menu-border">
                  <Menu className="menu-item-product-col  " mode="inline">
                    {productFeatures
                      .filter((feature) =>
                        shouldShowFeatureMenu(
                          selectedCategory?.id.toString(),
                          feature?.category_id,
                        ),
                      )
                      .map((item) => (
                        <Menu.SubMenu
                          key={`feature-${item.id}`}
                          title={
                            <div className="menu-label-filter">
                              <span>{item?.title}</span>
                              <span> &#8595;</span>
                            </div>
                          }
                        >
                          {item?.values.map((b, index) => (
                            <>
                              <Menu.Item className="brand-menu-item" key={b.id}>
                                <div className="item-menu-box">
                                  <div className="item-menu-check-box">
                                    <Checkbox
                                      className="item-menu-check"
                                      checked={selectedFeature.includes(b.id)}
                                      onChange={() => selectFeature(b.id)}
                                    >
                                      {b.value}
                                    </Checkbox>
                                  </div>
                                </div>
                              </Menu.Item>
                              {index !== item?.values.length - 1 && (
                                <div className="divider-brand">
                                  <Divider className="divider-brand" />
                                </div>
                              )}
                            </>
                          ))}
                        </Menu.SubMenu>
                      ))}
                  </Menu>
                </div>
              )}
            </div>
          </Col>

          <Col xs={24} lg={17}>
            <p className="count">
              {filteredProducts.length} {t("local_productsFound")}
            </p>

            <Row gutter={[20, 30]}>
              {filteredProducts
                .reverse()
                .slice(0, visibleCount)
                .map((item, i) => (
                  <Col xs={12}  md={3} sm={12} lg={8} key={i}>
                    <Card
                      hoverable
                      className={`showcase-card-product ${animatedItems.includes(item.id) ? "fade-in" : ""
                        }`}
                      onClick={() =>
                        push(`/${currentLang}/products/${item.id}`)
                      }
                      cover={
                        <img
                          src={item?.image}
                          alt="product"
                          className="img-card-product"
                        />
                      }
                    >
                      <div className="selected-tags-item">
                        {selected.map((id) => {
                          const b = brands.find((x) => x.id == id);
                          if (!b) return null;
                          if (item.brand.id !== b.id) return null;
                          return (
                            <Tag key={id} onClose={() => removeFilter(id)}>
                              <div className="pulse-tag">{b.title}</div>
                            </Tag>
                          );
                        })}
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
