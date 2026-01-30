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
import imgb from "../../../assets/blog/img1.png";
import useNavigation from "../../../hooks/useHistory";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";

import { useLanguage } from "../../../contexts/useLanguage";
import useProducts from "../../../hooks/products/useProducts";
import useProductFeatures from "../../../hooks/products/useProductFeatures";
import type { FeatureView } from "../../../models/views/productFeaturesView";
import type { CollectionView, ProductView } from "../../../models/views/productView";
import { CloseOutlined } from "@ant-design/icons";
import useBrands from "../../../hooks/brand/useBrands";
import type BrandView from "../../../models/views/brandView";
import useIndex from "../../../hooks/index/useIndex";
import type {
  IndexDataView,
  ProductCategoryView,
} from "../../../models/views/indexView";
import useCollections from "../../../hooks/collections/useCollections";

type MenuItem = Required<MenuProps>["items"][number];

const buildMenuItems = (
  categories: ProductCategoryView[],
  openKeys: string[],
): MenuItem[] => {
  return categories.map((cat) => ({
    key: cat.slug,
    label: (
      <div className="menu-label">
        {cat.children?.length > 0 && (
          <span>{openKeys.includes(String(cat.id)) ? "↓" : "←"}</span>
        )}
        <span>{cat.title}</span>
      </div>
    ),
    children:
      cat.children && cat.children.length > 0
        ? [{ type: "divider" }, ...buildMenuItems(cat.children, openKeys)]
        : undefined,
  }));
};
const AllProducts: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys);
  };

  {
    /* --------------menu-------------*/
  }

  {
    /* --------------filter-brand-------------*/
  }
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryView>();
  const { currentLang } = useLanguage();
  const { getListProducts } = useProducts(currentLang);

  const [productFeatures, setProductFeatures] = useState<FeatureView[]>([]);
  const { getProductFeatures } = useProductFeatures(currentLang);
  const [visibleCount, setVisibleCount] = useState(8);
  const [product, setProducts] = useState<ProductView[]>([]);
  const { getList } = useBrands(currentLang);
  const [brands, setBrands] = useState<BrandView[]>([]);
  const [collections, setCollections] = useState<CollectionView[]>([]);
  const { getCollection } = useCollections(currentLang);
  const filteredBrands = brands.filter((b) => b.title.includes(search));
  const { push } = useNavigation();
  const [data, setIndexData] = useState<IndexDataView | null>(null);
  const { getIndex } = useIndex(currentLang);
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
    setProducts([]);
    fetchProducts();
    fetchBrands();
    setIndexData(null);
    fetchIndex();
    setProductFeatures([]);
    fetchFeatures();
    setCollections([]);
    fetchCollection();
  }, [currentLang]);

  const filteredCollections =
    selected.length === 0
      ? collections
      : collections.filter((c) => selected.includes(Number(c.brand_id)));

  const items = buildMenuItems(data?.product_categories ?? [], openKeys);

  const toggleBrand = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const removeFilter = (id: number) => {
    setSelected((prev) => prev.filter((i) => i !== id));
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

  /* const filteredProducts =
    selected.length === 0
      ? product
      : product.filter((item) =>
          selected.some((id) => {
            const b = brands.find((x) => x.id === id);
            return b && item.brand.id === b.id;
          })
        );*/
  const shouldShowFeatureMenu = (
    selectedCategoryId: string | undefined,
    featureCategoryId: string,
  ): boolean => {
    if (!selectedCategoryId) return false;
    return selectedCategoryId == featureCategoryId;
  };

  return (
    <>
      <AppHeader
        categoryBackground={selectedCategory?.image_link}
        title={!!selectedCategory ? selectedCategory?.title : "محصولات"}
        text={`خانه > محصولات ${!!selectedCategory ?`> ${selectedCategory?.title}`:""}`}
      />
      <div className="products-container">
        <Row gutter={[0, 25]}>
          <Col xs={24} lg={6}>
            <div className="filters-box">
              <h3 className="filter-title">دسته‌بندی‌ها</h3>
              <div className="menu-scroll-container">
                <Menu
                  className="menu-item-product"
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  expandIcon={null}
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  onSelect={({ key }) => {
                    const cat = findCategoryBySlug(
                      data?.product_categories ?? [],
                      key,
                    );
                    setSelectedCategory(cat);
                  }}
                  mode="inline"
                  items={items}
                />
              </div>
              <div className="filters-box">
                <h3 className="filter-title mt-30">فیلترها</h3>
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
                </div>
              </div>

              <div className="menu-scroll-container">
                <div className="  filters-box-t">
                  <h3 className="filter-brand-title"> برندها</h3>
                  <Input
                    className="filter-brand-input"
                    placeholder="جستجو"
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
                              <p> {b.title} </p>
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
              <div className=" menu-border  ">
                <Menu className="menu-item-product-col " mode="inline">
                  <Menu.SubMenu
                    key="ks"
                    title={
                      <div className="menu-label-filter ">
                        <span>کالکشن ها</span>
                        <span> &#8595;</span>
                      </div>
                    }
                  >
                    {filteredCollections.map((b, index) => (
                      <>
                        <Menu.Item className="brand-menu-item" key={b.id}>
                          <div className="item-menu-box">
                            <div className="item-menu-check-box">
                              <Checkbox className="item-menu-check">
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
                        key="ks"
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
                                  <Checkbox className="item-menu-check">
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
            </div>
          </Col>

          <Col xs={24} lg={17}>
            <p className="count">{product.length} محصول پیدا شد</p>

            <Row gutter={[20, 30]}>
              {product.slice(0, visibleCount).map((item, i) => (
                <Col xs={12} sm={12} lg={6} key={i}>
                  <Card
                    hoverable
                    className="showcase-card-product"
                    onClick={() => push(`/products/${item.id}`)}
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
                        const b = brands.find((x) => x.id === id);

                        if (!b) return null;
                        if (item.id !== b.id) return null;
                        return (
                          <Tag key={id} onClose={() => removeFilter(id)}>
                            <div className="pulse-tag">{b.title}</div>
                          </Tag>
                        );
                      })}
                    </div>
                    <p className="product-title-product">{item.title}</p>
                  </Card>
                </Col>
              ))}
            </Row>

            {visibleCount < product.length && (
              <div className="load-more-box">
                <button
                  className="load-more"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  مشاهده محصولات بیشتر
                </button>
              </div>
            )}
          </Col>
        </Row>
        <Row className="dec-box" align="middle" gutter={[40, 30]}>
          <Col xs={12} sm={12} lg={10}>
            <img
              src={imgb}
              alt="product"
              className="dec-img"
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={12} sm={12} lg={14}>
            <div>
              <h2 className="dec-title"> معرفی شوروم ویترین</h2>
              <p className="dec-text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان که لازم است. لورم ایپسوم متن ساختگی با
                تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که
                لازم است.
              </p>
              <p className="dec-text">
                {" "}
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان که لازم است.
              </p>
              <Button type="link" className="btn-more-brand-products">
                بیشتر
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <AppFooter />
    </>
  );
};

export default AllProducts;
