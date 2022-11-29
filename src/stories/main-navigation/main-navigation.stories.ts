import { Meta } from "@storybook/web-components";
import { html } from "lit-html";
import "./main-navigation";

// More on default export: https://storybook.js.org/docs/web-components/writing-stories/introduction#default-export
export default {
    title: "Example/MainNavigation",
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
    argTypes: {
        language: {
            control: "select",
            options: ["Norsk", "English"],
            mapping: { Norsk: "no", English: "en" }
        },
        environment: {
            control: "select",
            options: ["Development", "Test", "Production"],
            mapping: { Development: "dev", Test: "test", Production: "" }
        }
    }
} as Meta;

// More on component templates: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

const Template = (props) => {
    return html`<main-navigation
        id=${props.id}
        englishurl=${props.englishurl}
        norwegianurl=${props.norwegianurl}
        environment=${props.environment}
        ?show-search-type-selector=${props.showSearchTypeSelector}
        metadataresultsfound=${props.metadataresultsfound}
        articlesresultsfound=${props.articlesresultsfound}
        language=${props.language}
    ></main-navigation>`;
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args

Default.args = {
    id: "main-navigation",
    englishurl: "/",
    norwegianurl: "/",
    environment: "dev",
    showSearchTypeSelector: true,
    metadataresultsfound: "3245",
    articlesresultsfound: "17",
    language: "en",
    onSearch: (event) => {
        const searchString = (event.detail && event.detail.searchString) || null;
        if (searchString) {
            console.log(searchString);
        }
    },
    onOpenEmptyMapItemsList: (event) => {
        console.log("onOpenEmptyMapItemsList");
    },
    onOpenEmptyDownloadItemsList: (event) => {
        console.log("onOpenEmptyDownloadItemsList");
    },
    onSearchTypeChange: (event) => {
        const searchType = (event.detail && event.detail.value) || null;
        if (searchType) {
            console.log(searchType);
        }
    },
    onSignInClick: (event) => {
        event.target.setAttribute("isLoggedIn", "");
    },
    onSignOutClick: (event) => {
        event.target.setAttribute("isLoggedIn", false);
    },
    onNorwegianLanguageSelect: (event) => {
        document.getElementById("main-navigation").setAttribute("language", "no");
    },
    onEnglishLanguageSelect: (event) => {
        document.getElementById("main-navigation").setAttribute("language", "en");
    }
};
