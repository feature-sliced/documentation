import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useMemo } from "react";
import { shuffle } from "lodash-es";
import { DEFAULT_LOCALE } from "@site/config/docusaurus/consts";
import { companies, localeToCompaniesMap } from "./_config";

const MIN_COMPANIES_AMOUNT = 8;

export const useCompanies = () => {
    const { i18n } = useDocusaurusContext();

    const shuffledLocaleCompanies = useMemo(() => {
        const localeCompanies =
            localeToCompaniesMap[i18n.currentLocale] || companies;

        const isEnoughLocaleCompanies =
            localeCompanies.length >= MIN_COMPANIES_AMOUNT;

        const isDefaultLocale = i18n.currentLocale === DEFAULT_LOCALE;

        const isNeedAddDefaultLocaleCompanies =
            !isEnoughLocaleCompanies && !isDefaultLocale;

        const fullLocaleCompanies = isNeedAddDefaultLocaleCompanies
            ? [
                  ...localeCompanies,
                  ...companies.slice(
                      0,
                      MIN_COMPANIES_AMOUNT - localeCompanies.length,
                  ),
              ]
            : localeCompanies;

        return shuffle(fullLocaleCompanies);
    }, [i18n.currentLocale]);

    return shuffledLocaleCompanies;
};
