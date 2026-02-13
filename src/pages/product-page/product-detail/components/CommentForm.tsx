import { useState } from "react";
// import reply from "../../../../assets/icon/reply.svg";
import star from "../../../../assets/icon/star.svg";
import { Input, message, Rate } from "antd";
import Captcha from "../../../../components/Captcha/Captcha";
import useProducts from "../../../../hooks/products/useProducts";
import type { ProductCommentDTO } from "../../../../models/dtos/productCommentDTO";
import { useLanguage } from "../../../../contexts/useLanguage";
import { validateEmail, validatePhone } from "../../../../helpers/validation";
import TextArea from "antd/es/input/TextArea";
import { useTranslate } from "../../../../i18n/useTranslate";
import type { ProductDetailView } from "../../../../models/views/productView";

interface CommentFormProps {
  id: string | undefined;
  product: ProductDetailView | null;
}

const CommentForm: React.FC<CommentFormProps> = ({ id, product }) => {
  const [commentFormSubmitting, setCommentFormSubmitting] = useState(false);
  const [replyCommentFormSubmitting, setReplyCommentFormSubmitting] =
    useState(false);
  const [commentForm, setCommentForm] = useState<ProductCommentDTO>(
    {} as ProductCommentDTO,
  );
  const [replyCommentForm, setReplyCommentForm] = useState<ProductCommentDTO>(
    {} as ProductCommentDTO,
  );
  const [rating, setRating] = useState(0);
  const [isOpenComments, setIsOpenComments] = useState(false);
  // const openDialogComments = () => {
  //   setIsOpenComments(true);
  //   document.body.style.overflow = "hiddien";
  // };
  const closeDialogomments = () => {
    setIsOpenComments(false);
    setReplyCommentForm({} as ProductCommentDTO);
    document.body.style.overflow = "auto";
  };
  const { currentLang } = useLanguage();
  const { t } = useTranslate();

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (content: string) => {
    messageApi.open({
      icon: <></>,
      content: content,
    });
  };

  const { sendCommentProductById } = useProducts(currentLang);

  const handleCommentInputChange = (
    field: keyof ProductCommentDTO,
    value: any,
  ) => {
    setCommentForm((prev) => ({
      ...prev,
      [field]: value || null,
    }));
  };

  const handleReplyCommentInputChange = (
    field: keyof ProductCommentDTO,
    value: any,
  ) => {
    setReplyCommentForm((prev) => ({
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

      const resp = await sendCommentProductById(Number(id), commentForm);
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

  const onReplyCommentSubmit = async () => {
    try {
      const isEmpty =
        !replyCommentForm.content ||
        !replyCommentForm.rate ||
        !replyCommentForm.user_email ||
        !replyCommentForm.user_name ||
        !replyCommentForm.captcha;
      if (isEmpty) {
        showMessage(t("local_completeTheForm"));
        return;
      }

      if (
        replyCommentForm.user_email &&
        !validateEmail(replyCommentForm.user_email)
      ) {
        showMessage(t("local_invalidEmail"));
        return;
      }

      if (replyCommentForm.phone && !validatePhone(replyCommentForm.phone)) {
        showMessage(t("local_invalidPhone"));
        return;
      }

      setReplyCommentFormSubmitting(true);

      //TODO باید با سرویس مخصوص ریپلای جایگزین شود
      const resp = await sendCommentProductById(Number(id), commentForm);
      if (resp.success) {
        showMessage(resp.result);
        setReplyCommentForm({} as ProductCommentDTO);
        setReplyCommentFormSubmitting(false);
        closeDialogomments();
      } else {
        showMessage(resp.result);
      }
    } catch (e: any) {
      showMessage(e?.message);
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
          <div className="form-row textarea-field">
            {!commentFormSubmitting && (
              <Captcha onVerify={handleCommentInputChange} />
            )}
          </div>
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
          {product?.comments.map((c) => (
            <div className="comment">
              <div className="comment-header">
                <div className="text-comment">
                  <strong>{c.user_name}</strong> - <span>{c.rate} {t("local_rate")}</span>
                </div>
                <div className="date">{c.created_at}</div>
              </div>
              <div className="comment-body">
                <p>{c.content}</p>
              </div>

              {/* پاسخ به کامنت */}
              {/* <div className="comment-reply">
              <div className="reply-icon">
                <img src={reply} alt="reply" />
              </div>
              <div className="comment-header">
                <strong>پشتیبانی</strong>
              </div>
              <div className="comment-body">
                <p>از نظر مثبت شما بسیار سپاسگزاریم! خوشحالیم رضایت داشتید.</p>
                <button className="reply-btn" onClick={openDialogComments}>
                  {t("local_commentReply")}
                </button>
              </div>
            </div> */}
            </div>
          ))}
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
            zIndex: 100,
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
            <h2>{t("local_commentReplyTo")}</h2>
            <div className="form-section">
              <div className="comment-form-block">
                <div className="form-row ">
                  <div className="input-group half">
                    <Input
                      className="input-text"
                      placeholder={t("local_contactFullName")}
                      variant="underlined"
                      value={replyCommentForm.user_name || ""}
                      onChange={(e) =>
                        handleReplyCommentInputChange(
                          "user_name",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="input-group half">
                    <Input
                      className="input-text"
                      placeholder={t("local_contactEmail")}
                      variant="underlined"
                      value={replyCommentForm.user_email || ""}
                      onChange={(e) =>
                        handleReplyCommentInputChange(
                          "user_email",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-row textarea-field">
                <div className="input-group half">
                  <TextArea
                    className="input-text"
                    rows={4}
                    placeholder={t("local_commentContent")}
                    variant="underlined"
                    value={replyCommentForm.content || ""}
                    onChange={(e) =>
                      handleReplyCommentInputChange("content", e.target.value)
                    }
                  />
                </div>
                <div
                  className="input-group half"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>{t("local_commentRate")}</span>
                  <Rate
                    //allowHalf
                    onChange={setRating}
                    value={rating}
                    className="black-rate"
                  />
                </div>
              </div>
              {!replyCommentFormSubmitting && (
                <Captcha onVerify={handleReplyCommentInputChange} />
              )}
            </div>
            <div className="dialogFooter">
              <button className="info-btn" onClick={onReplyCommentSubmit}>
                {t("local_send")}
              </button>
              <button className="info-btn  closed" onClick={closeDialogomments}>
                {t("local_formClose")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentForm;
