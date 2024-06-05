export default function layout({
  children,
  heroSection,
  categoriAndNewaraival,
  products,
}) {
  return (
    <>
      {heroSection}
      {categoriAndNewaraival}
      {children}
      {products}
    </>
  );
}
