import { useState } from "react";
import reply from "../../../../assets/icon/reply.svg";
import star from "../../../../assets/icon/star.svg";
import { Input, message, Rate } from "antd";
import Captcha from "../../../../components/Captcha/Captcha";
import useProducts from "../../../../hooks/products/useProducts";
import type { ProductCommentDTO } from "../../../../models/dtos/productCommentDTO";
import { useLanguage } from "../../../../contexts/useLanguage";
import { validateEmail, validatePhone } from "../../../../helpers/validation";
import TextArea from "antd/es/input/TextArea";
import { useTranslate } from "../../../../i18n/useTranslate";

interface CommentFormProps {
  id: string | undefined;
}

const  CommentForm: React.FC<CommentFormProps> = ({id})=>  {
  const [commentFormSubmitting, setCommentFormSubmitting] = useState(false);
  const [commentForm, setCommentForm] = useState<ProductCommentDTO>(
    {} as ProductCommentDTO,
  );
  const [rating, setRating] = useState(0);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const openDialogComments = () => setIsOpenComments(true);
  const closeDialogomments = () => setIsOpenComments(false);
  const { currentLang } = useLanguage();
  const { t } = useTranslate();

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (content: string) => {
    messageApi.open({
      icon: <></>,
      content: content,
    });
  };

  const { getCommentProductById } = useProducts(currentLang);

  const handleCommentInputChange = (
    field: keyof ProductCommentDTO,
    value: any,
  ) => {
    setCommentForm((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };
  const onCommentSubmit = async () => {
    try {
      const isEmpty =
        !commentForm.content ||
        !commentForm.rate ||
        !commentForm.user_email ||
        !commentForm.user_name ||
        !commentForm.captcha;
      if (isEmpty) {
        showMessage(t("local_completeTheForm"));
        return;
      }

      if (commentForm.user_email && !validateEmail(commentForm.user_email)) {
        showMessage(t("local_invalidEmail"));
        return;
      }

      if (commentForm.phone && !validatePhone(commentForm.phone)) {
        showMessage(t("local_invalidPhone"));
        return;
      }

      setCommentFormSubmitting(true);

      const resp = await getCommentProductById(Number(id), commentForm);
      if (resp.success) {
        showMessage(resp.result);
        setCommentForm({} as ProductCommentDTO);
      } else {
        showMessage(resp.result);
      }
    } catch (e: any) {
      showMessage(e?.message);
    } finally {
      setCommentFormSubmitting(false);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="comment-section">
        <div className="scoreProduct">
          <div> امتیاز محصول / </div>
          <div>
            <img src={star} alt="star" /> 0 ( 0 دیدگاه )
          </div>
        </div>
        <h2 className="other-title">{t("local_comments")}</h2>
        <div className="comment-form">
          <div className="comment-form-block">
            <div className="form-row ">
              <div className="input-group half">
                <Input
                  className="input-text"
                  placeholder={t("local_contactFullName")}
                  variant="underlined"
                  value={commentForm.user_name || ""}
                  onChange={(e) =>
                    handleCommentInputChange("user_name", e.target.value)
                  }
                />
              </div>
              <div className="input-group half">
                <Input
                  className="input-text"
                  placeholder={t("local_contactEmail")}
                  variant="underlined"
                  value={commentForm.user_email || ""}
                  onChange={(e) =>
                    handleCommentInputChange("user_email", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-row textarea-field">
            <div
              className="input-group half"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>{t("local_commentRate")}</span>
              <Rate
                value={commentForm.rate || 0}
                onChange={(value) => handleCommentInputChange("rate", value)}
                className="black-rate"
              />
            </div>
            <div className="input-group half">
              <TextArea
                className="input-text"
                rows={4}
                placeholder={t("local_commentContent")}
                variant="underlined"
                value={commentForm.content || ""}
                onChange={(e) =>
                  handleCommentInputChange("content", e.target.value)
                }
              />
            </div>
          </div>

          {!commentFormSubmitting && <Captcha onVerify={handleCommentInputChange} />}

          <div className="form-row block-fill">
            <button
              className="info-btn"
              onClick={onCommentSubmit}
              disabled={commentFormSubmitting}
            >
              {t("local_send")}
            </button>
          </div>
        </div>

        <div className="comment-list">
          <div className="comment">
            <div className="comment-header">
              <div className="text-comment">
                <strong>علی رضایی</strong> - <span>5 امتیاز</span>
              </div>
              <div className="date">1404/09/12 12:35</div>
            </div>
            <div className="comment-body">
              <p> این محصول خیلی خوب بود و تجربه خرید عالی داشتم.</p>
            </div>

            {/* پاسخ به کامنت */}
            <div className="comment-reply">
              <div className="reply-icon">
                <img src={reply} alt="reply" />
              </div>
              <div className="comment-header">
                <strong>پشتیبانی</strong>
              </div>
              <div className="comment-body">
                <p>از نظر مثبت شما بسیار سپاسگزاریم! خوشحالیم رضایت داشتید.</p>
                <button className="reply-btn" onClick={openDialogComments}>
                  پاسخ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpenComments && (
        <div
          className="dialogMain"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            zIndex: 100000,
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
            <h2> پاسخ به ...</h2>
            <div className="form-section">
              <div className="comment-form-block">
                <div className="form-row ">
                  <div className="input-group half">
                    <Input
                      className="input-text"
                      placeholder="نام و نام خانوادگی"
                      variant="underlined"
                    />
                  </div>
                  <div className="input-group half">
                    <Input
                      className="input-text"
                      placeholder="ایمیل"
                      variant="underlined"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row textarea-field">
                <div className="input-group half">
                  <TextArea
                    className="input-text"
                    rows={4}
                    placeholder="کامنت خود را بنویسید"
                    variant="underlined"
                  />
                </div>
                <div className="input-group half">
                  <Rate
                    allowHalf
                    onChange={setRating}
                    value={rating}
                    className="black-rate"
                  />
                </div>
              </div>
            </div>
            <div className="dialogFooter">
              <button className="info-btn" onClick={closeDialogomments}>
                ارسال
              </button>
              <button className="info-btn  closed" onClick={closeDialogomments}>
                خروج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentForm;
