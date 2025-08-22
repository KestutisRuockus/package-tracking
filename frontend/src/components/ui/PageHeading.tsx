function PageHeading({ text }: { text: string }) {
  return (
    <h1 className="w-fit mx-auto text-5xl font-bold uppercase italic my-8">
      {text}
    </h1>
  );
}

export default PageHeading;
