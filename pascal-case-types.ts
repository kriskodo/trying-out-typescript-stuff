/**
 * Направи тип, който да те задължава да напишеш ключовете на обект 
 * да са pascal case версия на стойностите
 */

type WithoutSpaces<S extends string> = S extends `${infer First} ${infer Rest}`
    ? `${WithoutSpaces<`${Lowercase<First>}${CamelCase<Lowercase<Rest>>}`>}`
    : S;

type CamelCase<S extends string> =
    S extends WithoutSpaces<Uppercase<S>>
    ? Capitalize<Lowercase<S>>
    : S extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${WithoutSpaces<Rest>}`
    : '';

type KeysAsCamelCaseValues<T extends Record<string, string>> = {
    -readonly [K in keyof T as CamelCase<T[K]>]: T[K]
}

const convertToCamelCase = <T extends Record<string, string>>(object: Readonly<T>): KeysAsCamelCaseValues<T> => {
    return object as unknown as KeysAsCamelCaseValues<T>;
};

const Profession = convertToCamelCase({
    influencer: 'influencer',
    "productManager": 'productManager',
    "Data Scientist": 'Data Scientist',
    "software developer": 'software developer',
    multipleSpaces: 'Multiple    Spaces',
    moreThanTwoStrings: 'more than two strings',
    uppercaseStrings: "UPPERCASE STRINGS",
    uppercase: "UPPERCASE",
});

Profession.MoreThanTwoStrings = "more than two strings";
Profession.DataScientist = "Data Scientist";