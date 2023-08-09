/**
 * Направи тип, който да те задължава да напишеш ключовете на обект 
 * да са pascal case версия на стойностите
 */


type RemoveSpaces<S extends string> = S extends `${infer Left} ${infer Right}`
    ? `${RemoveSpaces<`${Left}${CamelCase<Right>}`>}`
    : S;

type CamelCase<S extends string> =
    S extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${RemoveSpaces<Rest>}`
    : '';

type ValuesAsCamelCaseKeys<T extends Record<string, string>> {
    [K in keyof T as CamelCase<T[K]>]: T[K]
}

type ProffesionType = {
    influencer: 'influencer',
    productManager: 'productManager',
    dataScientist: 'Data Scientist',
    softwareDeveloper: 'software developer',
    multiplespaces: 'Multiple    Spaces'
}

const Profession: ValuesAsCamelCaseKeys<ProffesionType> = {
    Influencer: 'influencer',
    ProductManager: 'productManager',
    DataScientist: 'Data Scientist',
    SoftwareDeveloper: 'software developer',
    MultipleSpaces: 'Multiple    Spaces'
}

console.log(Profession.DataScientist); // Data Scientist