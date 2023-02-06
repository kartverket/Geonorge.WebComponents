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
        ?showsearchtypeselector=${props.showsearchtypeselector}
        metadataresultsfound=${props.metadataresultsfound}
        articlesresultsfound=${props.articlesresultsfound}
        language=${props.language}
        maincontentid=${props.maincontentid}
    ></main-navigation>${props.showsearchtypeselector ? "true": "false"}`;
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/web-components/writing-stories/args

Default.args = {
    id: "main-navigation",
    englishurl: "/",
    norwegianurl: "/",
    environment: "dev",
    showsearchtypeselector: true,
    metadataresultsfound: "3245",
    articlesresultsfound: "17",
    language: "en",
    maincontentid: "main-content",
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


// Download items
localStorage.orderItems = JSON.stringify([
    "11111111-1111-1111-1111-111111111111",
    "22222222-2222-2222-2222-222222222222",
    "33333333-3333-3333-3333-333333333333"
]);

localStorage["11111111-1111-1111-1111-111111111111.metadata"] = JSON.stringify({
    name: "Dataset item 1",
    uuid: "11111111-1111-1111-1111-111111111111"
});

localStorage["22222222-2222-2222-2222-222222222222.metadata"] = JSON.stringify({
    name: "Dataset item 2",
    uuid: "22222222-2222-2222-2222-222222222222"
});

localStorage["33333333-3333-3333-3333-333333333333.metadata"] = JSON.stringify({
    name: "Dataset item 3",
    uuid: "33333333-3333-3333-3333-333333333333"
});


// Map items
localStorage.mapItems = JSON.stringify([
    {
        Uuid: "11111111-1111-1111-1111-111111111111",
        Title: "Dataset item 1",
    },
    {
        Uuid: "22222222-2222-2222-2222-222222222222",
        Title: "Dataset item 3",
    },
    {
        Uuid: "33333333-3333-3333-3333-333333333333",
        Title: "Dataset item 3",
    }
]);

// For testing at localhost
sessionStorage.isLocalKartkatalogEnvironment = true;
