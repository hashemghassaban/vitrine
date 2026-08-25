import React from "react";
import { Menu, Tag, Input, Checkbox } from "antd";

interface Brand { id: number; title: string; }
interface Collection { id: number; title: string; }
interface FeatureValue { id: number; value: string; }
interface ProductFeature { id: number; title: string; values: FeatureValue[]; category_id: number | string; }
interface Category { id: number; title: string; }

// Component for menu label
const MenuLabel: React.FC<{ title: string; showArrow?: boolean }> = ({ title, showArrow = true }) => (
  <div className="menu-label-filter">
    <span>{title}</span>
    {showArrow && <span>↓</span>}
  </div>
);

interface ProductFiltersMobileProps {
  items: any[];
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;

  getSelectedKeys: () => string[];
  handleMenuSelect: (info: any) => void;

  brands: Brand[];
  selected: number[];
  toggleBrand: (id: number) => void;
  removeFilter: (id: number, type: "brand" | "collection" | "feature") => void;
  filteredBrands: Brand[];

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  filteredCollections: Collection[];
  selectedCollection: number[];
  selectCollection: (id: number) => void;
  setSelectedCollection: React.Dispatch<React.SetStateAction<number[]>>;

  selectedCategory?: Category | null;
  productFeatures: ProductFeature[];
  shouldShowFeatureMenu: (
    categoryId: string,
    featureCategoryId: string | number
  ) => boolean;

  selectedFeature: number[];
  selectFeature: (id: number) => void;

  // BRAND - COLLECTION MENU STATES (keep these!)
  openBrandMenu: boolean;
  setOpenBrandMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openCollectionMenu: boolean;
  setOpenCollectionMenu: React.Dispatch<React.SetStateAction<boolean>>;

  // BUT category menu NO LONGER uses these:
  openCategoryMenu: boolean;
  setOpenCategoryMenu: React.Dispatch<React.SetStateAction<boolean>>;

  t: (key: string) => string;

  onSelectCollectionRoute: (id: number) => void;
}

// recursive categories exactly like desktop - returns items array
const renderMenuItems = (items: any[], level: number = 0): any[] =>
  items.flatMap((item) => {
    if (item.type === "divider") return { type: "divider" as const, key: item.key };

    const isChild = level > 0;

    if (item.children) {
      return {
        key: item.key,
        label: item.label,
        className: isChild ? "category-child-submenu" : "",
        children: renderMenuItems(item.children, level + 1),
      };
    }

    return {
      key: item.key,
      label: item.label,
      className: isChild ? "category-child-item" : "",
    };
  });

