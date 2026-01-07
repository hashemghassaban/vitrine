import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
import useHistory from "../hooks/useHistory";
import Index from "./index/Index";
import "./Pages.less";
import NotFound from "./not-found/NotFound";
import Blog from "./blog/blog";
import BlogDetailPage from "./blog/blog-detail-page/BlogDetailPage";
import About from "./about/About";
import Representation from "./contact/representation/Representation";
import Catalogue from "./contact/catalogue/Catalogue";
import FAQ from "./contact/faq/FAQ";
import ContactBranch from "./contact/contact-branch/ContactBranch";
import Search from "./search/Search";
import Project from "./project/Project";
import ProjectItemDetail from "./project/project-item-detail/ProjectItemDetail";
import BrandPage from "./brand-page/BrandPage";
import ServicePageSec from "./service-page/service-page-sec/ServicePageSec";
import BrandProducts from "./product-page/brand-products/BrandProducts";
import AllProducts from "./product-page/all-products/AllProducts";
import ProductDetail from "./product-page/product-detail/ProductDetail";

const Pages = () => {
  const { location } = useHistory();
  const {
    result: { loading },
  } = { result: { loading: false } };

  if (loading) {
    return (
      <div className="wrapper">
        <Spin size="large"></Spin>
      </div>
    );
  }
  return (
    <Routes location={location}>
      <Route index element={<Index />} />
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/representation" element={<Representation />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contactBranch" element={<ContactBranch />} />
      <Route path="/search" element={<Search />} />
      <Route path="/project" element={<Project />} />
      <Route path="/project/:id" element={<ProjectItemDetail />} />
      <Route path="/brands" element={<BrandPage />} />
      {/* <Route path="/servicePage" element={<ServicePage />} /> اقای گودرزوند فرمودند این صفحه حذف شده است */}
      <Route path="/services" element={<ServicePageSec />} />
      <Route path="/brandProducts/:id" element={<BrandProducts />} />
      <Route path="/allProducts" element={<AllProducts />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default Pages;
