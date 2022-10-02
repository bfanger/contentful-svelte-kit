type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Dimension: any;
  HexColor: any;
  JSON: any;
  Quality: any;
};

export type MenuItemFragment = {
  __typename?: "NavigationItem";
  title?: string | null;
  theme?: string | null;
  externalUrl?: string | null;
  page?:
    | { __typename: "Page"; slug?: string | null }
    | { __typename?: "PageType" }
    | null;
};

export type SettingsQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type SettingsQuery = {
  __typename?: "Query";
  settings?: {
    __typename?: "Settings";
    title?: string | null;
    seoDescription?: string | null;
    mainMenuCollection?: {
      __typename?: "SettingsMainMenuCollection";
      total: number;
      items: Array<{
        __typename?: "NavigationItem";
        title?: string | null;
        theme?: string | null;
        externalUrl?: string | null;
        submenuCollection?: {
          __typename?: "NavigationItemSubmenuCollection";
          total: number;
          items: Array<{
            __typename?: "NavigationItem";
            title?: string | null;
            theme?: string | null;
            externalUrl?: string | null;
            page?:
              | { __typename: "Page"; slug?: string | null }
              | { __typename?: "PageType" }
              | null;
          } | null>;
        } | null;
        page?:
          | { __typename: "Page"; slug?: string | null }
          | { __typename?: "PageType" }
          | null;
      } | null>;
    } | null;
  } | null;
};

export type PageBySlugQueryVariables = Exact<{
  pageSlug: Scalars["String"];
}>;

export type PageBySlugQuery = {
  __typename?: "Query";
  pageCollection?: {
    __typename?: "PageCollection";
    items: Array<{
      __typename?: "Page";
      title?: string | null;
      seoDescription?: string | null;
      modulesCollection?: {
        __typename?: "PageModulesCollection";
        total: number;
        items: Array<
          | { __typename: "ModuleAgeGate" }
          | { __typename: "ModuleCards" }
          | {
              __typename: "ModuleContent";
              title?: string | null;
              text?: string | null;
            }
          | { __typename: "ModuleDivider" }
          | { __typename: "ModulePolly" }
          | { __typename: "ModuleSlider" }
          | { __typename: "ModuleSystem" }
          | {
              __typename: "ModuleText";
              title?: string | null;
              text?: string | null;
            }
          | { __typename: "ModuleVideo" }
          | null
        >;
      } | null;
    } | null>;
  } | null;
};
