import React from "react";
import { Menu, Tag, Input, Checkbox } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface Brand { id: number; title: string; }
interface Collection { id: number; title: string; }
interface FeatureValue { id: number; value: string; }
interface ProductFeature { id: number; title: string; values: FeatureValue[]; category_id: number | string; }

const MenuLabel: React.FC<{ title: string }> = ({ title }) => (
  <div className="menu-label-filter">
    <span>{title}</span>
    <span>↓</span>
  </div>
);

interface ProductFiltersProps {
  // Category Menu Props
  items: any[];
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;

  // Filters Props
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
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
  productFeatures: ProductFeature[];
  selectedFeature: number[];
  selectFeature: (id: number) => void;
  onSelectCollectionRoute: (id: number) => void;
  t: (key: string) => string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  items, openKeys, onOpenChange,
  openFilter, brands, selected, toggleBrand, removeFilter,
  filteredBrands, search, setSearch,
  filteredCollections, selectedCollection, selectCollection,
  productFeatures, selectedFeature, selectFeature,
  t,
}) => {
  return (
    <div className={`filters-box ${openFilter ? "open" : ""}`}>
      {/* بخش دسته‌بندی‌ها که حذف شده بود */}
      <h3 className="filter-title">{t("local_category")}</h3>
      <div className="menu-scroll-container category-scroll">
        <Menu
          className="menu-item-product"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={items}
        />
      </div>

      <div className="filters-box">
        <h3 className="filter-title mt-30">{t("local_filters")}</h3>
        <div className="selected-tags">


          {/* برندها */}
          {selected.map((id) => {
            const b = brands.find((x) => x.id === id);
            if (!b) return null;
            return (
              <Tag key={`brand-${id}`}>
                <div className="pulse-tag">
                  {b.title}
                  <button
                    onClick={() => removeFilter(id, "brand")}
                    className="pulse-button"
                  >
                    <span className="plus-icon">+</span>
                  </button>
                </div>
              </Tag>
            );
          })}

          {/* کالکشن‌ها */}
          {selectedCollection.map((id) => {
            const c = filteredCollections.find((x) => x.id === id);
            if (!c) return null;
            return (
              <Tag key={`collection-${id}`}>
                <div className="pulse-tag">
                  {c.title}
                  <button
                    onClick={() => removeFilter(id, "collection")}
                    className="pulse-button"
                  >
                    <span className="plus-icon">+</span>
                  </button>
                </div>
              </Tag>
            );
          })}

          {/* فیچرها */}
          {selectedFeature.map((id) => {
            const feature = productFeatures
              .flatMap(f => f.values.map(v => ({ ...v, featureTitle: f.title })))
              .find(v => v.id === id);

            if (!feature) return null;

            return (
              <Tag key={`feature-${id}`}>
                <div className="pulse-tag">
                  {feature.featureTitle}: {feature.value}
                  <button
                    onClick={() => removeFilter(id, "feature")}
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
      <div className="menu-scroll-container category-scroll">
        <div className="filters-box-t">
          <h3 className="filter-brand-title">{t("local_brands")}</h3>
          <Input
            className="filter-brand-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("local_search")}
            suffix={<CloseOutlined />}
          />

          <Menu
            className="menu-item-product-brand"
            items={filteredBrands.map((b) => ({
              key: `brand-${b.id}`,
              label: (
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
              ),
              className: "brand-menu-item",
            }))}
          />
        </div>
      </div>
      <div className="menu-scroll-container category-scroll">
        {filteredCollections.length > 0 && (
          <Menu
            className="menu-item-product-col"
            mode="inline"
            items={[
              {
                key: "collection-menu",
                label: <MenuLabel title={t("local_collections")} />,
                children: filteredCollections.flatMap((c, idx) => [
                  {
                    key: `collection-${c.id}`,
                    label: (
                      <div className="item-menu-box">
                        <div className="item-menu-check-box">
                          <Checkbox
                            className="item-menu-check"
                            checked={selectedCollection.includes(c.id)}
                            onChange={() => {
                              selectCollection(c.id);
                            }}
                          >
                            {c.title}
                          </Checkbox>
                        </div>
                      </div>
                    ),
                  },
                  ...(idx !== filteredCollections.length - 1 ? [{ type: "divider" as const, key: `divider-col-${c.id}` }] : []),
                ]),
              },
            ]}
          />
        )}

      </div>


      {productFeatures && productFeatures.length > 0 && (
        <Menu
          className="menu-item-product-col"
          mode="inline"
          items={productFeatures.map((f) => ({
            key: f.id,
            label: <MenuLabel title={f.title} />,
            children: f.values.flatMap((v, idx) => [
              {
                key: `feature-${v.id}`,
                label: (
                  <div className="item-menu-box">
                    <div className="item-menu-check-box">
                      <Checkbox
                        className="item-menu-check"
                        checked={selectedFeature.includes(v.id)}
                        onChange={() => selectFeature(v.id)}
                      >
                        {v.value}
                      </Checkbox>
                    </div>
                  </div>
                ),
              },
              ...(idx !== f.values.length - 1 ? [{ type: "divider" as const, key: `divider-feat-${v.id}` }] : []),
            ]),
          }))}
        />
      )}

    </div>
  );
};

export default ProductFilters;
