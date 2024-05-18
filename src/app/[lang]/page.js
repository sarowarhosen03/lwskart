import Ads from "@/components/advertising/Ads";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import NewArrival from "@/components/home/NewArrival";
import ProductList from "@/components/prodoucts/ProductList";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
      <Ads />
      <ProductList />
    </>
  );
}
