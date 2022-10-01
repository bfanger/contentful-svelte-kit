// ---------------------------------------
//
//      Generated file, DO NOT EDIT
//
//     npm run generate-contentful-types
//
// ---------------------------------------

import type * as Contentful from "contentful";

export type TypeCategory = Contentful.Entry<TypeCategoryFields>;
export type TypeContentItem = Contentful.Entry<TypeContentItemFields>;
export type TypeModuleAgeGate = Contentful.Entry<TypeModuleAgeGateFields>;
export type TypeModuleCards = Contentful.Entry<TypeModuleCardsFields>;
export type TypeModuleContent = Contentful.Entry<TypeModuleContentFields>;
export type TypeModuleDivider = Contentful.Entry<TypeModuleDividerFields>;
export type TypeModulePolly = Contentful.Entry<TypeModulePollyFields>;
export type TypeModuleSlider = Contentful.Entry<TypeModuleSliderFields>;
export type TypeModuleSystem = Contentful.Entry<TypeModuleSystemFields>;
export type TypeModuleText = Contentful.Entry<TypeModuleTextFields>;
export type TypeModuleVideo = Contentful.Entry<TypeModuleVideoFields>;
export type TypeNavigationItem = Contentful.Entry<TypeNavigationItemFields>;
export type TypePage = Contentful.Entry<TypePageFields>;
export type TypePageType = Contentful.Entry<TypePageTypeFields>;
export type TypeSettings = Contentful.Entry<TypeSettingsFields>;

export type TypeCategoryFields = {
  title?: Contentful.EntryFields.Symbol;
  slug?: Contentful.EntryFields.Symbol;
  seoDescription?: Contentful.EntryFields.Symbol;
  pageType: TypePageType;
};

export type TypeContentItemFields = {
  title?: Contentful.EntryFields.Symbol;
  subtitle?: Contentful.EntryFields.Symbol;
  theme?: "primary" | "quaternary" | "secondary" | "tertiary";
  text?: Contentful.EntryFields.Text;
  textAlignment?: "Center" | "Left" | "Right";
  image?: Contentful.Asset;
  navigationItems?: TypeNavigationItem[];
};

export type TypeModuleAgeGateFields = {
  title: Contentful.EntryFields.Symbol;
  subTitle: Contentful.EntryFields.Symbol;
  sendButtonLabel: Contentful.EntryFields.Symbol;
  rememberMeLabel?: Contentful.EntryFields.Symbol;
  rememberMeDescription?: Contentful.EntryFields.Symbol;
  style: "Center Aligned" | "Right Aligned";
  imageLogo: Contentful.Asset;
  imageBackground: Contentful.Asset;
  tooYoungTitle: Contentful.EntryFields.Symbol;
  tooYoungText: Contentful.EntryFields.Text;
  tooYoungBackButtonLabel: Contentful.EntryFields.Symbol;
  tooYoungMoreInformationLink: TypeNavigationItem;
  entryPage?: TypePage;
};

export type TypeModuleCardsFields = {
  title?: Contentful.EntryFields.Symbol;
  cards?: TypeContentItem[];
  style?:
    | "FourColumn"
    | "MultiColumn"
    | "OneColumn"
    | "ThreeColumn"
    | "ThreeColumnImageBackground"
    | "TwoColumn"
    | "Wall";
  titleTheme?: "primary" | "quaternary" | "secondary" | "tertiary";
  imageBackground?: Contentful.Asset;
};

export type TypeModuleContentFields = {
  title?: Contentful.EntryFields.Symbol;
  style?:
    | "image-background"
    | "image-background-card-left"
    | "image-background-card-right"
    | "image-background-cta"
    | "image-background-text"
    | "image-left"
    | "image-right";
  theme?: "primary" | "quaternary" | "secondary" | "tertiary";
  text?: Contentful.EntryFields.Text;
  image?: Contentful.Asset;
  imageBackground?: Contentful.Asset;
  navigationItems?: TypeNavigationItem[];
};

export type TypeModuleDividerFields = {
  title?: Contentful.EntryFields.Symbol;
  image?: Contentful.Asset;
  orientation?: "bottom" | "top";
};

export type TypeModulePollyFields = {
  title?: Contentful.EntryFields.Symbol;
  displayTitle?: Contentful.EntryFields.Symbol;
  searchbar?: Contentful.EntryFields.Boolean;
  publicationId: Contentful.EntryFields.Symbol;
  apiToken: Contentful.EntryFields.Symbol;
  collectionId?: Contentful.EntryFields.Symbol;
};

export type TypeModuleSliderFields = {
  title?: Contentful.EntryFields.Symbol;
  style?: "carousel" | "image" | "image-text";
  theme?: "primary" | "quaternary" | "secondary" | "tertiary";
  slides?: TypeContentItem[];
  imageBackground?: Contentful.Asset;
};

