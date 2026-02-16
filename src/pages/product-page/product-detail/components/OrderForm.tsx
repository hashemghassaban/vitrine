import { useEffect, useState } from "react";
import { Button, Input, message, Select, Tag } from "antd";
import Captcha from "../../../../components/Captcha/Captcha";
import useProducts from "../../../../hooks/products/useProducts";
import { useLanguage } from "../../../../contexts/useLanguage";
import { validateEmail, validatePhone } from "../../../../helpers/validation";

import { PlusOutlined } from "@ant-design/icons";

import { useTranslate } from "../../../../i18n/useTranslate";
import type { orderProductDTO } from "../../../../models/dtos/orderProductDTO";
import type {
  ProductDetailView,
  ProductView,
} from "../../../../models/views/productView";

interface OrderFormProps {
  product: ProductDetailView | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ product }) => {
  const { currentLang } = useLanguage();
  const [selectOpen, setSelectOpen] = useState(false);
  const { getListProducts, sendOrderProduct } = useProducts(currentLang);

  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    product?.title ? [product.title] : [],
  );
  const [orderFormSubmitting, setOrderFormSubmitting] = useState(false);
  const [orderForm, setOrderForm] = useState<orderProductDTO>(
    {} as orderProductDTO,
  );

  const { t } = useTranslate();
  const [producList, setProductsList] = useState<ProductView[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchProductsList = async () => {
    const res = await getListProducts();
    if (res.success) {
      setProductsList(res.data);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, [currentLang]);

  useEffect(() => {
    if (product?.title) {
      setSelectedProducts([product.title]);
    }
  }, [product]);

  const openDialog = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    setIsOpen(false);
    setOrderForm({} as orderProductDTO);
    setSelectedProducts([product?.title ?? ""]);
    document.body.style.overflow = "auto";
  };

  const showMessage = (content: string) => {
    messageApi.open({
      icon: <></>,
      content: content,
    });
  };

  const handleOrderInputChange = (field: keyof orderProductDTO, value: any) => {
    setOrderForm((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };

  const onOrderSubmit = async () => {
    try {
      const productsString = selectedProducts.filter(Boolean).join(" - ");
      const payload: orderProductDTO = {
        ...orderForm,
        products: productsString,
      };
      const isEmpty =
        !payload.full_name ||
        !payload.email ||
        !payload.company ||
        !payload.telephone ||
        !payload.address ||
        !payload.products;

      if (isEmpty) {
        showMessage(t("local_completeTheForm"));
        return;
      }

      if (payload.email && !validateEmail(payload.email)) {
        showMessage(t("local_invalidEmail"));
        return;
      }

      if (payload.telephone && !validatePhone(payload.telephone)) {
        showMessage(t("local_invalidPhone"));
        return;
      }

      setOrderFormSubmitting(true);

      const resp = await sendOrderProduct(payload);

      if (resp.success) {
        showMessage(resp.result);
        setOrderForm({} as orderProductDTO);
        setSelectedProducts([product?.title ?? ""]);
        closeDialog();
      } else {
        showMessage(resp.result);
      }
    } catch (e: any) {
      showMessage(e?.message);
    } finally {
      setOrderFormSubmitting(false);
    }
  };
  return (
    <>
      {contextHolder}
      <button className="info-btn" onClick={openDialog}>
        {t("local_getInfo")}
      </button>

      {isOpen && (
        <div
          className="dialogMain"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="dialogBlock"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "768px",
            }}
          >
            <div className="dialog-header">
               <h2>{t("local_getInfo")}</h2>
                <button className=" closed" onClick={closeDialog}>
                x
              </button>
            </div>
           
            <div className="form-section">
              <div className="form-row">
                <div className="input-group half">
                  <Input
                    className=" input-text"
                    placeholder={t("local_contactFullName")}
                    variant="underlined"
                    value={orderForm.full_name || ""}
                    onChange={(e) =>
                      handleOrderInputChange("full_name", e.target.value)
                    }
                  />
                </div>
                <div className="input-group half">
                  <Input
                    className=" input-text"
                    placeholder={t("local_contactPhoneNumber")}
                    variant="underlined"
                    value={orderForm.telephone || ""}
                    onChange={(e) =>
                      handleOrderInputChange("telephone", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group half">
                  <Input
                    className=" input-text"
                    placeholder={t("local_company")}
                    variant="underlined"
                    value={orderForm.company || ""}
                    onChange={(e) =>
                      handleOrderInputChange("company", e.target.value)
                    }
                  />
                </div>
                <div className="input-group half">
                  <Input
                    className=" input-text"
                    placeholder={t("local_contactEmail")}
                    variant="underlined"
                    value={orderForm.email || ""}
                    onChange={(e) =>
                      handleOrderInputChange("email", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <Input
                    className=" input-text"
                    placeholder={t("local_address")}
                    variant="underlined"
                    value={orderForm.address || ""}
                    onChange={(e) =>
                      handleOrderInputChange("address", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <p className="text">{t("local_orderFormProducts")}</p>

                  <div className="products-container">
                    {selectedProducts.length > 0 ? (
                      selectedProducts.map((item) => (
                        <Tag
                          key={item}
                          closable
                          onClose={() => {
                            const filtered = selectedProducts.filter(
                              (p) => p !== item,
                            );
                            setSelectedProducts(filtered);
                          }}
                          style={{ margin: 0 }}
                        >
                          {item}
                        </Tag>
                      ))
                    ) : (
                      <span className="no-product">
                        {t("local_noProductSelected")}
                      </span>
                    )}
                  </div>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setSelectOpen(true)}
                  >
                    {t("local_orderFormAddProduct")}
                  </Button>
                  {selectOpen && (
                    <Select
                      autoFocus
                      showSearch
                      open
                      style={{ width: "100%", marginBottom: 10 }}
                      placeholder={t("local_search")}
                      optionFilterProp="label"
                      onChange={(value) => {
                        if (!selectedProducts.includes(value)) {
                          const updated = [...selectedProducts, value];
                          setSelectedProducts(updated);
                        }
                        setSelectOpen(false);
                      }}
                      getPopupContainer={(trigger) => trigger.parentElement!}
                      options={producList.map((item) => ({
                        value: item.title,
                        label: item.title,
                      }))}
                    />
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="input-group" style={{marginTop:'20px'}}>
                  {!orderFormSubmitting && (
                    <Captcha onVerify={handleOrderInputChange} />
                  )}
                </div>
              </div>
            </div>
            <div className="dialogFooter">
              <button
                className="info-btn"
                onClick={onOrderSubmit}
                disabled={orderFormSubmitting}
              >
                {t("local_orderFormSendOrder")}
              </button>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderForm;
