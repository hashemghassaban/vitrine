import React, { useState } from "react";
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
import img1 from "../../../assets/products/img1.jpg";
import img2 from "../../../assets/products/img2.jpg";
import img3 from "../../../assets/products/img2.jpg";
import { AppHeader } from "../../../components/AppHeader/AppHeader";
import { AppFooter } from "../../../components/AppFooter/AppFooter";

import { CloseOutlined } from "@ant-design/icons";
interface Brand {
  id: number;
  nameFa: string;
  nameEn: string;
}

const brandsData: Brand[] = [
  { id: 1, nameFa: "آبادانا", nameEn: "comin soon" },
  { id: 2, nameFa: "دینا", nameEn: "comin soon" },
  { id: 3, nameFa: "دیانا", nameEn: "comin soon" },
  { id: 4, nameFa: "آبادانا", nameEn: "comin soon" },
];
const colData: Brand[] = [
  { id: 1, nameFa: "آبادانا", nameEn: "comin soon" },
  { id: 2, nameFa: "دینا", nameEn: "comin soon" },
];
const AllProducts: React.FC = () => {
  const products = [
    { img: img1, title: "عنوان تست دوش", code: "comin soon" },
    { img: img2, title: "عنوان تست دوش", code: "comin soon" },
    { img: img3, title: "عنوان تست دوش", code: "comin soon" },
    { img: img1, title: "عنوان تست دوش", code: "comin soon" },
    { img: img2, title: "عنوان تست دوش", code: "CATER 5004" },
    { img: img3, title: "عنوان تست دوش", code: "CATER 5005" },
    { img: img1, title: "عنوان تست دوش", code: "CATER 5000" },
    { img: img2, title: "عنوان تست دوش", code: "CATER 5001" },
    { img: img2, title: "عنوان تست دوش", code: "CATER 5004" },
    { img: img3, title: "عنوان تست دوش", code: "CATER 5005" },
  ];
  const [visibleCount, setVisibleCount] = useState(8);
  type MenuItem = Required<MenuProps>["items"][number];
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys);
  };

  {
    /* --------------menu-------------*/
  }

  const items: MenuItem[] = [
    {
      key: "sub1",
      label: "همه کالا",
    },

    {
      type: "divider",
    },

    {
      key: "s1",
      label: (
        <div className="menu-label">
          {openKeys.includes("s1") ? (
            <span> &#8595;</span>
          ) : (
            <span>&#8592;</span>
          )}
          <span>ابزار</span>
        </div>
      ),
      children: [
        {
          type: "divider",
        },
        {
          key: "sub1",
          label: (
            <div className="menu-label">
              {openKeys.includes("sub1") ? (
                <span> &#8595;</span>
              ) : (
                <span>&#8592;</span>
              )}
              <span>لوازم</span>
            </div>
          ),
          children: [
            {
              type: "divider",
            },
            {
              key: "m1",
              label: (
                <div className="menu-label">
                  {openKeys.includes("m1") ? (
                    <span> &#8595;</span>
                  ) : (
                    <span>&#8592;</span>
                  )}
                  <span>تجهیزات</span>
                </div>
              ),
              children: [
                {
                  type: "divider",
                },
                {
                  key: "1",
                  label: (
                    <div className="menu-label">
                      {openKeys.includes("1") ? (
                        <span> &#8595;</span>
                      ) : (
                        <span>&#8592;</span>
                      )}
                      <span>تجهیزات</span>
                    </div>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },

    {
      type: "divider",
    },

    {
      key: "s2",
      label: (
        <div className="menu-label">
          {openKeys.includes("s2") ? (
            <span> &#8595;</span>
          ) : (
            <span>&#8592;</span>
          )}
          <span>ابزار</span>
        </div>
      ),
      children: [
        {
          type: "divider",
        },
        {
          key: "sub2",
          label: (
            <div className="menu-label">
              {openKeys.includes("sub2") ? (
                <span> &#8595;</span>
              ) : (
                <span>&#8592;</span>
              )}
              <span>لوازم</span>
            </div>
          ),
          children: [
            {
              type: "divider",
            },
            {
              key: "m2",
              label: (
                <div className="menu-label">
                  {openKeys.includes("m2") ? (
                    <span> &#8595;</span>
                  ) : (
                    <span>&#8592;</span>
                  )}
                  <span>تجهیزات</span>
                </div>
              ),
              children: [
                {
                  type: "divider",
                },
                {
                  key: "2",
                  label: (
                    <div className="menu-label">
                      {openKeys.includes("2") ? (
                        <span> &#8595;</span>
                      ) : (
                        <span>&#8592;</span>
                      )}
                      <span>تجهیزات</span>
                    </div>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },

    {
      type: "divider",
    },

    {
      key: "s3",
      label: (
        <div className="menu-label">
          {openKeys.includes("s3") ? (
            <span> &#8595;</span>
          ) : (
            <span>&#8592;</span>
          )}
          <span>ابزار</span>
        </div>
      ),
      children: [
        {
          type: "divider",
        },
        {
          key: "sub3",
          label: (
            <div className="menu-label">
              {openKeys.includes("sub3") ? (
                <span> &#8595;</span>
              ) : (
                <span>&#8592;</span>
              )}
              <span>لوازم</span>
            </div>
          ),
          children: [
            {
              type: "divider",
            },
            {
              key: "m3",
              label: (
                <div className="menu-label">
                  {openKeys.includes("m3") ? (
                    <span> &#8595;</span>
                  ) : (
                    <span>&#8592;</span>
                  )}
                  <span>تجهیزات</span>
                </div>
              ),
              children: [
                {
                  type: "divider",
                },
                {
                  key: "3",
                  label: (
                    <div className="menu-label">
                      {openKeys.includes("3") ? (
                        <span> &#8595;</span>
                      ) : (
                        <span>&#8592;</span>
                      )}
                      <span>تجهیزات</span>
                    </div>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },

    {
      type: "divider",
    },

    {
      key: "s4",
      label: (
        <div className="menu-label">
          {openKeys.includes("s4") ? (
            <span> &#8595;</span>
          ) : (
            <span>&#8592;</span>
          )}
          <span>ابزار</span>
        </div>
      ),
      children: [
        {
          type: "divider",
        },
        {
          key: "sub4",
          label: (
            <div className="menu-label">
              {openKeys.includes("sub4") ? (
                <span> &#8595;</span>
              ) : (
                <span>&#8592;</span>
              )}
              <span>لوازم</span>
            </div>
          ),
          children: [
            {
              type: "divider",
            },
            {
              key: "m4",
              label: (
                <div className="menu-label">
                  {openKeys.includes("m4") ? (
                    <span> &#8595;</span>
                  ) : (
                    <span>&#8592;</span>
                  )}
                  <span>تجهیزات</span>
                </div>
              ),
              children: [
                {
                  type: "divider",
                },
                {
                  key: "4",
                  label: (
                    <div className="menu-label">
                      {openKeys.includes("4") ? (
                        <span> &#8595;</span>
                      ) : (
                        <span>&#8592;</span>
                      )}
                      <span>تجهیزات</span>
                    </div>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  {
    /* --------------filter-brand-------------*/
  }
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const filteredBrands = brandsData.filter((b) => b.nameFa.includes(search));

  const toggleBrand = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const removeFilter = (id: number) => {
    setSelected((prev) => prev.filter((i) => i !== id));
  };

  const filteredProducts =
    selected.length === 0
      ? products
      : products.filter((item) =>
          selected.some((id) => {
            const b = brandsData.find((x) => x.id === id);
            return b && item.code === b.nameEn;
          })
        );
  return (
    <>
      <AppHeader title={"شیرآلات ویترین"}  text={"خانه > محصولات > شیرآلات"} />
      <div className="products-container">
        <Row gutter={[0, 20]}>
          <Col xs={24} lg={7}>
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
                  mode="inline"
                  items={items}
                />
              </div>
              <div className="filters-box">
                <h3 className="filter-title mt-30">فیلترها</h3>
                <div className="selected-tags">
                  {selected.map((id) => {
                    const b = brandsData.find((x) => x.id === id);
                    if (!b) return null;
                    return (
                      <Tag key={id} onClose={() => removeFilter(id)}>
                        <div className="pulse-tag">
                          {b.nameEn}
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
                                  {b.nameFa}
                                </Checkbox>
                              </div>
                              <p> {b.nameEn} </p>
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
                    {colData.map((b, index) => (
                      <>
                        <Menu.Item className="brand-menu-item" key={b.id}>
                          <div className="item-menu-box">
                            <div className="item-menu-check-box">
                              <Checkbox className="item-menu-check">
                                {b.nameFa}
                              </Checkbox>
                            </div>
                          </div>
                        </Menu.Item>
                        {index !== colData.length - 1 && (
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
                  <Menu.SubMenu
                    key="ks"
                    title={
                      <div className="menu-label-filter">
                        <span>رنگ</span>
                        <span> &#8595;</span>
                      </div>
                    }
                  >
                    {colData.map((b, index) => (
                      <>
                        <Menu.Item className="brand-menu-item" key={b.id}>
                          <div className="item-menu-box">
                            <div className="item-menu-check-box">
                              <Checkbox className="item-menu-check">
                                {b.nameFa}
                              </Checkbox>
                            </div>
                          </div>
                        </Menu.Item>
                        {index !== colData.length - 1 && (
                          <div className="divider-brand">
                            <Divider className="divider-brand" />
                          </div>
                        )}
                      </>
                    ))}
                  </Menu.SubMenu>
                </Menu>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={17}>
            <p className="count">۶ محصول پیدا شد</p>

            <Row gutter={[20, 30]}>
              {filteredProducts.slice(0, visibleCount).map((item, i) => (
                <Col xs={12} sm={12} lg={6} key={i}>
                  <Card
                    hoverable
                    className="showcase-card-product"
                    cover={
                      <img
                        src={item.img}
                        alt="product"
                        className="img-card-product"
                      />
                    }
                  >
                    <div className="selected-tags-item">
                      {selected.map((id) => {
                        const b = brandsData.find((x) => x.id === id);

                        if (!b) return null;
                        if (item.code !== b.nameEn) return null;
                        return (
                          <Tag key={id} onClose={() => removeFilter(id)}>
                            <div className="pulse-tag">{b.nameEn}</div>
                          </Tag>
                        );
                      })}
                    </div>
                    <p className="product-title-product">{item.title}</p>
                  </Card>
                </Col>
              ))}
            </Row>

            {visibleCount < products.length && (
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
      <AppFooter/>
    </>
  );
};

export default AllProducts;
