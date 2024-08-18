/* eslint-disable prettier/prettier */
import Image from "next/image";

const HomeDescription = () => {
  return (
    <main style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }} className={"bg-catLightCream text-black"}>
      <Image src="/images/logo/Cat & pillows.svg" alt="Cat & Pillows Logo" width={200} height={200} />
      <div style={{ maxWidth: "600px", textAlign: "justify", marginTop: "20px" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet ipsum nulla. Mauris gravida massa
          lacus, sodales rutrum augue pellentesque consectetur. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Donec feugiat est pretium, pharetra massa non, luctus lacus.
          Maecenas ipsum lectus, sollicitudin id est vitae, hendrerit pharetra felis. Morbi elementum purus quis sem
          tempus elementum. Aliquam sit amet ante placerat, auctor ante in, placerat lectus. Nullam vitae felis orci.
          Quisque id eros sit amet metus consectetur aliquam. Quisque ut lorem sed mauris hendrerit tincidunt ac ac
          nisi. Nulla in nisl bibendum, semper augue id, sodales nibh. Nam in vehicula turpis, sed malesuada metus.
          Duis elementum, neque ut malesuada tempus, elit lorem porta ligula, quis porttitor elit arcu vel sapien.
          Phasellus consequat eleifend metus, vitae placerat tellus tincidunt ac.
        </p>
      </div>
    </main>
  );
}

export default HomeDescription;