export type TypeModuleSystemFields = {
  title?: Contentful.EntryFields.Symbol;
  type?: "contact-form" | "html" | "newsletter-form";
  theme?: "primary" | "quaternary" | "secondary" | "tertiary";
  text?: Contentful.EntryFields.Text;
  url?: Contentful.EntryFields.Symbol;
  additionalSettings?: Contentful.EntryFields.Object;
  html?: Contentful.EntryFields.Text;
  imageBackground?: Contentful.Asset;
};

export type TypeModuleTextFields = {
  title?: Contentful.EntryFields.Symbol;
  style?: "CenteredParagraphs" | "CenteredQuote";
  theme?: "primary" | "secondary";
  text?: Contentful.EntryFields.Text;
  navigationItems?: TypeNavigationItem[];
  imageBackground?: Contentful.Asset;
};

export type TypeModuleVideoFields = {
  title?: Contentful.EntryFields.Symbol;
  style?: "canvas" | "centered" | "full-width";
  videoUrl?: Contentful.EntryFields.Symbol;
  imageBackground?: Contentful.Asset;
  autoPlay?: Contentful.EntryFields.Boolean;
};

export type TypeNavigationItemFields = {
  title?: Contentful.EntryFields.Symbol;
  page?: Contentful.Entry<TypePageFields | TypePageTypeFields>;
  externalUrl?: Contentful.EntryFields.Symbol;
  submenu?: TypeNavigationItem[];
  image?: Contentful.Asset;
  raaSSkuId?: Contentful.EntryFields.Symbol;
  style?: "button" | "link";
  theme?: "primary" | "quaternary" | "secondary" | "tertiary";
  icon?: Contentful.EntryFields.Symbol;
};

export type TypePageFields = {
  title?: Contentful.EntryFields.Symbol;
  seoDescription?: Contentful.EntryFields.Symbol;
  slug?: Contentful.EntryFields.Symbol;
  pageType?: TypePageType;
  category?: TypeCategory;
  modules?: Contentful.Entry<
    | TypeModuleAgeGateFields
    | TypeModuleCardsFields
    | TypeModuleContentFields
    | TypeModuleDividerFields
    | TypeModulePollyFields
    | TypeModuleSliderFields
    | TypeModuleSystemFields
    | TypeModuleTextFields
    | TypeModuleVideoFields
  >[];
  imageBackground?: Contentful.Asset;
  dateTime?: Contentful.EntryFields.Date;
};

export type TypePageTypeFields = {
  title?: Contentful.EntryFields.Symbol;
  slug?: Contentful.EntryFields.Symbol;
  seoDescription?: Contentful.EntryFields.Symbol;
  hasCategories?: Contentful.EntryFields.Boolean;
  page?: TypePage;
  sort?: Contentful.EntryFields.Boolean;
};

export type TypeSettingsFields = {
  title?: Contentful.EntryFields.Symbol;
  globalTitle?: Contentful.EntryFields.Symbol;
  seoDescription?: Contentful.EntryFields.Symbol;
  homePage: TypePage;
  mainMenu?: TypeNavigationItem[];
  mainMenuStyle: "centered" | "left";
  footerMenu?: TypeNavigationItem[];
  footerStyle?: "Compact" | "CompactNoLogo" | "FreeHtml" | "Full";
  footerHtml?: Contentful.EntryFields.Text;
  socialMenu?: TypeNavigationItem[];
  publicPages?: TypePage[];
  imageLogo?: Contentful.Asset;
  imageFooterLogo?: Contentful.Asset;
  imageFavicon: Contentful.Asset;
  imageBackground?: Contentful.Asset;
  pageTypes?: TypePageType[];
  theme?: "Amstel" | "Default";
  legalDrinkingAge?: Contentful.EntryFields.Integer;
  contentSecurityPolicyHeader?: Contentful.EntryFields.Text;
  notFoundPage: TypePage;
  serverErrorPage: TypePage;
  redirects?: Contentful.EntryFields.Object;
  ageGateReferalBypass?: Contentful.EntryFields.Object;
  ageGatePages?: TypePage[];
  gtmKey?: Contentful.EntryFields.Symbol;
  securityScript?: Contentful.EntryFields.Symbol;
  fallbackCookieText?: Contentful.EntryFields.Text;
  fallbackCookieAcceptButtonText?: Contentful.EntryFields.Symbol;
  pollyApiKey?: Contentful.EntryFields.Symbol;
  pollyPublicationId?: Contentful.EntryFields.Symbol;
  chatbot?: Contentful.EntryFields.Boolean;
  chatbotBotId?: Contentful.EntryFields.Symbol;
  chatbotInvite?: Contentful.EntryFields.Symbol;
  chatbotAvatar?: Contentful.Asset;
  chatbotTitle?: Contentful.EntryFields.Symbol;
  chatbotStyleOptions?: Contentful.EntryFields.Object;
  chatbotOverrideLocalizedStrings?: Contentful.EntryFields.Object;
  cssOverrides?: Contentful.EntryFields.Text;
};
