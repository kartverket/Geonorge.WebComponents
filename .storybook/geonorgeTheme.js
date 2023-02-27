import { create } from "@storybook/theming";
import geonorgeLogo from "../src/assets/svg/geonorge-logo.svg";

export default create({
    base: "light",
    brandTitle: "Geonorge WebComponents",
    brandUrl: "https://www.geonorge.no/",
    brandImage: geonorgeLogo,
    brandTarget: "_self",

    colorPrimary: "#4C7AA9",

    // UI
    appBg: "#f6f5f4",
    appContentBg: "white",
    appBorderColor: "#d8d8d8",
    appBorderRadius: 4,

    // Typography
    fontBase: '"Open Sans", sans-serif',

    // Text colors
    textColor: "#2F3940",
    textInverseColor: "#FFF",

    // Toolbar default and active colors
    barTextColor: "#2F3940",
    barSelectedColor: "#FE5000",
    barBg: "#f7f7f7",

    // Form colors
    inputBg: "white",
    inputBorder: "#d8d8d8",
    inputTextColor: "#2F3940",
    inputBorderRadius: 4
});
