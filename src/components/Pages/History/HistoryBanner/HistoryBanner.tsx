const HistoryBanner = () => {
  return (
    <section className="w-full py-6 px-6 flex items-center justify-center">
      <div className="w-full max-w-[1352px]">
        <div className="bg-[var(--Teritary-100)] rounded-[var(--Radius-md)] px-6 py-[75px] flex flex-col gap-[40px] items-center justify-center w-full min-h-[400px]">
          <h1
            className="text-[48px] font-[700] text-center text-black tracking-[0.96px]"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
              lineHeight: 1.2,
            }}
          >
            Our History
          </h1>
          <h3
            className="text-[32px] font-[700] text-center text-black tracking-[0.64px]"
            style={{
              fontFamily: "var(--font-sora), sans-serif",
              lineHeight: 1.2,
            }}
          >
            Home Central Stores Journey in <br />
            Owego, Vestal & Candor, NY
          </h3>
        </div>
      </div>
    </section>
  );
};

export default HistoryBanner;
