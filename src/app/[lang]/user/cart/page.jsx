import CartOverView from "./CartOverView";

export default function CartPage({params:{lang}}) {
  return (
    <>
      <CartOverView lang={lang}/>
    </>
  );
}
