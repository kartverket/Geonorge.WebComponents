import {
    Component, CustomElement, CustomElementOptions, Prop, Dispatch, DispatchEmitter,
    Listen, Watch, getElement, getShadowRootElement, Toggle
} from 'super-custom-elements';


interface SearchTypeSelectorOptions extends CustomElementOptions {
    onSearchTypeChange?: () => void
}

@Component({
    tag: 'search-type-selector',
    template: import('./search-type-selector.html'),
    style: import('./search-type-selector.scss')
})

export class SearchTypeSelector extends CustomElement {
    private static readonly elementSelector = 'search-type-selector';
    private searchTypeSelector: HTMLDivElement;
    private metadataNameElement: HTMLSpanElement;
    private metadataCounterElement: HTMLSpanElement;
    private articleNameElement: HTMLSpanElement;
    private articleCounterElement: HTMLSpanElement;

    @Prop() id: string;
    @Prop() metadataresultsfound: string;
    @Prop() articlesresultsfound: string;
    @Prop() language: string;
    @Prop() searchtype: string;
    @Dispatch('onSearchTypeChange') onSearchTypeChange: DispatchEmitter;

    constructor() {
        super();
        this.handleSearchTypeOnChange = this.handleSearchTypeOnChange.bind(this);

    }

    setup(options?: SearchTypeSelectorOptions): void {
        this.connect(options.container);
        if (options.id) {
            this.id = options.id;
        }
    }

    connectedCallback() {
        this.searchTypeSelector = getShadowRootElement(this, '#search-type-selector');

        this.metadataNameElement = getShadowRootElement(this, '#search-type-metadata-name');
        this.metadataCounterElement = getShadowRootElement(this, '#search-type-metadata-counter');
        this.articleNameElement = getShadowRootElement(this, '#search-type-article-name');
        this.articleCounterElement = getShadowRootElement(this, '#search-type-article-counter');

        this.searchTypeSelector.querySelectorAll('input[name=search-type]').forEach((element: HTMLInputElement) => {
            element.onchange = this.handleSearchTypeOnChange;
        });
        const selectedSearchTypeSelector = this.searchTypeSelector.querySelector(`input[value=${this.searchtype}]`);
    }

    disconnectedCallback() {
    }

    updateNameElements(language: string) {
        this.metadataNameElement.innerHTML = language === 'en' ? 'Map catalog' : 'Kartkatalogen';
        this.articleNameElement.innerHTML = language === 'en' ? 'Articles' : 'Artikler';
    }

    handleSearchTypeOnChange(event: InputEvent) {
        if (this.onSearchTypeChange) {
            const selectedElement = event.composedPath()[0] as HTMLInputElement;
            this.onSearchTypeChange.emit({
                detail: {
                    value: selectedElement.value
                }
            });
        }
    }

    @Watch('language')
    languageChanged() {
        this.updateNameElements(this.language);
    }

    @Watch('metadataresultsfound')
    metadataResultsFoundChanged() {
        this.metadataCounterElement.innerHTML = this.metadataresultsfound;
    }

    @Watch('articlesresultsfound')
    articlesResultsFoundChanged() {
        this.articleCounterElement.innerHTML = this.articlesresultsfound;
    }

    @Watch('searchtype')
    searchTypeChanged() {
        const selectedSearchTypeSelector = <HTMLInputElement>this.searchTypeSelector.querySelector(`input[value=${this.searchtype}]`);
        if (selectedSearchTypeSelector){
            selectedSearchTypeSelector.checked = true;
        }
    }

    public static setup(selector: string, options: SearchTypeSelectorOptions) {
        const element = getElement<SearchTypeSelector>(selector);

    }
}
