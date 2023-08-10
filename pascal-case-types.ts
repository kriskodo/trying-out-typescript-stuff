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

type KeysAsCamelCaseValues<T extends Record<string, string>> {
    -readonly [K in keyof T as CamelCase<T[K]>]: T[K]
}

const convertToCamelCase = <T extends Record<string, string>>(object: T): KeysAsCamelCaseValues<T> => {
    return object as unknown as KeysAsCamelCaseValues<T>;
};

const Profession = convertToCamelCase({
    Influencer: 'influencer',
    ProductManager: 'productManager',
    DataScientist: 'Data Scientist',
    SoftwareDeveloper: 'software developer',
    MultipleSpaces: 'Multiple    Spaces',
    MoreThanTwoStrings: 'more than two strings',
    UppercaseStrings: "UPPERCASE STRINGS",
    UPPERCASE: "UPPERCASE",
} as const);

Profession.Uppercase = "UPPERCASE";