const ProductFiltersMobile: React.FC<ProductFiltersMobileProps> = ({
  items,
  openKeys,
  onOpenChange,
  getSelectedKeys,
  handleMenuSelect,

  selected,
  brands,
  removeFilter,
  toggleBrand,

  filteredBrands,
  search,
  setSearch,

  filteredCollections,
  selectedCollection,
  selectCollection,

  openBrandMenu,
  setOpenBrandMenu,
  openCollectionMenu,
  setOpenCollectionMenu,

  selectedCategory,
  productFeatures,
  shouldShowFeatureMenu,

  selectedFeature,
  selectFeature,

  t,
}) => {
  return (
    <div className="filters-box">

      {/* SELECTED TAGS */}
      <div className="selected-tags">
        {selected.map((id) => {
          const b = brands.find((x) => x.id === id);
          if (!b) return null;
          return (
            <Tag key={`brand-${id}`}>
              <div className="pulse-tag">
                {b.title}
                <button onClick={() => removeFilter(id, "brand")} className="pulse-button">
                  <span className="plus-icon">+</span>
                </button>
              </div>
            </Tag>
          );
        })}

        {selectedCollection.map((id) => {
          const c = filteredCollections.find((x) => x.id === id);
          if (!c) return null;
          return (
            <Tag key={`collection-${id}`}>
              <div className="pulse-tag">
                {c.title}
                <button onClick={() => removeFilter(id, "collection")} className="pulse-button">
                  <span className="plus-icon">+</span>
                </button>
              </div>
            </Tag>
          );
        })}

        {selectedFeature.map((id) => {
          const feature = productFeatures
            .flatMap(f => f.values.map(v => ({ ...v, featureTitle: f.title })))
            .find(v => v.id === id);

          if (!feature) return null;

          return (
            <Tag key={`feature-${id}`}>
              <div className="pulse-tag">
                {feature.featureTitle}: {feature.value}
                <button onClick={() => removeFilter(id, "feature")} className="pulse-button">
                  <span className="plus-icon">+</span>
                </button>
              </div>
            </Tag>
          );
        })}
      </div>

      {/* ⭐⭐⭐ CATEGORY MENU — EXACTLY LIKE DESKTOP ⭐⭐⭐ */}
      <Menu
        className="menu-item-product"
        expandIcon={null}
        selectedKeys={getSelectedKeys()}
        onSelect={handleMenuSelect}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={[
          {
            key: "category-menu",
            label: <MenuLabel title={t("local_category")} />,
            children: renderMenuItems(items),
          },
        ]}
      />

      {/* BRANDS */}
      <Menu
        className="menu-item-product-col"
        mode="inline"
        openKeys={openBrandMenu ? ["brand-menu"] : []}
        onOpenChange={(keys) =>
          setOpenBrandMenu(keys.includes("brand-menu"))
        }
        items={[
          {
            key: "brand-menu",
            label: <MenuLabel title={t("local_brands")} />,
            children: [
              {
                key: "brand-input",
                label: (
                  <Input
                    className="filter-brand-input"
                    placeholder={t("local_search")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                ),
                disabled: true,
              },
              ...filteredBrands.flatMap((b, idx) => [
                {
                  key: `brand-${b.id}`,
                  label: (
                    <Checkbox
                      checked={selected.includes(b.id)}
                      onChange={() => toggleBrand(b.id)}
                      className="item-menu-check"
                    >
                      {b.title}
                    </Checkbox>
                  ),
                  className: "brand-menu-item",
                },
                ...(idx !== filteredBrands.length - 1 ? [{ type: "divider" as const, key: `divider-${b.id}` }] : []),
              ]),
            ],
          },
        ]}
      />

      {/* COLLECTIONS */}
      {filteredCollections.length > 0 && (
        <Menu
          className="menu-item-product-col"
          mode="inline"
          openKeys={openCollectionMenu ? ["collection-menu"] : []}
          onOpenChange={(keys) =>
            setOpenCollectionMenu(keys.includes("collection-menu"))
          }
          items={[
            {
              key: "collection-menu",
              label: <MenuLabel title={t("local_collections")} />, 
              children: filteredCollections.flatMap((col, idx) => [
                {
                  key: `collection-${col.id}`,
                  label: (
                    <Checkbox
                      checked={selectedCollection.includes(col.id)}
                      onChange={() => selectCollection(col.id)}
                      className="item-menu-check"
                    >
                      {col.title}
                    </Checkbox>
                  ),
                  className: "brand-menu-item",
                },
                ...(idx !== filteredCollections.length - 1 ? [{ type: "divider" as const, key: `divider-col-${col.id}` }] : []),
              ]),
            },
          ]}
        />
      )}

      {/* FEATURES */}
      {selectedCategory && (
        <Menu
          className="menu-item-product-col"
          mode="inline"
          items={productFeatures
            .filter((feat) =>
              shouldShowFeatureMenu(
                selectedCategory.id.toString(),
                feat.category_id
              )
            )
            .map((feat) => ({
              key: `feat-${feat.id}`,
              label: <MenuLabel title={feat.title} />,
              children: feat.values.flatMap((v, idx) => [
                {
                  key: `feature-${v.id}`,
                  label: (
                    <Checkbox
                      checked={selectedFeature.includes(v.id)}
                      onChange={() => selectFeature(v.id)}
                      className="item-menu-check"
                    >
                      {v.value}
                    </Checkbox>
                  ),
                  className: "brand-menu-item",
                },
                ...(idx !== feat.values.length - 1 ? [{ type: "divider" as const, key: `divider-feat-${v.id}` }] : []),
              ]),
            }))}
        />
      )}
    </div>
  );
};

export default ProductFiltersMobile;
